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
                    prop="moveNumber"
                    label="移动单号号"
                    width="180" >
            </el-table-column>
            <el-table-column
                    prop="moveDirection"
                    label="移动方向">
            </el-table-column>
            <el-table-column
                    prop="moveDate"
                    label="移动时间">            
            </el-table-column>
            <el-table-column
                    prop="carNumber"
                    label="车次号">          
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
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
export default {
    data(){
        return{
            moveNumber:'',
            startDate:'',
            endDate:'',
            stocksBatch:[{
                moveNumber:'1p-yk-1999-0010',
                moveDirection:'上海->杭州',
                moveDate:'2019-07-05',
                carNumber:'1',
                status:'运输中'
            },{
                moveNumber:'1p-yk-1999-0011',
                moveDirection:'上海->杭州',
                moveDate:'2019-07-05',
                carNumber:'2',
                status:'未开始'
            },],
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
    methods:{
        addStockbatch(){
           console.log("跳转到addLibrary.vue");
            
        }
    }
    
}
</script>
<style>

</style>

