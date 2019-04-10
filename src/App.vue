<template>
  <div id="app" :class="{'no-scroll-y': $store.state.user.noScrollY}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log('store',this.$store)
  },
}
</script>

<style lang="scss">
  @import './assets/css/reset.css';
  @import './assets/css/element-variables.scss';
  @import '~@/assets/css/theme.scss';
  @import '~@/assets/css/resetCmp.scss';
</style>

<style lang="scss" scoped>
.no-scroll-y {
  overflow: hidden;
}
</style>



