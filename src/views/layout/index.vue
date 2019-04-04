<template>
  <div class="g-container"
    :class="{'header-no': !$store.getters.headerShow}">
    <cmp-header v-if="$store.getters.headerShow"></cmp-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import cmpHeader from '@cmp/header'
export default {
  components: {
    cmpHeader
  },
}
</script>