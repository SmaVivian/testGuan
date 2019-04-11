<template>
  <div class="cmp-dialog-pro">
    <el-dialog 
      :visible.sync="dialogShow" 
      width="900px">
      <svg-icon icon-class="dele-red" class-name="icon-dele" />
      <!-- 显示状态 -->
      <h1 class="title" v-if="!showTitleEdit">
        <span @click="showTitleEdit=true">组织展览主题文档评审</span>

        <el-popover
          class="pop-wrap"
          v-model="showTopProList"
          placement="bottom-start"
          trigger="click">
          <div class="pop-wrap-top m-search-wrap">
            <ul>
              <li
                v-for="(item, index) in topProList"
                :key="index"
                :class="{'active': item.id === topProActive.id}"
                @click="clickTop(item)">
                <h2>{{item.name}}</h2>
                <i class="el-icon el-icon-check" v-if="item.id === topProActive.id"></i>
              </li>
            </ul>
          </div>
          <!-- <a class="top-menu-current" href="javascript:;" slot="reference">{{topProActive.name}}&nbsp;<i class="el-icon el-icon-arrow-down"></i></a> -->
          <span class="m-btn" slot="reference" @click="showProList">（ {{topProActive.name}}<i class="el-icon el-icon-arrow-down"></i> ）</span>
        </el-popover>
        <!-- <span class="m-btn" @click="showProList">（ 展览策划<i class="el-icon el-icon-arrow-down"></i> ）</span> -->
      </h1>
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
            <p class="btn-deadline m-des g-pointer m-primary" v-if="!form.date1">选择截止时间</p>
            <el-date-picker class="cus-btn-date" placeholder="" 
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
              placeholder="">
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
            <span class="m-btn" v-if="!showSub" @click="showSub=true;showSubInput=true;"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;添加子任务</span>

            <!-- 子任务 -->
            <div class="sub-pro" v-if="showSub">
              <!-- 子任务列表 -->
              <ul class="sub-pro-list">
                <li class="clearfix" v-for="(item, index) in subList" :key="index">
                  <label class="my-checkbox el-checkbox__input" 
                    :class="{'is-checked': item.active}"
                    @click.stop="toggleCheck(item)">
                    <span class="el-checkbox__inner"></span>
                  </label>
                  <!-- <el-checkbox></el-checkbox> -->
                  <!-- <svg-icon icon-class="add" class-name="icon-add" /> -->
                  <img class="g-pic ml-10" src="~@images/default-head.svg" alt="">
                  <span class="my-check-title m-des ml-10" :class="{'is-checked': item.active}">{{item.name}}</span>
                  <span class="time fr">{{item.date}} <i class="el-icon-close" @click="deleSubTask(item, index)"></i></span>
                </li>
              </ul>
              <!-- 子任务表单 -->
              <div class="sub-pro-form" v-if="showSubInput">
                <div class="top">
                  <img class="g-pic" src="~@images/default-head.svg" alt="">
                  <el-input class="key" v-model="formSub.info" placeholder="输入子任务内容"></el-input>
                  <span class="icon-date-box">
                  <!-- <span class="icon-date-box" @click.stop="showSubTaskDate"> -->
                    <svg-icon icon-class="date" class-name="icon-date" v-if="!formSub.subDate"/>
                    <!-- <i v-if="formSub.subDate">{{formSub.subDate}}</i> -->
                  </span>
                  <el-date-picker id="openDate" class="cus-btn-date date-opacity" 
                    type="datetime" 
                    placeholder="选择子任务截止时间"
                    :clearable="true" 
                    :editable="false"
                    v-model="formSub.subDate" 
                    :value-format="'yyyy-MM-dd HH:mm:ss'">
                  </el-date-picker>
                </div>
                <div class="bottom tr mt-20">
                  <el-button @click="handleCancel">取消</el-button>
                  <el-button type="primary" @click="sureSubtask">确定</el-button>
                </div>
              </div>
              <!-- 子任务添加 -->
              <span class="m-btn" v-if="!showSubInput" @click="showSubInput=true"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;添加子任务</span>
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
            <el-form class="form-common form-wrap" ref="formSub" :model="formSub">
              <el-form-item label="">
                <img class="g-pic" src="~@images/default-head.svg" alt="">
                <p>{{editorMsg}}</p>
                <vue-ueditor-wrap v-model="editorMsg" :config="myConfig"></vue-ueditor-wrap>
                <!-- <vue-ueditor-wrap ref="ueditor" v-model="editorMsg" :destroy="false" :config="myConfig" @ready="ready" v-for="item in 2" :key="item" @beforeInit="addCustomUI"></vue-ueditor-wrap> -->
                <!-- <cmp-editor></cmp-editor> -->
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
import VueUeditorWrap from 'vue-ueditor-wrap'
// import cmpEditor from '@cmp/editor'
import cmpLeaderList from '@cmp/leader-list'
import cmpFileMove from './../dialog/dialog-file-move'
export default {
  components: {
    VueUeditorWrap,
    // cmpEditor,
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
      showTopProList: false, // 头部项目列表
      // 顶部项目选择
      topProActive: {
        name: '烈火展项目',
        id: '1'
      },
      topProList: [
        {
          name: '烈火展项目',
          id: '1'
        },
        {
          name: '文创研发项目',
          id: '2'
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
      ],
      editorMsg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
      myConfig: {
        // 全部
        // toolbars: [[
        //   'fullscreen', 'source', '|', 'undo', 'redo', '|',
        //   'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
        //   'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        //   'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
        //   'directionalityltr', 'directionalityrtl', 'indent', '|',
        //   'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        //   'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        //   'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
        //   'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
        //   'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        //   'print', 'preview', 'searchreplace', 'drafts', 'help'
        // ]],
        toolbars: [[
          'source', 'emotion', 'bold', 'italic', 'underline', 'strikethrough', 'formatmatch', 'blockquote', 'forecolor', '|',
          'insertorderedlist', 'insertunorderedlist', 'indent', '|',
          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
          'link', 'simpleupload', 'insertimage'
        ]],
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/UEditor/',
        // UEDITOR_HOME_URL: '/static/UEditor/'
        // 配合最新编译的资源文件，你可以实现添加自定义Request Headers,详情https://github.com/HaoChuan9421/ueditor/commits/dev-1.4.3.3
        // headers: {
        //   access_token: '37e7c9e3fda54cca94b8c88a4b5ddbf3'
        // }
      }
      // detailData: {
      //   name: '测试项目呀',
      //   id: 123
      // }
    }
  },
  methods: {
    // 5、 你可以在ready方法中拿到editorInstance实例,所有API和官方的实例是一样了。http://fex.baidu.com/ueditor/#api-common
    ready (editorInstance) {
      console.log(`实例${editorInstance.key}已经初始化:`, editorInstance)
    },
    // 7. 借助 beforeInit 钩子，你可以实现对 UEditor 的二次开发，会在 scripts 加载完毕之后、编辑器初始化之前触发，以 编辑器 id 和 配置参数 作为入参
    addCustomUI (editorId, editorConfig) {

    },
    // 选择项目
    clickTop(item) {
      this.topProActive = item
      this.showTopProList = false
    },
    // 完成子任务
    toggleCheck(item) {
      this.$set(item, 'active', !item.active)
    },
    // 弹出子任务日期
    showSubTaskDate() {
      console.log(22222222)
      debugger
      // this.$common.openDate()
    },
    // 弹出项目列表
    showProList() {

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
    overflow-y: auto;
    .btn-deadline {
      position: absolute;
      left: 60px;
    }
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
      &:after {
        content: '添加标签';
        position: absolute;
        top: 0;
        left: 0;
        color: $primary;
      }
      // 普通
      &.status1 {
        .el-input__inner {
          border: 1px solid $color5;
          color: $color5;
        }
        &:after {
          content: '';
        }
      }
      // 紧急
      &.status2 {
        .el-input__inner {
          border: 1px solid $warning;
          color: $warning;
        }
        &:after {
          content: '';
        }
      }
      // 非常紧急
      &.status3 {
        .el-input__inner {
          border:1px solid $danger;
          color: $danger;
        }
        &:after {
          content: '';
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
          // opacity: 0;
          /deep/ .el-input__inner {
            padding-right: 0;
            color: $color6;
          }
          /deep/ .el-input__suffix {
            right: 0;
          }
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
      // height: 300px;
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
      &:hover {
        color: $primary;
        background-color: $color4;
      }
      &.active h2 {
        font-weight:bold;
      }
    }
  }
}

/deep/ .edui-default {
  line-height: 25px;
  z-index: 9999 !important;
  .edui-dialog {
    z-index: 9999 !important;;
  }
}
</style>


