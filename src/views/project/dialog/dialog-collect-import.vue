<!-- 导入展品 -->
<template>
  <div>
    <el-dialog
      class="dialog-import-collect"
      :visible.sync="dialogShow"
      :fullscreen="true"
      :show-close="false">
      <div class="wrap">
        <!-- 头部 -->
        <div class="header">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">书画展项目</el-breadcrumb-item>
            <el-breadcrumb-item>导入展品</el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 已选择 -->
          <h3>
            <svg-icon icon-class="info" style="font-size:13px;" />
            已选择{{this.selectList.length}}项
            <i class="g-line-split gray ml-20 mr-20"></i>
            <span class="m-btn" @click="clickClear">清空</span>
          </h3>

          <!-- 操作 -->
          <div class="btns">
            <el-button @click="dialogShow=false">取消</el-button>
            <el-button type="primary" @click="add">添加</el-button>
          </div>
        </div>

        <div class="content-box">
          <!-- 侧边栏 -->
          <div class="menu-box fl">
            <!-- <span>我的收藏夹</span> -->
            <li class="el-menu-item el-menu-title" style="padding-left: 20px;"><span>我的收藏夹</span></li>
            <sidebar :menuList="sidebarData" :activeIndex="`/noJump?type=1`" :callFun="handleTab"></sidebar>
          </div>

          <!-- 列表 -->
          <div class="content">
            <div class="collect-list-box">
              <div class="total-box"><h3><strong>20</strong>件藏品</h3></div>
              <h1 class="title">明清书画</h1>
              <h3>
                2018-6-11 18:10创建
                <span class="m-btn fr" @click="allSelect">{{hasAllSelect ? '取消全选': '全选'}}</span>
              </h3>

              <el-row :gutter="30" class="collect-list">
                <el-col :span="4" 
                  v-for="(item, index) in dataList"
                  @click.native="toggleCheck(item)">
                  <div class="it" :class="{'is-checked': item.active}">
                    <label class="my-checkbox el-checkbox__input" 
                      :class="{'is-checked': item.active}">
                      <span class="el-checkbox__inner"></span>
                    </label>
                    <img src="~@images/default-pic.svg" alt="">
                    <h4 class="tc ell">{{item.title}}</h4>
                    <!-- <el-checkbox-group v-model="checkList">
                      <el-checkbox label="复选框 A"></el-checkbox>
                      <el-checkbox label="复选框 B"></el-checkbox>
                      <el-checkbox label="复选框 C"></el-checkbox>
                      <el-checkbox label="禁用" disabled></el-checkbox>
                      <el-checkbox label="选中且禁用" disabled></el-checkbox>
                    </el-checkbox-group> -->
                  </div>
                  </el-col>
              </el-row>

              <!-- 分页 -->
              <div class="pagination-container">
                <el-pagination
                  :current-page="listQuery.currentPage"
                  :page-size="listQuery.size"
                  :total="total"
                  background
                  layout="total, prev, pager, next, sizes, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- <cmp-swiper-collect ref="swiperModel"></cmp-swiper-collect> -->
  </div>
</template>

<script>
import sidebar from '@cmp/sidebar'
// import cmpSwiperCollect from '@cmp/swiper-collect'
export default {
  components: {
    sidebar,
    // cmpSwiperCollect,
  },
  data() {
    return {
      // checkList: ['选中且禁用','复选框 A'],
      dialogShow: false,
      hasAllSelect: false,  // 是否已全选
      sidebarData: [
        {
          name: '明清书画（20）',
          icon: '',
          index: '/noJump?type=1',
          type: '1'
        },
        {
          name: '明清书画（21）',
          icon: '',
          index: '/noJump?type=2',
          type: '2'
        },
        {
          name: '明清书画（20）',
          icon: '',
          index: '/noJump?type=3',
          type: '3'
        },
      ],
      // dataList: [
      //   {
      //     num: 1,
      //     id: 123
      //   },
      //   {
      //     num: 1,
      //     id: 12
      //   },
      //   {
      //     num: 1,
      //     id: 124
      //   },
      //   {
      //     num: 1,
      //     id: 125
      //   },
      //   {
      //     num: 1,
      //     id: 126
      //   },
      //   {
      //     num: 1,
      //     id: 127
      //   },
      //   {
      //     num: 1,
      //     id: 1266
      //   },
      //   {
      //     num: 1,
      //     id: 1274
      //   },
      // ],
      dataList: null,
      total: 0,
      listQuery: {
        currentPage: 1,
        size: 10
      },
      selectList: []
    }
  },
  methods: {
    init() {
      this.dialogShow = true
      this.getDataList()
    },
    handleTab(item) {
      console.log('类型', this.$common.getStrParam(item, 'type'))
    },
    // 选择
    toggleCheck(item) {
      if(item.active) {
        let index = this.selectList.findIndex(it => it.id === item.id)
        this.selectList.splice(index, 1)
      } else {
        this.selectList.push(item)
      }
      
      this.$set(item, 'active', !item.active)
    },
    // 全选、取消全选
    allSelect() {
      this.dataList.forEach(item => {
        this.$set(item, 'active', !this.hasAllSelect)
      })
      this.hasAllSelect = !this.hasAllSelect
      this.selectList = this.hasAllSelect ? JSON.parse(JSON.stringify(this.dataList)) : []

      console.log(this.selectList)
    },
    // 清空
    clickClear() {
      this.dataList.forEach(item => {
        this.$set(item, 'active', false)
      })
      this.hasAllSelect = false
      this.selectList = []
    },
    // 藏品详情 暂不要
    // showDetail() {
    //   this.$refs.swiperModel.init()
    // },
    // 添加藏品
    add() {
      console.log(this.selectList)
    },
    getDataList() {
      this.listLoading = true
      this.$http.get('/list', {
        ...this.listQuery
      }).then(response => {
        this.dataList = response.data.list
        this.total = response.data.page.allRow
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-import-collect {
  .wrap {
    min-width: $minWidth;
  }
  .header {
    padding: 0 30px;
    margin-bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: 60px;
    background-color: #fff;
    h3 {
      padding-left: 50px;
      flex: 1;
    }
  }
  .content-box {
    padding: $paddingWidth;
    .menu-box {
      /deep/ .el-menu {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      } 
      /deep/ .el-menu-item {
        padding-left: 35px !important;
      }
      .el-menu-title.el-menu-item {
        padding-left: 40px !important;
        font-size:18px;
        color: $color5;
        font-weight: bold;
        background-color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }
    .content {
      padding-left: 230px;
      .collect-list-box {
        position: relative;
        padding: $paddingWidth;
        border-radius:4px;
        background-color: #fff;
        .title {
          margin-bottom: 20px;
        }
        .total-box {
          position: absolute;
          right: 30px;
          top: 30px;
          strong {
            font-size: 30px;
            color: $color5;
          }
        }
        .collect-list {
          margin-top: 30px;
          .it {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
            padding: 35px;
            margin-bottom: 30px;
            cursor: pointer;
            border-radius:4px;
            border:2px solid transparent;
            &.is-checked {
              border:2px solid $primary;
            }
            &:hover {
              background: $color3;
            }
            .my-checkbox {
              position: absolute;
              top: 10px;
              left: 10px;
            }
            img {
              width: 92px;
              height: 92px;
            }
            h4 {
              width: 115px;
              // position: absolute;
              // left: 25px;
              // bottom: 0;
              line-height: 35px;
            }
          }
        }
      }
    }
  }
  /deep/ .el-dialog {
    padding: 0;
    background-color: #F2F3F8;
  }
  /deep/ .el-dialog__header {
    display: none;
  }
}
</style>


