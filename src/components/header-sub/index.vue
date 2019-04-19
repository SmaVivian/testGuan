<template>
  <div class="cmp-header-sub cus-tabs center">
    <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        class="my-sub-tab"
        v-for="(item, index) in tabList"
        :disabled="item.isDisabled"
        :key="index"
        :name="item.path">
        <span slot="label">
          {{item.name}}
          <el-badge class="g-mark" :value="item.number" v-if="item.number"></el-badge>
        </span>
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
    $route() {
      if(this.$route.path === '/project/sub') {
        // 项目
        this.activeName = this.$route.query.type
      } else {
        this.activeName = this.$route.path.split('/')[2]
      }
    }
    // active() {
    //   this.activeName = this.active
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
.cmp-header-sub {

  /deep/ .el-badge__content {
    top: 3px;
  }
}
</style>


