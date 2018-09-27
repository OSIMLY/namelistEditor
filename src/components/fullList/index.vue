<template>
    <div class="full-list">
        <el-row class="toolbox">
            <el-button type="primary"
                class="gutter-right"
                @click="download"
                size="small">下载</el-button>
        </el-row>
        <el-row>
            <el-input :value="fullList"
            type="textarea"
            rows="16"
            readonly></el-input>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'full-list',
  computed: {
    fullList() {
      return this.$store.state.settings.firstTitle + '\r\n' +
        this.$store.state.settings.firstCombine + '\r\n\r\n' +
        this.$store.state.settings.secondTitle + '\r\n' +
        this.$store.state.settings.secondCombine + '\r\n\r\n' +
        this.$store.state.settings.thirdTitle + '\r\n' +
        this.$store.state.settings.thirdCombine
    }
  },
  methods: {
    download() {
      const FileSaver = require('file-saver')
      const blob = new Blob([this.fullList], { type: 'text/plain;charset=utf-8' })
      debugger
      FileSaver.default(blob, 'hello world.txt')
    }
  }
}
</script>
