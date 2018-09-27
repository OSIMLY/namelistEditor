<template>
  <div class="app-container main-editor">
    <el-tabs tab-position="top">
      <el-tab-pane label="1. 堕胎婴灵">
        <CombineEditor label="first" />
      </el-tab-pane>
      <el-tab-pane label="2. 往生极乐">
        <CombineEditor label="second" />
      </el-tab-pane>
      <el-tab-pane label="3. 祈福">
        <CombineEditor label="third" />
      </el-tab-pane>
      <el-tab-pane label="4. 全部">
        <FullList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CombineEditor from '@/components/combineEditor/index'
import FullList from '@/components/fullList/index'

export default {
  components: {
    CombineEditor,
    FullList
  }
}
</script>

<style>
.main-editor .el-row {
  margin-bottom: 15px;
}
.main-editor .editor-col {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
