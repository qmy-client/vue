<template>
  <div>
    <el-dialog title="密码修改" :visible.sync="dialogFormVisible" width="20%"
               :show-close="closeModel" :close-on-click-modal="closeOnClick"
               :close-on-press-escape="closeEscape"
    >
      <div v-show="resultMessage"><el-alert
        title="密码修改成功！"
        type="success"
        show-icon>
      </el-alert>
      </div>
      <div v-show="errorMessage">
        <el-alert
          title="密码修改失败！请确认输入是否正确？"
          type="error"
          show-icon>
        </el-alert>
      </div>
      <el-form :model="changePass" :rules="rules2" ref="passForm"><!--ref相当于表单名称-->
        <el-form-item label="原密码" prop="oldPass">
          <el-input v-model="changePass.oldPass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="changePass.newPass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPass2">
          <el-input v-model="changePass.newPass2" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm('passForm')">确 认</el-button>
        <el-button type="primary" @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'changePassword',

  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.changePass.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      changePass: {
        oldPass: '',
        id: 0,
        newPass: '',
        newPass2: ''
      },
      closeModel: false,
      closeOnClick: false,
      closeEscape: false,
      resultMessage: false,
      errorMessage: false,
      rules2: {
        oldPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        newPass2: [
          { validator: validatePass3, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.changePass.id = sessionStorage.getItem('userId')
          this.$axios({
            method: 'post',
            url: '/user/changePassword',
            data: this.changePass
          }).then(res => { // res是返回结果
            if (res.data === 501) {
              this.errorMessage = true
            } else {
              this.resultMessage = true
            }
          }).catch(err => { // 请求失败就会捕获报错信息
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () {
      this.dialogFormVisible = false
      this.$router.go(-1)
    }

  },
  mounted: function () {
    this.dialogFormVisible = true
  }

}
</script>

<style scoped>

</style>
