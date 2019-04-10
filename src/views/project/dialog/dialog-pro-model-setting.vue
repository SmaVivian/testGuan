<template>
  <div class="cmp-dialog-pro-setting">
    <el-dialog
      class="dialog-pro-setting"
      title="模板设置"
      :show-close="false"
      :close-on-click-modal="true"
      :visible.sync="dialogVisible"
      :width="'900px'">
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
      <h1>板块设置</h1>
      <div class="choose-list mb-20">
        <el-button
          v-for="(item, index) in dataList"
          :class="{'el-primary-border': item.active}"
          @click="handleClick(item)" 
          :key="index">
          <svg-icon icon-class="icon-set" :icon-class="item.active ? item.icon+'-active' : item.icon" style="font-size:14px;" />
          <img src="~@images/project/triangle.svg" class="bg" v-if="item.active">
          <!-- <i class="el-icon-edit"></i> -->
          {{item.name}}
        </el-button>
        <!-- <el-button class="el-primary-border">任务</el-button> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 创建项目模板 -->
    <cmp-pro-model ref="dialogProModel" @eventShow="init"></cmp-pro-model>
  </div>
</template>

<script>
import cmpProModel from './dialog-pro-model-add'  // 创建项目模板
export default {
  components: {
    cmpProModel
  },
  data() {
    return {
      dialogVisible: false,
      dataList: [
        {
          name: '任务',
          icon: 'task',
          active: true
        },
        {
          name: '展品',
          icon: 'exbihition',
          active: true
        },
        {
          name: '文件',
          icon: 'file',
          active: true
        },
        {
          name: '日程',
          icon: 'richen',
          active: true
        },
        {
          name: '讨论',
          icon: 'taolun',
          active: true
        },
        {
          name: '统计',
          icon: 'tongji',
          active: true
        },
      ]
    }
  },
  methods: {
    init() {
      this.dialogVisible = true
    },
    handleClick(item) {
      item.active = !item.active
    },
    onSubmit() {
      this.dialogVisible = false
      this.$refs.dialogProModel.init(this.dataList)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-pro-setting {
  .choose-list {
    .el-button {
      position: relative;
      border-radius: 4px;
      .bg {
        position: absolute;
        right: -1px;
        bottom: -1px;
      }
    }
    .el-button.el-primary-border{
      border-radius:4px;
    }
    .el-button.el-primary-border:hover,
    .el-button.el-primary-border:focus {
      border-color: #0590FF;
      color: #0590FF;
      background-color: #fff;
    }
  }
  /deep/  .el-dialog__title {
    font-weight: bold;
  }
  
}
</style>


