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
      <el-menu-item class="m-menu-top" index="/project">项目</el-menu-item>
      <el-menu-item class="m-menu-top" index="/collect/manage?type=manage">藏品</el-menu-item>
      <el-menu-item class="m-menu-top" index="/approve">审批</el-menu-item>
      <el-menu-item class="m-menu-top" index="/digital">数字资产</el-menu-item>
    </el-menu>
    <div class="operate">
      <el-badge :value="12" class="el-icon">
        <!-- <el-button size="small">评论</el-button> -->
        <i class="el-icon-bell g-pointer"></i>
      </el-badge>
      <!-- <i class="el-icon el-icon-search g-pointer" v-if="!showSearch" @click="showSearch=true;blurFocus=true;"></i> -->
      <i class="el-icon el-icon-search g-pointer" v-if="!showSearch" @click="showSearchBox"></i>
      
      <el-input ref="customerInput" class="input-block mr-20" suffix-icon="el-icon-search g-icon-search" 
        style="width:300px;" 
        placeholder="输入关键字" 
        @keyup.enter.native="goSearch"
        @blur="showSearch=false"
        v-if="showSearch" 
        v-model="key">
      </el-input>
      <el-upload
        class="g-inline-block"
        action=""
        :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <img class="head-pic" :src="$store.state.user.headImg || ''" alt="" :onerror="defaultHeadImg">
      </el-upload>
      <label class="person ml-10">
        <span class="m-assist">Jane</span>
      </label>
      <span class="m-assist ml-20 g-pointer" @click="loginOut">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    console.log('head', this.$store.state.app.defaultHeadImg)
    return {
      // headPic: $store.state.app.defaultHeadImg,
      // headPic: '',
      blurFocus: true,
      defaultHeadImg: this.$store.state.app.defaultHeadImg,
      activeMenu: '/' + (this.$route.path.split('/')[1] === 'collect' ? 'collect/manage?type=manage': this.$route.path.split('/')[1]),
      // activeMenu: [this.$route.meta.menuPath || this.$route.path]
      key: '',
      showSearch: false,
    }
  },
  watch: {
    $route() {
      this.activeMenu = '/' + this.$route.path.split('/')[1]
    }
  },
  methods: {
    goSearch() {
      console.log('搜索', this.key)
    },
    // 显示搜索框
    showSearchBox() {
      this.showSearch = true
      this.$nextTick(() => {
        this.$refs.customerInput.$el.querySelector('input').focus()
      })
    },
    // 上传
    beforeAvatarUpload(file) {
      // if(this.accept.split(',').indexOf(file.type) === -1) {
      //   this.$message.warning('请上传正确的视频格式');
      // }
      console.log('file', file)
      console.log('类型', file.type)

      let fd = new FormData()
      fd.append('file', file)
      fd.append('tableName', 'bsScheme')  // 所属业务名
      fd.append('tableId', '') // 所属业务ID

      this.$http.post('/user/updateUserImg', fd)
      .then((res) => {
        console.log('res', res)
        if(res.success) {
          this.$message.success('上传成功')
          this.$store.commit('SET_USER_INFO', {
            headImg: res.result.absolutePath
          })
          Cookies.set('headImg', data.image, { expires: 7 })
        } else {
          this.$message.error(res.message)
        }
      })
      return true
    },
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },
    loginOut() {
      this.$store.dispatch('LoginOut')
    }
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
    margin-right: 30px;
    // margin-right: 130px;
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
  .head-pic {
    width: 40px;
    height: 40px;
    border-radius: 100%;
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
// 重置element-ui样式
.cmp-header {
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


