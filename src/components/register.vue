<template>
  <div id="register">
    <el-row :gutter="20">
      <el-col :span="7" :offset="8">
        <div class="grid-content bg-purple">
          <h1 align="center">VUE注册界面</h1><br>
        </div>
      </el-col>
      <el-col :span="6" :offset="8">
        <div class="grid-content bg-purple">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px"
                   class="demo-ruleForm">
            <el-form-item label="用户类型" prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择用户类型" style="width: 100%">
                <el-option label="管理员" value="1"></el-option>
                <el-option label="普通用户" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" v-bind:disabled="res" >注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              &nbsp;&nbsp;
              <router-link to="/">返回登录</router-link>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'register',
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
    var validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else {
        callback()
      }
    }
    var validateType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择用户类型'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        username: '',
        name: '',
        age: '',
        phone: '',
        type: ''
      },
      res: false,
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        username: [
          {validator: validateAccount, trigger: 'blur'}
        ],
        age: [
          {validator: validateAge, trigger: 'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ],
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        type: [
          {validator: validateType, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果是管理员权限,先验证密码
          if (this.ruleForm.type === '1') {
            // 密码校验
            this.open3()
          } else {
            this.submitAll()
          }
        } else {
          alert('error submit')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    open3 () {
      this.$prompt('请输入权限密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '密码不正确'
      }).then(({ value }) => {
        this.checkPassword(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '验证取消'
        })
      })
    },
    checkPassword (password) {
      this.$axios({
        method: 'post',
        url: '/qmy/jwt/checkPassword',
        data: {password: password}
      }).then(res => {
        if (res.data === true) { // res是返回结果
          this.$message({
            type: 'success',
            message: '验证通过 '
          })
          this.submitAll()
        } else {
          this.$message({
            type: 'info',
            message: '验证失败'
          })
        }
      }).catch(err => { // 请求失败就会捕获报错信息
        console.log('error check')
      })
    },
    submitAll () {
      this.$axios({
        method: 'post',
        url: '/qmy/jwt',
        data: {
          'username': this.ruleForm.username,
          'password': this.ruleForm.pass,
          'age': this.ruleForm.age,
          'name': this.ruleForm.name,
          'phone': this.ruleForm.phone,
          'type': parseInt(this.ruleForm.type)
        }
      }).then(res => { // res是返回结果
        console.log(res.data)
        if (res.data === 'OK') {
          this.res = true
          this.$alert('注册成功')
        } else if (res.data === 'EXIST') {
          this.$alert('用户名已注册')
        } else {}
      }).catch(err => { // 请求失败就会捕获报错信息
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
