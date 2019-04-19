<template>
  <div class="aprove-done">
    <div class="wrap g-shadow">

      <div class="header ml-10">
        <h1 class="title">全部（3）</h1>
        <el-tabs class="aprove-tab ml-30" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="审批通过" name="2"></el-tab-pane>
          <el-tab-pane label="审批拒绝" name="3"></el-tab-pane>
          <el-tab-pane label="审批中" name="4"></el-tab-pane>
          <el-tab-pane label="已撤销" name="5"></el-tab-pane>
        </el-tabs>
      </div>

      <el-table
        class="mytable cus-table-bg-no cus-table-pointer"
        ref="multipleTable"
        :data="tableData3"
        style="width: 100%"
        @row-click="rowClick">
        <el-table-column
          label="审批标题"
          width="300">
          <template slot-scope="scope">{{ scope.row.name}}</template>
        </el-table-column>

        <el-table-column
          prop="date"
          label="开始时间">
        </el-table-column>

        <el-table-column
          prop="address"
          label="完成时间"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="当前状态"
          width="150">
          <span slot-scope="scope" :class="{'m-info': scope.row.type==='1', 'm-danger': scope.row.type==='2', 'm-warning': scope.row.type==='3'}">{{ scope.row.date }}</span>
        </el-table-column>

        <!-- <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <a class="btn-opera m-btn mr-10" @click="downLoad(scope.row)">下载</a>
            <a class="btn-opera m-btn mr-10"><cmp-upload :callFun="uploadCallback" :hasIcon="false"></cmp-upload></a>
            <a href="javascript:;" class="btn-opera m-btn mr-10" icon="el-icon-edit" @click="move()">移动</a>
            <a class="btn-opera m-btn mr-10" @click="addFile(scope.row, '重命名文件夹')">重命名</a>
            <a class="btn-opera m-btn mr-10 dele" @click="deleItem(scope.row)">删除</a>
          </template>
        </el-table-column> -->
      </el-table>
    </div>

    <approve-panel ref="approvePanel"></approve-panel>
  </div>
</template>

<script>
import approvePanel from './dialog/approve-panel'   // 审批面板
export default {
  components: {
    approvePanel
  },
  data() {
    return {
      activeName: '1',
      tableData3: [{
          type: '1',
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          type: '2',
          date: '2016-05-02',
          name: '王小虎王小虎王小',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          type: '3',
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          type: '4',
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          type: '1',
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          type: '1',
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          type: '1',
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],

    }
  },
  methods: {
    rowClick(item) {
      console.log('row', item)
      this.$refs.approvePanel.init()
    },
    handleClick() {
      console.log(this.activeName)
    }
  }
}
</script>

<style lang="scss" scoped>
.aprove-done {
  padding: 30px;
  .wrap {
    padding: 30px 20px 30px 30px;
    background: #fff;
    .header {
      display: flex;
      .title {
        line-height: 40px;
        margin-bottom: 0;
      }
      .aprove-tab {
        display: inline-block;
      }
    }

    /deep/ .el-tabs__nav-wrap::after {
      background-color: transparent;
    }

    /deep/ .el-tabs__nav {
      .el-tabs__item {
        border: solid 1px $border;
        &:nth-child(2) {
          padding-left: 20px;
          border-bottom-left-radius: 100px;
          border-top-left-radius: 100px;
        }
        &.is-top:last-child {
          padding-right: 20px;
          border-bottom-right-radius: 100px;
          border-top-right-radius: 100px;
        }
      }
      .el-tabs__item.is-active {
        border: solid 1px $primary;
      }
      .el-tabs__active-bar {
        display: none;
      }
    }

    .mytable {

    }
  }
}
</style>


