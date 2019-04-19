<template>
  <div class="g-wrap">
    <div class="page-project-sub">
      <div class="g-sub-top">
        <!-- 面包屑 -->
        <el-breadcrumb class="cus-breadcrumb-pro" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><span class="pro-menu">项目</span></el-breadcrumb-item>
          <el-breadcrumb-item>
            <!-- 头部菜单面板 -->
            <el-popover
              class="pop-wrap"
              v-model="showTop"
              placement="bottom-start"
              trigger="click">
              <div class="pop-wrap-top m-search-wrap">
                <ul>
                  <li
                    v-for="(item, index) in topProList"
                    :key="index"
                    :class="{'active': item.id === topProActive.id}"
                    @click="clickTop(item)">
                    <h2>{{item.name}}</h2>
                    <i class="el-icon el-icon-check" v-if="item.id === topProActive.id"></i>
                  </li>
                </ul>
              </div>
              <span class="top-menu-current" slot="reference">{{topProActive.name}}&nbsp;<i class="el-icon el-icon-arrow-down"></i></span>
            </el-popover>
          </el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 导航 -->
        <cmp-header-sub :tabList="tabs" :activeTab="currentTab" :pageType="`project`" :callFun="changeTab"></cmp-header-sub>

        <!-- 操作 -->
        <div class="menu-sub-right">
          <label class="mr-20" v-if="menuRight">
            <span class="icon-menu-sub" v-if="showPanel" @click="showPanel=false">
              <svg-icon icon-class="menu-panel" class-name="icon-panel icon-common g-pointer" style="font-size: 20px;"/>
            </span>
            <span class="icon-menu-sub" v-if="!showPanel" @click="showPanel=true">
              <svg-icon icon-class="menu-list" class-name="icon-panel icon-common g-pointer" style="font-size: 17px;" />
            </span>
          </label>

          <!-- 成员 -->
          <el-popover
          class="pop-wrap mr-20"
          placement="bottom-end"
          trigger="click">
            <div class="pop-wrap-search m-search-wrap">
              <div class="input-box">
                <el-input class="input-block" suffix-icon="el-icon-search" v-model="key" placeholder="输入姓名搜索"></el-input>
                <p class="m-tips mt-20 mb-10">最近</p>
              </div>
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
            <span slot="reference">
              <svg-icon icon-class="chengyuan" class-name="icon-chengyuan icon-common" style="font-size: 20px;"/>
            </span>
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
          <span class="operate" slot="reference">
            <svg-icon icon-class="more" class-name="icon-common g-pointer" style="font-size: 18px;"/>
            <!-- <i class="el-icon el-icon-more"></i> -->
          </span>
        </el-popover>
            
          </div>
        </div>
      </div>

      <div class="sub-content">
        <div class="sub-content-wrap">
          <!-- <router-view/> -->
          <component :is="currentTabCmp"></component>
        </div>
      </div>

      <!-- 项目设置 -->
      <cmp-dialog-pro-setting ref="dialogProSetting"></cmp-dialog-pro-setting>
    </div>
  </div>
</template>

<script>
import cmpDialogProSetting from './dialog/dialog-pro-setting'   // 项目设置
import cmpHeaderSub from '@cmp/header-sub'
import taskProject from './task'
import taskListProject from './task-list'
import exhibitsProject from './exhibits'
import fileProject from './file'
import discussProject from './discuss'
import statisticProject from './statistic'
export default {
  components: {
    cmpDialogProSetting,
    cmpHeaderSub,
    taskProject,
    taskListProject,
    exhibitsProject,
    fileProject,
    discussProject,
    statisticProject,
  },
  data() {
    return {
      showPanel: true,  // 显示面板视图
      dialogVisible: false,
      menuRight: false,
      // 顶部项目选择
      topProActive: {
        name: '烈火展项目',
        id: '1'
      },
      topProList: [
        {
          name: '烈火展项目',
          id: '1'
        },
        {
          name: '文创研发项目',
          id: '2'
        }
      ],
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
      showTop: false,   // 顶部项目选择面板
      popMenu: false,  // 显示菜单面板
      key: '',
      dialogData: [
        {
          name: '标准项目'
        }
      ],
    }
  },
  computed: {
    currentTab() {
      if(this.$route.path !== '/project/sub') return
      return this.$route.query.type
    },
    currentTabCmp() {
      if(this.currentTab === 'task' && !this.showPanel) {
        this.menuRight = true
        return 'taskListProject'  // 列表视图
      } else if(this.currentTab === 'task' && this.showPanel) {
        this.menuRight = true
      } else {
        this.menuRight = false
      }
      return this.currentTab && (this.currentTab + 'Project')
    }
  },
  methods: {
    // 选择项目
    clickTop(item) {
      this.topProActive = item
      this.showTop = false
    },
    // 点击菜单面板
    handleOperate(type) {
      this.popMenu = false
      console.log(type)
      if(type === 1) {
        // this.dialogVisible = true
        this.$refs.dialogProSetting.init()
      }
    },
    // 添加
    handleAdd() {

    },
    changeTab(path) {
      this.$router.push({path: '/project/sub', query: {type: path}})
      // this.$router.replace({path: '/project/sub', query: {type: path}})
    },
  },
}
</script>

<style lang="scss" scoped>
.g-sub-top {
  /deep/ .el-breadcrumb {
    font-size: 16px;
  }
  /deep/ .el-breadcrumb__inner.is-link {
    font-weight: normal;
  }
  .pro-menu {
    color: $color5 !important;
    cursor: pointer !important;
  }
  .top-menu-current {
    color: $primary !important;
    cursor: pointer !important;
  }
  .menu-sub-right {
    .icon-menu-sub {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
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
      &:hover {
        color: $primary;
        background-color: $color4;
      }
      &.active h2 {
        font-weight:bold;
      }
    }
  }
}
.pop-wrap-search.m-search-wrap {
  width: 260px;
}
</style>
