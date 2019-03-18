<template>
  <div class="g-wrap">
    <div class="page-project-sub">
        <!-- 顶部导航 -->
      <div class="g-collect-top">
        <cmp-header-sub :tabList="tabs" :activeTab="currentTab" :pageType="`collect`" @collectEventTab="changeTab"></cmp-header-sub>
      </div>
      <div class="sub-content">
        <div class="sub-content-wrap">
          <component :is="current"></component>
        </div>
      </div>
      
    </div>
  </div>
  
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import manageCollection from './manage'
import approvalCollection from './approval'
import solicitationCollection from './solicitation'
import outGoingCollection from './outGoing'
import repairCollection from './repair'
import allocationCollection from './allocation'
import storageCollection from './store'
export default {
  components: {
    cmpHeaderSub,
    manageCollection,
    approvalCollection,
    solicitationCollection,
    outGoingCollection,
    repairCollection,
    allocationCollection,
    storageCollection
  },
  data() {
    return {
      // currentTab: 'task',
       sidebarData: [
        {
          name: '藏品管理',
          icon: 'pro',
          index: '/collect'
        },
      ],
      tabs: [
         {
          name: '商品管理',
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
          path: 'storage'
        },
      ],

      flag: true
    }
  },
  computed: {
    currentTab() {
      if(this.$route.path !== '/collect') return
        // console.log(this.$route.query.type + '---')
      return this.$route.query.type
    },
    current() {
        // console.log(this.currentTab + '111')
      return this.currentTab && (this.currentTab + 'Collection')
    },

    timeout() {
        // setTimeout(() => {
            this.flag = false
        // })
    }
  },
  methods: {
    changeTab(path) {
      this.$router.replace({path: '/collect', query: {type: path}})
    }
  },
  mounted(){
      
  },
  created(){
      if(this.flag) {
        //   window.location.reload();
      }
  }
}
</script>

<style lang="scss" scoped>
.g-wrap {
  background-color: #F2F3F8;
    .g-collect-top{
        padding: 10px 180px;
        background-color: #fff;
    }
}
    
</style>
