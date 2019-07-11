<template>
    <div class="header">
        <div class="name">仓储系统</div>
        <div class="home" @click="Login()"> <img src="/static/images/home.png" /></div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        Login(){
            this.$router.push({ path: "/" });
        }
        
}
}

</script>
<style>
.header{
    display: flex;
  flex-flow:  row nowrap;
  justify-content: space-between;
  height: 40px;
  
}

</style>


