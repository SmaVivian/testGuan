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
      <div class="table-content">
        <div class="search-content">
          <el-form ref="form" :model="form" label-width="96px">
            <el-form-item label="入馆凭证名称">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="入馆凭证号">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="收据号">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="来源">
              <el-select v-model="form.region" placeholder="请选择">
              <el-option label="年度计划" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>             
          <el-form ref="form" :model="form" label-width="148px" style="margin-left:-78px" class="time">
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
            <el-form-item label="入馆状态">
              <el-select v-model="form.region" placeholder="请选择">
              <el-option label="状态一" value="shanghai"></el-option>
              <el-option label="状态二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-button class="el-primary-border fr searchButton" round @click="onExport"><svg-icon icon-class="search" />&nbsp;查询</el-button>
          </el-form>
        </div>
        <div class="button">
          <el-row>
            <el-button class="el-primary-border" round @click="onExport"><svg-icon icon-class="daochu" />&nbsp;&nbsp;导出</el-button>
            <el-button class="el-primary-border" round @click="dialogEnterDetailsVisible = true"><svg-icon icon-class="enterStore" />&nbsp;&nbsp;藏品入馆</el-button>
          </el-row>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table :data="tableData3" stripe style="width: 100%">
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" prop="image" label="入馆凭证号"></el-table-column>
            <el-table-column label="入馆凭证名称" align="center">
              <template slot-scope="scope">
                <a class="m-btn" style="color:#0590FF;text-decoration:underline;cursor:pointer;" type="text" size="small" @click="getNameDetails(scope.row)">{{ scope.row.date }}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="classi-fication" label="收据号"></el-table-column>
            <el-table-column align="center" prop="name" label="单位或个人"></el-table-column>
            <el-table-column align="center" prop="name" label="来源"></el-table-column>
            <el-table-column align="center" prop="name" label="登记人"></el-table-column>
            <el-table-column align="center" prop="texture" label="登记日期"></el-table-column>
            <el-table-column align="center" prop="name" label="入馆状态"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <a class="m-btn"  @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination :current-page="listQuery.currentPage" :page-size="listQuery.size" :total="total" background layout="total, prev, pager, next" @size-change="handleSizeChange"  @current-change="handleCurrentChange"/>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="藏品入馆审批"  class="approval" :visible.sync="dialogEnterDetailsVisible" width="900px" >
      <enterDialog/>
    </el-dialog>
  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
import enterDialog from '../dialog/solicitation/enterStore'
export default {
  components: {
  cmpHeaderSub,
  sidebar,
  enterDialog
},
  data() {
    return {
      // 进度条事件
      active: 2,
      value1: '',
      // 弹框标签
      dynamicTags: ['陶器', '东周'],
      inputVisible: false,
      inputValue: '',
      addDialogLablectVisible: false,
      addformTag:{
        collection: ''
      },
      formTag: {
        collection: ''
      }, 
      // 表格分页
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
      currentPage: 1,
      size: 5
      },
      // 藏品弹出事件
      dialogEnterDetailsVisible: false,
      form: {
        name: '',
        region: '',
        type: []
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
  //  点击删除
  handleDelete(index, row) {
  // console.log(index, row);
  },
  //  获取表格计划名称事件
  getNameDetails(){
    console.log('成功了')
    this.dialogEnterDetailsVisible = true
    },
  //    标签方法
  handleClose(tag) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  },
  onExport(){
    console.log('点我')
  },
  //  表格分页
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
// input输入框
/deep/ .el-dialog__footer {
  padding-bottom: 0!important;
  padding: 0!important;
}
/deep/ .dialog-footer {
  text-align: center;
}
/deep/ .el-dialog__header {
  text-align: center;
  padding-bottom: 30px;
  font-size: 18px;
  font-weight: bold;
}
.content {
  padding: 30px 30px 30px 260px;
  .el-dialog__footer {
    text-align: center;
  }
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
    border-radius: 4px;
    // border: 1px solid blue;
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
  h1 {
    line-height: 60px;
  }
}
/deep/ .approval {
  .el-dialog {
   .el-timeline-item__content {
      width: 45px;
      color: #9699A2;
        }
      .el-dialog__footer {
        text-align: center!important;
        padding-top: 20px!important;
        padding: 0;
        // border-top: 1px solid blue;
          }
      .dialog-footer {
        text-align: center;
          }
      }
   .el-dialog__header {
     text-align: center;
     padding-bottom: 30px;
     font-size: 18px;
     border-bottom: 1px solid #EBEDF2;
     height: 30px;
     font-weight: bold;
   .el-dialog__title {
    float: left
  }
 }
 .timeLine {
   margin-top: 30px;
   float: left;
   width: 140px;
   border-right: 1px solid #EBEDF2;
 }
 .right {
   margin-left: 25px;
   padding-left: 140px;
   padding-top: 30px;
   
   .voucher {
     line-height: 45px;
   }
   .voucher h3 {
     margin-right: 10px;
   }
 }
 .table {
   margin-top: 30px;
   .m-btn {
     display: block;
     margin-bottom: 10px;
   }
   .m-btn:nth-last-child(2) {
     margin: 0 20px;
   }
 }
  .right  h3 {
     margin-bottom: 15px;
   }
   .personName {
     margin-top: -33px;
   }
 .el-textarea {
   .el-textarea__inner {
      width: 560px;
      height: 100px;
   }
 }
 .el-input {
   width: 90%;
 }
}
.m-btn:nth-child(2) {
  margin: 0 20px;
  color: red;
}
</style>
