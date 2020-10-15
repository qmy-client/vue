<template>
  <div>
    <el-row :gutter="24">
      <el-col>
        <div>
          <el-button type="info" v-on:click="cancel">返回上一层</el-button>
        </div>
      </el-col>
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple"><h1>接口添加</h1></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10" :offset="1">
        <div class="formColor" align="left">
          <div align="center"><h2>基本信息</h2></div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="接口名称" prop="name">
              <el-input v-model="ruleForm.name" style="width: 80%;"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择负责人">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布时间" required="">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                              style="width: 60%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否收费" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="接口类型" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="视频接口" name="type"></el-checkbox>
                <el-checkbox label="人脸识别接口" name="type"></el-checkbox>
                <el-checkbox label="设备管理接口" name="type"></el-checkbox>
                <el-checkbox label="其他接口" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="应用场景" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio
                  v-for="item in options3"
                  :key="item.label"
                  :label="item.label"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="其他说明" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc" style="width: 80%"></el-input>
            </el-form-item>

          </el-form>

        </div>
      </el-col>
      <el-col :span="12" >
        <div class="formColor">
          <h2>文件上传</h2>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <div align="right" style="margin-top: 170px">
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
        <h2>接口更新记录</h2>
        <el-table
          :data="tableData2.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="name"
            label="接口名称"
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
  name: "interfaceAdd",
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择活动区域', trigger: 'change'}
        ],
        date1: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        date2: [
          {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
        ],
        type: [
          {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
        ],
        resource: [
          {required: true, message: '请选择活动资源', trigger: 'change'}
        ],
        desc: [
          {required: true, message: '请填写活动形式', trigger: 'blur'}
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
        label: '公安'
      }, {
        label: '检察院'
      }, {
        label: '法院'
      },{
        label: '其他'
      }],
    }
  },
  mounted: function () {

  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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
<style>
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
