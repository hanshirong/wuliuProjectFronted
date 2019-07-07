<template>
    <div class="app-container">
        <p>时间: {{nowTime}}</p>
        <p>移动单号：{{moveNumber}}</p>
        <p>移动方向：{{moveDirection}} </p>
        <p>创建时间: {{createDate}} </p>
        <div class="driverTable">
            <el-table
                :data="driverData"
                border style="width: 100%">
                <el-table-column 
                    prop="carNumber"
                    label="车次号"
                    width="180" >
                </el-table-column>
                <el-table-column 
                        prop="totalLoad"
                        label="入货总托数"
                        width="180" >
                </el-table-column>
                <el-table-column 
                        prop="carType"
                        label="车型"
                        width="180" >
                </el-table-column>
                <el-table-column 
                        prop="carLicense"
                        label="车牌号"
                        width="180" >
                </el-table-column>
            </el-table>
        </div>
        <div class="storeClerkTable">
            <el-table
                :data="storeClerkData"
                border width="100%">
               <el-table-column 
                        prop="startTime"
                        label="卸货开始时间"
                        width="180" >
                </el-table-column>
                <el-table-column 
                        prop="endTime"
                        label="卸货完成时间"
                        width="180" >
                </el-table-column>
            </el-table>
        </div>
        <div class="stocks">
           <!-- <p @click="addstocks">入库条目</p>-->
            <el-table
                :data="stocksData"
                border width="100%">
                <el-table-column 
                        prop="serial"
                        label="物料编号"
                        width="100" >
                </el-table-column>
                <el-table-column 
                        prop="name"
                        label="物料名称"
                        width="150" >
                </el-table-column>
                <el-table-column 
                        prop="ticket"
                        label="现品票号"
                        width="100" >
                </el-table-column>
                <el-table-column 
                        prop="count"
                        label="数量"
                        width="50" >
                </el-table-column>
                <el-table-column 
                        prop="location"
                        label="库位号"
                        width="80" >
                </el-table-column>
                <el-table-column 
                        prop="trayIndex"
                        label="托号"
                        width="50" >
                </el-table-column>
                <el-table-column 
                        prop="problems"
                        label="问题"
                        width="180" >
                </el-table-column>
                <el-button>编辑</el-button>
                <el-button>删除</el-button>
            </el-table>

        </div>

    </div>

</template>

<script>
export default {
    data(){
        return{
            nowTime:'',
            moveNumber:'',
            moveDirection:'',
            createDate:'',
            driverData:[{
                carNumber:'',
                totalLoad:'',
                carType:'',
                carLicense:''
            }],
            storeClerkData:[{
                startTime:'',
                endTime:''
            }],
            stocksData:[{
                serial:'24096438',
                name:'SIC-62FV-F245-5',
                ticket:'119096141-00',
                count:'210',
                trayIndex:'null',
                location:'null',
                problems:'null',
            }]
        }
    },
    methods:{
        addStocks(){
            console.log("添加入库条目")
        }
    }

}
</script>
<style>

</style>


