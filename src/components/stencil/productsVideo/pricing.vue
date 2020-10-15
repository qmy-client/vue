<template>
  <table :style="styleObject" v-if="s_showByRow" border="1">
    <tr v-for="index in rowCount" style="width: 200px;height: 100px">
      <td style="background-color: #999999">{{tableData[index*2-2].key}}</td>
      <td>{{tableData[index*2-2].value}}</td>
      <td style="background-color: #999999">{{tableData[index*2-1] !== undefined ? tableData[index*2-1].key : ''}}</td>
      <td>{{tableData[index*2-1] !== undefined ? tableData[index*2-1].value : ''}}</td>
    </tr>
  </table>
  <table  :style="styleObject" v-else border="1">
    <tr v-for="index in rowCount" style="width: 200px;height: 100px">
      <td  style="background-color: #999999">{{tableData[index-1].key}}</td>
      <td>{{tableData[index-1].value}}</td>
      <td style="background-color: #999999">{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].key : ''}}</td>
      <td>{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : ''}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'verticalForm',
  data() {
    return {
      styleObject: {},
      s_showByRow: true,
    };
  },
  props: ['tableData', 'tableStyle', 'showByRow'],
  computed: {
    rowCount: function() {
      return Math.ceil(this.tableData.length/2);
    }
  },
  created() {
    this.styleObject = this.tableStyle;
    if(this.showByRow !== undefined){
      this.s_showByRow = this.showByRow;
    }
  },
}
</script>

