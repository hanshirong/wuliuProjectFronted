<template>
    <div class="app-container">
      
       <h2>库位管理</h2>
        
        <el-table
            :data="storageLocationData"
          
            border style="width: 100%; "
            
            >
            
             <el-table-column  type="expand"  >
             <template slot-scope="row">
                 
                <el-table
                    :data="propsData"
                    
                    border
                    style="width: 100%">
          
                        <el-table-column label="托数" prop="storageNum" >
                           
                        </el-table-column>
                        <el-table-column label="物料编号" prop="serial">
                            
                        </el-table-column>
                        <el-table-column label="物品名称" prop="name" >
                           
                        </el-table-column>
                        <el-table-column label="核定数" prop="count">
                            
                        </el-table-column>
                        <el-table-column label="入库时间" prop="entryAt">
                           
                        </el-table-column>
                        <el-table-column label="移动单号" prop="mobileTicket">
                           
                        </el-table-column>
                        <el-table-column label="移动方向" prop="direction">
                           
                        </el-table-column>
                        
                </el-table>
               
             </template>
            </el-table-column>
            <!--库位号托数表格-->
            <el-table-column
                prop="name"
                label="库位号"
                width="180" >
            </el-table-column>
            <el-table-column
                prop="trayNum"
                label="托数">
            
            </el-table-column>
            <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                <el-button type="primary" size="mini">
                    Edit
                </el-button>
                <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
                    Delete
                </el-button>
                </template>
                
            </el-table-column>
        </el-table>
       
    </div>
</template>
<script>
import axios from "axios";

export default {
    data(){
        return{
           
            
            storageNum:'',
            propsData:[{
                storageNum:'',
                serial:'',
                name:'',
                count:'',
                entryAt:'',
                mobileTicket:'',
                direction:'',
                
            },],
            storageLocationData: [{
                name:'',
                trayNum:'',  
            }]
        }
    },
    
    mounted:function(){
      let that = this;
      console.log(that.$store.state.token);
      axios({
        method: "GET",
        url: "api/api/v1/location",
        headers:{
            authorization: "Bearer "+ that.$store.state.token
        }
     })
      .then(function(response) {
        console.log(response.data);
        that.storageLocationData=response.data;//库位号以及托数
        
      })
      .catch(function(error) {
        console.log(error);
      });
},
    methods:{
        handleChange(val) {
        console.log(val);
      },
        handleFilter() {
        console.log('filter');
      },
      handleCreate() {
       console.log('create');
    },
    handleUpdate(row){
         let that = this;
         console.log(row);
        
         for (var i = 0; i<row.trayNum; i=i+1) { 
               that.propsData[i]=i+1;
              
               
            }
        
            
        
        
         axios({
            method: "GET",
            url: "api/api/v1/location/"+that.storageLocationData[row].id,
            headers:{
                authorization: "Bearer "+ that.$store.state.token
            },
            
         })
      .then(function(response) {
        console.log(response);
        if(response.data.trays !=null){
            that.propsData=response.data.trays.items;
        }
            
       
      })
      .catch(function(error) {
        //console.log(error.message);
        alert(error);
        if(error==="Error: Request failed with status code 401")
           that.$router.push({ path: "/" });
        

      });
    }
    }
}
</script>
<style>
.app-container{
    display: flex;
    margin-top:30px;
    margin-left:80px;
    margin-right: 80px;
    flex-direction: column;

}
.el-table{
    
}
.el-table-column{
   
}
</style>


