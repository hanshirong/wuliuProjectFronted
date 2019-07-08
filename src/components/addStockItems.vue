<template>
<div>
    
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
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              @change="importData"
            >
          </form>
<!--<button v-on:click="download()" class="imptbtn">下载</button>-->



            
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{

        }
    },
    methods:{
       
      importData(e){
      e.preventDefault();
      let that = this;
      console.log(e);
        
      let imgFile = e.target.files[0]; //取到上传的图片
      let formData = new FormData(); //通过formdata上传
      formData.append("items", imgFile);
      axios({
        method: "POST",
        url: "api/api/v1/entry/" + '5d1c1acb510cbf6c7c7e0818'+'/items',
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
           authorization: "Bearer "+ that.$store.state.token
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
        })      
      
    }
    
    },
}

</script>
<style>

</style>


