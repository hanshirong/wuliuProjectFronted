<template>
    <div class="app-container">
        <div class="search-container" v-if="this.$store.state.admin==2">
            <!--搜索-->
                <el-input v-model="moveNumber" placeholder="请输入移动单号"  style="width:150px;size:6px"/>
                <el-date-picker
                        v-model="dateValue"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-select v-model="statusValue"  style="width:100px;" @change="searchStatus">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        
                        >
                    </el-option>
                </el-select>

                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="dialogFormVisible =true">
                    添加入库批次
                </el-button>
                <el-dialog title="添加入库批次" :visible.sync="dialogFormVisible">
                    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
                       

                        <el-form-item label="车次号" prop="truckIndex" >
                            <el-input ref="truckIndex" v-model="form.truckIndex" />
                        </el-form-item>

                        <el-form-item label="移动时间" prop="datetime">
                            <el-col :span="11">
                            <el-date-picker
                                ref="date"
                                v-model="form.datetime"
                                type="date"
                                placeholder="date"
                                style="width: 100%;"
                            />
                            </el-col>
                            <el-col :span="2" class="line">-</el-col>
                        </el-form-item>

                        <el-form-item label="移动单号" prop="mobileTicket">
                            <el-input ref="mobileTicket" v-model="form.mobileTicket" />
                        </el-form-item>

                        <el-form-item label="移动方向" prop="direction">
                            <el-input ref="direction" v-model="form.direction" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">确定</el-button>
                            <el-button @click="onCancel">取消</el-button>
                        </el-form-item>
                </el-form>

                </el-dialog>
            </div>
        <div class="search-container" v-if="this.$store.state.admin==3" style="text-align:right;margin-right:20px;" @click="searchFormVisible =true">搜索<img src="/static/images/search.png">
        </div>   
            <el-dialog title="搜索入库批次" :visible.sync="searchFormVisible" style="text-align:center">
               <el-form>
                   <el-input v-model="moveNumber" placeholder="请输入移动单号"  style="width:150px;size:6px"/>
                    <el-date-picker
                            v-model="dateValue"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
               </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="searchFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="searchFormVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            
        
        <el-table
            :data="stocksBatch"
            @row-click="stockTable"
            border style="width: 100%">
            <template slot-scope="row">
                {{row.$index}}
            <el-table-column 
                    prop="mobileTicket"
                    label="移动单号号"
                    width="160" >
            </el-table-column>
            <el-table-column
                    prop="direction"
                    label="移动方向"
                    width="160"
                    >
            </el-table-column>
            <el-table-column
                    prop="datetime"
                    label="移动时间"
                    width="180">            
            </el-table-column>
            <el-table-column
                    prop="truckIndex"
                    label="车次号"
                    width="60">          
            </el-table-column>
            <el-table-column
                    prop="status"
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
            </template>
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
            searchFormVisible:false,
            dialogFormVisible:false,
            form: {
                truckIndex: "",
                datetime: "",
                mobileTicket: "",
                direction: ""
            },

            formRules:{
                truckIndex:[{required: true, trigger: 'blur',message:'车次号不能为空'}],
                datetime:[{required: true, trigger: 'blur',message:'请您填写移动日期'}],
                mobileTicket:[{required: true, trigger: 'blur',message:'移动单号不能为空'}],
                direction:[{required: true, trigger: 'blur',message:'请填写移动方向'}],
            },
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
        for(var i=0;i<that.stocksBatch.length;i++){
            if(that.stocksBatch[i].status ==1)
                that.stocksBatch[i].status="未开始"
            else if(that.stocksBatch[i].status ==2)
                that.stocksBatch[i].status="运输中"
            else if(that.stocksBatch[i].status ==3)
                that.stocksBatch[i].status="已到达"
            else if(that.stocksBatch[i].status ==4)
                that.stocksBatch[i].status="卸货中"
            else if(that.stocksBatch[i].status ==5)
                that.stocksBatch[i].status="入库完成"


        }

      
      })
      .catch(function(error) {
        console.log(error);
        alert(error);
       if(error == "Error: Request failed with status code 401"){
           that.$router.push({ path: "/" });
       }

      });
},
    methods:{
        stockTable(row){
            this.$router.push({ path: "/items/"+row.id });
        },
        
       
         onSubmit() {
            let that=this;
      
            axios({
            method: "POST",
            url: "api/api/v1/entry",
            headers:{
            authorization: "Bearer "+ that.$store.state.token
            },
            data: {
                mobileTicket:that.form.mobileTicket,
                direction:that.form.direction,
                datetime:that.form.datetime,
                truckIndex:that.form.truckIndex,
                
            }
            })
            .then(function(response) {
               alert("添加成功");
               that.form='';
               
               
            })
            .catch(function(error) {
                alert("添加失败");
                if(error==="Error: Request failed with status code 401")
                    that.$router.push({ path: "/" });
                
            });
    },
    onCancel() {
        this.dialogFormVisible=false
      
    },
    searchStatus(e){
        let that = this;
        
        if(e=="状态1")
            that.status=1;
        else  if(e=="状态2")
            that.status=2;
        else  if(e=="状态3")
            that.status=3;
        else  if(e=="状态4")
            that.status=4;
        else  if(e=="状态5")
            that.status=5;
     
      axios({
        method: "GET",
        url: "api/api/v1/entry/?status="+that.status,
        headers:{
            authorization: "Bearer "+ that.$store.state.token
        }
     })
     .then(function(response){
        that.stocksBatch=response.data;//库位号以及托数
        for(var i=0;i<that.stocksBatch.length;i++){
            if(that.stocksBatch[i].status ==1)
                that.stocksBatch[i].status="未开始"
            else if(that.stocksBatch[i].status ==2)
                that.stocksBatch[i].status="运输中"
            else if(that.stocksBatch[i].status ==3)
                that.stocksBatch[i].status="已到达"
            else if(that.stocksBatch[i].status ==4)
                that.stocksBatch[i].status="卸货中"
            else if(that.stocksBatch[i].status ==5)
                that.stocksBatch[i].status="入库完成"
        }
     })

     .catch(function(error){
        alert(error);
         if(error==="Error: Request failed with status code 401")
           that.$router.push({ path: "/" });
     })

    }
    }
    
}
</script>
<style>
.el-input--small .el-input__inner {
    height: 30px;
    line-height: 30px;
    font-size: 8px;
    border-radius: 10px;
}
</style>

