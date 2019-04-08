<template>
  <div class="g-wrap">

    <sidebar :menuList="sidebarData" :activeIndex="`/project`" :openeds="openedsArr" :callFun="clickTab"></sidebar>

    <div class="page-project clearfix">
      <div class="content">
        <h1>全部项目</h1>
        <ul class="pro-list">
          <el-row :gutter="20">
            <el-col class="box" :xs="6" :sm="6" :md="6" :xl="4" v-for="(item, index) in menuData" :key="index">
              <el-card class="box-card">
                <router-link class="card-item" tag="div" :to="{path: '/project/sub?type=task'}">
                  <div :class="'card-pic card-pic-' + (index+1)"></div>
                  <h2 class="tc">{{item.name}}</h2>
                </router-link>
              </el-card>
            </el-col>

            <el-col class="box" :xs="6" :sm="6" :md="6" :xl="4">
              <el-card class="box-card box-card-add">
                <div class="card-add" @click="showProAdd">
                  <div class="icon-add-box tc">
                    <svg-icon icon-class="add" class-name="icon-add" />
                  </div>
                  <p class="m-btn tc">创建新项目</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </ul>
      </div>
    </div>

    <!-- 新建项目 -->
    <cmp-pro-add ref="dialogProAdd"></cmp-pro-add>
    
  </div>
</template>

<script>
import sidebar from '@cmp/sidebar'
import cmpProAdd from './dialog/dialog-pro-add'  // 新建项目
export default {
  components: {
    sidebar,
    cmpProAdd,
  },
  watch: {
    $route() {
      console.log('change', this.$route)
      this.getNavData()
    }
  },
  data() {
    return {
      dialogVisible: false,
      menuData: [
        {
          name: '抗联展览项目'
        },
        {
          name: '抗联展览项目2'
        },
        {
          name: '抗联展览项目3'
        },
        {
          name: '抗联展览项目4'
        },
        {
          name: '抗联展览项目5'
        },
        {
          name: '抗联展览项目6'
        },
        {
          name: '抗联展览项目6'
        },
      ],
      sidebarData: [
        {
          name: '项目',
          icon: 'pro',
          children: [
            {
              name: '我参与的',
              index: '/project?type=1'
            },
            {
              name: '已归档项目',
              index: '/project?type=2'
            }
          ]
        },
        {
          name: '分组',
          icon: 'group',
          hasBtn: true,  // 新建分组按钮
          children: [
            {
              name: '展览项目',
              index: '/noJump?type=1',
              isEdit: true  // 编辑 删除按钮
            },
            {
              name: '活动项目',
              index: '/noJump?type=2',
              isEdit: true
            },
            {
              name: '活动项目1',
              index: '/noJump?type=3',
              isEdit: true
            },
            {
              name: '活动项目2',
              index: '/noJump?type=4',
              isEdit: true
            },
            {
              name: '活动项目',
              index: '/noJump?type=5',
              isEdit: true
            }
          ]
        },
      ],
      openedsArr: ['项目', '分组'],
    }
  },
  methods: {
    clickTab(item) {
      console.log(this.$common.getStrParam(item, 'type'))
    },
    getNavData() {
      // todo ajax
      // this.sidebarData.splice(1, 1)
    },
    // 新建项目
    showProAdd() {
      this.$refs.dialogProAdd.init()
    },
  }
}
</script>

<style lang="scss" scoped>
.g-wrap {
  display: flex;
  .cmp-sidebar {
    background: #fff;
  }
  .page-project {
    flex: 1;
    .content {
      padding: 30px;
      .pro-list {
        .box {
          margin-top: 30px;
        }
        .card-pic {
          height: 215px;
        }
        h2 {
          height: 55px;
          line-height: 55px;
        }
        .card-pic-1 {
          @include bg(url(~@images/project/card-1.svg), '', '', '')
        }
        .card-pic-2 {
          @include bg(url(~@images/project/card-2.svg), '', '', '')
        }
        .card-pic-3 {
          @include bg(url(~@images/project/card-3.svg), '', '', '')
        }
        .card-pic-4 {
          @include bg(url(~@images/project/card-4.svg), '', '', '')
        }
        .card-pic-5 {
          @include bg(url(~@images/project/card-5.svg), '', '', '')
        }
        .card-pic-6 {
          @include bg(url(~@images/project/card-6.svg), '', '', '')
        }
        .box-card {
          border:4px solid transparent;
        }
        .box-card:hover {
          box-shadow:0px 1px 10px 0px rgba(238,239,245,1);
          border-radius:4px;
          border:4px solid rgba(5,144,255,1);
        }
        .card-item {
          cursor: pointer;
        }
        .box-card-add {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 270px;
          .card-add {
            cursor: pointer;
          }
        }
      }
      .icon-add-box {
        width: 62px;
        height: 62px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-add {
          font-size: 32px;
          color: $primary;
        }
      }
    }
  }
}
</style>


