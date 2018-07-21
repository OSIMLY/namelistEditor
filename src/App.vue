<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
const axios = require('axios').create({
  withCredentials: true
})
export default {
  name: 'app',
  created() {
    let settings = {}
    axios.get('https://cloud.minapp.com/userve/v1/table/35788/record/', { params: { where: { id: { $eq: '5af2ab524bf03c2b03a3f6b5' }}}})
      .then(res => {
        const strConfig = res.data.objects[0].value
        settings = JSON.parse(strConfig)
        this.$store.commit('UPDATE', settings)
      }, err => {
        settings = JSON.parse(localStorage.getItem('settings'))
        this.$store.commit('UPDATE', settings)
        console.log(err)
      })
  }
}
</script>
