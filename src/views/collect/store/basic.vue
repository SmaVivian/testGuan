<template>
  <div class="g-wrap">
    <div class="page-project">
      <div class="content">
        <div class="approvalContent">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>库房管理</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">基本信息</a></el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 内容 -->    
          <div class="addBox">
                <div class="add">
                <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">新增库房</a>
              </div>
              <div class="addContent" v-for="(item, index) in 14" :key="index">           
                <h4>青铜器库房</h4>
                <h3>存放藏品 : 34件</h3>
                <a class="m-btn look" @click="dialogLablectVisible = true" type="text" size="small">查看</a>
                <a class="m-btn del" @click="dialogLablectVisible = true" type="text" size="small">删除</a>
              </div>
          </div>
         </div>
        </div>
      </div>
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
      sidebarData: [
        {
          name: '基本信息',
          icon: 'pro',
          index: '/collect/store'
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
   padding: 0px!important;
   padding: 25px 30px 40px 240px;
    .approvalContent {
      // display: flex;
      border-radius: 5px;
      background-color: #fff;
        .el-breadcrumb {
          height: 50px;
          line-height: 50px;
          padding: 10px 0 0px 30px;
          font-size: 18px;
          font-weight: bold;
          color: #303133 !important;
        }
    }  
 }
  // 侧边栏样式
.cmp-sidebar[data-v-46eefe02] {
  margin: 30px 30px 0 30px;

}
 .add {
  width: 255px; 
  height: 155px;
  border: 1px dashed #0590FF;
  // 
     margin: 0 23px 30px 30px;
    .m-btn {
      line-height: 156px;
      margin-left: 35%;
    }
  }
 .contentList {
   width: 80%;
   background-color: #fff;
   
   .addContent:hover {
     border: 1px solid #0590FF;
   }
 }
 .addContent {
      width: 255px; 
      height: 156px;
      border: 1px solid #EBEDF2;
      // margin: 30px 10px 30px 40px;
          margin: 0 23px 30px 30px;
      .look {
        margin: 0px 100px 20px 47px;
      }
      .del {
        color: #F25151;
      }
      h4 {
        margin: 30px 0 17px 30px;
      }
      h3 {
        margin: 0 0 30px 30px;
      }
      m-btn:first-child {
        margin: 0 0 20px 47px;
      }
   }
   .addBox {
     display: flex;
     flex-wrap: wrap;
     padding: 15px 30px 30px 30px;
   }
/deep/.el-breadcrumb__inner {
            color: #303133;
            font-weight: bold;
          }
</style>


