<template>
  <div class="cmp-approve-panel" v-if="showPanel" :class="{'animat': showPanel}">
    <h1>
      <img class="g-pic small" src="~@images/default-head.svg" alt="">
      胡强发的请假申请
    </h1>

  </div>
</template>

<script>
export default {
  data() {
    return {
      showPanel: false
    }
  },
  methods: {
    init() {
      this.showPanel = true
    }
  }
}
</script>

<style lang="scss" scoped>
.cmp-approve-panel {
  position: fixed;
  right: 570px;
  top: 80px;
  bottom: 0;
  width: 570px;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 1px 10px 0px rgba(150,153,162,0.5);
  z-index: 3;
  transition: right 2s;
  // transition: right 1s linear 2s;
  // animation:mymove 5s infinite;
  // transition: opacity 2s linear;
  // opacity: 0;
  // transition: right 2s;
  // &:hover {
  //   right: 0;
  // }
  &.animat {
    right: 0;
    // opacity: 100;
    // transition: right 2s;
    // right: 0;
    // animation:mymove 5s;
  }
}
// @keyframes mymove{
// from {right:570px;}
// to {right:0;}
// }
</style>


