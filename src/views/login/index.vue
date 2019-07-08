<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" ></svg-icon>
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
                        <svg-icon icon-class="password" ></svg-icon>
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
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

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
                 console.log(that.$store.state.token);  
                

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
    width: 30px;
    display: inline-block;
  }

  
  .title-container {
    position: relative;

   
  }
   .title {
      font-size: 26px;
    
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

  .show-pwd {
    position: absolute;
    right:-5px;
    top: 7px;
    font-size: 16px;
 
    cursor: pointer;
    user-select: none;
  }

.el-input{
   
    
    display: inline-block;
    height: 47px;
    width: 85%;
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
     
      height: 47px;
     

}
  .el-form-item {
    
   
    border-radius: 5px;
   
  }

</style>
