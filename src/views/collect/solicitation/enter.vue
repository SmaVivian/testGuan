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
              <el-select v-model="listQuery.region" placeholder="请选择">
              <el-option label="年度计划" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>             
          <el-form ref="form" :model="listQuery" label-width="148px" style="margin-left:-78px" class="time">
            <el-form-item label="选择日期">
              <el-date-picker class="fl" v-model="listQuery.startTime" type="date" placeholder="开始日期"></el-date-picker>                  
              <el-date-picker v-model="listQuery.endTime" type="date" placeholder="结束日期"></el-date-picker>
            </el-form-item>   
            <el-form-item label="登记人">
              <el-input v-model="listQuery.register" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="入馆状态">
              <el-select v-model ='value' placeholder="请选择">
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
          <el-table :data="tableData" @selection-change="handleSelectionChange" stripe style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="image" label="入馆凭证号"></el-table-column>
            <el-table-column label="入馆凭证名称">
              <template slot-scope="scope">
                <a class="m-btn" style="color:#0590FF;cursor:pointer;" type="text" size="small" @click="getNameDetails(scope.row)">{{ scope.row.date }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="classi-fication" label="收据号"></el-table-column>
            <el-table-column prop="name" label="单位或个人"></el-table-column>
            <el-table-column prop="name" label="来源"></el-table-column>
            <el-table-column prop="name" label="登记人"></el-table-column>
            <el-table-column prop="texture" label="登记日期"></el-table-column>
            <el-table-column prop="name" label="入馆状态"></el-table-column>
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

    <!-- 点击图片上传图片 -->
    <el-dialog class="up-picture" title="上传藏品照片" :visible.sync="dialogPhotosVisible" width="470px">
        <h3 class="collectLable mb-20">上传照片</h3>
        <div class="main-content clearfix">
          <div class="main">
            <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">上传</a>
            <h3 class="view">主视图</h3>
          </div>
          <div class="main">
            <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">上传</a>
            <h3 class="view">侧视图</h3>
          </div>
          <div class="main">
            <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">上传</a>
            <h3 class="view">俯视图</h3>
          </div>
        </div>
       <h3 class="condition">( 最少上传一种类型的图片 )</h3>   
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPhotosVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 藏品入馆 -->
    <enterDialog ref="enter" :callFun = "upPicture"></enterDialog>
  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
import enterDialog from '../dialog/solicitation/enter/enterStore'
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
      // 时间选择
      value1: '',    
      // 状态选择
      value: '',    
      state: '',
       // 表格分页
      list: null,  
      total: 0,
      listLoading: true,
      listQuery: {
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
    initList () {
      this.loading = true;
      // 获取下拉状态选择值
      this.$http.get('/collectDict/getSelectDataByKey', 
        this.dicts
      ).then(res => {
        console.log(res.result)
        this.state = res.result
      })
      // 表格初始化 点击查询
      this.$http.get('/scheme/getSchemeList', 
        this.listQuery 
      ).then(res => {
        console.log(res)
        this.tableData = res.result
        this.total = res.page.allRow
        this.listLoading = false
      })
    },
    // 定义父组件上传图片弹框
    upPicture () {
      this.dialogPhotosVisible = true
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
    //  获取表格计划名称
    getNameDetails(){
      console.log('成功了')
      this.dialogEnterDetailsVisible = true
    },
    // tag标签删除
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    // 勾选复选框
    handleSelectionChange(val) {
      this.multipleSelection += ',' + val.schemeId   // todo  修改为id
    },
    // 导出
    onExport(){
      console.log('导出', this.multipleSelection)
      location.href = '/singleMuseum/scheme/exportScheme?arr=' + this.multipleSelection
      // this.$common.exportData('/collectApproval/batchExport', this.multipleSelection)
    },
    // 藏品入馆按钮
    collectEnter () {
      this.$refs.enter.enterShop()
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
