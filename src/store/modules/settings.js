const axios = require('axios').create({
  withCredentials: true
})

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
    },
    SAVE(state) {
      axios.put('https://cloud.minapp.com/userve/v1/table/35788/record/5af2ab524bf03c2b03a3f6b5/', { value: JSON.stringify(state) })
        .then(res => {
          console.log('success', res)
        }, err => {
          localStorage.setItem('settings', JSON.stringify(state))
          console.log('error', err)
        })
    }
  },
  actions: {}
}

export default settings
