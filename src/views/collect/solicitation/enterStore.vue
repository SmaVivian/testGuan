<template>
  <div class="page-solicitaion-plan">
    <div class="content">
      <!-- 进度内容 -->
      <div class="schedule-content">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">藏品征集</el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">藏品入库</a></el-breadcrumb-item>
        </el-breadcrumb> 
        
        <el-steps class="schedule" :active="active" finish-status="success"  align-left>
          <el-step title="征集计划"></el-step>
          <el-step title="藏品入馆"></el-step>
          <el-step title="藏品建账"></el-step>
          <el-step title="藏品入库"></el-step>
        </el-steps>
      </div>
      
      <div class="search-content">
        <el-input placeholder="请输入总登记号 / 藏品名称搜索" v-model="searchName" class="titSearch">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <div class="sch">
          <div class="sch-type">全部结果 :</div>
          <div>
            <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
          </div>
          <el-button type="primary" class="reset" size="mini" style="width:20px">重置</el-button>
        </div>

        <div class="sch">
          <div class="sch-type">精品分类 :</div>
          <div class="sch-content">
            <span v-for="item in searchTag" :key="item.name">{{item.name}}&nbsp;({{item.number}})</span>
            <span @click="handleClick" ref="span">收起</span>
          </div>
        </div>

        <div class="sch">
          <div class="sch-type">所属年代 :</div>
          <div class="sch-content">
            <span v-for="item in searchYear" :key="item.number">{{item.name}}&nbsp;({{item.number}})</span>
            <span>收起 ></span>
          </div>
        </div>

        <div class="sch">
          <div class="sch-type">文物级别 :</div>
          <div class="sch-content">
            <span v-for="item in searchLeve" :key="item.name">{{item.name}}&nbsp;({{item.number}})</span>
            <span>更多</span>
          </div>
        </div>

        <div class="sch">
          <div class="sch-type">高级选项 :</div>
          <div class="sch-content">
            <el-input class="lableSearch" placeholder="藏品标签搜索" v-model="searchName">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-form ref="form" :model="form" label-width="" inline>
              <el-form-item>
                <el-select v-model="form.region" placeholder="质地">
                  <el-option label="说明" value="shanghai"></el-option>
                  <el-option label="全部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="form.region" placeholder="来源">
                  <el-option label="说明" value="shanghai"></el-option>
                  <el-option label="全部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="form.region" placeholder="状态">
                  <!-- <el-option v-for="item in textureCondition" :key="item.name">{{item.name}}{{item.value}}</el-option> -->
                  <el-option label="说明" value="shanghai"></el-option>
                  <el-option label="全部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="form.region" placeholder="完残程度">
                  <!-- <el-option v-for="item in textureCondition" :key="item.name">{{item.name}}{{item.value}}</el-option> -->
                  <el-option label="说明" value="shanghai"></el-option>
                  <el-option label="全部" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
            
      </div>
      
     
      <!-- 表格内容 -->
      <div class="table-content">
        <div class="button">
          <el-row>
            <el-button class="el-primary-border" round @click="onExport"><svg-icon icon-class="daochu" />&nbsp;导出</el-button>       
          </el-row>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  type="selection"></el-table-column>
            <el-table-column  prop="image" label="图片"></el-table-column>
            <el-table-column label="总登记号"  prop="name"></el-table-column>
            <el-table-column  prop="classi-fication" label="入库凭证号"></el-table-column>
            <el-table-column  prop="name" label="入库库房"></el-table-column>
            <el-table-column  prop="name" label="藏品名称">
              <template slot-scope="scope">
                <a class="m-btn" style="color:#0590FF; cursor:pointer;" type="text" @click="getNameDetails(scope.row)">{{ scope.row.date }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="年代"></el-table-column>
            <el-table-column prop="name" label="藏品分类"></el-table-column>
            <el-table-column prop="texture" label="质地"></el-table-column>
            <el-table-column prop="texture" label="完残程度"></el-table-column>
            <el-table-column prop="texture" label="状态"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template>
                <a class="m-btn" @click="enter" type="text" size="small">入库</a>
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

    <!-- 入馆 -->
    <enterDialog ref="enterStoreDialog" @initList = "init"> </enterDialog>

    <!-- 点击表格获取内容详情 -->
    <contentDetil ref="contentDialog"></contentDetil>

  </div>
</template>

<script>
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
import enterDialog from '../dialog/enterStore/enterGoing'
import contentDetil from '../dialog/enterStore/enterDetail'

export default {
  components: {
    cmpHeaderSub,
    sidebar,
    enterDialog,
    contentDetil
    // cmpEnterCollect
  },
  data() {
    return {
      searchName: "",
      ruleForm: {
        shape: '',
        content: ''
      },
      ruleForm: {
        shape: '',
        content: ''
      },
      searchTag:[
            {name: '全部 ', number:'23543'},
            {name: '书法/绘画 ', number:'12351'},
            {name: '陶器 ', number:'12452'},
            {name: '瓷器 ', number:'12452'},
            {name: '铜器 ', number:'12452'},
            {name: '玉石器 ', number:'122'},
            {name: '金银器 ', number:'122'},
        ],
        searchYear:[
            {name: '全部 ', number:'2637'},
            {name: '中华人民共和国 ', number:'1251'},
            {name: '明国 ', number:'2151'},
            {name: '清 ', number:'125'},
            {name: '明 ', number:'122'},
            {name: '元 ', number:'143'},
            {name: '宋 ', number:'324'},
            {name: '唐宋 ', number:'23553'},
            {name: '东汉 ', number:'342'},
        ],
        searchLeve:[
            {name: '全部 ', number:'23543'},
            {name: '珍贵文物 ', number:'12351'},
            {name: '一级文物 ', number:'12343'},
            {name: '二级文物 ', number:'125'},
            {name: '三级文物 ', number:'122'},
            {name: '未定级 ', number:'143'},
        ],       
      // 进度条事件
      active: 4,
      // 弹框标签
      dynamicTags: ['陶器', '东周','未定级'],
      // 表格分页
      total: 0,
      listLoading: true,
      listQuery: {
      currentPage: 1,
      size: 5
      },
      dialogEnterVisible: false,
      form: {
        name: '',
        region: '',
        type: []
      },
      // 当前选中页面
      currentPage: 5,
      // 表格数据
      tableData: [
        {
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
        }
      ],
      multipleSelection: [],
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 接受子页面调用的方法
    init(){
      this.initList()
    },
    initList() {
      this.loading = true;
      // 获取下拉状态选择值
      // this.$http.get('/collectDict/getSelectDataByKey', 
      //   this.dicts
      // ).then(res => {
      //   this.state = res.result
      // })
      // 初始化表格 点击查询
      // this.$http.get('/enter/getEnterList', 
      //   this.listQuery 
      // ).then(res => {
      //   console.log(res)
      //   this.tableData = res.result
      //   this.total = res.page.allRow
      //   this.listLoading = false
      // })
    },

    enter () {
      this.$refs.enterStoreDialog.enterStore()
    },
     handleClick(){
      if(this.$refs.span.innerHTML == '收起') {
        this.searchTag = this.searchTag.splice(0,3)
        this.$refs.span.innerHTML = '展开'
      } else{
        // this.getTag()
        // this.searchTag = this.searchTag.splice(0,3)
        this.$refs.span.innerHTML = '收起'
      }
    },

  //  获取表格计划名称事件
  getNameDetails(){
    this.$refs.contentDialog.nameDetail()
    this.dialogNameDetailsVisible = true
    },
  // 标签删除方法
  handleClose(tag) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  },

  // 获取表格序号
    handleSelectionChange(val){
      console.log(val)
      this.tableIndex = val
      this.multipleSelection = val
      // this.multipleSelection += val[0].schemeId + ','
    },

  onExport(){
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
        //  location.href = '/singleMuseum/scheme/exportScheme?arr=' + str
      }
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
.el-form-item {
  margin: 0 10px;
  margin-right: 0!important;
}
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
    padding: 0 30px;
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
    .el-button.is-round {
      margin-left: 20px;
    }
  }
}
.search-content {
  border-radius: 4px;
  margin-top: 30px;
  padding: 30px;
  background-color: #fff;
  .titSearch {
    width: 21.5%;
    background-color: #fff;
    margin: 10px 3%;
    float: right;
  }
}
.sch{
  display: flex;
  padding: 10px 0;
  font-size: 14px;
  background-color: #fff;
  .sch-type {
    height: 20px;
    width: 75px;
    color: #B5B1DD;
  }
  .sch-type:first-child {
    margin-top: 3px;
  } 
  .el-tag {
    margin-left: 5px;
    height: 25px;
    line-height: 24px;
    border-radius: 15px;
    border: 1px solid #0590FF;
    background-color: #fff;
  }
  .el-tag:hover {
    background-color: #0590FF;
    color: #fff;
  }
.reset {
    border: 1px solid #0590FF;
    width: 59px !important;
    height: 20px;
    line-height: 2px;
    margin: 3px 15px;
  }
  .reset:hover {
    color: #fff;
    background-color: $primary;
  }
  .sch-content {
    width: 100%;
      .lableSearch {
        width: 18%;
        float: left;
      }
    }
  .sch-content span {
    padding: 0 15px;
    color: #575962;
  }
  span:last-child{
    color: #0590FF;
  }
}
/deep/ .approval {
  .el-dialog {
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
 .right {
   padding-top: 30px;
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
 
   .el-textarea__inner {
      width: 560px;
      height: 100px;
   }
  .el-input {
   width: 90%;
   margin-bottom: 30px;
 }
}
</style>

