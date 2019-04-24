<template>
  <div class="page-solicitaion-plan">
    <div class="content">
      <!-- 进度内容 -->
      <div class="schedule-content">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">藏品征集</el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;"> 藏品入馆</a></el-breadcrumb-item>
        </el-breadcrumb> 
        <el-steps class="schedule" :active="active"   align-left>
          <el-step title="征集计划"></el-step>
          <el-step title="藏品入馆"></el-step>
          <el-step title="藏品建账"></el-step>
          <el-step title="藏品入库"></el-step>
      </el-steps>
      </div>

      <!-- 表单内容 -->
      <div class="table-content">
        <div class="search-content">
          <el-form ref="form" :model="listQuery" label-width="96px">
            <el-form-item label="入馆凭证名称">
              <el-input v-model="listQuery.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="入馆凭证号">
              <el-input v-model="listQuery.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="收据号">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="来源">
              <el-select v-model ='listQuery.value' placeholder="请选择">
                <el-option v-for="item in state" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
              </el-select>
            </el-form-item>
          </el-form>             
          <el-form ref="form" :model="listQuery" label-width="148px" style="margin-left:-78px" class="time">
            <el-form-item label="选择日期">
              <el-date-picker class="fl" v-model="listQuery.startTime" type="date" placeholder="开始日期"></el-date-picker>                  
              <el-date-picker v-model="listQuery.endTime" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>   
            <el-form-item label="登记人">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="入馆状态">
              <el-select v-model ='listQuery.value' placeholder="请选择">
                <el-option v-for="item in state" :key="item.dictCode" :label="item.dictName" :value="item.dictCode"></el-option>
              </el-select>
            </el-form-item>
            <el-button class="el-primary-border fr searchButton" round @click="initList"><svg-icon icon-class="search" />&nbsp;查询</el-button>
          </el-form>
        </div>
        <div class="button">
          <el-row>
            <el-button class="el-primary-border" round @click="onExport"><svg-icon icon-class="daochu" />&nbsp;&nbsp;导出</el-button>
            <el-button class="el-primary-border" round @click="collectEnter"><svg-icon icon-class="enterStore" />&nbsp;&nbsp;藏品入馆</el-button>
          </el-row>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table :data="tableData" @selection-change="handleSelectionChange" stripe>
            <el-table-column type="selection"></el-table-column>

            <el-table-column  v-if="false">
              <template slot-scope="scope">
                <input type="text" v-model="scope.row.enterId" >
              </template>
            </el-table-column>

            <el-table-column prop="enterSign" label="入馆凭证号"></el-table-column>

            <el-table-column label="入馆凭证名称" >
              <template slot-scope="scope">
                <a class="m-btn" style="color:#0590FF;cursor:pointer;" type="text" size="small" @click="getNameDetails(scope.row)">{{ scope.row.date }}</a>
              </template>
            </el-table-column>

            <el-table-column prop="receiptNumber" label="收据号"></el-table-column>
            <el-table-column prop="opertor" label="单位或个人"></el-table-column>
            <el-table-column prop="source" label="来源"></el-table-column>
            <el-table-column prop="creater" label="登记人"></el-table-column>
            <el-table-column prop="createTimeStr" label="登记日期"></el-table-column>
            <el-table-column prop="approvalStateDes" label="入馆状态"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <a class="m-btn"  @click="handleDelete(scope.row)" type="text" size="small">删除</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination :current-page="listQuery.currentPage" :page-size="listQuery.size" :total="total" background layout="total, prev, pager, next" @size-change="handleSizeChange"  @current-change="handleCurrentChange"/>
          </div>
        </div>
      </div>
    </div>

    <!-- 藏品入馆 -->
    <enterDialog ref="enter" :callFun = "upPicture"  @initList = "init"></enterDialog>

    <!-- 点击表格获取内容详情 -->
    <contentDetil ref="contentDialog"></contentDetil>

  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
import enterDialog from '../dialog/solicitation/enter/enterStore'
import contentDetil from '../dialog/solicitation/enter/contentDetil'
export default {
  components: {
  cmpHeaderSub,
  sidebar,
  enterDialog,
  contentDetil,
},
  data() {
    return {
      activities: [],
      // 进度条事件
      active: 2,  
      // 时间选择
      value1: '',    
      // 状态选择
      value: '',    
      state: '',
      dicts: [
        {
        key: 'collection_come_from',
        key: 'scheme_state',
      }
      ],
       // 表格分页
      list: null,  
      total: 0,
      listLoading: true,
      listQuery: {
        userId:'',
        currentPage: 1,
        size: 5
      },
      form: {
        name: '',
        region: '',
        type: []
      },
      currentPage: 5,    // 当前选中页面
      tableData: [    // 当前选中页面
        {
          date: '2016-05-03',
          name: '王小',
          address: '上海市普陀区金沙江路 1518 弄'
      },{
        date: '2016-05-02',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄'
      }
      ],
      // 已选
      multipleSelection: '',   
      // 藏品弹出事件
      dialogPhotosVisible: false,
      dialogEnterDetailsVisible: false,   
    }
  },
  created() {
    this.initList()
  },
  methods: {
    init(){
      this.initList()
    },
    initList () {
      this.loading = true;
      // // 获取下拉状态选择值
      this.$http.get('/collectDict/getSelectDataByArr', 
        this.dicts
      ).then(res => {
        console.log(res.result)
        this.state = res.result
      })
      // 表格初始化 点击查询
      // this.$http.get('/enter/getEnterList', 
      //   this.listQuery 
      // ).then(res => {
      //   console.log(res)
      //   this.tableData = res.result
      //   this.total = res.page.allRow
      //   this.listLoading = false
      // })
    },
    // 定义父组件上传图片弹框
    upPicture () {
      this.dialogPhotosVisible = true
    },
    //  点击删除
    handleDelete(row) {
      // console.log(row)
      this.$http.post('/enter/deleteEnterInfo', {
        enterId: row.enterId,
      }).then(res => {
        console.log(res)
        if(res.success) {
          this.$message.success('删除成功')
          this.initList()
        }
      })
    },
    // tag标签删除
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    // 勾选复选框
    handleSelectionChange(val) {
      console.log(val)
      this.tableIndex = val
      this.multipleSelection = val
      this.multipleSelection += ',' + val.schemeId   // todo  修改为id
    },
    // 导出
    onExport(){
      console.log('导出', this.multipleSelection)
      location.href = '/singleMuseum/enter/exportEnterList?arr=' + this.multipleSelection
      // this.$common.exportData('/collectApproval/batchExport', this.multipleSelection)
    },
    // 藏品入馆按钮
    collectEnter () {
          this.$refs.enter.enterShop()
    },
    // 点击表格获取表格详情弹框
    getNameDetails ( row ) {
      // var enterId = row.enterId
      // this.$http.get('/enter/getEnterDetail', {
      //    enterId: row.enterId}
      // ).then (res => {
        // console.log(res)
        // this.form = res.result      
        // this.table = res.result.collectList
        // this.activities = res.result.approvalDetailList
        this.$refs.contentDialog.namDetail(this.form, this.table, this.activities)
      // })
    },
    //  表格分页
    handleSizeChange(val) {
      this.listQuery.size = val
      this.initList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.initList()
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
    /deep/.table-content {
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-top: 20px;
      border-radius: 5px;
      .search-content {
        padding: 30px 30px 0 30px;
        // .collect-data {
        //   
        //   margin-right: -50px!important;
        // }
        .el-form-item {
          margin-right: 20px;
          // min-width: 539px;
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
      .el-row {
        margin: 10px 0 30px 0;
        margin-left: 20px;
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
