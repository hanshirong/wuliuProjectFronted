<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container">
                     <img src="/static/images/user.png"/>
                </span>
                <el-input 
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"

                    >
                    
                    </el-input>
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <img src="/static/images/password.png"/>
                       
                    </span>
                    <el-input 
                        :key="passwordType"
                        ref="password" 
                        v-model="loginForm.password" 
                        :type="passwordType"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip=false"
                        @keyup.enter.native="handleLogin"
                        ></el-input>
                    <span class="show-pwd" @click="showPwd" >
                         <img v-if="passwordType === 'password' " src="/static/images/eye.png"/>
                         <img v-if="passwordType != 'password' " src="/static/images/eye-open.png"/>
                       
                    </span>
                </el-form-item>
            </el-tooltip>
            <el-button :loading="loading" type="primary" style="width:95%;margin-top:30px;font-size:32px;margin-left:10px;" @click.native.prevent="handleLogin">Login</el-button>

        </el-form>
    </div>
</template>
<script>
import axios from "axios"
  export default {
    data() {
        const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
            callback(new Error('The password can not be less than 6 digits'))
        } else {
            callback()
        }
        }
      return {
        loginForm: {
          username:'',
          password:''
        },
        loginRules: {
            username: [{ required: true, message:'请输入您的用户名', trigger: 'blur',  }],
            password: [{ required: true,  trigger: 'blur', validator: validatePassword }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    
    mounted() {
        if (this.loginForm.username === '') {
        this.$refs.username.focus()
        } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
        }
    },
  
    methods: {
        checkCapslock({ shiftKey, key } = {}) {
        if (key && key.length === 1) {
            if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
            this.capsTooltip = true
            } else {
            this.capsTooltip = false
            }
        }
        if (key === 'CapsLock' && this.capsTooltip === true) {
            this.capsTooltip = false
        }
        },
        showPwd() {
        if (this.passwordType === 'password') {
            this.passwordType = ''
        } else {
            this.passwordType = 'password'
        }
        this.$nextTick(() => {
            this.$refs.password.focus()
        })
        },
        handleLogin() {
           

            let that = this;
            axios({
            method: "POST",
            url: "api/api/v1/auth/signin",
            data: {
                username: that.loginForm.username,
                password: that.loginForm.password
            }
            })
            .then(function(response) {
               
                that.$store.dispatch("getNewToken",response.data.token); 
                 axios({
                        method: "GET",
                        url: "api/api/v1/auth/me",
                        headers:{
                            authorization: "Bearer "+ that.$store.state.token
                        },
                        
                    })
                    .then(function(response) {
                         that.$store.dispatch("getNewAdmin",response.data.role); 
                        console.log(that.$store.state.admin)
                         if(that.$store.state.admin =='1')
                             that.$router.push({ path: "/location" });
                        else if(that.$store.state.admin =='2')
                             that.$router.push({ path: "/entry" });
                         else if(that.$store.state.admin =='3')
                             that.$router.push({ path: "/entry" });   
                        //console.log(response);
                    // that.propsData.entryAt=response.data.entryAt;//库位号以及托数
                        
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                

            })
            .catch(function(error) {
                console.log(error);
                alert(error);
            });
      
            }

        },
    }
  
</script>


<style >


.login-container {
 
  min-height: 100vh;
  width: 100%;
 
  overflow: hidden;

}

 .login-form {
    
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
   

  }

   .svg-container {
    position: relative;
    padding: 6px 5px 6px 15px;
  
    vertical-align: middle;
    width: 40px;
    display: inline-block;
  }

  
  .title-container {
    position: relative;

   
  }
   .title {
      font-size: 36px;
    
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

  .show-pwd {
    position: absolute;

    font-size: 32px;
    
    right:-32px;
    cursor: pointer;
    user-select: none;
  }

.el-input{
   
   
    border-radius: 10px;
    display: inline-block;
    height: 100%;
    width: 85%;
}
.el-input--small .el-input__inner {
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    border-radius: 10px;
}





</style>




<style >




/* reset element-ui css */

  



input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
     
      height: 80px;
     
     

}
  .el-form-item {
    
   
    border-radius: 5px;
   
  }

</style>
