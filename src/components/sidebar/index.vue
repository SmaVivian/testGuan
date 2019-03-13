<template>
  <div class="cmp-sidebar">
    <el-menu
      :default-active="activeIndex"
      :default-openeds="openeds"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect">
      

      <div class="menu-box" v-for="(item, index) in menuList">
        <svg-icon :icon-class="item.icon" class-name="icon-menu" />
        <!-- 有子菜单 -->
        <el-menu-item :index="item.index" v-if="!item.children">
          <!-- <i :class="item.icon"></i> -->
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

        <!-- 无子菜单 -->
        <el-submenu :index="item.name" v-if="item.children">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <template v-for="(v, i) in item.children">
            <el-menu-item :index="v.index">{{v.name}}</el-menu-item>
          </template>
          <el-menu-item index="add" v-if="item.hasBtn" @click="addGroup">
            <svg-icon icon-class="add" class-name="icon-add" /><span class="m-btn">新建分组</span></el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: String,
      default: '/project'
    },
    // 默认展开的菜单 ['一级菜单index', '一级菜单index'...]
    openeds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    addGroup() {
      console.log('add')
    }
  }
}
</script>

<style lang="scss" scoped>
.cmp-sidebar {
  float: left;
  width: 200px;
  .menu-box {
    position: relative;
    .icon-menu {
      font-size: 17px;
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 2;
    }
    .icon-add {
      font-size: 14px;
    }
  }
  /deep/ .el-submenu__title {
    padding-left: 49px !important;
  }
  .el-menu-item {
    @include menuNav;
  }
  .el-menu-item.is-active {
    @include menuNavActive;
  }
}
</style>

<style lang="scss">
.cmp-sidebar {
  .el-menu {
    // border-right: none;
  }
}
</style>


