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
      console.log('/collect/store/' + arr[arr.length-1])
      return '/collect/store/' + arr[arr.length-1]
    }
  },
  data() {
    return {
      currentTab: '/store',
      sidebarData: [
        {
          name: '基本信息',
          icon: 'basic',
          index: '/collect/store/basic'
        },
        {
          name: '库房盘点',
          icon: 'inventory',
          index: '/collect/store/inventory'
        },
        {
          name: '温度记录',
          icon: 'cangpgl',
          index: '/collect/store/temperature'
        }
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
.content {
  padding: 30px 30px 30px 265px;
}

// 侧边栏样式
.cmp-sidebar {
  margin: 20px 0 20px 0; 
}
</style>
