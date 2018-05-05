<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    const settings = JSON.parse(localStorage.getItem('settings'))
    this.$store.commit('UPDATE', settings)
  }
}
</script>
