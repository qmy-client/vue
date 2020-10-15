<template>
  <div>

    <el-dialog :visible.sync="dialogFormVisible" title="个人信息" width="30%"
               status-icon :show-close="closeModel" :close-on-click-modal="closeOnClick"
               :close-on-press-escape="closeEscape">
      <div v-show="resultMessage">
        <el-alert
          title="更新成功！"
          type="success"
          show-icon>
        </el-alert>
      </div>
      <div v-show="errorMessage">
        <el-alert
          title="信息提交失败！"
          type="error"
          show-icon>
        </el-alert>
      </div>
      <el-upload
        class="avatar-uploader"
        action="/qmy/user/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="uploadData"
        :before-upload="beforeAvatarUpload">
        <div class="picture" align="center">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </el-upload>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules2"
               ref="userForm">
        <el-form-item label="账户名">
          <el-input v-model="formLabelAlign.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="formLabelAlign.age"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formLabelAlign.phone"></el-input>
        </el-form-item>
        <el-form-item>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submitForm('userForm')">确 认</el-button>
        <el-button type="primary" @click="cancel">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'userinfo',

  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else if (value.length > 10) {
        callback(new Error('名字长度不能大于10个字'))
      } else {
        callback()
      }
    }
    var validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      } else if (value < 18) {
        callback(new Error('必须年满18岁'))
      } else {
        callback()
      }
    }
    return {
      imageUrl: '', // 个人照片地址
      labelPosition: 'left', // 表单对齐方式
      formLabelAlign: {}, // 表单数据对象
      uploadData: {}, // 照片上传携带的数据
      dialogFormVisible: true, // 初始化模态框显示按钮
      closeModel: false, // 隐藏右上角的关闭按钮
      closeOnClick: false, // 禁止点击modal关闭模态框
      closeEscape: false, // 禁止ESC关闭模态框
      resultMessage: false, // 修改成功返回结果
      errorMessage: false, // 修改失败返回结果
      rules2: {
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        age: [
          {validator: validateAge, trigger: 'blur'}
        ]
      }
    }
  },
  mounted: function () {
    this.getUserInfo()
    this.dialogFormVisible = true
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getUserInfo () {
      var id = sessionStorage.getItem('userId')
      this.$axios({
        method: 'post',
        url: '/qmy/user/getUserInfo',
        data: {
          'id': id
        }
      }).then(res => { // res是返回结果
        console.log(res)
        this.formLabelAlign = res.data.data
        this.uploadData.id = this.formLabelAlign.id
        if (this.formLabelAlign.picture !== undefined && this.formLabelAlign.picture != null) {
          this.imageUrl = '/qmy/user/download?id=' + this.formLabelAlign.id
        }
      }).catch(err => { // 请求失败就会捕获报错信息
        console.log(err)
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/qmy/user/editUserInfo',
            data: this.formLabelAlign
          }).then(res => { // res是返回结果
            if (res.data === 1) {
              this.resultMessage = true
            } else {
              this.errorMessage = true
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

  }
}

</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 55px;
    height: 150px;
    line-height: 140px;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 132px;
    /*display: block;*/
    vertical-align: middle;
    display: inline-block;
    transform: translateY(4px);
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
    border-bottom-right-radius: 2em;
    border-bottom-left-radius: 2em;

  }

  .picture {
    width: 110px;
    height: 142px;
    background: #b9d8ff;
    /*border-radius: 50%;*/
    vertical-align: middle;
    border-top-left-radius: 2em;
    border-top-right-radius: 2em;
    border-bottom-right-radius: 2em;
    border-bottom-left-radius: 2em;
  }
</style>
