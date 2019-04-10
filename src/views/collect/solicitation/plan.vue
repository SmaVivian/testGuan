<template>
  <div class="page-solicitaion-plan">
    <div class="content">
      <!-- 进度内容 -->
      <div class="schedule-content">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">藏品征集</el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;" class="breadcrumb">征集计划</a></el-breadcrumb-item>
        </el-breadcrumb> 
        <el-steps class="schedule" :active="active" finish-status="success"  align-left>
          <el-step title="征集计划"></el-step>
          <el-step title="藏品入馆"></el-step>
          <el-step title="藏品建账"></el-step>
          <el-step title="藏品入库"></el-step>
        </el-steps>
      </div>
      <!-- 表格内容 -->
      <div class="table-content">
        <div class="search-content">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="计划名称">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="计划编号">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="计划年度">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="年度计划" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>             
          <el-form ref="form" :model="form" label-width="80px">
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
            <el-form-item label="状态选择">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="状态一" value="shanghai"></el-option>
                <el-option label="状态二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-button class="el-primary-border fr searchButton" round >查询</el-button>
          </el-form>
        </div>
        <div class="button">
          <el-row>
            <el-button class="el-primary-border" round><svg-icon icon-class="daochu" />&nbsp;导出</el-button>
            <el-button class="el-primary-border" round @click="createPlan"><svg-icon icon-class="" />&nbsp;创建计划</el-button>
            <el-button class="el-primary-border" round @click="exportdetail"><svg-icon icon-class="daoru" />&nbsp;导入征集藏品</el-button>
          </el-row>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table :data="tableData3" stripe style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="image" label="计划编号"></el-table-column>
            <el-table-column label="计划名称">
              <template slot-scope="scope">
                <a class="m-btn" style="color:#0590FF;text-decoration:underline;cursor:pointer;" type="text" size="small" @click="getNameDetails(scope.row)">{{ scope.row.date }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="classi-fication" label="计划年度"></el-table-column>
            <el-table-column prop="name" label="预计经费(万元)"></el-table-column>
            <el-table-column prop="name" label="登记人"></el-table-column>
            <el-table-column prop="name" label="登记时间"></el-table-column>
            <el-table-column label="计划状态"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <a class="m-btn"  @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</a>
              </template>
            </el-table-column>
          </el-table>
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

    <!-- 点击创建计划弹框 -->
    <createPlan ref="palnDialog"></createPlan>

    <!-- 导入征集计划详情 -->
    <planDetail ref="detailDialog"></planDetail>

    <!-- 点击表格获取内容详情 -->
    <contentDetil ref="contentDialog"></contentDetil>

  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
import createPlan from '../dialog/solicitation/plan/createPlan'
import planDetail from '../dialog/solicitation/plan/planDetail'
import contentDetil from '../dialog/solicitation/plan/contentDetil'
export default {
  components: {
  cmpHeaderSub,
  sidebar,
  createPlan,
  planDetail,
  contentDetil
},
  data() {
    return {
      // 时间选择器
      value1: '',
      // 搜索条件
      form: {
        name: '',
      },
      active: 0,
      // 表格分页
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
      currentPage: 1,
      size: 5
      },
      // 当前选中页面
      currentPage: 5,
      // 表格数据
      tableData3: [{
        date: '2016-05-03',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 点击表格或者表格详情
    getNameDetails () {
      this.$refs.contentDialog.namDetail()
    },
    // 点击导入征集藏品
    exportdetail () {
      this.$refs.detailDialog.exportdetail()
    },
    // 点击创建计划弹框
    createPlan () {
      this.$refs.palnDialog.createPlan()
    },
    //  顶部导航栏
    changeTab(path) {
      this.$router.push({path: '/collect/' + path})
    },
  //  点击删除
  handleDelete(index, row) {
  // console.log(index, row);
  },
  //  表格分页
  getDataList() {
    // this.listLoading = true
    // this.$http.get('/list', {
    //   ...this.listQuery
    // }).then(response => {
    //   this.list = response.data.list
    //   this.total = response.data.page.allRow
    //   this.listLoading = false
    // })
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
.content {
  padding: 30px 30px 30px 260px;
  .el-breadcrumb {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
  }
  .schedule {
    margin: 0 50px;
  }
  .table {
    padding: 0 25px;
    border-radius: 5px;
    background-color: #fff;
  }
  .schedule-content {
    padding: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: #fff;
      .el-breadcrumb {
        line-height: 20px;
        background: #fff;
      }
  }
  /deep/ .table-content {
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    border-radius: 5px;
    .search-content {
      padding: 30px 30px 0 30px;
        .el-form-item {
          margin-right: 20px;
            .el-date-editor:nth-child(2) {
              margin-left: -50px;
              }
        }
        .searchButton {
          height: 40px;
        }
        .el-form {
          display: flex;
            .el-input__inner {
            width: 150px;
            }
        } 
    }
    .button {
      background-color: #fff;
      border-radius: 4px;
        .el-row {
          margin: 10px 0 30px 0;
          margin-left: 20px;
        }
    }
    // 分页样式
    .el-pagination {
      margin-top: 0;
      padding: 25px 0;
      background-color: #fff;
    }
    .el-button.is-round {
      margin-left: 20px;
    }
  }
  
}
</style>
