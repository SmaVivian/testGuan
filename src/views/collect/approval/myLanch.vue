<template>
  <div class="g-wrap">
    <div class="page-project">
      <div class="content">
        <div class="approvalContent">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">我发起的</a></el-breadcrumb-item>
          </el-breadcrumb>

          <div class="search">
            <el-form ref="form" :model="form" label-width="70px" class="searchBottom">
              <el-form-item label="选择日期">
                <el-date-picker class="fl" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>                  
                <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>   
              <el-form-item label="登记人">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="登记一" value="shanghai"></el-option>
                  <el-option label="登记二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出库状态">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="状态一" value="shanghai"></el-option>
                  <el-option label="状态二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-button class="el-primary-border searchBton" @click="onExport">查询</el-button>
            </el-form>
            <el-button class="el-primary-border" round @click="onExport">导出</el-button>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table :data="tableData3" stripe>
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" prop="image" label="序号"></el-table-column>
            <el-table-column align="center" prop="image" label="描述">
              <template slot-scope="scope">
                <a class="m-btn" style="color:#0590FF;cursor:pointer;" type="text" size="small" @click="getNameDetails(scope.row)">{{ scope.row.dis }}</a>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="classi-fication" label="审批类型">
              <template slot-scope="scope">
                <a class="m-btn" style="color:#0590FF;cursor:pointer;" type="text" size="small" @click="getOut(scope.out)">{{ scope.row.out }}</a>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="name" label="审批摘要"></el-table-column>
            <el-table-column align="center" prop="name" label="发起时间"></el-table-column>
            <el-table-column align="center" prop="name" label="审批状态"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">撤回</a>
                <a class="m-btn"  @click="handleDelete(scope.$index, scope.row)" type="text" size="small">修改</a>
              </template>
            </el-table-column>
            </el-table>
            <div class="pagination-container">
            <el-pagination
              :current-page="listQuery.currentPage"
              :page-size="listQuery.size"
              :total="total"
              background
              layout="total, prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
            </div>
        </div>
          </div>
        </div>
      </div>

      <el-dialog title="藏品入馆审批"  class="approval" :visible.sync="dialogEnterVisible" width="900px" >
        <enterDialog/>
      </el-dialog>

      <el-dialog title="藏品出库审批"  class="approval" :visible.sync="dialogOutVisible" width="900px" >
        <outDialog/>
      </el-dialog>
    </div>
</template>

<script>
import enterDialog from '../dialog/approval/mylanch/enterStore'
import outDialog from '../dialog/approval/mylanch/outStore'
export default {
  components: {
    enterDialog,
    outDialog
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
      },
      value1: '',
      // 表格数据
      tableData3: [{
        date: '2016-05-03',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄',
        dis: '清明上河图修复出库',
        out: '藏品出库'
      }, {
        date: '2016-05-02',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄',
        dis: '清明上河图修复入馆'
      }, {
        date: '2016-05-07',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄',
        dis: '清明上河图修复征集计划'
      }],
      dialogEnterVisible: false,
      dialogOutVisible: false,
      total: 10,
      listQuery: {
        currentPage: 1,
        size: 5
      },
    }
  },
  methods: {
    onExport(){
      console.log('点我')
    },
    // 获取表格事件
    getNameDetails () { 
      console.log('css')
        this.dialogEnterVisible = true
    },
    getOut () {
      this.dialogOutVisible = true
    },
    getDataList() {
      // this.listLoading = true
      this.$http.get('/list', {
        ...this.listQuery
      }).then(response => {
        this.list = response.data.list
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
    }, 
  },
}
</script>

<style lang="scss" scoped>
  .approvalContent {
    background-color: #fff;
    border-radius: 5px;
    .el-breadcrumb {
      height: 50px;
      line-height: 70px!important;
      line-height: 50px;
      padding: 0px 0 0px 30px;
      font-size: 18px;
      margin-bottom:20px;
      border-radius: 5px;
      background: #fff;
    }
    .table {
      padding: 0 30px 30px 30px;
      .m-btn {
        margin-left: 10px;
      }
    }
      .searchBottom {
      display: flex;
      margin-left: 30px;
      .el-date-editor:nth-child(2) {
        margin-left: 15px;
      }
      .el-form-item {
        margin-right: 30px;
      }
      .el-button {
        height: 40px;
        background-color: #0590FF;
        color: #fff;
      }
    }
    .el-button {
      margin: 0 0 30px 30px;
    }
  }
 
 .content {
   .el-dialog {
     .el-dialog__header {
     margin-top: 300px;
   }
   }
   
 }
</style>


