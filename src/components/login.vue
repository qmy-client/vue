<template>

  <div id="login" align="center">

    <el-row :gutter="20">

      <el-col :span="7" :offset="8">

        <div>
          <h1 align="center">视频云管理系统</h1><br>
        </div>
      </el-col>
      <el-col :span="6" :offset="8">
        <div>

          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
              <el-input type="text" v-model="ruleForm2.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
              <el-button type="success" @click="register">注册</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-col>
    </el-row>
    </div>

</template>

<script>

import {mapMutations} from 'vuex'

export default {
  name: 'login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        /* if (this.ruleForm2.pass !== '') {
          this.$refs.ruleForm2.validateField('pass')
        } */
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户名'))
      } else {
        /* if (this.ruleForm2.account !== '') {
           this.$refs.ruleForm2.validateField('account')
         } */
        callback()
      }
    }
    return {
      userToken: '',
      ruleForm2: {
        pass: '',
        account: '',
        show2: true
      },
      rules2: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/qmy/jwt/login',
            data: {
              'username': this.ruleForm2.account,
              'password': this.ruleForm2.pass
            },
            headers: {
              'Authorization': ' '
            }
          }).then(res => { // res是返回结果
            if (res.data.code === '401') {
              this.$alert('账号或密码错误，请重新输入')
            } else {
              console.log(res.data)
              // 将token存储到浏览器请求头
              this.userToken = 'Bearer ' + res.data.token
              this.changeLogin({Authorization: this.userToken})
              // 将用户姓名存储到localStorage(只能存储字符串信息)，以便在菜单栏top.vue中使用
              sessionStorage.setItem('userInfo', res.data.name)
              sessionStorage.setItem('userId', res.data.id)
              sessionStorage.setItem('userPicture', res.data.picture)
              sessionStorage.setItem('userType', res.data.type)
              this.$router.push('/index')
              // this.$alert('登陆成功')
              this.open7(res.data.name)
            }
          }).catch(err => { // 请求失败就会捕获报错信息
            console.log('服务正在维护，请稍后再试！')
            console.log(err)
          })
        } else {
          console.log('用户信息错误')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    register () {
      this.$router.push('/register')
    },
    open7 (data) {
      this.$notify.success({
        title: '登录提示',
        message: '欢迎：' + data + ' 使用！',
        offset: 80,
        showClose: true
      })
    }
  }
}
</script>
<!--QQ登录-->

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .form_bg {
    background: #b9d8ff;
  }
</style>
