<template>
  <div class="g-wrap">
    <!-- 导航 -->
    <cmp-header-sub :tabList="tabs" :activeTab="currentTab" :callFun="changeTab"></cmp-header-sub>

    <div class="approve-content">
      <router-view/>
    </div>

    <cmp-footer></cmp-footer>
  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import cmpFooter from '@cmp/footer'
export default {
  components: {
    cmpHeaderSub,
    cmpFooter,
  },
  computed: {
    // 高亮
    currentTab() {
      return this.$route.path.split('/')[2]
    }
  },
  data() {
    return {
      // currentTab: 'start',
      tabs: [
        {
          name: '发起审批',
          path: 'start'
        },
        {
          name: '待我审批的',
          number: 2,
          path: 'pending'
        },
        {
          name: '我已审批的',
          path: 'done'
        },
        {
          name: '我发起的',
          path: 'mystart'
        },
        {
          name: '抄送我的',
          number: 23,
          path: 'copy'
        },
      ],
    }
  },
  methods: {
    changeTab(path) {
      // console.log(path)
      this.$router.push({path: '/approve/' + path})
      // this.$router.replace({path: '/collect', query: {type: path}})
    }
  }  
}
</script>

<style lang="scss" scoped>

</style>


