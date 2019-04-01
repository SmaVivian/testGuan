<template>
  <div class="page-solicitaion-plan">
    <div class="content">
      <!-- 进度内容 -->
      <div class="schedule-content">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">藏品征集</el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">征集计划</a></el-breadcrumb-item>
        </el-breadcrumb> 
        <el-steps class="schedule" :active="active" finish-status="success"  align-left>
          <el-step title="征集计划"></el-step>
          <el-step title="藏品入馆"></el-step>
          <el-step title="藏品建账"></el-step>
          <el-step title="藏品入库"></el-step>
        </el-steps>
<!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
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
            <el-button class="el-primary-border fr searchButton" round @click="onExport">查询</el-button>
          </el-form>
        </div>
        <div class="button">
          <el-row>
            <el-button class="el-primary-border" round @click="onExport">导出</el-button>
            <el-button class="el-primary-border" round @click="dialogOpenctVisible = true">创建计划</el-button>
            <el-button class="el-primary-border" round @click="onExport">导入征集藏品</el-button>
          </el-row>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table :data="tableData3" stripe style="width: 100%">
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" prop="image" label="计划编号"></el-table-column>
            <el-table-column label="计划名称" align="center">
              <template slot-scope="scope">
                <a class="m-btn" style="color:#0590FF;text-decoration:underline;cursor:pointer;" type="text" size="small" @click="getNameDetails(scope.row)">{{ scope.row.date }}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="classi-fication" label="计划年度"></el-table-column>
            <el-table-column align="center" prop="name" label="预计经费(万元)"></el-table-column>
            <el-table-column align="center" prop="name" label="登记人"></el-table-column>
            <el-table-column align="center" prop="name" label="登记时间"></el-table-column>
            <el-table-column align="center" prop="texture" label="计划状态"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">关闭</a>
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
              layout="total, prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
            </div>
        </div>
      </div>
    </div>
    <el-dialog title="征集计划审批"  class="approval" :visible.sync="dialogNameDetailsVisible" width="900px" >
      <div class="timeLine">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities2" :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size">
            {{activity.name}}
            {{activity.state}}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="right">
        <h3>2018 / 01 / 11</h3>
        <h3 class="personName fr">贾军</h3>
          <el-form ref="form" :model="form" label-width="100px" class="fl">
            <el-row>
            <el-col :span="12">
              <el-form-item label="计划名称 :">
                <el-input v-model="form.name" placeholder="计划一"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计划编号 :">
                <el-input v-model="form.name" placeholder="计划一"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="征集目的 :">
                <el-input v-model="form.name" placeholder="计划一"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预计经费 :">
                <el-input v-model="form.name" placeholder="万元"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="8"> 
              <el-form-item label="年度计划 :">
                <el-date-picker v-model="value1" type="date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="活动形式 :" prop="shape">
            <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
          </el-form-item>
          <el-form-item label="正文内容 :" prop="content">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>
        </el-form>
        <h3>上传附件 :</h3>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">支持扩展名: .rar .zip .doc .pdf .jpg</div>
        </el-upload>
      </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogNameDetailsVisible = false">取 消</el-button>
          <el-button type="primary" @click="fromCollection">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
export default {
  components: {
  cmpHeaderSub,
  sidebar,
},
  data() {
    return {
      // 点击上传
      fileList: [{name: '概念设计文档', url: ''}],
      ruleForm: {
        shape: '',
        content: ''
      },
      ruleForm: {
        shape: '',
        content: ''
      },
      activities2: [{
        name: '将明',
        state: '待审核',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      },
      {
        name: '冯桂英',
        state: '待审核',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      },
      {
        name: '将明',
        state: '待审核',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      },
      {
        name: '将明',
        state: '待审核',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      }],
      // 时间选择器
      value1: '',
      // 搜索条件
      form: {
        name: '',
      },
      // 进度条事件
      active: 0,
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
      dialogLablectVisible: false,
      dialogOpenctVisible: false,
      dialogTableVisible: false,
      dialogCollectVisible: false,
      dialogNameDetailsVisible: false,
      form: {
        name: '',
        region: '',
        type: []
      },
      formLabelWidth: '120px',
      // 公开藏品藏品弹出表格事件
      attribute: [{
      number: '1',
      name: '总登记号',
      address: '上'
      },
      {
        number: '1',
        name: '总登记号',
        address: '上'
      },
      {
        number: '1',
        name: '总登记号',
        address: '上'
      }],
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
  //  顶部导航栏
  changeTab(path) {
  this.$router.push({path: '/collect/' + path})
 },
  //  点击删除
  handleDelete(index, row) {
  // console.log(index, row);
  },
  // 点击上传
  handleRemove(file, fileList) {
      console.log(file, fileList);
    },
  handlePreview(file) {
    console.log(file);
  },
  handleExceed(files, fileList) {
    this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
  },
  beforeRemove(file, fileList) {
    return this.$confirm(`确定移除 ${ file.name }？`);
  },
  //  获取表格计划名称事件
  getNameDetails(){
    console.log('成功了')
    this.dialogNameDetailsVisible = true
    },
  //    进度条事件
  //  next() {
  //     if (this.active++ > 2) this.active = 0;
  //   },
  //    标签方法
  handleClose(tag) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  },
  // 弹框新建标签方法
  fromCollection(){
    //    alert(this.formTag.collection)
    if(this.formTag.collection == 4) {
    //    alert(1)
      this.addDialogLablectVisible = true;
      return;
    }
  this.dialogCollectVisible = false
  },
  addCollection(){
      this.addDialogLablectVisible = false;
      this.dialogCollectVisible = false;
  },
  //  按钮事件
  onLabel() {
    console.log('点我')
  },
  onExport(){
    console.log('点我')
  },
  onCollection(){
    console.log('点我')
  },
  newlyBuild() {
    console.log('dss')
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
