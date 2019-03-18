<template>
  <div class="cmp-header">
    <div class="header-left">
      <img class="logo" src="~@images/logo.svg" alt="">
      <h1>后台管理系统</h1>
    </div>
    <el-menu
    :default-active="activeMenu"
    class="el-menu-top"
    mode="horizontal"
    @select="handleSelect"
    background-color="#404560">
      <el-menu-item class="m-menu-top" index="/home">首页</el-menu-item>
      <el-menu-item class="m-menu-top" index="/project" >项目</el-menu-item>
      <el-menu-item class="m-menu-top" index="/collect?type=manage">藏品</el-menu-item>
      <el-menu-item class="m-menu-top" index="/digital">数字资产</el-menu-item>
    </el-menu>
    <div class="operate">
      <i class="el-icon el-icon-bell"></i>
      <i class="el-icon el-icon-search"></i>
      <label class="person">
        <img src="~@images/default-head.svg" alt="">
        <span class="m-assist">Jane</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    console.log(this.$route.path.split('/')[1])
    return {
      activeMenu: '/' + this.$route.path.split('/')[1]
      // activeMenu: [this.$route.meta.menuPath || this.$route.path]
    }
  },
  watch: {
    $route() {
      this.activeMenu = '/' + this.$route.path.split('/')[1]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },

    // onload() {
    //   window.location.reload()
    // }
  }
}
</script>

<style lang="scss" scoped>
.cmp-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: $headerHeight;
  background-color: #404560;
  .header-left {
    padding-left: 20px;
    margin-right: 130px;
    .logo {
      width: 50px;
      height: 50px;
      margin-right: 30px;
    }
    h1 {
      display: inline-block;
      color: #fff;
      line-height: 50px;
      margin-bottom: 0;
    }
  }
  .el-menu-top {
    flex: 1;
  }
  .operate {
    padding-right: 40px;
    // width: 200px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    .el-icon {
      margin-right: 30px;
    }
    .person {
      img {
        margin-right: 10px;
        display: inline-block;
        width: 40px;
        height: 40px;
        vertical-align: middle;
        border-radius: 100%;
      }
    }
  }

  
}
</style>

<style lang="scss" scoped>
.cmp-header {
  // 重置element-ui样式
  /deep/ .el-menu--horizontal > .el-menu-item {
    position: relative;
    min-width: 120px;
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    border-bottom: none;
    @include menuTop;
  }

  /deep/ .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: none;
    @include menuTopActive;
    &:after {
      content: '';
      display: block;
      @include bg(url('~@images/triangle.svg'), 26px, 6px);
      position: relative;
      left: 50%;
      margin-left: -13px;
    }
  }

  /deep/ .el-menu--horizontal .el-menu-item:not(.is-disabled):hover, 
  /deep/ .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    color: #fff;
    background-color: transparent !important;
  }

  .el-icon-search {
    font-size: 22px;
    color: #B5B1DD;
  }

  .el-icon-bell {
    font-size: 22px;
    color: #B5B1DD;
  }
  // .el-menu.el-menu--horizontal {
  //   border-bottom: none;
  // }
}
</style>


