<template>
  <div class="cmp-header-sub">
    <el-tabs :stretch="true" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        class="my-aaa"
        v-for="(item, index) in tabList"
        :key="index"
        :label="item.name"
        :name="item.path">
        <!-- {{item.content}} -->
      </el-tab-pane>
    </el-tabs>
    <!-- <el-menu
    :default-active="activeIndex"
    class="el-menu-sub"
    mode="horizontal"
    @select="handleSelect"
    background-color="#f2f2f2">
      <el-menu-item :index="item.path" v-for="(item, index) in tabList" :key="index">{{item.name}}</el-menu-item>
    </el-menu> -->
    <!-- <div class="operate">
      
    </div> -->
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
    pageType: {
      type: String,
      default: 'project'
    }
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
      switch(this.pageType) {
        case 'project':
          this.$emit('projectEventTab', this.activeName)
          break
        case 'collect':
          this.$emit('collectEventTab', this.activeName)
          break
      }
      console.log('activeName',this.activeName)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
.cmp-header-sub {
  .el-menu.el-menu--horizontal {
    // border-bottom: none;
  }
  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  .el-tabs__active-bar {
    // width: 28px !important;
    bottom: 10px;
  }

  .el-tabs__nav.is-stretch > * {
    flex: auto;
  }

  .el-tabs__item {
    box-sizing: border-box;
    padding: 0 40px;
  }

  .el-tabs__active-bar {
    display: none;
  }

  .el-tabs__item.is-active:after {
    display: block;
    content: '';
    position: absolute;
    width: 28px;
    height: 2px;
    background-color: #0590FF;
    left: 50%;
    bottom: 0;
    margin-left: -14px;
  }

  .el-tabs--top .el-tabs__item.is-top:nth-child(2):after, 
  .el-tabs--top .el-tabs__item.is-bottom:nth-child(2):after, 
  .el-tabs--bottom .el-tabs__item.is-top:nth-child(2):after, 
  .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2):after {
    margin-left: -34px;
  }

  .el-tabs--top .el-tabs__item.is-top:last-child:after, 
  .el-tabs--top .el-tabs__item.is-bottom:last-child:after, 
  .el-tabs--bottom .el-tabs__item.is-top:last-child:after, 
  .el-tabs--bottom .el-tabs__item.is-bottom:last-child:after {
    margin-left: 6px;
  }
}
</style>


