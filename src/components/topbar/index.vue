<template>
  <div>
    <cmp-header-sub :tabList="tabs" :activeTab="currentTab"  :callFun="changeTab"></cmp-header-sub>
  </div>    
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
export default {
  components: {
    cmpHeaderSub,
  },
  data() {
    return {
      // 顶部导航栏数据
       currentTab: 'manage',
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
          path:'solicitation'
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
        },
      ],
    }  
  },
  methods: {
    changeTab(path) {
      this.$router.push({path: '/collect/' + path})
    },
  }
};
</script>

<style lang="scss" scoped>

</style>






