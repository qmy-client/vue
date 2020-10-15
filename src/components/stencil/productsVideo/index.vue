<template>
  <el-row :gutter="24">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="产品介绍" name="first">
        <iframe :src="readHtml" style="height: 800px;width: 100%"></iframe>
      </el-tab-pane>

      <el-tab-pane label="规格说明" name="second"><br><br><br>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
          <span>规格说明</span>
        </div>
          <div v-for="o in tableData2" :key="o.key" class="text item" align="left">
            {{o.key }}:{{o.value}}
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="产品购买" name="third"><br><br><br>
     <priCing :tableData="tableData1" :tableStyle="{ width:'600px'}" style="margin-left: 30%"></priCing>
      </el-tab-pane>

      <el-tab-pane label="安装环境" name="fourth"><el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>环境支持</span>
        </div>
        <div v-for="o in tableData3" :key="o.key" class="text item" align="left">
          {{o.key }}:{{o.value}}
        </div>
      </el-card></el-tab-pane>
      <el-tab-pane label="用户评价" name="fifth">
        <userRate :myRate="uuname"></userRate>
      </el-tab-pane>
    </el-tabs>
  </el-row>
</template>

<script>
import priCing from './pricing'
import userRate from './userRate'
export default {
  name: 'index',
  data () {
    return {
      tableData1: [
        {key: '产品编号:', value: '1001'},
        {key: '商品名称:', value: '视频联网平台'},
        {key: '价格:', value: '1200000.00'},
        {key: '生产日期:', value: '2018-03-01'},
        {key: '付款方式:', value: '在线支付、货到付款'},
        {key: '所属产权:', value: '北京航天长峰科技工业集团公司-产品部'},
        {key: '商家联系方式:', value: '010-68385399'},
      ],
      tableData2: [
        {key: '产品编号:', value: '1001'},
        {key: '商品名称:', value: '视频联网平台'},
        {key: '程序总大小:', value: '1.5GB'},
        {key: '程序包括:', value: '视频客户端、视频配置管理工具、流媒体转发服务、平台对接服务、nginx代理、mysql数据库'},
        {key: '软件类型:', value: '企业级应用软件'},
      ],
      tableData3: [
        {key: '硬件环境:', value: '服务器（2TB以上硬盘）、内存大小：6GB以上、CPU：Intel 酷睿i5 8代以上'},
        {key: '系统环境:', value: '支持windos server 2008R2 以上版本'},
      ],
      readHtml:'',
      activeName2:"1"
    }
  },
  props: ['uuname'],
  mounted: function () {
    this.getDocPath()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getDocPath(){
      this.$axios({
        method: 'POST',
        url: '/qmy/product/getHtmlPath',
        data: {name:this.uuname.fileName}
      }).then(res => {
        this.readHtml=res.data;
      }).catch(err => { // 请求失败就会捕获报错信息
        console.log('error access')
      })
    }
  },
  components:{
    priCing,
    userRate
  }

}
</script>

<style scoped>
  .el-collapse-item div {
    margin-left: 8px;
    text-align: left;
    font-size: 16px
  }
  .text {
    font-size: 24px;
  }

  .item {
    padding: 18px 0;
  }

</style>
