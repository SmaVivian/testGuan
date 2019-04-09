<!-- 藏品审批 -->
<template>
  <div class="g-wrap">
    <div class="page-collect clearfix">
       <!-- 顶部导航 -->
       <div class="g-collect-top">
        <cmp-header-sub :tabList="tabs" :activeTab="currentTab" :pageType="`collect`" :callFun="changeTab"></cmp-header-sub>
      </div>
      <!-- 侧边栏 -->
      <div class="con">
        <sidebar :menuList="sidebarData" :activeIndex="currentTabSide" class="sidebarCont"></sidebar>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
export default {
  components: {
    cmpHeaderSub,
    sidebar,
  },
  computed: {
    // 左侧导航
    currentTabSide() {
      let arr = this.$route.path.split('/');
      console.log('/collect/approval/' + arr[arr.length-1])
      return '/collect/approval/' + arr[arr.length-1]
    }
  },
  data() {
    return {
      currentTab: 'approval',
      sidebarData: [
        {
          name: '发起审批',
          icon: 'Launch',
          index: '/collect/approval/lanch'
        },
        {
          name: '我发起的',
          icon: 'approval',
          index: '/collect/approval/myLanch'
        },
        {
          name: '待我审批的',
          icon: 'myLaunch',
          index: '/collect/approval/wait'
        },
      ],

      tabs: [
        {
          name: '藏品管理',
          path: 'manage'
        },
        {
          name: '审批',
          path: 'approval'
        },
        {
          name: '藏品征集',
          path: 'solicitation'
        },
        {
          name: '出库管理',
          path: 'outGoing'
        },
        {
          name: '藏品修复',
          path: 'repair'
        },
        {
          name: '藏品调拨',
          path: 'allocation'
        },
        {
          name: '库房管理',
          path: 'store'
        }
      ]
    }
  },
  methods: {
    //  顶部导航栏
    changeTab(path) {
      this.$router.push({path: '/collect/' + path})
    },
  }
}
</script>


<style lang="scss" scoped>
// 侧边栏样式
.cmp-sidebar {
  border-radius: 5px;
  margin: 20px 0 20px 0;
}

</style>
