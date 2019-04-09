<template>
  <div class="g-wrap">
    <div class="page-collect">
      <div class="content">
        <!-- 进度内容 -->
        <div class="schedule-content">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">出库管理</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;" class="breadcrumb">回库管理</a></el-breadcrumb-item>
          </el-breadcrumb> 
          <div class="search-content">
            <el-form ref="form" :model="form" label-width="70px" class="searchTop">
              <el-form-item label="出库单号">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="出库类型">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="出库单号">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="审批状态">
                <el-select v-model="form.region" placeholder="请选择">
                <el-option label="审批状态一" value="shanghai"></el-option>
                <el-option label="审批状态二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
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
          </div>
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
          <div class="button">
            <el-row>
              <el-button class="el-primary-border" round @click="onExport">添加申请</el-button>
              <el-button class="el-primary-border" round @click="dialogOutVisible = true">导出出库单</el-button>
              <el-button class="el-primary-border" round @click="dialogonExportVisible = true">导出点交单</el-button>
            </el-row>
          </div>
          <!-- 表格 -->
          <div class="table">
            <el-table :data="tableData3" stripe style="width: 100%">
              <el-table-column align="center" type="selection" width="100"></el-table-column>
              <el-table-column align="center" prop="image" label="出库单号" width="200"></el-table-column>
              <el-table-column label="出库类型" align="center" width="200"></el-table-column>
              <el-table-column align="center"  prop="classi-fication" label="出库单号名称" width="200">
                <template slot-scope="scope">
                  <a class="m-btn" style="color:#0590FF;text-decoration:underline;cursor:pointer;" type="text" size="small" @click="getNameDetails(scope.row)">{{ scope.row.date }}</a>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="name" label="登记人" width="200"></el-table-column>
              <el-table-column align="center" prop="name" label="创建时间" width="150"></el-table-column>
              <el-table-column align="center" prop="name" label="审批状态" width="150"></el-table-column>
              <el-table-column align="center" prop="texture" label="出库状态" width="150"></el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="200">
                <template>
                  <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">出库</a>
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
    <!-- 导出出库单按钮 -->
    <el-dialog title="藏品出库"  class="approval" :visible.sync="dialogOutVisible" width="900px" >
    <div class="timeLine">
      <el-timeline >
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
       <el-form ref="form" :model="form" label-width="104px"  class="fl">
         <el-row>
          <el-col :span="9" class="voucher">
            <h3 class="fl">入馆凭证号 :</h3>
            <span class="fl" >RGLS-2018-13</span>
          </el-col>
          <el-col :span="15">
            <el-form-item label="入馆凭证名称 :">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收据号 :">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位或个人 :">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8"> 
            <el-form-item label="来源 :">
              <el-date-picker v-model="value1" type="date"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="入馆备注 :" prop="shape"  >
          <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
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
    <div class="table">
      <div class="operation">
        <a class="m-btn fl" @click="dialogLablectVisible = true" type="text" size="small">藏品明细</a>
        <a class="m-btn fr" @click="dialogLablectVisible = true" type="text" size="small">替换</a>
      </div>
        <el-table :data="tableData3" stripe>
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="image" label="登记号" width="80"></el-table-column>
          <el-table-column label="藏品名称" width="80" align="center"></el-table-column>
          <el-table-column prop="classi-fication" label="时代" width="80"></el-table-column>
          <el-table-column prop="name" label="藏品分类" width="80"></el-table-column>
          <el-table-column prop="name" label="级别" width="80"></el-table-column>
          <el-table-column prop="name" label="质地" width="80"></el-table-column>
          <el-table-column prop="texture" label="完残程度" width="80"></el-table-column>
          <el-table-column prop="degree" label="数量" width="60"></el-table-column>
          <el-table-column prop="number" label="出库数量" width="80"></el-table-column>
          <el-table-column prop="company" label="库房名称" width="80"></el-table-column>
        </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogEnterlVisible = false">取 消</el-button>
      <el-button type="primary" @click="fromCollection">提 交</el-button>
    </div>
    </el-dialog>
      <!-- 导出点交单按钮 -->
      <el-dialog title="导出点交单按钮"  class="approval" :visible.sync="dialogonExportVisible" width="900px" >
        <div class="timeLine">
          <el-timeline >
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
          <el-form ref="form" :model="form" label-width="104px"  class="fl">
            <el-row>
              <el-col :span="9" class="voucher">
                <h3 class="fl">入馆凭证号 :</h3>
                <span class="fl" >RGLS-2018-13</span>
              </el-col>
              <el-col :span="15">
                <el-form-item label="入馆凭证名称 :">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="收据号 :">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单位或个人 :">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="8"> 
                <el-form-item label="来源 :">
                  <el-date-picker v-model="value1" type="date"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="入馆备注 :" prop="shape"  >
              <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
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
        <div class="table">
          <div class="operation">
            <a class="m-btn fl" @click="dialogLablectVisible = true" type="text" size="small">藏品明细</a>
            <a class="m-btn fr" @click="dialogLablectVisible = true" type="text" size="small">替换</a>
          </div>
            <el-table :data="tableData3" stripe>
              <el-table-column mtype="selection" width="50" align="center"></el-table-column>
              <el-table-column prop="image" label="登记号" width="80"></el-table-column>
              <el-table-column label="藏品名称" width="80" align="center"></el-table-column>
              <el-table-column prop="classi-fication" label="时代" width="80">
              </el-table-column>
              <el-table-column prop="name" label="藏品分类" width="80"></el-table-column>
              <el-table-column prop="name" label="级别" width="80"></el-table-column>
              <el-table-column prop="name" label="质地" width="80"></el-table-column>
              <el-table-column prop="texture" label="完残程度" width="80"></el-table-column>
              <el-table-column prop="degree" label="数量" width="60"></el-table-column>
              <el-table-column prop="number" label="出库数量" width="80"></el-table-column>
              <el-table-column prop="company" label="库房名称" width="80"></el-table-column>
            </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEnterlVisible = false">取 消</el-button>
        <el-button type="primary" @click="fromCollection">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import top from '@cmp/topbar'
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
export default {
  components: {
    cmpHeaderSub,
    sidebar,
    top
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
        name: '张主管',
        state: '审核通过',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      },
      {
        name: '刘部长',
        state: '审核通过',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
      },
      {
        name: '李馆长',
        state: '审核通过',
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
      dialogOutVisible: false,
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
      dialogOutVisible: false,
      dialogonExportVisible: false,
      form: {
        name: '',
        region: '',
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
      sidebarData: [
        {
          name: '藏品管理',
          icon: 'pro',
          index: '/plan'
        },
        {
        name: '回库管理',
        icon: 'pro',
        index: '/2'
        }
      ],
   
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

/deep/ .el-dialog__header {
    border-bottom: 1px solid #EBEDF2;
    height: 30px;
    padding-bottom: 30px;
    font-size: 18px;
    font-weight: bold;
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
 }
.content {
  padding: 30px 30px 30px 260px;
  .el-breadcrumb {
    height: 50px;
    line-height: 50px;
    padding: 0px 0 0px 30px;
    font-size: 18px;
    margin-bottom:20px;
  }
  .table {
    padding: 0 25px;
    background-color: #fff;
  }
  .schedule-content {
    padding: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: #fff;
  .el-breadcrumb {
    line-height: 56px;
    background: #fff;
  }
  /deep/ .search-content {
    .searchTop {
      display: flex;
    }
    .searchBottom {
      display: flex;
    }
      .time {
        width: 486px;
      }
      .el-form {
        .collectTime {
          width: 1334px;
          margin-top: 10px;
        }
        .el-input__inner {
        width: 150px;
        }
      }
    }
  }
  /deep/ .table-content {
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    border-radius: 4px;
    .button {
      background-color: #fff;
      border-radius: 4px;
    }
    // 分页样式
    .el-pagination {
      margin-top: 0;
      padding: 25px 0;
      background-color: #fff;
    }
    .el-button.is-round {
      margin: 25px 20px;
      padding: 10px 23px;
    }
  }
  h1 {
    line-height: 60px;
  }
}
// 按钮点击事件样式

.el-table::before {
  height: 0;
  content:'';
}
.el-date-editor:nth-child(2) {
  margin-left: -50px;
}
/deep/ .approval {
  .el-dialog {
    .el-timeline-item__content {
      width: 56px;
      color: #9699A2;
    }
    .el-dialog__footer {
      text-align: center!important;
      padding-top: 20px!important;
      padding: 0;
      padding-bottom: 0!important;
      padding: 0!important;
      .dialog-footer {
        margin-top: 20px;
      }
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
// 侧边栏样式
.cmp-sidebar {
  margin: 30px;
}
.el-form-item {
  margin: 0px 30px 30px 27px;
}
  .searchBottom {
    .el-form-item:nth-child(2) {
      margin-left: 50px;
    }
    .el-form-item:nth-child(3) {
     margin-left: 38px;
   }
  }
  .searchBton {
    height: 40px;
  }
  .content {
    padding: 0;
  }
</style>
