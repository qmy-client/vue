<template>
  <div id="face">

    <el-row>
      <el-col :span="24">
        <el-tabs :tab-position="tabPosition" style="height: 50px;margin-left: 10px;margin-right: 10px">
          <el-tab-pane :label="item.name" v-for="item in menuList" :index="item.id" :key="item.id">
            <index :uuname="item"></index>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      </el-row>
  </div>
</template>

<script>

export default {
  name: 'intelligence',
  data () {
    return {
      activeNames: ['1'],
      tabPosition: 'top'
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  },
}
</script>

<style scoped>
  .el-collapse{
    width: 100%;
  }
</style>
