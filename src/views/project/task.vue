<template>
  <div class="page-project-task">
    <!-- <div class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <cmp-header-sub></cmp-header-sub>
      <div class="menu-sub-right">
        <span>看板视图</span>
        <span>2</span>
        <span>菜单</span>
      </div>
    </div> -->

    <div class="content">
      <el-row :gutter="20">
        <el-col :xs="6" :sm="6" :md="6" :xl="4" v-for="(item, index) in list" :key="index">
          <drag-list ref="drag" :list="item.arrList" :itemGroup="item" @showProDialog="showDialog"/>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :xl="4">
          <el-card class="panel-add-wrap">
            <p class="panel-add m-assist"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;新建任务看板</p>
            <!-- <el-button plain>新建任务看板</el-button> -->
          </el-card>
        </el-col>
      </el-row>
    </div>

    <cmp-dialog-pro ref="dialogPro" :dialogData="dialogData"></cmp-dialog-pro>
  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import DragList from '@cmp/drag-list'
import cmpDialogPro from './dialog/dialog-pro'
export default {
  components: {
    cmpHeaderSub,
    DragList,
    cmpDialogPro
  },
  data() {
    return {
      list: [
        {
          title: '标题1',
          arrList: [
            { name: "1列表", id: 1 },
            { name: "12列表", id: 2 },
            { name: "13列表", id: 3 },
            { name: "14列表", id: 4 }
          ],
        },
        {
          title: '标题2',
          arrList: [
            { name: "21列表", id: 5 },
            { name: "22列表", id: 6 },
            { name: "23列表", id: 7 },
            { name: "23列表", id: 71 },
            { name: "23列表", id: 72 },
            { name: "23列表", id: 73 },
            { name: "23列表", id: 74 },
            { name: "23列表", id: 75 },
          ],
        },
        {
          title: '标题3',
          arrList: [
            { name: "31列表", id: 8 },
            { name: "32列表", id: 9 },
            { name: "33列表", id: 10 }
          ],
        },
      ],
      dialogData: {}
    }
  },
  methods: {
    hidePanel() {
      // debugger
      // for(let i = 0; i < this.$refs.drag.length; i++) {
      //   this.$refs.drag[i].hidePanel()
      // }
    },
    showDialog() {
      this.$refs.dialogPro.initDialogData()
    }
  },
  mounted() {
    document.addEventListener('click', this.hidePanel, false)
  },
  beforeDestroy() {
    // this.$store.dispatch('ToggleBodyClick', false)
    document.removeEventListener('click', this.hidePanel, false)
  }
}
</script>

<style lang="scss" scoped>
.page-project-task {
  .content {
    padding: 30px;
    padding-bottom: 0;
    .panel-add-wrap {
      padding: 20px;
      height: 700px;
      box-sizing: border-box;
      .panel-add {
        padding: 0 20px;
        background:rgba(241,242,247,1);
        border-radius:4px;
        line-height: 54px;
        cursor: pointer;
      }
    }
  }
}
</style>

