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
    firstSplited: '',
    secondSplited: '',
    thirdSplited: '',
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
          console.log('settings saved success', res)
        }, err => {
          localStorage.setItem('settings', JSON.stringify(state))
          console.log('settings saved error', err)
        })
      const finalList = [
        ...state.firstSplited,
        ...state.secondSplited,
        ...state.thirdSplited
      ]
      axios.put('https://cloud.minapp.com/userve/v1/table/35788/record/5b1a1c911ebc6c3df41a133c/', { value: JSON.stringify(finalList) })
        .then(res => {
          console.log('final list saved success', res)
        }, err => {
          localStorage.setItem('settings', JSON.stringify(finalList))
          console.log('final list saved error', err)
        })
    },
    COMBINE(state) {
      state.firstImport += state.firstCurrent
      state.firstCurrent = ''
      state.secondImport += state.secondCurrent
      state.secondCurrent = ''
      state.thirdImport += state.thirdCurrent
      state.thirdCurrent = ''
    },
    SAVEFINALLIST(state, { key, value }) {
      state[key + 'Splited'] = value
    }
  },
  actions: {}
}

export default settings
