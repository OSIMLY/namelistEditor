<template>
  <div class="editor-inner">
    <!-- toolbox -->
    <el-row class="toolbox">
      <el-button type="primary"
        class="gutter-right"
        @click="handleBtnUniqueClick"
        size="small">去重</el-button>
      <el-button-group class="gutter-right">
        <el-button type="normal"
          size="small"
          icon="el-icon-zoom-out"
          @click="fontZoomOut"></el-button>
        <el-button type="normal"
          size="small"
          @click="fontZoomIn">
          <i class="el-icon-zoom-in el-icon--right"></i>
        </el-button>
      </el-button-group>
      <el-radio-group v-model="showList"
        class="gutter-right"
        size="small"
        @change="handleShowListChange">
        <el-radio-button :label="false">文本</el-radio-button>
        <el-radio-button :label="true">列表</el-radio-button>
      </el-radio-group>
      <el-button :type="!showKeywords?'success':'danger'"
        size="small"
        @click="showKeywords=!showKeywords">关键词</el-button>
    </el-row>
    <!-- keywords -->
    <el-row v-show="showKeywords"
      :gutter="20">
      <el-col :span="24">
        <el-input type="textarea"
          rows="6"
          v-model="specialKeywords"></el-input>
      </el-col>
    </el-row>
    <!-- statusbar -->
    <el-row>
      <el-alert :title="currentCount+' 个名字，'+currentLength+' 字。'"
        :closable="false"
        type="success">
      </el-alert>
    </el-row>
    <!-- input editor -->
    <el-row v-show="!showList"
      :gutter="20">
      <el-col :span="24">
        <el-input type="textarea"
          :style="{fontSize: fontSize + 'px'}"
          rows="20"
          v-model="strCurrent"
          @change="handleCurNameChange"></el-input>
      </el-col>
    </el-row>
    <!-- list editor -->
    <el-row v-show="showList"
      :gutter="20">
      <el-col :span="12">
        <el-table :data="currentArray"
          :max-height="500"
          border
          fit
          highlight-current-row
          @mouseup.native="handleMainTabSelect"
          @row-click="handleRowClick">
          <el-table-column sortable
            sort-by="id"
            label="姓名">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <!-- <el-table-column sortable
            sort-by="type"
            label="type">
            <template slot-scope="scope">
              {{scope.row.type}}
            </template>
          </el-table-column> -->
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table :data="filtedArray"
          :max-height="500"
          border
          fit
          highlight-current-row>
          <el-table-column label="姓名">
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
                @click="handleDelete(scope.row,scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { s2t, t2s } from '@/utils/simplebig'
import { getKeyName as k } from '@/utils/index'

export default {
  name: 'name-list-editor',
  data() {
    return {
      fontSize: 18,
      showList: false,
      showKeywords: false,
      masterId: -1,
      importArray: [],
      currentArray: [],
      filtedArray: [],
      selectedText: ''
    }
  },
  props: {
    value: {
      default: ''
    },
    label: {
      default: 'first'
    }
  },
  computed: {
    charset() {
      return this.$store.state.settings.charset
    },
    commonKeywords() {
      return this.$store.state.settings.commonKeywords
    },
    strImport() {
      return this.$store.state.settings[k(this.label, 'Import')]
    },
    specialKeywords: {
      get() {
        return this.$store.state.settings[k(this.label, 'Keywords')]
      },
      set(val) {
        this.$store.commit('UPDATE', {
          [k(this.label, 'Keywords')]: val
        })
      }
    },
    strCurrent: {
      get() {
        return this.$store.state.settings[k(this.label, 'Current')]
      },
      set(val) {
        this.$store.commit('UPDATE', {
          [k(this.label, 'Current')]: val,
          [k(this.label, 'Combine')]: this.strImport + ' ' + val
        })
      }
    },
    totalArray() {
      return [...this.importArray, ...this.currentArray]
    },
    currentCount() {
      return this.strCurrent.trim().split(' ').length
    },
    currentLength() {
      return this.strCurrent.length
    }
  },
  watch: {
    currentArray: {
      deep: true,
      handler(val) {
        const currentString = val.map(item => item.name).join(' ')
        this.$store.commit('UPDATE', {
          [k(this.label, 'Current')]: currentString,
          [k(this.label, 'Combine')]: this.strImport + ' ' + currentString
        })
      }
    },
    importArray: {
      deep: true,
      handler(val) {
        const importString = val.map(item => item.name).join(' ')
        this.$store.commit('UPDATE', {
          [k(this.label, 'Import')]: importString,
          [k(this.label, 'Combine')]: importString + ' ' + this.strCurrent
        })
      }
    },
    selectedText(val) {
      this.filtedArray = this.totalArray.filter(item => {
        return item.name.indexOf(val) !== -1
      })
    }
  },
  methods: {
    convertChar(val) {
      return this.charset === 'T' ? s2t(val) : t2s(val)
    },
    isCurName(id) {
      return this.masterId === id
    },
    getNameArray(val, type = '') {
      return val
        .trim()
        .split(' ')
        .map((item, index) => ({
          id: index,
          name: item,
          type
        }))
    },
    getKeywords() {
      const comStr = this.commonKeywords
      const speStr = this.specialKeywords
      return (comStr ? comStr + '|' + speStr : speStr).replace(/\|+/g, '|')
    },
    handleShowListChange(val) {
      if (val) {
        this.currentArray = this.getNameArray(this.strCurrent, 'current')
        this.importArray = this.getNameArray(this.strImport, 'import')
      }
    },
    handleMainTabSelect() {
      this.$nextTick(_ => {
        const selectedText = window.getSelection().toString()
        selectedText !== '' && (this.selectedText = selectedText)
      })
    },
    handleBtnUniqueClick() {
      const spliter = ' '
      const keyWords = this.getKeywords()
      let originString = this.convertChar(this.strCurrent)
      originString = originString.replace(
        /[,，\.。;；、!！:：．\(\)\[\]\s\n]+/g,
        spliter
      )
      originString = originString.replace(
        RegExp(this.convertChar(keyWords), 'g'),
        ''
      )
      let uniqueSet = Array.from(new Set(originString.trim().split(spliter)))
      uniqueSet = uniqueSet.filter(
        item => this.strImport.split(' ').indexOf(item) === -1
      )
      originString = uniqueSet.join(spliter)
      this.strCurrent = originString.trim()
    },
    handleSplitNames(val) {
      const splitStep = val.name.indexOf(' ') !== -1 ? 1 : 0
      const charArr = val.name.split('')
      const uniqueArr = []
      charArr.forEach(item => {
        if (item !== ' ') {
          const resultChar = uniqueArr.find(elem => elem.char === item)
          resultChar
            ? (resultChar.count += 1)
            : uniqueArr.push({ char: item, count: 1 })
        }
      })
      const maxChar = uniqueArr.sort((a, b) => b.count - a.count)[splitStep]
        .char
      val.name = val.name.replace(RegExp(maxChar, 'g'), ' ' + maxChar).trim()
    },
    handleRowClick(row, e, col) {
      this.masterId = row.id
      this.selectedText = row.name
    },
    handleDelete(row, $index) {
      if (row.type === 'import') {
        this.importArray.splice(this.importArray.indexOf(row), 1)
      } else {
        this.currentArray.splice(this.currentArray.indexOf(row), 1)
      }
      this.filtedArray.splice($index, 1)
    },
    handleEdit(row) {
      this.$prompt(null, '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.name
      }).then(({ value }) => {
        this.$set(row, 'name', value)
        this.$message({
          type: 'success',
          message: '修改成功。'
        })
      })
    },
    handleCurNameChange(val) {
      this.currentArray = this.getNameArray(val)
      this.$emit('input', val)
    },
    fontZoomOut() {
      this.fontSize > 12 ? (this.fontSize -= 2) : ''
    },
    fontZoomIn() {
      this.fontSize < 48 ? (this.fontSize += 2) : ''
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
