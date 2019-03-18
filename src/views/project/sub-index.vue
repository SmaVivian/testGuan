<template>
  <div class="g-wrap">
    <div class="page-project-sub">
      <div class="g-sub-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <cmp-header-sub :tabList="tabs" :activeTab="currentTab" :pageType="`project`" @projectEventTab="changeTab"></cmp-header-sub>
        <div class="menu-sub-right">
          <span class="mr-20">看板视图</span>
          <span class="mr-20">2人</span>

          <el-popover
          class="pop-wrap mr-20"
          placement="bottom-end"
          trigger="click">
          <div class="m-panel">
            <h3 class="active">项目设置</h3>
            <h3>项目归档</h3>
          </div>
          <span class="operate" slot="reference">菜单</span>
        </el-popover>
            
          </div>
        </div>
      </div>

      <div class="sub-content">
        <div class="sub-content-wrap">
          <component :is="currentTabCmp"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CmpHeaderSub from '@cmp/header-sub'
import TaskProject from './task'
import ExhibitsProject from './exhibits'
import FileProject from './file'
import DiscussProject from './discuss'
import StatisticProject from './statistic'
export default {
  components: {
    CmpHeaderSub,
    TaskProject,
    ExhibitsProject,
    FileProject,
    DiscussProject,
    StatisticProject,
  },
  data() {
    return {
      // currentTab: 'task',
      tabs: [
        {
          name: '任务',
          path: 'task'
        },
        {
          name: '展品',
          path: 'exhibits'
        },
        {
          name: '文件',
          path: 'file'
        },
        {
          name: '讨论',
          path: 'discuss'
        },
        {
          name: '统计',
          path: 'statistic'
        },
      ]
    }
  },
  computed: {
    currentTab() {
      if(this.$route.path !== '/project/sub') return
      return this.$route.query.type
    },
    currentTabCmp() {
      return this.currentTab && (this.currentTab + 'Project')
    }
  },
  methods: {
    changeTab(path) {
      this.$router.replace({path: '/project/sub', query: {type: path}})
    }
  },
}
</script>

<style lang="scss" scoped>
.g-sub-top {
  .menu-sub-right {
    .pop-wrap {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
