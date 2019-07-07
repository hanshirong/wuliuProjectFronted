<template>
    <div class="app-container">
        <div class="table-container">
                <el-input v-model="moveNumber" placeholder="请搜索移动单号" style="width:150px;"/>
                <el-date-picker
                        v-model="dateValue"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-select v-model="statusValue" placeholder="状态" style="width:100px;">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addStockbatch()">
                    添加入库批次
                </el-button>
            </div>
        <el-table
            :data="stocksBatch"
            border style="width: 100%">
            <el-table-column 
                    prop="mobileTicket"
                    label="移动单号号"
                    width="180" >
            </el-table-column>
            <el-table-column
                    prop="direction"
                    label="移动方向">
            </el-table-column>
            <el-table-column
                    prop="datetime"
                    label="移动时间"
                    width="300">            
            </el-table-column>
            <el-table-column
                    prop="truckIndex"
                    label="车次号"
                    width="80">          
            </el-table-column>
            <el-table-column
                    prop="status "
                    label="状态"
                    width="100">
            </el-table-column>
            <el-table-column label="Actions" align="center" width="230" >
                    <template slot-scope="{row}">
                    <el-button type="primary" size="mini" @click="handleUpdate(row)">
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
import axios from 'axios'
export default {
    data(){
        return{
            moveNumber:'',
            startDate:'',
            endDate:'',
            
            stocksBatch:[{
                mobileTicket:'',
                direction:'',
                datetime:'',
                truckIndex:'',
                status:'',
            }],
            options:[{
                value:'状态1',
                label:'未开始'
            },{
                value:'状态2',
                label:'运输中'
            },{
                value:'状态3',
                label:'已到达'
            },{
                value:'状态4',
                label:'卸货中'
            },{
                value:'状态5',
                label:'已完成'
            },],
            statusValue:'',
            dateValue:''
        

        }
    },
     mounted:function(){
      let that = this;
      console.log(that.$store.state.token);
      axios({
        method: "GET",
        url: "api/api/v1/entry",
        headers:{
            authorization: "Bearer "+ that.$store.state.token
        }
     })
      .then(function(response) {
        console.log(response);
        that.stocksBatch=response.data;//库位号以及托数
      
      })
      .catch(function(error) {
        console.log(error);
      });
},
    methods:{
        
        addStockbatch(){
            let that=this;
           that.$router.push({ path: "/addLibrary" });
            
        }
    }
    
}
</script>
<style>

</style>

