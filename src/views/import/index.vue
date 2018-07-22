<template>
  <div class="main-import">
    <el-card shadow="never">
      <el-button type="primary"
        @click="dialogFormVisible = true">导入</el-button>
      <el-button type="primary"
        @click="clearPrev">清除往期</el-button>
    </el-card>
    <el-card header="1. 堕胎婴灵"
      shadow="never">
      <el-input type="textarea"
        rows="8"
        v-model="firstImport"></el-input>
    </el-card>
    <el-card header="2. 往生极乐"
      shadow="never">
      <el-input type="textarea"
        rows="8"
        v-model="secondImport"></el-input>
    </el-card>
    <el-card header="3. 祈福"
      shadow="never">
      <el-input type="textarea"
        rows="8"
        v-model="thirdImport"></el-input>
    </el-card>
    <el-dialog title="import names"
      :visible.sync="dialogFormVisible">
      <el-row>
        <el-radio-group v-model="charset" @change="handleImport">
          <el-radio-button label="S">简体</el-radio-button>
          <el-radio-button label="T">繁体</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row>
        <el-input type="textarea"
          rows="10"
          v-model="baseImport"
          @input="handleImport"></el-input>
      </el-row>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="confirmImport">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { convertString } from '@/utils/index'
export default {
  data() {
    return {
      dialogFormVisible: false,
      baseImport: ''
    }
  },
  computed: {
    charset: {
      get() {
        return this.$store.state.settings.charset
      },
      set(val) {
        this.$store.commit('UPDATE', { charset: val })
      }
    },
    firstTitle() {
      return this.$store.state.settings.firstTitle
    },
    secondTitle() {
      return this.$store.state.settings.secondTitle
    },
    thirdTitle() {
      return this.$store.state.settings.thirdTitle
    },
    firstImport: {
      get() {
        return this.$store.state.settings.firstImport
      },
      set(val) {
        this.$store.commit('UPDATE', {
          firstImport: val
        })
      }
    },
    secondImport: {
      get() {
        return this.$store.state.settings.secondImport
      },
      set(val) {
        this.$store.commit('UPDATE', {
          secondImport: val
        })
      }
    },
    thirdImport: {
      get() {
        return this.$store.state.settings.thirdImport
      },
      set(val) {
        this.$store.commit('UPDATE', {
          thirdImport: val
        })
      }
    },
    firstCurrent: {
      get() {
        return this.$store.state.settings.firstCurrent
      },
      set(val) {
        this.$store.commit('UPDATE', {
          firstCurrent: val
        })
      }
    },
    secondCurrent: {
      get() {
        return this.$store.state.settings.secondCurrent
      },
      set(val) {
        this.$store.commit('UPDATE', {
          secondCurrent: val
        })
      }
    },
    thirdCurrent: {
      get() {
        return this.$store.state.settings.thirdCurrent
      },
      set(val) {
        this.$store.commit('UPDATE', {
          thirdCurrent: val
        })
      }
    }
  },
  methods: {
    handleImport() {
      this.baseImport = convertString(this.baseImport, this.charset)
    },
    confirmImport() {
      const firstTitle = convertString(this.firstTitle, this.charset)
      const secondTitle = convertString(this.secondTitle, this.charset)
      const thirdTitle = convertString(this.thirdTitle, this.charset)
      const split123 = this.baseImport.replace(/\n+/g, '').split(firstTitle)[1]
      const split1_23 = split123 && split123.split(secondTitle)
      const split2_3 =
        split1_23 && split1_23[1] && split1_23[1].split(thirdTitle)
      this.firstImport = split1_23 && split1_23[0] ? split1_23[0].trim() : ''
      this.secondImport = split2_3 && split2_3[0] ? split2_3[0].trim() : ''
      this.thirdImport = split2_3 && split2_3[1] ? split2_3[1].trim() : ''
      this.dialogFormVisible = false
    },
    clearPrev() {
      this.thirdImport = this.thirdImport.split('|')[0]
      this.firstCurrent = ''
      this.secondCurrent = ''
      this.thirdCurrent = ''
    }
  }
}
</script>

<style scoped>
.main-import .el-card {
  margin: 20px;
}
.main-import .el-row {
  margin-bottom: 20px;
}
</style>
