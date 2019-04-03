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
          <drag-list ref="drag" :list="item.arrList" :itemGroup="item" :lastPersonList="lastPersonList" @showProDialog="showDialog" :callFun="addTaskPanel"/>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :xl="4">
          <el-card class="panel-add-wrap">
            <p class="panel-add m-assist" @click="addTaskPanel()"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;新建任务看板</p>
            <!-- <el-button plain>新建任务看板</el-button> -->
          </el-card>
        </el-col>
      </el-row>
    </div>

    <cmp-task-detail ref="dialogPro" :dialogData="dialogData"></cmp-task-detail>
  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import DragList from '@cmp/drag-list'
import cmpTaskDetail from './dialog/dialog-task-detail'
export default {
  components: {
    cmpHeaderSub,
    DragList,
    cmpTaskDetail
  },
  data() {
    return {
      list: [
        {
          title: '标题1',
          leader: '胡强',
          id: 1111,
          arrList: [
            { name: "1列表", id: 1 },
            { name: "12列表", id: 2 },
            { name: "13列表", id: 3 },
            { name: "14列表", id: 4 }
          ],
        },
        {
          title: '标题2',
          leader: '',
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
          leader: '',
          arrList: [
            { name: "31列表", id: 8 },
            { name: "32列表", id: 9 },
            { name: "33列表", id: 10 }
          ],
        },
      ],
      // 最常协作列表
      lastPersonList: [
        {
          name: '冯绍峰',
          id: 1
        },
        {
          name: '冯绍峰2',
          id: 2
        },
        {
          name: '冯绍峰3',
          id: 3
        },
        {
          name: '冯绍峰4',
          id: 4
        },
        {
          name: '冯绍峰5',
          id: 6
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
    },
    // 新建、修改任务看板
    addTaskPanel(title) {
      this.$prompt('', title || '新建任务看板', {
        showClose: true,
        showCancelButton: false,
        confirmButtonText: '确定',
        inputPlaceholder: '看板名称',
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

