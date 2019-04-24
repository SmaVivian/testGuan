<template>
  <div class="page-discuss">
    <div class="wrap">
      <h1>抗联展览项目</h1>
      <div class="content">
        <ul>
          <li class="clearfix" v-for="item in 6" :key="item">
            <!-- 非自己 -->
            <div class="item item-other fl clearfix">
              <img class="fl" src="~@images/default-head.svg" alt="">
              <div class="para-box">
                <p class="m-assist">胡强</p>
                <p class="para">明天可以把大纲写完，到时候咱们再一起讨论一下。清理一下每个项目，交付条件的准备情况，特别是文档的问题。明天可以把大纲写完，到时候咱们再一起讨论一下。清理一下每个项目，交付条件的准备情况，特别是文档的问题。明天可以把大纲写完，到时候咱们再一起讨论一下。清理一下每个项目，交付条件的准备情况，特别是文档的问题。</p>
                <p class="m-tit mt-10">12:12</p>
              </div>
            </div>

            <!-- 自己 -->
            <div class="item item-myself fr clearfix">
              <div class="para-box">
                <!-- <p class="m-assist">胡强</p> -->
                <p class="para">明天可以把大纲写完，到时候咱们再一起讨论一下。清理一下每个项目，交付条件的准备情况，特别是文档的问题。</p>
                <p class="m-tit fr mt-10">12:12</p>
              </div>
              <img class="fr" src="~@images/default-head.svg" alt="">
            </div>
          </li>
        </ul> 

        <!-- 发表评论 -->
        <el-input v-model="msg" placeholder="评论哈"></el-input>
        <el-button class="btn-comment" type="primary">评论</el-button>
        <!-- <el-form class="form-common form-wrap" ref="form" :model="form">
          <el-form-item label="">
            <img class="g-pic" src="~@images/default-head.svg" alt="">
            <cmp-editor></cmp-editor>
            <el-button class="btn-comment" type="primary">评论</el-button>
          </el-form-item>
        </el-form> -->
      </div>
    </div>
    <cmp-footer class="relat"></cmp-footer>
  </div>
</template>

<script>
import cmpFooter from '@cmp/footer'
import cmpEditor from '@cmp/editor'
export default {
  components: {
    cmpFooter,
    cmpEditor
  },
  data() {
    return {
      msg: '',
      form: {
        info: '',
        subDate: '',  // 子任务时间
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.page-discuss {
  margin: 0 auto;
  width: 1200px;
  padding: 30px 0;
  .wrap {
    min-height: 600px;
    background-color: #fff;
    padding: 30px 20px;
    box-shadow:0px 1px 10px 0px rgba(238,239,245,1);
    border-radius:4px;
    h1 {
      margin-bottom: 0;
      padding-bottom: 30px;
      border-bottom: solid 1px $border;
    }
    .content {
      padding-top: 30px;
      .item {
        margin-bottom: 30px;
        img {
          width: 40px;
          height: 40px;
        }
        .para-box {
          .m-assist {
            margin-bottom: 10px;
          }
          .para {
            position: relative;
            padding: 20px;
            max-width: 660px;
            box-sizing: border-box;
            color: #575962;
            border-radius:10px;
          }
        }
      }
      .item-other {
        .para-box {
          padding-left: 58px;
          .para {
            background:#EBEDF2;
            &:after {
              content: '';
              display: block;
              @include bg(url('~@images/triangle-l.svg'), 8px, 28px);
              position: absolute;
              left: -8px;
              top: 13px;
            }
          }
        }
      }
      .item-myself {
        .para-box {
          position: relative;
          float: left;
          padding-left: 0;
          padding-right: 18px;
          .para {
            color: #fff;
            background:$primary;
          }
          &:after {
            content: '';
            display: inline-block;
            @include bg(url('~@images/triangle-r.svg'), 8px, 28px);
            position: absolute;
            right: 11px;
            top: 13px;
          }
        }
      }
    }
  }
  
}
</style>


