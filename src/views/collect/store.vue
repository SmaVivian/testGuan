<template>
  <div class="g-wrap">
    <div class="page-project clearfix">
       <!-- 顶部导航 -->
       <div class="g-collect-top">
        <cmp-header-sub :tabList="tabs" :activeTab="currentTab"  :callFun="changeTab"></cmp-header-sub>
      </div>
      <sidebar :menuList="sidebarData" :activeIndex="`/project`"></sidebar>
      <div class="content">
        <div class="approvalContent">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">库房管理</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">基本信息</a></el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 内容 -->
         <div class="add ">
           <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">新增库房</a>
         </div>
         <div class="add">           
           <h4>青铜器库房</h4>
            <h3>存放藏品 : 34件</h3>
            <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">查看</a>
            <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">删除</a>
         </div>
        </div>
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
    sidebar
  },
  data() {
    return {
    
      currentTab: 'store',
      // 顶部导航栏数据
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
      sidebarData: [
        {
          name: '基本信息',
          icon: 'pro',
          index: '/basic'
        },
        {
          name: '库房盘点',
          icon: 'pro',
          index: '/inventory'
        },
         {
          name: '温度记录',
          icon: 'pro',
          index: '/temperature'
        },
      ],
    }
  },
  methods: {
    //  顶部导航栏
     changeTab(path) {
      this.$router.push({path: '/collect/' + path})
    },
   
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
  padding: 25px 30px 40px 270px!important;
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
     line-height: 156px;
     margin-left: 35%;
    }
  }
</style>


