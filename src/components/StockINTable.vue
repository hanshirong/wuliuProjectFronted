<template>
  <div class="app-container">
    <div class="mobileInfo">
      <p>时间: {{createdAt}}</p>
      <p>移动单号：{{mobileTicket}}</p>
      <p>移动方向：{{direction}}</p>
      <p>创建时间: {{datetime}}</p>
    </div>

    <!--司机填写-->
    <div class="driverTable">
      <p>司机信息</p>
      <el-table :data="driverData" border style="width: 100%">
        <el-table-column prop="truckIndex" label="车次号" width="180"></el-table-column>
        <el-table-column prop="truckNum" label="入货总托数" width="180"></el-table-column>
        <el-table-column prop="truckModel" label="车型" width="180"></el-table-column>
        <el-table-column prop="truckNo" label="车牌号" width="180"></el-table-column>
      </el-table>
    </div>
    <!--仓管信息-->
    <div class="storeClerkTable" v-if="this.$store.state.admin==2">
      <p>仓管信息</p>
      <el-table :data="storeClerkData" border width="100%">
        <el-table-column prop="unloadAt" label="卸货开始时间" width="180"></el-table-column>

        <el-table-column prop="finishAt" label="卸货完成时间" width="180"></el-table-column>
      </el-table>
    </div>
    <div class="storeClerkTable" v-if="this.$store.state.admin==3">
      <p>仓管信息</p>
      <span>
        卸货开始时间
        <el-button @click="unloadDialog=true" v-if="this.start==1">卸货开始</el-button>
        <span v-if="this.start==0">{{this.storeClerkData[0].unloadAt}}</span>
        <el-dialog title="确认卸货开始？" :visible.sync="unloadDialog" width="30%">
          <el-button @click="unloadDialog = false">取消</el-button>
          <el-button type="primary" @click="unloadComfirm">确 定</el-button>
        </el-dialog>
      </span>
      <span>
        卸货完成时间
        <el-button @click="finishDialog=true" v-if="this.end==1">卸货完成</el-button>
        <span v-if="this.end==0">{{this.storeClerkData[0].finishAt}}</span>
        <el-dialog title="确认卸货完成？" :visible.sync="finishDialog" width="30%">
          <el-button @click="finishComfirm()">确定</el-button>
          <el-button @click="finishDialog=false">取消</el-button>
        </el-dialog>
      </span>
    </div>
    <!--添加入库条目-->
    <div class="stocks">
      <p @click="dialogFormVisible=true" v-if="this.$store.state.admin==2">
        添加入库条目
        <img src="/static/images/pen.png" />
      </p>
      <span v-if="this.$store.state.admin==3">
        入库条目
        <button @click="scan()">扫描</button>
      </span>
      <span v-if="this.$store.state.admin==3">
        <button @click="allotDialog=true">分配库位</button>
        <el-dialog title="确认分配库位？" :visible.sync="allotDialog" width="30%">
          <el-button @click="allotComfirm()">确定</el-button>
          <el-button @click="allotDialog=false">取消</el-button>
        </el-dialog>
      </span>

      <el-dialog title="添加入库条目" :visible.sync="dialogFormVisible">
        <form
          name="excelForm"
          id="excelForm"
          enctype="multipart/form-data"
          action="表格上传接口"
          method="post"
        >
          <input
            class="input-loc-excel"
            name="excelLocal"
            id="excelLocal"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            @change="importData"
          />
        </form>
      </el-dialog>

      <!-- <p @click="addstocks">入库条目</p>-->
      <el-table :data="stocksData" border width="100%">
        <el-table-column prop="serial" label="物料编号" width="100"></el-table-column>
        <el-table-column prop="name" label="物料名称" width="180"></el-table-column>
        <el-table-column prop="ticket" label="现品票号" width="180"></el-table-column>
        <el-table-column prop="count" label="数量" width="50"></el-table-column>
        <el-table-column prop="location" label="库位号" width="80"></el-table-column>
        <el-table-column prop="trayIndex" label="托号" width="50"></el-table-column>
        <el-table-column prop="status" label="问题" width="180"></el-table-column>
        <el-button>编辑</el-button>
        <el-button>删除</el-button>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      start: 0,
      end: 0,
      id: "",
      file: "",
      finishDialog: false,
      unloadDialog: false,
      dialogFormVisible: false,
      allotDialog: false,
      createdAt: "",
      mobileTicket: "",
      direction: "",
      datetime: "",
      driverData: [
        {
          truckIndex: "",
          truckNum: "",
          truckModel: "",
          truckNo: ""
        }
      ],
      storeClerkData: [
        {
          unloadAt: "",
          finishAt: ""
        }
      ],
      stocksData: [
        {
          serial: "",
          name: "",
          ticket: "",
          count: "",
          trayIndex: "",
          location: "",
          status: ""
        }
      ]
    };
  },

  mounted: function() {
    let that = this;
    that.stocks();
  },

  methods: {
    //扫描
    scan() {
      console.log("scan");

      this.$router.push({ path: "/scan/" + this.id });
    },
    //上传入库条目
    importData(e) {
      e.preventDefault();
      let that = this;
      let excelFile = e.target.files[0]; //取到上传的文件
      let formData = new FormData(); //通过formdata上传
      formData.append("items", excelFile);
      axios({
        method: "POST",
        url: "api/api/v1/entry/" + this.id + "/items",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + this.$store.state.token
        }
      })
        .then(function(res) {
          console.log(res.data);
          if (res.data == "Created") {
            // that.$router.push({ path: "/" });
          }
          alert("成功");
          that.stocks();
          
        })
        .catch(function(error) {
          alert("添加失败");
        });
    },
    //卸货开始
    unloadComfirm() {
      let that = this;

      axios({
        method: "PUT",
        url: "api/api/v1/entry/" + that.id + "/status",
        data: {
          status: 4
        },
        headers: {
          authorization: "Bearer " + that.$store.state.token
        }
      })
        .then(function(response) {
          console.log(response);
          that.start=0;
          that.unloadDialog = false;
          that.stocks();
        })
        .catch(function(error) {
          that.unloadDialog = false;
        });
    },

    //卸货完成
    finishComfirm() {
      let that = this;
      axios({
        method: "PUT",
        url: "api/api/v1/entry/" + that.id + "/status",
        data: {
          status: 5
        },
        headers: {
          authorization: "Bearer " + that.$store.state.token
        }
      })
        .then(function(response) {
          console.log("finish");
          that.end=0;
          that.finishDialog = false;
          that.stocks();
        })
        .catch(function(error) {
          that.finishDialog = false;
          alert(error);
          if (error == "Error: Request failed with status code 401")
            that.$router.push({ path: "/" });
        });
    },
    //全部信息
    stocks() {
      let that = this;
      that.id = that.$route.params.id;
      console.log(that.id);
      axios({
        method: "GET",
        url: "api/api/v1/entry/" + that.id,
        headers: {
          authorization: "Bearer " + that.$store.state.token
        }
      })
        .then(function(response) {
          console.log(response.data);
          that.createdAt = that.changeDate(response.data.createdAt);
          that.mobileTicket = response.data.mobileTicket;
          that.direction = response.data.direction;
          that.datetime = that.changeDate(response.data.datetime);
          that.driverData[0].truckIndex = response.data.truckIndex;
          that.driverData[0].truckNum = response.data.truckNum;
          that.driverData[0].truckModel = response.data.truckModel;
          that.driverData[0].truckNo = response.data.truckNo;
          if(response.data.unloadAt != null)
            that.storeClerkData[0].unloadAt = that.changeDate(response.data.unloadAt);
          if(response.data.finishAt != null)
            that.storeClerkData[0].finishAt = that.changeDate(response.data.finishAt);
          that.stocksData = response.data.items;
          if (response.data.unloadAt == null) that.start = 1;
          if (response.data.finishAt == null) that.end = 1;
          for (var i = 0; i < that.stocksData.length; i++) {
            if (that.stocksData[i].status == 1) {
              that.stocksData[i].status = "";
            } else if (that.stocksData[i].status == 2) {
              that.stocksData[i].status = "已扫描";
            } else if (that.stocksData[i].status == 3) {
              that.stocksData[i].status = "已入库";
            } else if (that.stocksData[i].status == 4) {
              that.stocksData[i].status = "不存在";
            }
          }
        })
        .catch(function(error) {
          alert(error);
          if (error == "Error: Request failed with status code 401")
            that.$router.push({ path: "/" });
        });
    },
    //分配库位
    allotComfirm() {
      var that = this;
      that.id = that.$route.params.id;
      axios({
        method: "POST",
        url: "api/api/v1/entry/" + that.id + "/allot",

        headers: {
          authorization: "Bearer " + that.$store.state.token
        }
      })
        .then(function(response) {
          console.log("allotfinish");
          alert("分配完成");
          that.allotDialog = false;
          that.stocks();
        })
        .catch(function(error) {
          that.allotDialog = false;
          alert(error);
          if (error == "Error: Request failed with status code 401")
            that.$router.push({ path: "/" });
        });
    }
  }
};
</script>
<style>
.mobileInfo {
  text-align: left;
  font-size: 16px;
}

.app-container {
  text-align: left;
}
</style>


