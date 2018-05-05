const settings = {
  state: {
    charset: 'S',
    firstImport: '',
    secondImport: '',
    thirdImport: '',
    firstCurrent: '',
    secondCurrent: '',
    thirdCurrent: '',
    firstCombine: '',
    secondCombine: '',
    thirdCombine: '',
    commonKeywords: '',
    firstKeywords: '',
    firstTitle: '堕胎婴灵回向名单',
    firstSplitCount: 2,
    secondKeywords: '',
    secondTitle: '往生极乐回向名单',
    secondSplitCount: 3,
    thirdKeywords: '',
    thirdTitle: '祈福回向名单（全部为合家）',
    thirdSplitCount: 3
  },

  mutations: {
    UPDATE(state, payload) {
      state = Object.assign(state, payload)
      localStorage.setItem('settings', JSON.stringify(state))
    }
  },
  actions: {}
}

export default settings
