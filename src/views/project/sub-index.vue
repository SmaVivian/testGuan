<template>
  <div class="g-wrap">
    <div class="page-project-sub">
      <div class="g-sub-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <!-- 头部菜单面板 -->
            <el-popover
              class="pop-wrap"
              v-model="showTop"
              placement="bottom-start"
              trigger="click">
              <div class="pop-wrap-top m-search-wrap">
                <ul>
                  <li class="active" @click="clickTop">
                    <h2>烈火展项目</h2>
                    <i class="el-icon el-icon-check"></i>
                  </li>
                  <li @click="clickTop">
                    <h2>文创研发项目</h2>
                  </li>
                </ul>
              </div>
              <a class="top-menu-current" href="javascript:;" slot="reference">活动管理&nbsp;<i class="el-icon el-icon-arrow-down"></i></a>
            </el-popover>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <cmp-header-sub :tabList="tabs" :activeTab="currentTab" :pageType="`project`" @projectEventTab="changeTab"></cmp-header-sub>
        <div class="menu-sub-right">
          <span class="mr-20">看板视图</span>

          <!-- 成员 -->
          <el-popover
          class="pop-wrap mr-20"
          placement="bottom-end"
          trigger="click">
            <div class="pop-wrap-search m-search-wrap">
              <el-input class="input-block" v-model="key" placeholder="输入姓名搜索"></el-input>
              <p class="m-tips mt-20">最近</p>
              <ul>
                <li>
                  <img src="~@images/default-head.svg" alt="">
                  <h3>冯绍峰</h3>
                  <i class="el-icon el-icon-check mr-20"></i>
                </li>
                <li >
                  <img src="~@images/default-head.svg" alt="">
                  <h3>冯绍峰</h3>
                  <el-button class="el-primary-border mini" size="mini" @click="handleAdd">添加</el-button>
                  <!-- <svg-icon icon-class="add" class-name="icon-add" /> -->
                </li>
              </ul>
            </div>
            <span class="mr-20" slot="reference">2人</span>
          </el-popover>

          <!-- 菜单 -->
          <el-popover
          class="pop-wrap mr-20"
          v-model="popMenu"
          placement="bottom-end"
          trigger="click">
          <div class="operate-box">
            <!-- 菜单悬浮面板 -->
            <div class="m-panel">
              <h3 class="active" @click="handleOperate(1)">项目设置</h3>
              <h3 @click="handleOperate(2)">项目归档</h3>
            </div>
          </div>
          <span class="operate" slot="reference"><i class="el-icon el-icon-more"></i></span>
          <!-- <span class="operate" slot="reference">···</span> -->
        </el-popover>
            
          </div>
        </div>
      </div>

      <div class="sub-content">
        <div class="sub-content-wrap">
          <component :is="currentTabCmp"></component>
        </div>
      </div>

      <el-dialog
        class="dialog-pro"
        title="项目设置"
        :show-close="false"
        :visible.sync="dialogVisible"
        :width="'900px'"
        :before-close="handleClose">
        <!-- <span>这是一段信息</span> -->
        <div class="clearfix">
          <div class="pro-list g-dialog-pro tc">
            <el-card class="box-card" style="width: 260px;display: inline-block;">
              <router-link class="card-item" tag="div" :to="{path: '/project/sub?type=task'}">
                <div class="card-pic card-pic-1"></div>
                <p class="name tc">标准项目</p>
              </router-link>
            </el-card>
          </div>
          <div class="m-btn tc mb-30 mt-30">
            <el-button class="el-primary-border">上传新封面</el-button>
          </div>
        </div>
        <h1>项目信息</h1>
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item class="mb-30" label="" prop="name">
            <el-input autofocus v-model="form.name" placeholder="项目名称"/>
          </el-form-item>
      
          <!-- 下拉框静态 -->
          <el-form-item class="mb-20" label="" prop="region">
            <el-select v-model="form.region" placeholder="项目分组（可多选）" style="display:block;">
              <el-option label="上海" value="shanghai"/>
              <el-option label="北京" value="beijing"/>
            </el-select>
          </el-form-item>
        </el-form>
        <p class="m-assist">公开范围：仅项目组成员可见</p>
        <span slot="footer" class="dialog-footer">

          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
        </span>
      </el-dialog>
    
    </div>
  </div>
</template>

<script>
import CmpHeaderSub from '@cmp/header-sub'
import TaskProject from './task'
import ExhibitsProject from './exhibits'
import FileProject from './file'
import DiscussProject from './discuss'
import StatisticProject from './statistic'
export default {
  components: {
    CmpHeaderSub,
    TaskProject,
    ExhibitsProject,
    FileProject,
    DiscussProject,
    StatisticProject,
  },
  data() {
    return {
      dialogVisible: false,

      // currentTab: 'task',
      tabs: [
        {
          name: '任务',
          path: 'task'
        },
        {
          name: '展品',
          path: 'exhibits'
        },
        {
          name: '文件',
          path: 'file'
        },
        {
          name: '讨论',
          path: 'discuss'
        },
        {
          name: '统计',
          path: 'statistic'
        },
      ],
      showTop: false,
      popMenu: false,  // 显示菜单面板
      key: '',

      dialogData: [
        {
          name: '标准项目'
        }
      ],
      form: {
      name: '',
        region: ''
      },
      rules: {
        name: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择项目分组', trigger: 'change'}
        ]
      }
    }
  },
  computed: {
    currentTab() {
      if(this.$route.path !== '/project/sub') return
      return this.$route.query.type
    },
    currentTabCmp() {
      return this.currentTab && (this.currentTab + 'Project')
    }
  },
  methods: {
    // 面包屑菜单
    clickTop() {
      this.showTop = false
    },
    // 点击菜单面板
    handleOperate(type) {
      this.popMenu = false
      console.log(type)
      if(type === 1) {
        this.dialogVisible = true
      }
    },
    // 添加
    handleAdd() {

    },
    changeTab(path) {
      this.$router.replace({path: '/project/sub', query: {type: path}})
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
}
</script>

<style lang="scss" scoped>
.g-sub-top {
  .top-menu-current {
    color: $primary !important;
    cursor: pointer !important;
  }
  .menu-sub-right {
    .pop-wrap {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }
  }
}
.pop-wrap-top.m-search-wrap {
  width: 200px;
  padding: 15px 0;
  ul {
    padding-right: 0;
    li {
      padding: 0 30px;
      margin-top: 0;
      line-height: 46px;
      h2 {
        font-weight: normal;
      }
      &:hover,
      &.active {
        color: $primary;
        background-color: $color4;
      }
    }
  }
}
.pop-wrap-search.m-search-wrap {
  width: 260px;
}
</style>
