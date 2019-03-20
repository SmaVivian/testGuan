<template>
  <div class="g-wrap">
    <div class="page-project clearfix">
      <sidebar :menuList="sidebarData" :activeIndex="`/project`"></sidebar>
      <div class="content">
        <div class="approvalContent">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">库房管理</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">基本信息</a></el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 内容 -->
         <div class="add">
           <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">标签</a>
         </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import sidebar from '@cmp/sidebar'
export default {
  components: {
    sidebar
  },
  data() {
    return {
      sidebarData: [
        {
          name: '基本信息',
          icon: 'pro',
          index: '/project'
        },
        {
          name: '库房盘点',
          icon: 'pro',
          index: '/aa'
        },
         {
          name: '温度记录',
          icon: 'pro',
          index: '/bb'
        },
      ],
    }
  },
  methods: {
   
  },
  created() {
    // setTimeout(this.getNavData, 1000)
  },
  activated() {
    // this.$store.dispatch('changeBodyBg', 'bg1')
  },
  deactivated() {
    // this.$store.dispatch('changeBodyBg', '')
  }
}
</script>

<style lang="scss" scoped>
.content {
  .approvalContent {
    background-color: #fff;
    .el-breadcrumb {
      height: 50px;
      line-height: 50px;
      padding: 10px 0 0px 30px;
      font-size: 18px;
    }
  }
  padding: 25px 30px 40px 240px;
 
  
}
  // 侧边栏样式
.cmp-sidebar[data-v-46eefe02] {
  margin: 30px 30px 0 30px;

}
 .add {
    width: 255px;
    height: 155px;
    border: 1px dashed #0590FF;
    margin: 30px;
    .m-btn {
     text-align: center;
    }
  }
</style>


