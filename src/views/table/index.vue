<template>
  <div class="app-container editor-inner">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button type="primary">去重</el-button>
        <el-switch v-model="showList"
          active-text="列表"
          inactive-text="文本"></el-switch>
      </el-col>
    </el-row>
    <el-row v-if="!showList"
      :gutter="20">
      <el-col :span="24">
        <el-input type="textarea"
          v-model="currentNameString"></el-input>
      </el-col>
    </el-row>
    <el-row v-else
      :gutter="20">
      <el-col :span="12">
        <el-table :data="nameArray"
          v-loading.body="loading"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          @row-click="handleRowClick">
          <el-table-column label="Title">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table :data="filtedArray"
          v-loading.body="loading"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row>
          <el-table-column label="Title">
            <template slot-scope="scope">
              <i class="el-icon-success"
                v-if="isCurName(scope.row.id)"> </i>
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                type="primary"
                icon="el-icon-edit"
                title="编辑"
                circle
                @click="handleEdit(scope.row)" />
              <el-button size="mini"
                type="primary"
                icon="el-icon-menu"
                title="拆分"
                circle
                @click="handleSplitNames(scope.row)" />
              <el-button size="mini"
                type="danger"
                icon="el-icon-delete"
                title="删除"
                circle
                @click="handleDelete(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showList: false,
      loading: false,
      masterId: -1,
      nameArray: [],
      filtedArray: [],
      currentNameString: ''
    }
  },
  props: {
    nameString: {
      default: '张三 李四 王五 刘六 张三1 李四2 王五3 李一李二李三李四王五李六'
    }
  },
  watch: {
    'nameArray': {
      deep: true,
      handler(val) {
        this.currentNameString = val.map(item => item.name).join(' ')
        this.$emit('change', this.currentNameString)
        console.log(this.currentNameString)
      }
    },
    nameString(val) {
      this.nameArray = this.getNameArray(this.nameString)
    }
  },
  created() {
    this.nameString = '张三 李四 王五 刘六 张三1 李四2 王五3 李一李二李三李四王五李六'
    this.currentNameString = this.nameString
    this.nameArray = this.getNameArray(this.nameString)
  },
  methods: {
    isCurName(id) {
      return this.masterId === id
    },
    getNameArray(val) {
      return val.trim().split(' ').map((item, index) => ({
        id: index,
        name: item
      }))
    },
    handleSplitNames(val) {
      const splitStep = val.name.indexOf(' ') !== -1 ? 1 : 0
      const charArr = val.name.split('')
      const uniqueArr = []
      charArr.forEach(item => {
        if (item !== ' ') {
          const resultChar = uniqueArr.find(elem => elem.char === item)
          resultChar ? resultChar.count += 1 : uniqueArr.push({ char: item, count: 1 })
        }
      })
      const maxChar = uniqueArr.sort((a, b) => b.count - a.count)[splitStep].char
      val.name = val.name.replace(RegExp(maxChar, 'g'), ' ' + maxChar).trim()
    },
    handleRowClick(row, e, col) {
      this.masterId = row.id
      this.filtedArray = this.nameArray
        .filter(item => {
          return item.name.indexOf(row.name) !== -1
        })
    },
    handleDelete(row) {
      this.nameArray.splice(row.index, 1)
      this.filtedArray.splice(row.$index, 1)
    },
    handleEdit(row) {
      this.$prompt(null, '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.name
      }).then(({ value }) => {
        this.$set(row, 'name', value)
        // row.name = value
        this.$message({
          type: 'success',
          message: '修改成功。'
        })
      })
    }
  }
}
</script>

<style>
.editor-inner .el-row {
  margin-bottom: 20px;
}
.editor-inner .el-icon-success {
  color: #67c23a;
}
</style>
