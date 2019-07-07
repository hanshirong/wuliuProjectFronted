<template>
  <div class="app-container" style="padding-right:280px;padding-left:280px;padding-top:50px;">
    
    <div style="padding:30px;background-color: #e5f2ff;border-radius:10px">
  
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
       <el-form-item label="添加入库批次">
       
      </el-form-item>

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
  
    </div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  data() {
    return {
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
      }

    };
  },
  mounted(){
        if (this.form.truckIndex === ''){
            this.$refs.truckIndex.focus()
        } else if(this.form.datetime === ''){
            this.$refs.datetime.focus()
        } else if(this.form.mobileTicket === ''){
            this.$refs.mobileTicket.focus()
        } else if(this.form.direction === ''){
            this.$refs.direction.focus()
        } 
    },

  methods: {
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
               console.log(response);
                //that.$store.dispatch("getNewToken",response.data.token); 
                 //console.log(that.$store.state.token);      
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    onCancel() {
        this.$router.go(-1);
      
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

