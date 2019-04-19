<template>
  <div class="aprove-start">
    <div class="items mt-30">
      <h1>常用申请</h1>
      <div class="item-box">
        <el-card class="item tc" @click.native="showDialog">
          <svg-icon icon-class="approve-qingjia" class-name="icon" />
          <h4>请假申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-chuchai" class-name="icon" />
          <h4>出差申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-waichu" class-name="icon" />
          <h4>外出申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-baoxiao" class-name="icon" />
          <h4>报销申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-hetong" class-name="icon" />
          <h4>合同申请</h4>
        </el-card>

        <!-- <el-card class="item tc">
          <svg-icon icon-class="approve-hetong" class-name="icon" />
          <h4>请假申请</h4>
        </el-card> -->
      </div>
    </div>

    <div class="items mt-30">
      <h1>财务类</h1>
      <div class="item-box">
        <el-card class="item tc">
          <svg-icon icon-class="approve-yuzhi" class-name="icon" />
          <h4>预支申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-baoxiao" class-name="icon" />
          <h4>报销申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-fukuan" class-name="icon" />
          <h4>付款申请</h4>
        </el-card>
      </div>
    </div>

    <div class="items mt-30">
      <h1>行政类</h1>
      <div class="item-box">
        <el-card class="item tc">
          <svg-icon icon-class="approve-qingjia" class-name="icon" />
          <h4>请假申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-waichu" class-name="icon" />
          <h4>外出申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-jiaban" class-name="icon" />
          <h4>加班申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-chuchai" class-name="icon" />
          <h4>出差申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-yongche" class-name="icon" />
          <h4>用车申请</h4>
        </el-card>
      </div>
    </div>

    <div class="items mt-30">
      <h1>人事类</h1>
      <div class="item-box">
        <el-card class="item tc">
          <svg-icon icon-class="approve-zhuanzheng" class-name="icon" />
          <h4>转正申请</h4>
        </el-card>

        <el-card class="item tc">
          <svg-icon icon-class="approve-zhaopin" class-name="icon" />
          <h4>招聘</h4>
        </el-card>
      </div>
    </div>

    <dialog-leave-apply ref="dialogLeaveApply"></dialog-leave-apply>
  </div>
</template>

<script>
import dialogLeaveApply from './dialog/leave-apply'   // 请假申请
export default {
  components: {
    dialogLeaveApply
  },
  data() {
    return {

    }
  },
  methods: {
    showDialog() {
      this.$refs.dialogLeaveApply.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.aprove-start {
  width: 1200px;
  padding-bottom: 100px;
  margin: 0 auto;
  box-sizing: border-box;
  .item-box {
    display: flex;
    .item {
      width: 200px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 30px;
      cursor: pointer;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
  .icon {
    font-size: 36px;
  }
}
</style>


