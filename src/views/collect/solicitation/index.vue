<!-- 藏品征集 -->
<template>
  <div class="g-wrap">
    <div class="page-collect clearfix">
       <!-- 顶部导航 -->
       <div class="g-collect-top">
        <cmp-header-sub :tabList="tabs" :activeTab="currentTab" :pageType="`collect`" :callFun="changeTab"></cmp-header-sub>
      </div>
       <!-- 侧边栏 -->
      <sidebar :menuList="sidebarData" :activeIndex="currentTabSide" class="sidebarCont"></sidebar>
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
      console.log('/collect/solicitation/' + arr[arr.length-1])
      return '/collect/solicitation/' + arr[arr.length-1]
    }
  },
  data() {
    return {
      currentTab: 'solicitation',
      sidebarData: [
        {
          name: '征集计划',
          icon: 'pro',
          index: '/collect/solicitation/plan'
        },
        {
          name: '藏品入馆',
          icon: 'pro',
          index: '/collect/solicitation/enter'
        },
        {
          name: '藏品建账',
          icon: 'pro',
          children: [
            {
              name: '藏品总账',
              index: '/collect/solicitation/totalLedger'
            },
            {
              name: '藏品分类账',
              index: '/collect/solicitation/typeAccount'
            },
            {
              name: '藏品辅助账',
              index: '/collect/solicitation/auxiliaryAccount'
            }
          ]
        },
        {
          name: '藏品入库',
          icon: 'pro',
          index: '/collect/solicitation/enterStore'
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
.content {
  padding: 30px 30px 30px 240px;
}

// 侧边栏样式
.cmp-sidebar {
  width: 180px;
  margin: 30px;
  border-radius: 5px;
}

</style>
