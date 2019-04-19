<template>
  <transition name="slide-fade">
    <div class="cmp-approve-panel" v-if="showPanel">
      <div class="approve-panel">
        <h1>
          <img class="g-pic small" src="~@images/default-head.svg" alt="">
          &nbsp;胡强发的请假申请
          <i class="el-icon-close g-pointer fr" @click="showPanel=false"></i>
        </h1>

        <!-- 审批信息 start -->
        <div class="info">
          <div class="g-label-box mb-20">
            <span class="g-label-name m-assist tr">申请人</span>
            <span class="g-label-txt m-des ml-60">付晓晓</span>
          </div>
          <div class="g-label-box mb-20">
            <span class="g-label-name m-assist tr">所在部门</span>
            <span class="g-label-txt m-des ml-60">藏品部</span>
          </div>
          <div class="g-label-box mb-20">
            <span class="g-label-name m-assist tr">请假类型</span>
            <span class="g-label-txt m-des ml-60">病假</span>
          </div>
          <div class="g-label-box mb-20">
            <span class="g-label-name m-assist tr">开始时间</span>
            <span class="g-label-txt m-des ml-60">2019-02-26 10:10:31</span>
          </div>
          <div class="g-label-box mb-20">
            <span class="g-label-name m-assist tr">结束时间</span>
            <span class="g-label-txt m-des ml-60">2019-02-26 10:10:31</span>
          </div>
          <div class="g-label-box mb-20">
            <span class="g-label-name m-assist tr">时长（小时）</span>
            <span class="g-label-txt m-des ml-60">4</span>
          </div>
          <div class="g-label-box mb-20">
            <span class="g-label-name m-assist tr">请假事由</span>
            <span class="g-label-txt m-des ml-60">感冒需要去医院打针，请领导批准</span>
          </div>
        </div>
        <!-- 审批信息 end -->

        <!-- 审批流程状态 start -->
        <div class="time-line-wrap">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities2" :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size">
              <div class="timeline-box">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">
                <div class="timeline-content">
                  <div>
                    <span class="m-des mr-10">蒋明</span>
                    <span :class="{'m-info': testType==='1', 'm-danger': testType==='2', 'm-assist': testType==='3'}">发起申请</span>
                    <!-- <span>已同意</span>
                    <span>审批中</span> -->
                    <span class="m-assist fr">2019-02-26 10:10:31</span>
                  </div>
                  <p class="m-assist">我同意啦，我同意啦，这条是评论</p>
                </div>
              </div>
              <!-- {{activity.name}}
              {{activity.state}} -->
            </el-timeline-item>
          </el-timeline>
        </div>
        <!-- 审批流程状态 end -->

        <!-- 抄送 start -->
        <div class="copys-box">
          <p class="m-des mb-30">抄送</p>

          <div class="g-label-box mb-10">
            <span class="g-label-name m-assist">已读</span>
            <div class="g-label-txt m-des">
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
            </div>
          </div>

          <div class="g-label-box mb-10">
            <span class="g-label-name m-assist">未读</span>
            <div class="g-label-txt m-des">
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
              <span class="ml-30 mb-20">
                <img class="g-pic mini mr-10" src="~@images/default-head.svg" alt="">蒋明
              </span>
            </div>
          </div>
        </div>
        <!-- 抄送 end -->
      </div>

      <!-- 操作 start -->
      <div class="footer-btns">
        <a class="btn m-primary tc" href="javascript:;"><svg-icon icon-class="add" class-name="icon mr-10" />撤销 </a>
        <div class="g-line-split gray" style="margin-left:1px;"></div>
        <a class="btn m-primary tc" href="javascript:;"><svg-icon icon-class="add" class-name="icon mr-10" />评论</a>
      </div>
      <!-- 操作 end -->
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      testType: '1',
      showPanel: true,
      activities2: [{
        name: '将明',
        state: '待审核',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      },
      {
        name: '冯桂英',
        state: '待审核',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      },
      {
        name: '将明',
        state: '待审核',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      },
      {
        name: '将明',
        state: '待审核',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      }],
    }
  },
  methods: {
    init() {
      this.showPanel = true
    }
  }
}
</script>

<style lang="scss" scoped>
.cmp-approve-panel {
  position: fixed;
  right: 0;
  // right: 570px;
  top: 80px;
  bottom: 0;
  width: 570px;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 1px 10px 0px rgba(150,153,162,0.5);
  z-index: 3;
  .approve-panel {
    padding: 30px;
    padding-bottom: 10px;
    position: absolute;
    top: 0;
    bottom: 60px;
    overflow-y: auto;
    h1 {
      margin-bottom: 20px;
    }
    .info {
      padding-bottom: 10px;
      border-bottom: solid 1px $border;
    }
    .time-line-wrap {
      padding-top: 30px;
      border-bottom: solid 1px $border;
      .timeline-box {
        display: flex;
        line-height: 24px;
        .timeline-content {
          flex: 1;
        }
      }
    }
    .copys-box {
      padding-top: 30px;
      .g-label-box {
        line-height: 24px;
        .g-label-name {
          width: auto;
        }
        span {
          display: inline-block;
        }
      }
    }
  }
  .footer-btns {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    box-shadow:0px 1px 10px 0px rgba(150,153,162,0.5);
    .btn {
      display: inline-block;
      width: 100%;
    }
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .7s;
  // transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .5s;
  // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(570px);
  opacity: 0;
}
</style>


