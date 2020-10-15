<template>
  <div>

  <el-collapse v-model="activeName" accordion>
    <el-col :span="15" :offset="3">
      <el-collapse-item :title="it.username" name="1" v-for="it in myRateList" :key="it.id">
        <div align="left" style="padding-left: 25px">{{it.content}}</div>
        <div style="margin-left: 80%">
          用户评价:<el-rate :value="it.rateSum" disabled show-score text-color="#ff9900" score-template="{value}">
        </el-rate>
        </div>
      </el-collapse-item>
    </el-col>
  </el-collapse>
  <el-col :span="spanLayout" :offset="1">
    <el-button type="text" @click="dialogFormVisible = true"><br><br>我要评价</el-button>
    <el-dialog title="评价产品" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form1" label-width="80px" align="left">
        <el-form-item label="产品名称"  >
          <el-input v-model="form.name" autocomplete="off" style="width: 40%;" disabled></el-input>
        </el-form-item>
        <el-form-item label="评价内容"  prop="desc">
          <el-input type="textarea" v-model="form.desc" style="width: 80%"  required></el-input>
        </el-form-item>
        <el-form-item label="产品打分">
          是否实用
          <el-rate
            v-model="form.rate1"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
          是否美观
          <el-rate
            v-model="form.rate2"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
          是否符合功能需求
          <el-rate
            v-model="form.rate3"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRate('form1')">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
  </div>
</template>

<script>
/**/
export default {
    name: "userRate",
    props:['myRate'],

  data() {
      return {
        activeName: '1',
        userValue:3.8,
        userValue1:4.8,
        dialogFormVisible: false,
        form: {
          name: this.myRate.name,
          desc: '',
          rate1:5,
          rate2:5,
          rate3:5,
        },
        myRateList:[],
        spanLayout:4,
        rules: {
          desc: [
            {required: true, message: '请输入评价内容', trigger: 'blur'},
            {min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur'}
          ]
        },
      }
  },
  mounted:function () {
      this.rateList();
  },
  methods:{
    submitRate(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'POST',
            url: '/qmy/product/addUserRate',
            data: {
              username: sessionStorage.getItem("userInfo"),
              productName: this.form.name,
              productId:this.myRate.id,
              content: this.form.desc,
              rate1: this.form.rate1,
              rate2: this.form.rate2,
              rate3: this.form.rate3
            }
          }).then(res => {
            this.form.desc = '';
            this.form.rate1 = 5;
            this.form.rate2 = 5;
            this.form.rate3 = 5;
            this.dialogFormVisible = false;
            this.rateList();
          }).catch(err => { // 请求失败就会捕获报错信息
            console.log('error access')
          })
        }
      });
    },
    rateList(){
      this.$axios({
        method: 'GET',
        url: '/qmy/product/getRateList',
      }).then(res => {
          this.myRateList=res.data;
          console.log(this.myRateList.length);
          if(this.myRateList.length===0){
            this.spanLayout=21;
          }else{
            this.spanLayout=4;
          }
      }).catch(err => { // 请求失败就会捕获报错信息
        console.log('error access')
      })
    }
  }
}
</script>

<style scoped>

</style>
