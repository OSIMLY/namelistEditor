<template>
    <div class="main-settings">
        <el-form ref="form"
            :model="form"
            label-width="120px">
            <el-card shadow="never">
                <el-button type="primary"
                    @click="handleSave">保存</el-button>
            </el-card>
            <el-card header="通用"
                shadow="never">
                <el-form-item label="文字编码">
                    <el-radio-group v-model="form.charset"
                        class="gutter-right">
                        <el-radio-button label="S">简体</el-radio-button>
                        <el-radio-button label="T">繁体</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="通用关键词">
                    <el-input v-model="form.commonKeywords"
                        type="textarea"
                        rows="5"></el-input>
                </el-form-item>
            </el-card>
            <el-card header="1. 堕胎婴灵"
                shadow="never">
                <el-form-item label="标题">
                    <el-input v-model="form.firstTitle"></el-input>
                </el-form-item>
                <el-form-item label="拆分数量">
                    <el-input-number v-model="form.firstSplitCount"></el-input-number>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="form.firstKeywords"
                        type="textarea"
                        rows="5"></el-input>
                </el-form-item>
            </el-card>
            <el-card header="2. 往生极乐"
                shadow="never">
                <el-form-item label="标题">
                    <el-input v-model="form.secondTitle"></el-input>
                </el-form-item>
                <el-form-item label="拆分数量">
                    <el-input-number v-model="form.secondSplitCount"></el-input-number>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="form.secondKeywords"
                        type="textarea"
                        rows="5"></el-input>
                </el-form-item>
            </el-card>
            <el-card header="3. 祈福"
                shadow="never">
                <el-form-item label="标题">
                    <el-input v-model="form.thirdTitle"></el-input>
                </el-form-item>
                <el-form-item label="拆分数量">
                    <el-input-number v-model="form.thirdSplitCount"></el-input-number>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="form.thirdKeywords"
                        type="textarea"
                        rows="5"></el-input>
                </el-form-item>
            </el-card>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        charset: '',
        commonKeywords: '',
        firstKeywords: '',
        firstTitle: '',
        firstSplitCount: 1,
        secondKeywords: '',
        secondTitle: '',
        secondSplitCount: 1,
        thirdKeywords: '',
        thirdTitle: '',
        thirdSplitCount: 1
      }
    }
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.$store.commit('UPDATE', this.form)
      }
    }
  },
  created() {
    this.form = JSON.parse(localStorage.getItem('settings'))
  },
  methods: {
    handleSave() {
      this.$store.commit('SAVE')
    }
  }
}
</script>

<style scoped>
.main-settings .el-card {
  margin: 20px;
}
</style>