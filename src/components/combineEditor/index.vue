<template>
  <el-collapse v-model="activeNames"
    accordion
    @change="handleCollapseChange">
    <el-collapse-item title="往期名单"
      name="old">
      <el-input type="textarea"
        rows="15"
        v-model="strImport"
        placeholder="">
      </el-input>
    </el-collapse-item>
    <el-collapse-item title="新增姓名"
      name="add">
      <name-list-editor :label="label" />
    </el-collapse-item>
    <el-collapse-item title="本期名单"
      name="new">
      <el-row class="toolbox">
        <el-input-number v-model="splitCount"
          size="small"
          :min="1"
          class="gutter-right"></el-input-number>
        <el-radio-group v-model="isSplit"
          class="gutter-right"
          size="small">
          <el-radio-button :label="false">合并</el-radio-button>
          <el-radio-button :label="true">拆分</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row v-if="!isSplit">
        <el-input type="textarea"
          rows="15"
          v-model="strCombine">
        </el-input>
      </el-row>
      <el-row v-else>
        <split-input :nameArray="nameArray"
          :label="label" />
      </el-row>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import NameListEditor from '@/components/nameListEditor/index'
import SplitInput from '@/components/splitInput/index'
import { getKeyName as k } from '@/utils/index'

export default {
  components: {
    NameListEditor,
    SplitInput
  },
  props: {
    label: {
      default: 'first'
    }
  },
  data() {
    return {
      numChar: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
      activeNames: ['2'],
      isSplit: true,
      combineNameString: '',
      nameArray: []
    }
  },
  created() {
    this.nameArray = this.getNameArray()
  },
  methods: {
    getNameArray() {
      const val = this.strCombine
      const nameArr = []
      const splitCount = this.splitCount
      const itemLength = Math.ceil(val.length / splitCount)

      for (let i = 0; i < splitCount; i++) {
        const start = itemLength * i
        const end = itemLength * (i + 1)
        const curItem = val.slice(start, end)
        const orderChar = this.numChar[this.startOrder + i] + '\n'
        if (i > 0) {
          const firstSpace = curItem.indexOf(' ')
          nameArr[i - 1] += curItem.slice(0, firstSpace)
          nameArr.push(orderChar + curItem.slice(firstSpace).trim())
        } else {
          nameArr.push(orderChar + this.strTitle + '\n' + curItem)
        }
      }
      this.$store.commit('SAVEFINALLIST', {
        key: this.label,
        value: nameArr
      })
      return nameArr
    },
    handleCollapseChange(name) {
      if (name === 'new') {
        this.nameArray = this.getNameArray()
      }
    }
  },
  computed: {
    strTitle() {
      return this.$store.state.settings[k(this.label, 'Title')]
    },
    splitCount: {
      get() {
        return this.$store.state.settings[k(this.label, 'SplitCount')]
      },
      set(val) {
        this.$store.commit('UPDATE', {
          [k(this.label, 'SplitCount')]: val
        })
        this.nameArray = this.getNameArray()
      }
    },
    startOrder() {
      const firstCount = this.$store.state.settings.firstSplitCount
      const secondCount = this.$store.state.settings.secondSplitCount
      let orderNum

      switch (this.label) {
        case 'first':
          orderNum = 1
          break
        case 'second':
          orderNum = firstCount + 1
          break
        case 'third':
          orderNum = firstCount + secondCount + 1
          break
      }
      return orderNum
    },
    strImport: {
      get() {
        return this.$store.state.settings[k(this.label, 'Import')]
      },
      set(val) {
        this.$store.commit('UPDATE', {
          [k(this.label, 'Import')]: val,
          [k(this.label, 'Combine')]: val + ' ' + this.strCurrent
        })
      }
    },
    strCurrent() {
      return this.$store.state.settings[k(this.label, 'Current')]
    },
    strCombine: {
      get() {
        return this.$store.state.settings[k(this.label, 'Combine')]
      },
      set(val) {
        this.$store.commit('UPDATE', {
          [k(this.label, 'Combine')]: val
        })
      }
    }
  }
}
</script>

<style>
</style>