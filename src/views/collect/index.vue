<template>
  <div class="g-wrap">
    <div class="page-collect">
      <div class="g-sub-top">
        <cmp-header-sub :tabList="tabs" :activeTab="currentTab" @projectEventTab="changeTab"></cmp-header-sub>


      </div>
    </div>
  </div>
</template>


<script>
import cmpHeaderSub from '@cmp/header-sub'
export default {
  components: {
    cmpHeaderSub
  },
  data() {
    return {
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
  }
}
</script>

<style lang="scss" scoped>
.g-sub-top {
  justify-content: center;
}
</style>
