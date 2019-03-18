<template>
  <div class="g-wrap">
    <div class="page-project clearfix">
      <sidebar :menuList="sidebarData" :activeIndex="`/project`"></sidebar>
      <div class="content">
        <div class="approvalContent">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">藏品管理</a></el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 内容 -->
          <h3 class="addTit">新增商品</h3>
          <ul class="pro-list">
            <el-row :gutter="50">
              <el-col class="box" :xs="6" :sm="8" :md="8" :xl="8" v-for="(item, index) in menuData" :key="index">
                <el-card class="box-card">
                  <div class="card-item" >
                    <div :class="'card-pic card-pic-' + (index+1)"></div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </ul>
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
      dialogVisible: false,
      menuData: [
        {
          name: '计划审核'
        },
        {
          name: '藏品入馆'
        },
        {
          name: '藏品出库'
        },
        {
          name: '藏品回库'
        }
      ],
      sidebarData: [
        {
          name: '发起审批',
          icon: 'pro',
          index: '/project'
        },
        {
          name: '我发起的',
          icon: 'pro',
          index: '/aa'
        },
         {
          name: '待我审批的',
          icon: 'pro',
          index: '/bb'
        },
      ],
      form: {
      name: '',
        region: ''
      },
    }
  },
  methods: {
    getNavData() {
      this.sidebarData.splice(1, 1)
    },
    handleClose() {
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
    },
    onSubmit(formName) {
      // this.$message('submit!')
      this.$refs[formName].validate((valid) => {
        if(valid) {
          let forms = this.form;
          console.log(111, { forms })
          console.log(222, { ...this.form })
          this.dialogVisible = false;
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
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
  .approvalContent {
    background-color: #fff;
    .addTit {
      display: block;
      margin: 15px 0 5px 30px;
    }
    .el-breadcrumb {
      height: 50px;
      line-height: 50px;
      padding: 10px 0 0px 30px;
      font-size: 18px;
    }
    .el-row {
      margin-right: 150px!important;
      padding: 0 0 100px 44px;
    }
    // .card-item {
    //   border: 1px dashed blue;
    // }
  }
  padding: 25px 30px 40px 240px;
  .pro-list {
    .box {
      margin-top: 50px;
    }
    .card-pic {
      height: 160px;
    }
    .card-pic-1 {
      @include bg(url(~@images/approval/collect-1.svg), '', '', contain)
    }
    .card-pic-2 {
      @include bg(url(~@images/approval/collect-2.svg), '', '', contain)
    }
    .card-pic-3 {
      @include bg(url(~@images/approval/collect-3.svg), '', '', contain)
    }
    .card-pic-4 {
      @include bg(url(~@images/approval/collect-4.svg), '', '', contain)
    }
    .box-card {
      border:4px solid transparent;
    }
    .box-card:hover {
      box-shadow:0px 1px 10px 0px rgba(238,239,245,1);
      border-radius:4px;
      border:4px solid rgba(5,144,255,1);
    }
    .card-item {
      cursor: pointer;
    }

  }
}
  .box {
    margin-bottom: 10px;
  }
  // 侧边栏样式
.cmp-sidebar[data-v-46eefe02] {
  margin: 30px 30px 0 30px;
  // float: none;
}

</style>


