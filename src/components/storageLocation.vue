<template>
  <div class="app-container" >
     <myheader></myheader>
     <h2>库位管理</h2>
     <el-button @click="addDialog=true">新增库位</el-button>
        <el-dialog title="新增库位" :visible.sync="addDialog" >
            <el-form :model="form">
                <el-form-item label="库位号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="托数">
                    <el-input v-model="form.trayNum"></el-input>
                </el-form-item>   
          </el-form>
          <el-button @click="cancel" style="cursor:pointer">取消</el-button>
          <el-button type="primary" @click="onSubmit" style="cursor:pointer">确定</el-button>
        </el-dialog>
    <el-table :data="storageLocationData" @expand-change="handleUpdate"  style="cursor:pointer " :row-class-name="tableRowClassName" row-key="id" :expand-row-keys="expands" @row-click="rowClick">
      <!--展开-->
      <el-table-column type="expand">
        <template slot-scope="row">
                    <el-table
                        :data="propsData[row.$index]"
                        border
                        style="width: 100%" >
            
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
      <!--添加删除-->
                <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width" >
                    <template slot-scope="props">
                     
                     <el-button  size="mini" type="primary" @click.stop="editStatus(props.$index,props.row.id)" >Edit </el-button>
                     <el-dialog title="修改库位" :visible.sync="editDialog" >
                     <el-form>
                       <el-form-item>
                         库位号:<el-input v-model="storageLocationData[editIndex].name"></el-input>
                       </el-form-item>
                       <el-form-item>
                         托数:<el-input v-model="storageLocationData[editIndex].trayNum"></el-input>
                       </el-form-item>
                              
                     </el-form>

                      <el-button type="primary" @click.stop="edit(storageLocationData[editIndex].name,storageLocationData[editIndex].trayNum,editId)" style="cursor:pointer">确定</el-button>
                      <el-button @click.stop="cancel" style="cursor:pointer">取消</el-button>
                    </el-dialog>
                    
                    <el-button  size="mini" type="danger" @click.stop="deleteStatus(props.row.id)">
                        Delete
                    </el-button>
                    <el-dialog title="删除库位" :visible.sync="deleteDialog">
                      
                      <el-button @click.stop="cancel" style="cursor:pointer">取消</el-button>
                      <el-button type="primary" @click.stop="deletes(deleteId)" style="cursor:pointer">确定</el-button>
                    </el-dialog>
                    </template>
                    
      </el-table-column>
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
      rowIndexs:1,
      rowIndex:0,
      index:0,
      editIndex:0,
      editId:0,
      addDialog:false,
      editDialog:false,
      deleteDialog:false,
      deleteId:0,
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
      ],
      form:{},
      expands:[]
    };
  },

  mounted: function() {
    let that = this;
    that.locations();
   
  },
  methods: {
   
    handleUpdate(row) {
      
      let that = this;
    
      var index=row.index; 
     
      axios({
        method: "GET",
        url: "/api/v1/location/" + row.id,
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
                

        }

      }
        
        })
        .catch(function(error) {
       
          if (error == "Error: Request failed with status code 401")
            that.$router.push({ path: "/" });
        });
    },
    tableRowClassName ({row, rowIndex}) {
       //获取每行索引
        row.index = rowIndex;
       
    },
   
    deletes(id){
      
      let that=this;
       axios({
        method: "DELETE",
        url: "/api/v1/location/"+id,
        headers: {
          authorization: "Bearer " + that.$store.state.token
        },
       
      })
       .then(function(response) {
         
          that.$ftoast({
            text: '删除成功',
            
            textColor: 'black',
            toastBackground: '#66ff99'
          })
          that.form={};
          that.locations();
          that.deleteDialog=false;
        })
        .catch(function(error) {
          that.$ftoast({
            text: '添加失败',
            
            textColor: 'black',
            toastBackground: '#ff0000'
          })
          if (error == "Error: Request failed with status code 401")
            that.$router.push({ path: "/" });
        });
    },
    locations(){
      var that=this;
       axios({
      method: "GET",
      url: "/api/v1/location",
      headers: {
        authorization: "Bearer " + that.$store.state.token
      }
    })
      .then(function(response) {
        console.log(response.data.length);
        that.storageLocationData = response.data; //库位号以及托数
      })
      .catch(function(error) {
        console.log(error);
        if (error == "Error: Request failed with status code 401")
          that.$router.push({ path: "/" });
      });
    },
    onSubmit(){
      let that=this;
       axios({
        method: "POST",
        url: "/api/v1/location",
        headers: {
          authorization: "Bearer " + that.$store.state.token
        },
        data:{
          name:that.form.name,
          trayNum:that.form.trayNum
        }
      })
       .then(function(response) {
         console.log(response);
          that.$ftoast({
            text: '添加成功',
            
            textColor: 'black',
            toastBackground: 'rgba(255, 255, 255, 1)'
          })
          that.form={};
          that.locations();
          that.addDialog=false;
        })
        .catch(function(error) {
           that.$ftoast({
            text: '添加失败',   
            textColor: 'black',
            toastBackground: '#ff0000'
          })
          if (error == "Error: Request failed with status code 401")
            that.$router.push({ path: "/" });
        });
    },
    cancel(){
        this.form='',
        this.addDialog=false;
        this.deleteDialog=false;
        this.editDialog=false;
    },
    edit(name,trayNum,id){
        var that=this;
        this.editDialog=true;
        console.log(name);
        console.log(trayNum);
        
         axios({
        method: "PUT",
        url: "/api/v1/location/"+id,
        headers: {
          authorization: "Bearer " + that.$store.state.token
        },
        data:{
          name:name,
          trayNum:trayNum
        }
      })
       .then(function(response) {
         console.log(response);
          that.$ftoast({
            text: '修改成功',
            
            textColor: 'black',
            toastBackground: '#ff0000'
          })
          
          that.locations();
          that.editDialog=false;
        })
        .catch(function(error) {
           that.$ftoast({
            text: '修改失败',
            
            textColor: 'black',
            toastBackground: '#ee0000'
          })
          if (error == "Error: Request failed with status code 401")
            that.$router.push({ path: "/" });
        });
        
  

      },
    editStatus(e,id){
        this.editDialog=true;
        this.editIndex=e;
        this.editId=id;
      },
    deleteStatus(id){
       this.deleteDialog=true;
        this.deleteId=id;
    },
    rowClick(row, event, column) {
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
 
                if (this.expands.indexOf(row.id) < 0) {
                    this.expands.push(row.id);
                } else {
                    this.expands.remove(row.id);
                }
                //console.log(row);
                this.handleUpdate(row);
 
        }
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


