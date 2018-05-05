<template>
  <el-table :data="nameArray">
    <el-table-column type="index"
      align="center"></el-table-column>
    <el-table-column label="内容"
      align="center">
      <template slot-scope="scope">
        <el-input :value="scope.row"
          :id="'nameList'+scope.$index"
          type="textarea"
          rows="8"
          readonly></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作"
      width="100"
      align="center">
      <template slot-scope="scope">
        <el-button type="primary"
          class="btnCopy"
          @click="_=>doCopy(scope.row)"
          size="small">复制</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'split-input',
  props: {
    nameArray: {
      default: []
    }
  },
  methods: {
    doCopy(val) {
      this.$copyText(val).then(e => (
        this.$message({
          message: 'copy success!',
          type: 'success'
        })
      ), e => (
        this.$message({
          message: 'copy failed!',
          type: 'danger'
        })
      ))
    }
  }
}
</script>