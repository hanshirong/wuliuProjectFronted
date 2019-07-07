<template>
<div>
    <!--
   <form
            name="imgForm"
            id="imgForm"
            enctype="multipart/form-data"
            action="图片上传接口"
            method="post"
          >
            <input
              class="input-loc-img"
              name="imgLocal"
              id="imgLocal"
              type="file"
              accept="/*"
              @change="importData"
            >
          </form>-->
<!--<button v-on:click="download()" class="imptbtn">下载</button>-->
// 导入

<a href="javascript:;" class="file">导入表格
   <input id="upload" type="file" @change="importfxx(this)"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
</a>


            
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        /*
      importData(e){
      e.preventDefault();
      let that = this;
        console.log(e);
        
      let imgFile = e.target.files[0]; //取到上传的图片
      let formData = new FormData(); //通过formdata上传
      formData.append("avatar", imgFile);
      axios({
        method: "POST",
        url: "/api/book/" + that.bookid + "/img",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(function(res) {
          console.log(res.data);
          if (res.data == "Created") {
            that.$router.push({ path: "/" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
        */
       importfxx(obj) {
                let _this = this;
                let inputDOM = this.$refs.inputer;
                // 通过DOM取文件数据
                this.file = event.currentTarget.files[0];
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        this.da = [...outdata]
                        let arr = []
                        this.da.map(v => {
                            let obj = {}
                            

                            arr.push(obj)
                        })
                        console.log(arr)
                        let para = {
                            //withList: JSON.stringify(this.da)
                            withList: arr
                        }
                        _this.$message({
                            message: '请耐心等待导入成功',
                            type: 'success'
                        });
                        withImport(para).then(res => {
                            window.location.reload()
                        })
                        
                    }
                    reader.readAsArrayBuffer(f);
                }
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },
    }
    
    }

</script>
<style>

</style>


