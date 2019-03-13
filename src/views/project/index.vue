<template>
  <div class="g-wrap">
    <div class="page-project clearfix">
      <sidebar :menuList="sidebarData" :openeds="openedsArr"></sidebar>
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
                <div class="card-add">
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
  </div>
</template>

<script>
import sidebar from '@cmp/sidebar'
export default {
  components: {
    sidebar
  },
  data() {
    return {
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
      ],
      sidebarData: [
        // {
        //   name: '项目',
        //   icon: 'el-icon-edit',
        //   index: '/'
        // },
        // {
        //   name: '测试2',
        //   icon: 'el-icon-edit',
        //   index: '/aa'
        // },
        {
          name: '项目1',
          icon: 'pro',
          children: [
            {
              name: '我参与的',
              index: '22'
            },
            {
              name: '已归档项目',
              index: '/project/list?id=3'
            }
          ]
        },
        {
          name: '分组',
          // icon: 'el-icon-edit',
          icon: 'group',
          hasBtn: true,  // 新建分组按钮
          children: [
            {
              name: '展览项目',
              index: '11',
            },
            {
              name: '活动项目',
              index: '12',
            },
            {
              name: '活动项目1',
              index: '13',
            },
            {
              name: '活动项目2',
              index: '14',
            }
          ]
        },
      ],
      openedsArr: ['项目', '分组']
    }
  },
  methods: {
    getNavData() {
      this.sidebarData.splice(1, 1)
    }
  },
  created() {
    // setTimeout(this.getNavData, 1000)
  },
  activated() {
    // this.$store.dispatch('changeBodyBg', 'bg1')
  },
  deactivated() {
    // this.$store.dispatch('changeBodyBg', '')
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 30px 30px 30px 240px;
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
      @include bg(url(~@images/project/card-1.svg))
    }
    .card-pic-2 {
      @include bg(url(~@images/project/card-2.svg))
    }
    .card-pic-3 {
      @include bg(url(~@images/project/card-3.svg))
    }
    .card-pic-4 {
      @include bg(url(~@images/project/card-4.svg))
    }
    .card-pic-5 {
      @include bg(url(~@images/project/card-5.svg))
    }
    .card-pic-6 {
      @include bg(url(~@images/project/card-6.svg))
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
    .icon-add {
      font-size: 62px;
    }
  }
}
</style>


