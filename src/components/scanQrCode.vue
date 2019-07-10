<template>
  <div>
    <p class="error">{{ error }}</p>

    <el-table
      :data="scanData"
      border style="width:100%;margin:50px;"
      >
        <el-table-column
              prop="serial"
              label="物料编号"
              width="180">
      </el-table-column>
      <el-table-column
              prop="ticket"
              label="现品票号"
              width="180">
      </el-table-column>
      <el-table-column
              prop="count"
              label="数量">
      </el-table-column>

    </el-table>
    <p class="decode-result">解析后: <b>{{ parsing }}</b></p>
    <!--ADD-->
    <el-button @click="addDialog=true" v-if="this.$store.state.admin==3">ADD</el-button>
                        <el-dialog
                            title="添加"
                            :visible.sync="addDialog"
                            width="30%">
                          <el-form ref="form" :model="form"  label-width="120px">
                            <el-form-item label="物料编号" prop="serial" >
                              <el-input ref="serial" v-model="form.serial" />
                            </el-form-item>
                             <el-form-item label="现品票号" prop="ticket" >
                                <el-input ref="ticket" v-model="form.ticket" />
                              </el-form-item>
                               <el-form-item label="数量" prop="count" >
                                <el-input ref="count" v-model="form.count" />
                              </el-form-item>
                          </el-form>
                           <el-button @click="submit">确定</el-button>
                        </el-dialog>
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <button>提交</button>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import axios from 'axios'
export default {

  components: { QrcodeStream },

  data () {
    return {
      addDialog:false,
      form:{
          serial:'',
          ticket:'',
          count:''
      },
      result: '',
      parsing:{},//[{
       // serial:'',
       // ticket:'',
        //count:'',
      //}],
      error: '',
      scanData:[{
            serial:'',
        ticket:'',
        count:'',
      }],
      i:0,
      
    }
  },

  methods: {
    submit(){
      this.scanData.splice(this.i+1);
      this.scanData[this.i].ticket=this.form.ticket;
      this.scanData[this.i].serial=this.form.serial;
      this.scanData[this.i].count=this.form.count;
      
      this.i=this.i+1;
    },
    update(){
        let that = this;
   
     that.id = that.$route.params.id;

     console.log(that.id);
      axios({
        method: "POST",
        url: "api/entry/"+that.id+"/items/confirm",
        headers:{
            authorization: "Bearer "+ that.$store.state.token
        },
       
     })
     .then(function(response){
       alert("添加成功");
     })
      axios({
        method: "GET",
        url: "api/api/v1/entry/"+that.id,
        headers:{
            authorization: "Bearer "+ that.$store.state.token
        }
     })
    },
    onDecode (result) {
      this.result = result
      var strs = new Array(); //定义一数组
      strs = result.trim().split(/\s+/) //字符分割 
      
    
    // this.parsing.count=parseInt(count);
     this.scanData[this.i].ticket=strs[0]+'-'+strs[1].substring(0,2);
     this.scanData[this.i].serial=strs[1].substring(2);
     this.scanData[this.i].count=strs[2];
     this.i=this.i+1;
     
      console.log(this.i);
      
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
