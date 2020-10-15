<template>
  <div>
    <el-row :gutter="24">
      <el-col>
        <div>
          <el-button type="info" v-on:click="cancel">返回上一层</el-button>
        </div>
      </el-col>
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple"><h1>产品添加</h1></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10" :offset="1">
        <div class="formColor" align="left">
          <div align="center"><h2>基本信息</h2></div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="产品名称" prop="name">
              <el-input v-model="ruleForm.name" style="width: 80%;"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="region" required>
              <el-select v-model="ruleForm.region" placeholder="请选择负责人">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间" prop="date1" required>
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" value-format="yyyy-MM-dd"
                              style="width: 60%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否收费" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="产品类型" prop="type">
              <el-radio-group v-model="ruleForm.type" @change="loadDate">
                <el-radio label="1" name="type">视频联网平台</el-radio>
                <el-radio label="2" name="type">人脸考勤系统</el-radio>
                <el-radio label="3" name="type">人脸轨迹追踪</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="应用场景" prop="resource">
              <el-checkbox-group v-model="ruleForm.resource">
                <el-checkbox
                v-for="item in options3"
                :key="item.label"
                :label="item.label" name="resource">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="其他说明" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc" style="width: 80%"></el-input>
            </el-form-item>

          </el-form>

        </div>
      </el-col>
      <el-col :span="12" >
        <div class="formColor">
        <h2>产品介绍上传</h2>
        <el-upload
          class="upload-demo"
          drag
          :on-success="uploadSubmit"
          :before-upload="beforeUploadr"
          action="/qmy/product/addFile"
          :data="upLoadData"
         >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传Word文件</div>
        </el-upload>
          <div align="right" style="margin-top: 170px" v-show="buttonShow">
            <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </div>
      </el-col>
      <el-col>
      <hr style=" height:2px;border:none;border-top:2px dotted #185598;"/>
      </el-col>
    </el-row>
      <el-row :gutter="24">
        <el-col :span="22" :offset="1">
          <h2>产品更新记录</h2>
          <el-table
            :data="tableData2.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="name"
              label="产品名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="date"
              label="更新时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="负责人">
            </el-table-column>
            <el-table-column
              align="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

      </el-row>

  </div>
</template>

<script>
export default {
  name: "productAdd",
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        delivery: false,
        type: '',
        resource: [],
        desc: '',
        path:''
      },

      rules: {
        name: [
          {required: true, message: '请输入产品名称', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择负责人', trigger: 'change'}
        ],
        date1: [
          {type: 'string', required: true, message: '请选择发布时间', trigger: 'change'}
        ],
        type: [
          {required: true, message: '请至少选择一个产品类型', trigger: 'change'}
        ],
        resource: [
          {type: 'array', required: true, message: '请至少选择一个应用场景', trigger: 'change'}
        ]
      },
      tableData2: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '张小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      search: '',
      loadFileName:'',
      upLoadData:{},
      buttonShow:false,
      options2: [{
        label: '刘部长',
        value:'1'
      }, {
        label: '张博士',
        value:'2'
      }, {
        label: '李经理',
        value:'3'
      }, {
        label: '王组长',
        value:'4'
      }],
      options3: [{
        label: '公安',
      }, {
        label: '检察院',
      }, {
        label: '法院',
      },{
        label: '其他',
      }],
    }
  },
  mounted: function () {

  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    loadDate(){
      this.upLoadData.productType=this.ruleForm.type;

    },
    uploadSubmit(response,file){
      console.log("可以了！上传成功了");
     console.log(response);
     this.ruleForm.path=response.path;
      this.ruleForm.fileName=response.fileName;
      this.buttonShow=true;

    },
    beforeUploadr(file){
      console.log(this.upLoadData.productType);
      if(this.upLoadData.productType===undefined){
        this.$message.error('请选择产品类型！');
        return false;
      }
      const isJPG = file.type === 'application/msword';
      if (!isJPG) {
        this.$message.error('上传文件不为.doc类型');
        return false;
      }
      return isJPG;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.date1);
          this.$axios({
            method: 'post',
            url: '/qmy/product/productAdd',
            data: {
              name: this.ruleForm.name,
              principal:this.ruleForm.region,
              tool:this.ruleForm.delivery,
              type:this.ruleForm.type,
              scenes:this.ruleForm.resource.toString(),
              other:this.ruleForm.desc,
              dateTime:this.ruleForm.date1,
              path:this.ruleForm.path,
              fileName:this.ruleForm.fileName
            }
          }).then(res => {
               if(res.data==='OK'){
                 this.$message({message:'产品发布成功！',center:true,type:'success'});
               }
          }).catch(err => { // 请求失败就会捕获报错信息
            console.log('error access')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  }
}
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #0f599d;
  }

  .bg-purple {
    background: #b9d8ff;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .formColor {
    background-color: #f9fafc;
    padding: 20px;

  }
</style>
