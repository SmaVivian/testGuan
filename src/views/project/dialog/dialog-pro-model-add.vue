<template>
  <div class="cmp-dialog-pro-model">
    <!-- 创建项目模板 -->
    <el-dialog
      class="dialog-pro-model"
      :visible.sync="dialogShow"
      :fullscreen="true"
      :show-close="false">
      <div class="wrap">
        <div class="header">
          <h1>
            创建项目模板
            <div class="btns fr">
              <el-button @click="dialogShow=false">取消</el-button>
              <el-button type="primary" @click="save">保存模板</el-button>
            </div>
          </h1>
          <div class="tab-box">
            <el-input class="name-in" v-model="form.name" placeholder="输入项目模板名称"></el-input>
            <cmp-header-sub :tabList="tabs" :activeTab="currentTab"></cmp-header-sub>
            <i class="el-icon el-icon-more g-pointer" style="color:#575962" @click="showModelSetting"></i>
          </div>
        </div>

        <div class="content-box">
          <div class="content">
            <el-row :gutter="20">
              <el-col :xs="6" :sm="6" :md="6" :xl="4" v-for="(item, index) in list" :key="index">
                <el-card class="box-card">
                  <h2>
                    <el-badge class="g-mark" :value="0" type="primary" />&nbsp;
                    {{item.name}}
                    <i class="el-icon el-icon-more fr"></i>
                  </h2>
                </el-card>
                <!-- <span class="operate" slot="reference" @click="clickMenu"><i class="el-icon el-icon-more"></i></span> -->
                <!-- <drag-list ref="drag" :list="item.arrList" :itemGroup="item" @showProDialog="showDialog"/> -->
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :xl="4">
                <el-card class="box-card panel-add-wrap">
                  <p class="panel-add m-assist" @click="addTaskPanel">
                    <svg-icon icon-class="add" class-name="icon-add" />&nbsp;新建任务看板
                  </p>
                  <!-- <el-button plain>新建任务看板</el-button> -->
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-dialog>

    <cmp-dialog-pro-setting ref="dialogProSetting" @eventSetting="eventSetting"></cmp-dialog-pro-setting>
  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import cmpDialogProSetting from './dialog-pro-model-setting'
export default {
  components: {
    cmpHeaderSub,
    cmpDialogProSetting,  // 模板设置
  },
  data() {
    return {
      dialogShow: false,
      settingData: '',  // 项目设置弹窗数据
      form: {
        name: ''
      },
      tabs: [
        {
          name: '任务',
          path: 'task'
        },
        {
          name: '展品',
          path: 'exhibits',
          isDisabled: true
        },
        {
          name: '文件',
          path: 'file',
          isDisabled: true
        },
        {
          name: '讨论',
          path: 'discuss',
          isDisabled: true
        },
        {
          name: '统计',
          path: 'statistic',
          isDisabled: true
        },
      ],
      list: [
        {
          name: '待处理'
        },
        {
          name: '进行中'
        },
        {
          name: '已完成'
        },
      ],
      currentTab: 'task',
    }
  },
  methods: {
    init() {
      this.dialogShow = true
    },
    showModelSetting() {
      this.$refs.dialogProSetting.init()
    },
    // 获取项目设置弹窗数据
    eventSetting(setData) {
      this.settingData = setData
      console.log('传入', this.settingData)
    },
    // 新建任务看板
    addTaskPanel() {
      this.$prompt('', '新建任务看板', {
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
    save() {
      console.log('ajax', this.form)
      this.dialogShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-pro-model {
  .header {
    background-color: #fff;
    h1 {
      padding: 0 30px;
      margin-bottom: 0;
      border-bottom: solid 1px $border;
      line-height: 76px;
    }
    .tab-box {
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 60px;
      .name-in {
        width: 200px;
        // position: absolute;
        // left: 30px;
        // top: 5px;
      }
    }
  }
  .content-box {
    padding: $paddingWidth;
    .content {
      .box-card {
        background-color: #fff;
        height: 700px;
        padding: 20px;
        box-sizing: border-box;
        .el-icon-more {
          position: relative;
          top: 5px;
        }
      }
      .panel-add-wrap {
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
  // 重写
  /deep/ .el-dialog {
    padding: 0;
    background-color: #F2F3F8;
  }
  /deep/ .el-dialog__header {
    display: none;
  }
}
</style>

