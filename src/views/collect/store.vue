<template>
  <div class="g-wrap">
    <div class="page-project clearfix">
      <!-- 顶部导航 -->
      <div class="g-collect-top">
        <top/>
      </div>
      <sidebar :menuList="sidebarData" :activeIndex="`/collect/basic`"></sidebar>
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
          <div class="add" v-for="(item, index) in 11" :key="index">           
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
import top from '@cmp/topbar'
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
export default {
  components: {
    cmpHeaderSub,
    sidebar,
    top
  },
  data() {
    return {
      sidebarData: [
        {
          name: '基本信息',
          icon: 'pro',
          index: '/collect/basic'
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


