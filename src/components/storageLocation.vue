<template>
    <div class="app-container">
        
        <div class="table-container">
             <el-input v-model="listQuery.number" placeholder="number" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
             <el-input v-model="listQuery.num" placeholder="num" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
             <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                Search
             </el-button>
             <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
                Add
             </el-button>
        </div>
       
        
        <el-table
            :data="storageLocationData"
            border
            style="width: 100%">
        
             <el-table-column type="expand"  >
                <el-table
                    :data="propsData"
                    border
                    style="width: 100%">
         
                        <el-table-column label="托数" prop="storageNum" >
                           
                        </el-table-column>
                        <el-table-column label="物料编号" prop="stockNumber">
                            
                        </el-table-column>
                        <el-table-column label="物品名称" prop="stockName" >
                           
                        </el-table-column>
                        <el-table-column label="核定数" prop="stockNum">
                            
                        </el-table-column>
                        <el-table-column label="入库时间" prop="date">
                           
                        </el-table-column>
                        <el-table-column label="移动单号" prop="moveNumber">
                           
                        </el-table-column>
                        <el-table-column label="移动方向" prop="moveDirection">
                           
                        </el-table-column>
                        
                </el-table>
                
             </el-table-column>
            <el-table-column
                prop="storageLocationNumber"
                label="库位号"
                width="180" >
            </el-table-column>
            <el-table-column
                prop="storageLocationNum"
                label="托数">
            
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
           
            activeNames: ['1'],
            listQuery:{
               number:undefined,
               num:undefined 
            },
            propsData:[{
                storageNum:'1',
                stockNumber:'001',
                stockName:'螺丝刀',
                stockNum:'20',
                date:'2019-07-01',
                moveNumber:'9988778822666',
                moveDirection:'杭州->上海'
            },
            {
                storageNum:'2',
                stockNumber:'002',
                stockName:'螺丝刀',
                stockNum:'20',
                date:'2019-07-01',
                moveNumber:'9988778822666',
                moveDirection:'杭州->上海'
            },],
            storageLocationData: [{
                storageLocationNumber:'A1-1',
                storageLocationNum:'2',
                storageNum:'1',
                stockNumber:'001',
                stockName:'螺丝刀',
                stockNum:'20',
                date:'2019-07-01',
                moveNumber:'9988778822666',
                moveDirection:'杭州->上海'
            },{
                storageLocationNumber:'A1-2',
                storageLocationNum:'2',
                storageNum:'1',
                stockNumber:'001',
                stockName:'螺丝刀',
                stockNum:'20',
                date:'2019-07-01',
                moveNumber:'9988778822666',
                moveDirection:'杭州->上海'
            },{
                storageLocationNumber:'A1-3',
                storageLocationNum:'2'
            },{
                storageLocationNumber:'A2-1',
                storageLocationNum:'2'
            }]
        }
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
    }
}
</script>
<style>

</style>


