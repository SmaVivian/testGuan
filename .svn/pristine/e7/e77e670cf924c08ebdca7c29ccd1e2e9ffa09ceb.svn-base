<template>
  <div class="g-container"
    :class="{'header-no': !$store.getters.headerShow}">
    <cmp-header v-if="$store.getters.headerShow"></cmp-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
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