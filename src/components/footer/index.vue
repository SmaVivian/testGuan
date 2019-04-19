<template>
<!-- 默认绝对定位 居中 -->
<!-- class添加 .relat：相对定位  -->
<!-- class添加 .footer-pd：左间距为200 -->
  <div class="cmp-footer">
    <p class="m-tit tc mb-10">
      <span class="mr-30">帮助</span>
      <span class="mr-30">隐私</span>
      <span>条款</span>
    </p>
    <p class="m-tit tc">©copyright 2018 北京探景科技有限公司出品</p>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.cmp-footer {
  padding-top: 30px;
  position: absolute;
  width: 100%;
  bottom: 30px;
  left: 0;
  box-sizing: border-box;
  // background-color: #F2F3F8;
}
// 相对定位
.relat {
  position: relative;
  bottom: 0;
}
// 左间距为200的footer
.footer-pd {
  padding-left: 200px;
}
</style>


