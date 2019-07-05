<template>
    <div class="StockItems">
        <form>
  <input type="file" name="fileup" id="uploadEventFile" v-on:change="fileChange($event)" style="display:none" />
</form>
<button v-on:click="importData($event)" class="imptbtn">导入excel</button>
<!--<button v-on:click="download()" class="imptbtn">下载</button>-->
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
       importData(event){
           console.log('上传excel')
       } 
    
    }
}
</script>
<style>

</style>


