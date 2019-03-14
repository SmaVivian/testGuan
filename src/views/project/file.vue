<template>
  <div class="g-content">
    <div class="page-file">
      <div class="btns clearfix">
        <h1 class="fl">文件夹</h1>
        <div class="right fr">
          <a class="m-btn">创建文件夹</a>
          <a class="m-btn ml-30">上传</a>
        </div>
      </div>

      <el-table
      ref="multipleTable"
      :data="tableData3"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          label="名称"
          width="300">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="大小">
        </el-table-column>

        <el-table-column
          prop="address"
          label="创建者"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="更新时间"
          width="150">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="250">
          <template slot-scope="scope">
            <router-link :to="{path: '/list/detail', query: {id: scope.row.id}}">
              <a class="btn-opera m-btn mr-10">详情</a>
            </router-link>
            <router-link :to="{path: '/list/edit', query: {id: scope.row.id}}">
              <a class="btn-opera m-btn mr-10" icon="el-icon-edit">编辑</a>
            </router-link>
            <router-link :to="{path: '/list/edit', query: {id: scope.row.id}}">
              <a class="btn-opera m-btn mr-10" icon="el-icon-edit">编辑</a>
            </router-link>
            <router-link :to="{path: '/list/edit', query: {id: scope.row.id}}">
              <a class="btn-opera m-btn mr-10" icon="el-icon-edit">编辑</a>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.page-file {
  
}
</style>


