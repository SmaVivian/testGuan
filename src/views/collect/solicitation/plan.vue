<template>
  <div class="page-solicitaion-plan">
    <div class="content">
      <!-- 进度内容 -->
      <div class="schedule-content">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">藏品征集</el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;" class="breadcrumb">征集计划</a></el-breadcrumb-item>
        </el-breadcrumb> 
        <el-steps class="schedule" :active="active" finish-status="success" align-left>
          <el-step title="征集计划"></el-step>
          <el-step title="藏品入馆"></el-step>
          <el-step title="藏品建账"></el-step>
          <el-step title="藏品入库"></el-step>
        </el-steps>
      </div>

      <!-- 表单内容 -->
      <div class="table-content">
        <div class="search-content">
          <el-form ref="form" :model="listQuery" label-width="80px"  >
            <el-form-item label="计划名称" >
              <el-input v-model="listQuery.schemeName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="计划编号" placeholder="请输入">
              <el-input v-model="listQuery.schemeNumber"></el-input>
            </el-form-item>
            <el-form-item label="计划年度 :">
              <el-date-picker v-model="listQuery.planYear" type="year" value-format="yyyy"></el-date-picker>
            </el-form-item>
          </el-form>             
          <el-form ref="form" :model="listQuery" label-width="80px">
            <el-form-item label="选择日期" class="collect-data">
              <el-date-picker class="fl" v-model="listQuery.startTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"></el-date-picker>    
              <el-date-picker v-model="listQuery.endTime" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>   
            <el-form-item label="登记人" >
              <el-input v-model="listQuery.register" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状态选择">
              <el-select  v-model ="listQuery.value" placeholder="请选择">
                <el-option
                  v-for="item in state" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="search-button">
              <el-button class="el-primary-border searchButton" @click="initList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="button">
          <el-row>
            <el-button class="el-primary-border" round @click="exportFil"><svg-icon icon-class="daochu"/>&nbsp;导出</el-button>
            <el-button class="el-primary-border" round @click="createPlan"><svg-icon icon-class="" />&nbsp;创建计划</el-button>
            <el-button class="el-primary-border" round @click="outDetail"><svg-icon icon-class="daoru"/>&nbsp;导入征集藏品</el-button>
          </el-row>
        </div>

        <!-- 表格 -->
        <div class="table" >
          <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column  v-if="false">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.schemeId" >
              </template>
            </el-table-column>

            <el-table-column prop="schemeNumber" label="计划编号" width="200px"></el-table-column>
            <el-table-column label="计划名称">
              <template slot-scope="scope">
                <a class="m-btn" style="color:#0590FF; cursor:pointer;" type="text" @click="getNameDetails(scope.row)">{{ scope.row.schemeName }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="planYear" label="计划年度"></el-table-column>
            <el-table-column prop="estimatedExpenditure" label="预计经费(万元)"></el-table-column>
            <el-table-column prop="creater" label="登记人"></el-table-column>
            <el-table-column prop="registerDateStr" label="登记时间"></el-table-column>
            <el-table-column label="计划状态" prop="approvalStateDes"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <a class="m-btn"  @click="handleDelete(scope.row)" type="text" size="small">删除</a>
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
    <createPlan ref="palnDialog" @initList = "init"></createPlan>

    <!-- 导入征集藏品 -->
    <planDetail ref="detailDialog" @initList = "init"></planDetail>

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
    contentDetil,
  },
  data() {
    return {
      activities: [],
      // 导入征集藏品获取表格数据索引
      tableIndex:[],
      // 状态选择
      value: '',
      state:'',
      dicts: {
        key:'scheme_state'
      },
      form: {},

      active: 1,
      total: 0,
      listLoading: true,
      listQuery: {
        userId:'',
        currentPage: 1,
        size: 10
      },
      // 表格数据
      tableData: [],
      dialogPhotosVisible: false,
      multipleSelection: []
    }
  },
  created() {
    this.initList()
  },
  methods: {
    // 接受子页面调用的方法
    init(){
      this.initList()
    },
    initList() {
      this.loading = true;
      // 获取下拉状态选择值
      this.$http.get('/collectDict/getSelectDataByKey', 
        this.dicts
      ).then(res => {
        this.state = res.result
      })
      // 初始化表格 点击查询
      this.$http.get('/scheme/getSchemeList', 
        this.listQuery 
      ).then(res => {
        // console.log(res)
        this.tableData = res.result
        this.total = res.page.allRow
        this.listLoading = false
      })
    },
    // 定义父组件上传图片弹框
    upPicture () {
      this.dialogPhotosVisible = true
    },
    // 导出
    exportFil () {
      if(!this.multipleSelection.length) {
        this.$message({
          message: '请选择藏品',
          type: 'warning'
        })
        return
      } else {
          let str = ''
            this.multipleSelection.forEach((it, i) => {
            str += it.schemeId + ','
         })
         location.href = '/singleMuseum/scheme/exportScheme?arr=' + str
      }
    },

    // 点击表格标签弹出表格弹框
    lableDetail () {
      this.$refs.lableDialog.lableContent
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
    handleDelete(row) {
      this.$http.post('/scheme/deleteScheme', {
        schemeId: row.schemeId,
      }).then(res => {
        console.log(res)
        if(res.success) {
          this.$message.success('删除成功')
          this.initList()
        }
      })
    },
    // 获取表格序号
    handleSelectionChange(val){
      console.log(val)
      this.tableIndex = val
      this.multipleSelection = val
      // this.multipleSelection += val[0].schemeId + ','
    },
    // 点击导入征集藏品弹框
    outDetail () {
      var tableIndex = this.tableIndex
      console.log(tableIndex)
      if(!this.multipleSelection.length) {
        this.$message({
          message: '请选择藏品',
          type: 'warning'
        })
        return
      } else {
        this.$http.get('/scheme/getSchemeDetail', {
          schemeId: tableIndex[0].schemeId }
        ).then(res => { 
          console.log(res)
          this.form = res.result      
          this.table = res.result.collectList
          this.activities = res.result.approvalDetailList
          console.log(this.activities)
          this.$refs.detailDialog.outDetail(this.form, this.table, this.activities)
        })
      }
    }, 
    // 点击表格获取表格详情弹框
    getNameDetails ( row ) {
      var schemeId = row.schemeId
      this.$http.get('/scheme/getSchemeDetail', {
         schemeId: row.schemeId}
      ).then (res => {
        // console.log(res)
        this.form = res.result      
        this.table = res.result.collectList
        this.activities = res.result.approvalDetailList
        this.$refs.contentDialog.namDetail(this.form, this.table, this.activities)
      })
    },
    // 表格分页
    handleSizeChange(val) {
        this.listQuery.size = val
        this.initList()
      },
    handleCurrentChange(val) {
        this.listQuery.currentPage = val
        this.initList()
      }
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
    border-radius: 5px;
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
        .collect-data {
          min-width: 470px;
          margin-right: -50px!important;
        }
        .el-form-item {
          margin-right: 20px;
            .el-date-editor:nth-child(2) {
              margin-left: -50px;
              }
        }
        .el-form {
          display: flex;
            .el-input__inner {
            width: 150px;
            }
            .search-button {
              margin-left: -60px;
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
// /deep/.el-form-item__content {
//   margin-left: 20px!important;
// }

</style>
