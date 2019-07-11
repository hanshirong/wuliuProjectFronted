<template>
  <div class="app-container">
    <h2>库位管理</h2>

    <el-table :data="storageLocationData" @expand-change="handleUpdate" style="width: 100%; " :row-class-name="tableRowClassName">
      <!--展开-->
      <el-table-column type="expand">
        <template slot-scope="row">
          
                    <el-table
                        :data="propsData[row.$index]"
                        
                        border
                        style="width: 100%">
            
                            <el-table-column label="托数" prop="Num">
                            
                            </el-table-column>
                            <el-table-column label="物料编号" prop="serial">
                                
                            </el-table-column>
                            <el-table-column label="物品名称" prop="name" >
                            
                            </el-table-column>
                            <el-table-column label="核定数" prop="count">
                                
                            </el-table-column>
                            <el-table-column label="入库时间" prop="finishAt">
                              

                            </el-table-column>
                            

                            <el-table-column label="移动单号" prop="mobileTicket">
                            
                            </el-table-column>
                            <el-table-column label="移动方向" prop="direction">
                            
                            </el-table-column>
                            
          </el-table>
        </template>
      </el-table-column>
      <!--库位号托数表格-->

      <el-table-column prop="name" label="库位号" width="180"></el-table-column>
      <el-table-column prop="trayNum" label="托数"></el-table-column>
      <!--添加删除
                <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
                    <template slot-scope="{row}">
                    <el-button type="primary" size="mini">
                        Edit
                    </el-button>
                    <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
                        Delete
                    </el-button>
                    </template>
                    
      </el-table-column>-->
    </el-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      i: 0,
      storageNum: "",
      propsData: [[{
          Num: "",
          serial: "",
          name: "",
          count: "",
          finishAt: "",
          mobileTicket: "",
          direction: ""
        },]
        
      ],
      storageLocationData: [
        {
          name: "",
          trayNum: ""
        }
      ]
    };
  },

  mounted: function() {
    let that = this;

    axios({
      method: "GET",
      url: "api/api/v1/location",
      headers: {
        authorization: "Bearer " + that.$store.state.token
      }
    })
      .then(function(response) {
        that.storageLocationData = response.data; //库位号以及托数
      })
      .catch(function(error) {
        console.log(error);
        if (error == "Error: Request failed with status code 401")
          that.$router.push({ path: "/" });
      });
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleFilter() {
      console.log("filter");
    },
    handleCreate() {
      console.log("create");
    },
    handleUpdate(row) {
      let that = this;
      var index=row.index; 
      axios({
        method: "GET",
        url: "api/api/v1/location/" + row.id,
        headers: {
          authorization: "Bearer " + that.$store.state.token
        }
      })
        .then(function(response) {
        that.$set(that.propsData,index,[{Num:"托index",serial:''}]);
      for(var i=1;i<=row.trayNum;i=i+1){
               // console.log(row.trayNum);
                that.$set(that.propsData[index],i-1,{ Num:"托"+i});
            for(var j=0;j<response.data.packs.length;j=j+1){
             
              if(response.data.packs[j].items==''){
                  that.$set(that.propsData[index],j,{ 
                  Num:"托"+j,
                  serial:response.data.packs[j].serial,
                  count:response.data.packs[j].count,
                  finishAt:that.changeDate(response.data.packs[j].entry.finishAt),
                  mobileTicket:response.data.packs[j].entry.mobileTicket,
                  direction:response.data.packs[j].entry.direction,
                  name:''
              });
              } else{
                  that.$set(that.propsData[index],j,{ 
                  Num:"托"+j,
                  serial:response.data.packs[j].serial,
                  count:response.data.packs[j].count,
                  finishAt:that.changeDate(response.data.packs[j].entry.finishAt),
                  mobileTicket:response.data.packs[j].entry.mobileTicket,
                  direction:response.data.packs[j].entry.direction,
                  name:response.data.packs[j].items[0].name
              });
              }
                

                //console.log("名字为空");
            
            
            
           // that.propsData[index][i].serial=response.data.packs[i].serial;
              //console.log("yyy"+that.propsData[index][i].serial);
              //console.log(i);
        }

      }
          
          //that.propsData[index] = response.data.packs;
         // that.propsData[index].finishAt=response.data.packs.entry;
        // console.log(that.propsData[index]);
          
        // console.log(that.propsData[index]);
        })
        .catch(function(error) {
          alert(error);
          if (error == "Error: Request failed with status code 401")
            that.$router.push({ path: "/" });
        });
    },
    tableRowClassName ({row, rowIndex}) {
       //获取每行索引
        row.index = rowIndex;
    },
   
  }
};
</script>
<style>
.app-container {
  display: flex;
  margin-top: 30px;
  margin-left: 80px;
  margin-right: 80px;
  flex-direction: column;
}
</style>


