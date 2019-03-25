<!-- 导入展品 -->
<template>
  <el-dialog
    class="dialog-import-collect"
    :visible.sync="dialogShow"
    :fullscreen="true"
    :show-close="false">
    <div class="wrap">
      <!-- 头部 -->
      <div class="header">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">书画展项目</el-breadcrumb-item>
          <el-breadcrumb-item>导入展品</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 已选择 -->
        <h3>
          <svg-icon icon-class="add" class-name="icon-info" />
          已选择2项
          <i class="g-line-split gray ml-20 mr-20"></i>
          <span class="m-btn">清空</span>
        </h3>

        <!-- 操作 -->
        <div class="btns">
          <el-button @click="dialogShow=false">取消</el-button>
          <el-button type="primary" @click="add">添加</el-button>
        </div>
      </div>

      <div class="content-box">
        <!-- 侧边栏 -->
        <sidebar :menuList="sidebarData" :activeIndex="`/project`"></sidebar>

        <!-- 列表 -->
        <div class="content">
          <div class="collect-list-box">
            <div class="total-box"><h3><strong>20</strong>件藏品</h3></div>
            <h1 class="title">明清书画</h1>
            <h3>2018-6-11 18:10创建<span class="m-btn fr">全选</span></h3>

            <el-row class="collect-list">
              <el-col :span="4" class="it" v-for="item in 10">
                <label class="my-checkbox el-checkbox__input" 
                  :class="{'is-checked': item === 1}"
                  @click.stop="toggleCheck(item)">
                  <span class="el-checkbox__inner"></span>
                </label>
                <img src="~@images/default-pic.svg" alt="" srcset="">
                <h4 class="tc ell">唐玛瑙花瓣盆</h4>
                <!-- <el-checkbox-group v-model="checkList">
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="禁用" disabled></el-checkbox>
                  <el-checkbox label="选中且禁用" disabled></el-checkbox>
                </el-checkbox-group> -->
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import sidebar from '@cmp/sidebar'
export default {
  components: {
    sidebar,
  },
  data() {
    return {
      checkList: ['选中且禁用','复选框 A'],
      dialogShow: false,
      sidebarData: [
        {
          name: '我的收藏夹',
          icon: '',
          index: '/project',
        },
        {
          name: '明清书画（20）',
          icon: 'pro',
          index: '/aa1'
        },
        {
          name: '明清书画（20）',
          icon: 'pro',
          index: '/aa'
        },
      ],
    }
  },
  methods: {
    init() {
      this.dialogShow = true
    },
    // 选择
    toggleCheck(item) {
      console.log(item)
      item = 2;
    },
    add() {

    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-import-collect {
  .wrap {
    min-width: $minWidth;
  }
  .header {
    padding: 0 30px;
    margin-bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: 60px;
    background-color: #fff;
    h3 {
      padding-left: 50px;
      flex: 1;
    }
  }
  .content-box {
    padding: $paddingWidth;
    .content {
      padding-left: 230px;
      .collect-list-box {
        position: relative;
        padding: $paddingWidth;
        border-radius:4px;
        background-color: #fff;
        .title {
          margin-bottom: 20px;
        }
        .total-box {
          position: absolute;
          right: 30px;
          top: 30px;
          strong {
            font-size: 30px;
            color: $color5;
          }
        }
        .collect-list {
          margin-top: 30px;
          .it {
            position: relative;
            padding: 35px;
            .my-checkbox {
              position: absolute;
              top: 10px;
              left: 10px;
            }
            img {
              width: 92px;
              height: 92px;
            }
            h4 {
              width: 115px;
              position: absolute;
              left: 25px;
              bottom: 0;
            }
          }
        }
      }
    }
  }
  /deep/ .el-dialog {
    padding: 0;
    background-color: #F2F3F8;
  }
  /deep/ .el-dialog__header {
    display: none;
  }
}
</style>


