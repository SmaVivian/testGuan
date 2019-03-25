<template>
  <div class="cmp-header-sub cus-tabs center">
    <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        class="my-aaa"
        v-for="(item, index) in tabList"
        :disabled="item.isDisabled"
        :key="index"
        :label="item.name"
        :name="item.path">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'HeaderSub',
  props: {
    tabList: {
      type: Array,
      default() {
        return []
      }
    },
    activeTab: {
      type: String,
      default: ''
    },
    // 回调
    callFun: Function,
    pageType: {
      type: String,
      default: ''
    },
    isDisabled: false
  },
  watch: {
    // active() {
    //   this.activeName = this.active
    //   debugger
    // }
  },
  data() {
    return {
      activeName: this.activeTab
    }
  },
  methods: {
    handleClick(tab, event) {
      this.callFun && this.callFun(this.activeName)
      console.log('activeName',this.activeName)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>


