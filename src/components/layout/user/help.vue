<template>
    <div>
      <el-dialog
      title="帮助"
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="closeModel" :close-on-click-modal="closeOnClick"
      :close-on-press-escape="closeEscape"
      >
      <span>有问题请联系本公司产品部。<br><br>电话：010-68385399</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">关 闭</el-button>
  </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'help',
  data () {
    return {
      dialogVisible: false,
      closeModel: false,
      closeOnClick: false,
      closeEscape: false
    }
  },
  mounted: function () {
    this.dialogVisible = true
  },
  methods: {
    cancel () {
      this.dialogVisible = false
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
