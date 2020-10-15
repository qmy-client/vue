<template>

<el-carousel :interval="5000" arrow="always" height="880px">
    <el-carousel-item v-for="item in backs" :key="item.title">
     <!-- <h3>{{item.title}}</h3>-->
      <!--<img :src="item.imgUrl" width="1920px" height="1080px">-->
      <img :src="item.imgUrl" class="imageSize">
    </el-carousel-item>
  </el-carousel>

</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      backs: [
        {imgUrl: '/static/img/back-1.jpg', title: '1'},
        {imgUrl: '/static/img/back-2.jpg', title: '2'},
        {imgUrl: '/static/img/back-3.jpg', title: '3'},
        {imgUrl: '/static/img/back-4.jpg', title: '4'},
        {imgUrl: '/static/img/back-5.jpg', title: '5'},
        {imgUrl: '/static/img/back-6.jpg', title: '6'}]
    }
  }

}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #0f1011;
    font-size: 14px;
    opacity: 0.75;
    line-height: 20px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #0f1011;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #0f1011;
  }
  .imageSize{
    width: 100%;
    height: 100%;
  }
</style>
