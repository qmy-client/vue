<template>
  <el-row>
    <div style="display: flex; margin-top: 0px; height: 450px;">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <transition name="el-zoom-in-top">
            <div v-show="show2" class="transition-box img1">
              <el-button type="text" v-on:click="productAdd()"> <a class="h1class">产品添加</a></el-button>
            </div>
          </transition>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <transition name="el-zoom-in-center">
            <div v-show="show2" class="transition-box img2">
              <el-button type="text" v-on:click="interfaceAdd()"> <a class="h1class">接口添加</a></el-button>
            </div>
          </transition>
        </div>
      </el-col>
    </div>
    <div style="display: flex; margin-top: 0px; height: 440px;">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <transition name="el-zoom-in-top">
            <div v-show="show2" class="transition-box img3">
              <el-button type="text" v-on:click="userinfoAdd()"> <a class="h1class">用户管理</a></el-button>
            </div>
          </transition>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <transition name="el-zoom-in-center">
            <div v-show="show2" class="transition-box img4">
              <el-button type="text" v-on:click="timeUpdate()"> <a class="h1class">定时更新</a></el-button>
            </div>
          </transition>
        </div>
      </el-col>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'resource',
  data: () => ({
    show2: false
  }),
  mounted: function () {
    this.show2 = true
  },
  methods: {
    productAdd () {
      this.$router.push('/productAdd')
    },
    interfaceAdd () {
      this.$router.push('/interfaceAdd')
    },
    userinfoAdd () {
      alert('用户管理')
    },
    timeUpdate () {
      alert('定时更新')
    }

  }
}
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 100%;
    height: 430px;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .img1 {
    background-image: url("/static/img/resource_1.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .img2 {
    background-image: url("/static/img/resource_2.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
 .img3{
   background-image: url("/static/img/resource_3.jpg");
   background-size: 100% 100%;
   background-repeat: no-repeat;
 }
.img4 {
  background-image: url("/static/img/resource_4.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
  .h1class {
    position: absolute;
    margin-top: 130px;
    margin-left: -70px;
    font-size: 40px;
    color: white;
  }
</style>
