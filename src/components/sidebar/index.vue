<template>
  <div class="cmp-sidebar">
    <el-menu
      :default-active="activeIndex"
      :default-openeds="openeds"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect">

      <div class="menu-box" v-for="(item, index) in menuList" :key="index">
        <!-- 无子菜单 -->
        <el-menu-item :index="item.index" v-if="!item.children" :class="{'hasicon': item.icon}">
          <!-- <i :class="item.icon"></i> -->
          <span slot="title">{{item.name}}</span>
        </el-menu-item>

        <!-- 有子菜单 -->
        <el-submenu :index="item.name" v-if="item.children">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <div class="submenu-wrap" v-for="(v, i) in item.children" :key="i">
            <div class="operate">
              <span class="icon-box">
                <svg-icon icon-class="edit" class-name="icon icon-edit" />
              </span>
              <span class="icon-box">
                <svg-icon icon-class="dele" class-name="icon icon-dele" />
              </span>
            </div>
            <el-menu-item :index="v.index">{{v.name}}</el-menu-item>
          </div>
          <el-menu-item index="add" v-if="item.hasBtn" @click="addGroup">
            <svg-icon icon-class="add" class-name="icon-add" /><span class="m-btn">新建分组</span></el-menu-item>
        </el-submenu>

        <!-- 一级菜单图标 -->
        <svg-icon :icon-class="item.icon" class-name="icon-menu"/>
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
      default: '/home'
    },
    // 默认展开的菜单 ['一级菜单index', '一级菜单index'...]
    openeds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentSide: this.activeIndex
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
      this.currentSide = key
      this.$router.push(key)
      // console.log(key, keyPath)
    },
    addGroup() {
      console.log('add')
      this.common.prompt(() => {
        console.log('aaaaaaaa')
        // this.$router.push({path: '/login'});
      }, () =>{}, '新建分组', '所有内容', true, true)

      // this.common.confirm(() => {
      //   console.log('aaaaaaaa')
      //   // this.$router.push({path: '/login'});
      // }, () =>{}, '新建分组', '所有内容')
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
    overflow: hidden;
    .icon-menu {
      font-size: 17px;
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 2;
    }
    // &.is-active .icon-menu,
    &:hover .icon-menu {
      filter: drop-shadow(#0590FF 0 40px);
      top: -20px;
    }
    .icon-add {
      font-size: 14px;
    }
    .submenu-wrap {
      position: relative;
      .operate {
        display: none;
        position: absolute;
        right: 25px;
        top: 15px;
        z-index: 2;
        .icon-box {
          padding: 2px;
          &:hover {
            background-color: $color3;
            border-radius: 100%;
          }
          .icon {
            cursor: pointer;
            font-size: 20px;
            margin-top: -5px;
          }
        }
      }
      &:hover .operate,
      &:focus .operate {
        display: block;
      }
    }
  }
  /deep/ .el-submenu__title {
    padding-left: 49px !important;
  }
  .el-menu-item {
    @include menuNav;
    &.hasicon {
      padding-left: 40px !important;
    }
  }
  .el-menu-item.is-active {
    @include menuNavActive;
  }
  // 下一个svg图标变色
  .el-menu-item.is-active + svg.icon-menu,
  .el-submenu.is-active + svg.icon-menu {
    filter: drop-shadow(#0590FF 0 40px);
    top: -20px;
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


