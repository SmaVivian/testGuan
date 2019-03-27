<template>
  <div class="pic-box">
    <img src="~@images/login.png" alt="">
    <div class="top">
      <h1>后台管理系统</h1>
      <p class="trans">Background managemen system</p>
    </div>
    <p class="bottom m-tips">技术支持 北京探景科技</p>
    
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.pic-box {
  position: relative;
  img {
    width: 500px;
    height: 430px;
    box-shadow:0px 10px 20px 0px rgba(181,177,221,0.3);
  }
  .top {
    position: absolute;
    top: 59px;
    left: 50px;
    h1 {
      margin-bottom: 10px;
      font-size: 42px;
      color: #fff;
    }
    .trans {
      font-size:16px;
      color: #fff;
    }
  }
  .bottom {
    position: absolute;
    bottom: 30px;
    left: 50px;
    color: #fff;
  }
}
</style>


