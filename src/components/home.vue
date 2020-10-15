<template >

  <el-container >
    <el-header><Top  @input="input"></Top></el-header>
    <el-main style="padding: 0"><Stencil :ind = 'ind'></Stencil></el-main>
    <el-footer style="padding: 0;height:0"><Foot></Foot></el-footer>
  </el-container>
</template>

<script>
import Top from '@/components/layout/top'
import Stencil from '@/components/layout/stencil'
import Foot from '@/components/layout/foot'
export default {
  name: 'home',
  data () {
    return {
      msg: '这里是主界面',
      ind: '主页'
    }
  },
  components: {
    Top,
    Stencil,
    Foot
  },
  methods: {
    input (data) {
      this.ind = data
    }
  }

}

</script>
<style>
  .el-header {
   background-color: #2c3e50;
    color: #333;
    text-align: center;
    line-height: 20px;
  }
  .el-footer {
    background-color: #2c3e50;
    color: #333;
    text-align: center;
    /*line-height: 30px;*/
    /*height: 30px!important;*/
  }
 /* .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }*/

  .el-main {
    background-color: #F2F6FC;
    /*background-image: url("/static/img/background.jpg");*/
    color: #333;
    text-align: center;
    line-height: normal;
    height: 890px;
  }

  body > .el-container {
    margin-bottom: 0px;

  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
