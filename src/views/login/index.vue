<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user" />
                </span>
                <el-input 
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    ></el-input>
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <svg-icon icon-class="password" />
                    </span>
                    <el-input 
                        :key="passwordType"
                        ref="password" 
                        v-model="loginForm.password" 
                        :type="passwordType"
                        placeholder="Password"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip=false"
                        @keyup.enter.native="handleLogin"
                        ></el-input>
                    <span class="show-pwd" @click="showPwd">
                        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                </el-form-item>
            </el-tooltip>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

        </el-form>
    </div>
</template>
<script>
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
    watch: {
        $route: {
        handler: function(route) {
            const query = route.query
            if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
            }
        },
        immediate: true
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
        this.$refs.loginForm.validate(valid => {
            if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm)
                .then(() => {
                this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                this.loading = false
                })
                .catch(() => {
                this.loading = false
                })
            } else {
            console.log('error submit!!')
            return false
            }
        })
        },
        getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
            if (cur !== 'redirect') {
            acc[cur] = query[cur]
            }
            return acc
        }, {})
        }
    }
    
    }
</script>

