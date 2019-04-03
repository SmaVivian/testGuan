<template>
  <div class="cmp-dialog-pro">
    <el-dialog 
      :visible.sync="dialogShow" 
      width="900px">
      <svg-icon icon-class="dele-red" class-name="icon-dele" />
      <!-- 显示状态 -->
      <h1 class="title" v-if="!showTitleEdit" @click="showTitleEdit=true">组织展览主题文档评审<span class="m-btn">（ 展览策划<i class="el-icon el-icon-arrow-down"></i> ）</span></h1>
      <!-- 编辑状态 -->
      <h1 class="title" v-if="showTitleEdit" style="width: 800px;">
        <el-input v-model="form.name" style="width: 500px;"></el-input>
        <span v-if="showTitleEdit">
          <el-button class="ml-20" @click="showTitleEdit=false">取消</el-button>
          <el-button class="ml-20" type="primary">确定</el-button>
        </span>
      </h1>

      <div class="content">
        <!-- 表单 -->
        <el-form class="form-content form-wrap" ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="负责人">
            <el-popover
            class="pop-wrap"
            placement="top-start"
            v-model="isLeaderList"
            trigger="click">
              <!-- 搜索负责人列表 悬浮面板 -->
              <cmp-leader-list ref="cmpLeaderList" :itemGroup="form" :callFun="handleChooseAdd"></cmp-leader-list>
              <div class="item item-person g-inline-block g-pointer" slot="reference" @click="showLeaderList">
                <img class="mr-20" src="~@images/default-head.svg" alt="">
                <span>{{form.leader}}</span>
              </div>
            </el-popover>
          </el-form-item>
          
          <el-form-item label="截止时间" prop="date1">
            <el-date-picker class="cus-btn-date" placeholder="选择截止时间" 
              type="date"
              :clearable="true" 
              v-model="form.date1"  
              :value-format="'yyyy-MM-dd'">
            </el-date-picker>
            <!-- <el-input v-model="form.name"></el-input> -->
          </el-form-item>
          
          <el-form-item label="优先级" prop="status">
            <!-- 下拉框 -->
            <el-select 
              class="cus-btn-sel"
              :class="'status' + form.status"
              v-model="form.status" 
              placeholder="添加标签">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-button type="danger" size="mini" plain>非常紧急</el-button> -->
          </el-form-item>

          <el-form-item label="任务描述" prop="desc">
            <p class="m-des g-pointer" v-if="!showDesc" @click="showDesc=true">{{form.desc}}</p>
            <el-input type="textarea" v-if="showDesc" v-model="form.desc" style="width:100%;"></el-input>

            <div class="bottom tr mt-20" v-if="showDesc">
              <el-button @click="showDesc=false">取消</el-button>
              <el-button type="primary">确定</el-button>
            </div>
          </el-form-item>

          <el-form-item label="子任务">
            <span class="m-btn" v-if="!showSub" @click="showSub=true;showSubInput=true;"><svg-icon icon-class="add" class-name="icon-add" />添加子任务</span>

            <!-- 子任务 -->
            <div class="sub-pro" v-if="showSub">
              <!-- 子任务列表 -->
              <ul class="sub-pro-list">
                <li class="clearfix" v-for="(item, index) in subList" :key="index">
                  <el-checkbox></el-checkbox>
                  <!-- <svg-icon icon-class="add" class-name="icon-add" /> -->
                  <img class="g-pic ml-10" src="~@images/default-head.svg" alt="">
                  <span class="m-des ml-10">{{item.name}}</span>
                  <span class="time fr">{{item.date}} <i class="el-icon-close" @click="deleSubTask(item, index)"></i></span>
                </li>
              </ul>
              <!-- 子任务表单 -->
              <div class="sub-pro-form" v-if="showSubInput">
                <div class="top">
                  <img class="g-pic" src="~@images/default-head.svg" alt="">
                  <el-input class="key" v-model="formSub.info" placeholder="输入子任务内容"></el-input>
                  <span class="icon-date-box" @click="showSubTaskDate">
                    <svg-icon icon-class="date" class-name="icon-date" v-if="!formSub.subDate"/>
                    <i v-if="formSub.subDate">{{formSub.subDate}}</i>
                  </span>
                  <el-date-picker id="openDate" class="cus-btn-date date-opacity" type="datetime" placeholder="选择子任务时间" v-model="formSub.subDate" :value-format="'yyyy-MM-dd HH:mm:ss'"></el-date-picker>
                </div>
                <div class="bottom tr mt-20">
                  <el-button @click="handleCancel">取消</el-button>
                  <el-button type="primary" @click="sureSubtask">确定</el-button>
                </div>
              </div>
              <!-- 子任务添加 -->
              <span class="m-btn" v-if="!showSubInput" @click="showSubInput=true"><svg-icon icon-class="add" class-name="icon-add" />添加子任务</span>
            </div>
          </el-form-item>

          <el-form-item label="关联内容">
            <span class="m-btn mr-30"><svg-icon icon-class="upload" class-name="g-icon-upload mr-10" />本地上传</span>
            <i class="g-line-split"></i>
            <span class="m-btn ml-30" @click="aboutFile"><svg-icon icon-class="wendang" class-name="g-icon-wendang mr-10" />文档中心</span>

            <!-- 上传文件列表 -->
            <div class="file-box sub-pro mt-20">
              <ul class="file-list sub-pro-list">
                <li class="clearfix">
                  <img class="g-pic" src="~@images/default-head.svg" alt="">
                  <span class="m-des ml-10">概要设计文档.doc</span>
                  <span class="time fr">**项目 <i class="el-icon-close"></i></span>
                </li>
              </ul>
            </div>
          </el-form-item>
        </el-form>

        <!-- 评论、变更历史 -->
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="评论（2）" name="comments">
            <ul class="comment-list">
              <li>
                <img src="~@images/default-head.svg" alt="">
                <div class="comment-box">
                  <p>
                    <span class="name mr-20">水电费</span>
                    <span class="m-tips">2018/10/01 15:39</span>
                  </p>
                  <p class="detail ell">沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到沙发斯蒂芬是的发送到发送到</p>
                </div>
              </li>
              <li>
                <img src="~@images/default-head.svg" alt="">
                <div class="comment-box">
                  <p>
                    <span class="name mr-20">水电费</span>
                    <span class="m-tips">2018/10/01 15:39</span>
                  </p>
                  <p class="detail ell">沙发斯</p>
                </div>
              </li>
            </ul>

            <!-- 发表评论 -->
            <el-form class="form-common form-wrap" ref="formSub" :model="form">
              <el-form-item label="">
                <img class="g-pic" src="~@images/default-head.svg" alt="">
                <cmp-editor></cmp-editor>
                <!-- <el-input v-model="formSub.info" placeholder="Enter快速发布"></el-input> -->
                <el-button class="btn-comment" type="primary">评论</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="变更历史" name="history">
            <ul class="history-list">
              <li>
                <span class="time m-assist mr-30">5分钟前</span>
                <span class="info m-des"><strong class="info-name">胡强</strong> 完成了任务</span>
              </li>
              <li>
                <span class="time m-assist mr-30">2019/2/19 11:08</span>
                <span class="info m-des"><strong class="info-name">胡强</strong> 重新打开任务</span>
              </li>
              <li>
                <span class="time m-assist mr-30">5分钟前</span>
                <span class="info m-des"><strong class="info-name">胡强</strong> 重新打开任务</span>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>

    </el-dialog>

    <cmp-file-move ref="fileDialog"></cmp-file-move>
  </div>
</template>

<script>
import cmpEditor from '@cmp/editor'
import cmpLeaderList from '@cmp/leader-list'
import cmpFileMove from './../dialog/dialog-file-move'
export default {
  components: {
    cmpEditor,
    cmpLeaderList,
    cmpFileMove
  },
  props: {
    dialogData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialogShow: false,
      showTitleEdit: false,  // 名称是否为修改状态
      isLeaderList: false,  // 负责人列表面板
      showDesc: false, // 显示任务描述
      showSub: false,  // 显示子任务
      showSubInput: true,  // 显示子任务中的输入框
      form: {
        id: 123,
        date1: '',
        name: '测试项目呀',
        status: '',
        leader: '',
        desc: '描述呀呀呀',
      },
      subList: [
        {
          name: '展览计划评审及确定',
          date: '20180231 12.30'
        },
        {
          name: '展览计划评审及确定1',
          date: '20180231 1.30'
        }
      ],
      // 子任务
      formSub: {
        info: '',
        subDate: ''  // 子任务时间
      },
      rules: {
        // name: [
        //   {required: true, message: '必填', trigger: 'blur'}
        // ],
        // region: [
        //   {required: true, message: '请选择项目分组', trigger: 'change'}
        // ]
      },
      activeName: 'comments',
      options: [
        {
          value: '1',
          label: '普通'
        },
        {
          value: '2',
          label: '紧急'
        },
        {
          value: '3',
          label: '非常紧急'
        },
      ]
      // detailData: {
      //   name: '测试项目呀',
      //   id: 123
      // }
    }
  },
  methods: {
    // 弹出子任务日期
    showSubTaskDate() {
      this.$common.openDate()
    },
    initDialogData() {
      this.dialogShow = true
      this.$nextTick(() => {
        this.resetForm()

        // 手动弹出日期
        // this.$common.openDate()
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 确定添加子任务
    sureSubtask() {
      this.subList.push({
        name: this.formSub.info,
        date: this.formSub.subDate
      })
      this.formSub.info = ''
      this.formSub.subDate = ''
    },
    // 删除子任务
    deleSubTask(item, index) {
      this.subList.splice(index, 1);
    },
    // 添加子任务
    // addSub() {
    //   this.addSub
    // },
    // 取消添加
    handleCancel() {
      if(this.subList.length) {
        // this.showSub = true
        this.showSubInput = false
      } else {
        this.showSub = false
      }
    },
    // 显示负责人列表
    showLeaderList() {
      this.$refs.cmpLeaderList.showList()
    },
    // 添加任务-选择任务负责人
    handleChooseAdd(item) {
      console.log(item)
      this.form.leader = item.name
      this.isLeaderList = false
    },
    // 关联内容
    aboutFile() {
      this.$refs.fileDialog.init()
    },
    resetForm() {
      if (this.$refs['form']) {
        this.$refs['form'].resetFields();
        // this.$refs['form'].resetFields()
        // debugger
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cmp-dialog-pro {
  .content {
    max-height: 730px;
    padding: 0 10px;
    overflow-y: auto
  }
  .icon-dele {
    position: absolute;
    top: 20px;
    right: 50px;
    cursor: pointer;
  }
  .title {
    position: absolute;
    top: 20px;
  }
  .form-wrap {
    /deep/ .el-form-item__content {
      padding-left: 60px;
    }
    /deep/ .el-form-item__label {
      line-height: 40px;
    }
    .el-form-item {
      margin-top: 30px;
      line-height: 24px;
    }
    .el-textarea {
      width: auto;
    }
  }

  .form-content {
    // 截止时间
    .cus-btn-date {
      width: 150px;
    }

    /deep/ .cus-btn-sel.el-select {
      .el-input__inner {
        width: 79px;
        text-align: center;
        height: 24px;
        line-height: 24px;
        border-radius: 20px;
      }
      // 普通
      &.status1 {
        .el-input__inner {
          border: 1px solid $color5;
          color: $color5;
        }
      }
      // 紧急
      &.status2 {
        .el-input__inner {
          border: 1px solid $warning;
          color: $warning;
        }
      }
      // 非常紧急
      &.status3 {
        .el-input__inner {
          border:1px solid $danger;
          color: $danger;
        }
      }
    }

    // 子任务
    .sub-pro {
      padding: 20px;
      border-radius:4px;
      border:1px solid rgba(235,237,242,1);
      .time {
        color: $color6;
      }
      .sub-pro-list {
        li {
          margin-bottom: 15px;
          .el-checkbox {
            margin-right: 0;
          }
          .g-pic {
            width: 32px;
            height: 32px;
          }
          .el-icon-close {
            margin-left: 25px;
            color: $danger;
            cursor: pointer;
          }
        }
      }
      .sub-pro-form {
        .icon-date-box,
        .date-opacity {
          position: absolute;
          right: 20px;
          top: 0;
        }
        .date-opacity {
          opacity: 0;
        }
        .top {
          position: relative;
          padding-left: 45px;
          img {
            width: 32px;
            height: 32px;
            position: absolute;
            left: 0;
            top: 5px;
          }
        }
      }
    }
  }

  .tabs {
    ul.comment-list {
      padding-left: 20px;
      li {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 30px;
        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        .comment-box {
          color: $color5;
          .name {
            font-size:12px;
          }
          .detail {
            width: 760px;
            margin-top: 10px;
            font-size:14px;
          }
        }
      }
    }
    ul.history-list {
      li {
        margin-top: 30px;
        .time {
          display: inline-block;
          width: 115px;
          text-align: right;
        }
        .info {
          position: relative;
          padding-left: 30px;
          .info-name {
            font-size: 14px;
            color: $primary;
            margin-right: 5px;
          }
          &:before {
            display: inline-block;
            content: '';
            width: 1px;
            height: 50px;
            background-color: $border;
            position: absolute;
            left: 0;
            top: 4px;
          }
        }
      }
    }
    .form-common {
      height: 300px;
      /deep/ .el-form-item__content {
        margin-top: 10px;
        position: relative;
        padding-left: 50px;
        padding-right: 160px;
        .g-pic {
          position: absolute;
          left: 0;
          top: 0;
        }
        .btn-comment {
          position: absolute;
          right: 20px;
          top: 0;
        }
      }
    }
  }

  // 重写tab样式
  /deep/ .el-tabs__header {
    margin: 0;
  }
  /deep/ .el-tabs__nav-wrap {
    padding-left: 30px;
  }
  /deep/ .el-tabs__nav-wrap::after {
    height: 1px;
    background-color: $border;
  }
  /deep/ .el-tabs__active-bar {
    display: none;
  }
  /deep/ .el-tabs__item.is-active:after {
    display: block;
    content: '';
    position: absolute;
    width: 28px;
    height: 2px;
    background-color: #0590FF;
    left: 50%;
    bottom: 0;
    margin-left: -14px;
  }

  /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2):after, 
  /deep/ .el-tabs--top .el-tabs__item.is-bottom:nth-child(2):after, 
  /deep/ .el-tabs--bottom .el-tabs__item.is-top:nth-child(2):after, 
  /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2):after {
    margin-left: -24px;
  }

  /deep/ .el-tabs--top .el-tabs__item.is-top:last-child:after, 
  /deep/ .el-tabs--top .el-tabs__item.is-bottom:last-child:after, 
  /deep/ .el-tabs--bottom .el-tabs__item.is-top:last-child:after, 
  /deep/ .el-tabs--bottom .el-tabs__item.is-bottom:last-child:after {
    margin-left: -4px;
  }
}
</style>


