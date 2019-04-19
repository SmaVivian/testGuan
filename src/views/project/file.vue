<template>
  <div class="g-content">
    <div class="page-file">
      <div class="btns clearfix">
        <h1 class="fl">文件夹</h1>
        <div class="right fr">
          <a class="m-btn mr-30" @click="addFile"><svg-icon icon-class="folder" class="g-icon-upload" />&nbsp;创建文件夹</a>
          <!-- 上传 -->
          <cmp-upload :callFun="uploadCallback"></cmp-upload>
        </div>
      </div>

      <el-table
      ref="multipleTable"
      :data="tableData3"
      stripe
      style="width: 100%"
      @row-click="rowClick">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          label="名称"
          width="300">
          <template slot-scope="scope">
            <svg-icon icon-class="folder" style="font-size:14px;" />&nbsp;{{ scope.row.name | ellSplit(30) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="date"
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
            <a class="btn-opera m-btn mr-10" @click="downLoad(scope.row)">下载</a>
            <!-- <a class="btn-opera m-btn mr-10" @click="upload(scope.row)">上传</a> -->
            <a class="btn-opera m-btn mr-10"><cmp-upload :callFun="uploadCallback" :hasIcon="false"></cmp-upload></a>
            <a href="javascript:;" class="btn-opera m-btn mr-10" icon="el-icon-edit" @click="move()">移动</a>
            <a class="btn-opera m-btn mr-10" @click="addFile(scope.row, '重命名文件夹')">重命名</a>
            <a class="btn-opera m-btn mr-10 dele" @click="deleItem(scope.row)">删除</a>
            <!-- <router-link :to="{path: '/list/edit', query: {id: scope.row.id}}">
              <a class="btn-opera m-btn mr-10" icon="el-icon-edit">编辑</a>
            </router-link>
            <router-link :to="{path: '/list/edit', query: {id: scope.row.id}}">
              <a class="btn-opera m-btn mr-10" icon="el-icon-edit">编辑</a>
            </router-link> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div> -->

      <cmp-file-move ref="fileDialog"></cmp-file-move>
      <cmp-footer></cmp-footer>
    </div>
  </div>
</template>

<script>
import cmpFooter from '@cmp/footer'
import cmpUpload from '@cmp/my-upload/index'
import cmpFileMove from './dialog/dialog-file-move'
export default {
  components: {
    cmpFooter,
    cmpUpload,
    cmpFileMove
  },
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
      // multipleSelection: []
    }
  },

  methods: {
    // 点击某行
    rowClick(row, column, event) {
      console.log(row)
    },
    // 创建文件夹
    addFile(item, title) {
      console.log('add')
      this.$prompt('', title || '创建文件夹', {
        showClose: true,
        showCancelButton: false,
        confirmButtonText: '确定',
        inputValue: item && item.name,
        inputPlaceholder: '文件夹名称',
        inputPattern: /^[\S]{2,6}$/,
        inputErrorMessage: '请输入2到5位非空字符',
        // center: true
      }).then(({ value }) => {
        console.log(value)
        // this.$message({
        //   type: 'success',
        //   message: '你的邮箱是: ' + value
        // });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });       
      });
    },
    // 下载
    downLoad(item) {
      console.log('下载')
    },
    // 上传回调
    uploadCallback(item, type) {
      console.log('上传回调')
    },
    // 移动
    move(item) {
      this.$refs.fileDialog.init()
      console.log(item)
    },
    // 删除
    deleItem(item) {
      console.log(item)
    },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // }
  }
}
</script>

<style lang="scss" scoped>
.btn-opera.dele {
  color: $danger;
}
/deep/ .el-table__row {
  cursor: pointer;
}
</style>


