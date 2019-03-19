<template>
  <div class="g-wrap">
    <div class="page-project-sub">
      <div class="g-sub-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <!-- 头部菜单面板 -->
            <el-popover
              class="pop-wrap"
              v-model="showTop"
              placement="bottom-start"
              trigger="click">
              <div class="pop-wrap-top m-search-wrap">
                <ul>
                  <li class="active" @click="clickTop">
                    <h2>烈火展项目</h2>
                    <i class="el-icon el-icon-check"></i>
                  </li>
                  <li @click="clickTop">
                    <h2>文创研发项目</h2>
                  </li>
                </ul>
              </div>
              <a class="top-menu-current" href="javascript:;" slot="reference">活动管理&nbsp;<i class="el-icon el-icon-arrow-down"></i></a>
            </el-popover>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <cmp-header-sub :tabList="tabs" :activeTab="currentTab" :pageType="`project`" @projectEventTab="changeTab"></cmp-header-sub>
        <div class="menu-sub-right">
          <span class="mr-20">看板视图</span>

          <!-- 成员 -->
          <el-popover
          class="pop-wrap mr-20"
          placement="bottom-end"
          trigger="click">
            <div class="pop-wrap-search m-search-wrap">
              <el-input class="input-block" v-model="key" placeholder="输入姓名搜索"></el-input>
              <p class="m-tips mt-20">最近</p>
              <ul>
                <li>
                  <img src="~@images/default-head.svg" alt="">
                  <h3>冯绍峰</h3>
                  <i class="el-icon el-icon-check mr-20"></i>
                </li>
                <li >
                  <img src="~@images/default-head.svg" alt="">
                  <h3>冯绍峰</h3>
                  <el-button class="el-primary-border mini" size="mini" @click="handleAdd">添加</el-button>
                  <!-- <svg-icon icon-class="add" class-name="icon-add" /> -->
                </li>
              </ul>
            </div>
            <span class="mr-20" slot="reference">2人</span>
          </el-popover>

          <!-- 菜单 -->
          <el-popover
          class="pop-wrap mr-20"
          v-model="popMenu"
          placement="bottom-end"
          trigger="click">
          <div class="operate-box">
            <!-- 菜单悬浮面板 -->
            <div class="m-panel">
              <h3 class="active" @click="handleOperate(1)">项目设置</h3>
              <h3 @click="handleOperate(2)">项目归档</h3>
            </div>
          </div>
          <span class="operate" slot="reference">···</span>
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
      ],
      showTop: false,
      popMenu: false,  // 显示菜单面板
      key: '',
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
    // 面包屑菜单
    clickTop() {
      this.showTop = false
    },
    // 点击菜单面板
    handleOperate(type) {
      this.popMenu = false
      console.log(type)
    },
    // 添加
    handleAdd() {

    },
    changeTab(path) {
      this.$router.replace({path: '/project/sub', query: {type: path}})
    }
  },
}
</script>

<style lang="scss" scoped>
.g-sub-top {
  .top-menu-current {
    color: $primary !important;
    cursor: pointer !important;
  }
  .menu-sub-right {
    .pop-wrap {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }
  }
}
.pop-wrap-top.m-search-wrap {
  width: 200px;
  padding: 15px 0;
  ul {
    padding-right: 0;
    li {
      padding: 0 30px;
      margin-top: 0;
      line-height: 46px;
      h2 {
        font-weight: normal;
      }
      &:hover,
      &.active {
        color: $primary;
        background-color: $color4;
      }
    }
  }
}
.pop-wrap-search.m-search-wrap {
  width: 260px;
}
</style>
