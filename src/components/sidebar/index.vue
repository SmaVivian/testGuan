<template>
  <div class="cmp-sidebar">
    <el-menu
      :default-active="activeIndex"
      :default-openeds="openeds"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect">

      <div class="menu-box" v-for="(item, index) in renderMenuList" :key="index">
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
            <div class="operate" v-if="v.isEdit">
              <span class="icon-box" @click="handleEdit(v)">
                <svg-icon icon-class="edit" class-name="icon icon-edit" />
              </span>
              <span class="icon-box" @click="handleDele(v)">
                <svg-icon icon-class="dele" class-name="icon icon-dele" />
              </span>
            </div>
            <el-menu-item :index="v.index">{{v.name}}</el-menu-item>
          </div>
          <!-- <el-menu-item index="/noJump?type=add" v-if="item.hasBtn" @click="addGroup">
            <svg-icon icon-class="add" class-name="icon-add" />&nbsp;<span class="m-btn">新建分组</span>
          </el-menu-item> -->
        </el-submenu>
        <li class="el-menu-item el-menu-add" v-if="item.hasBtn" @click="addGroup">
          <span><svg-icon icon-class="add" class-name="icon-add" />&nbsp;新建分组</span>
        </li>

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
    },
    callFun: Function
  },
  computed: {
    renderMenuList() {
      return this.menuList
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
    // 选中菜单
    handleSelect(key, keyPath) {
      //不跳转页面
      if(key.split('?')[0] === '/noJump') {
        this.callFun && this.callFun(key)
        return
      }
      
      this.currentSide = key
      this.$router.push(key)
      // debugger
      console.log(key, keyPath)
    },
    // 新建分组
    addGroup(item, title) {
      console.log('add')
      this.$prompt('', title || '新建分组', {
        showClose: true,
        showCancelButton: false,
        confirmButtonText: '确定',
        inputValue: item && item.name,
        inputPlaceholder: '分组名称',
        inputPattern: /^[\S]{2,6}$/,
        inputErrorMessage: '请输入2到5位非空字符',
        // center: true
      }).then(({ value }) => {
        console.log(value)
        // this.$message({
        //   type: 'success',
        //   message: '你的邮箱是: ' + value
        // });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });       
      });
    },
    // 编辑分组
    handleEdit(item) {
      this.addGroup(item, '重命名项目分组')
      console.log(item)
    },
    // 删除分组
    handleDele(item) {
      console.log(item)
      this.$common.confirm({
        title: '删除项目分组',
        content: '所有内容将无法找回，请谨慎操作',
      }, () => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cmp-sidebar {
  float: left;
  width: 200px;
  .menu-box {
    // height: 94px;
    position: relative;
    overflow: hidden;
    .icon-menu {
      width: 17px;
      height: 17px;
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 2;
    }
    // &.is-active .icon-menu,
    &:hover .icon-menu {
      // fill: $primary;
    }
    .icon-add {
      font-size: 12px;
      color: $primary;
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
    .el-menu-add {
      padding-left: 23px;
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
    // margin-top: 20px;
    @include menuNavActive;
  }
  // 下一个svg图标变色
  .el-menu-item.is-active + svg.icon-menu {
    fill: $primary;
  }
  .el-submenu.is-active + svg.icon-menu {
    // fill: $primary;
  }
}

</style>


