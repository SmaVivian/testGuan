<template>
  <div class="g-wrap">
    <div class="page-collect clearfix">
       <!-- 顶部导航 -->
       <div class="g-collect-top">
        <top/>
      </div>
      <!-- 侧边栏 -->
        <sidebar :menuList="sidebarData" :activeIndex="`/collect/repair`" class="sidebarCont"></sidebar>
      <div class="content">
        <!-- 搜索内容 -->
        <div class="search-content">
          <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/' }">藏品修护</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">修护管理</a></el-breadcrumb-item>
            <el-input placeholder="请输入总登记号 / 藏品名称搜索" v-model="searchName">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </el-breadcrumb> 
          <!-- 搜索详情 -->
          <div class="seh-content"> 
            <div class="sch">
              <div class="sch-type">全部结果 :</div>
              <div>
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" ref="dynamicTags">
                  {{tag}}
                </el-tag>
              </div>
              <el-button class="reset" round >重置</el-button>
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
                <el-form ref="form" :model="form" label-width="">
                  <el-form-item>
                    <el-select v-model="form.region" placeholder="质地">
                      <!-- <el-option v-for="item in textureCondition" :key="item.name">{{item.name}}{{item.value}}</el-option> -->
                      <el-option label="说明" value="shanghai"></el-option>
                      <el-option label="全部" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="form.region" placeholder="来源">
                      <!-- <el-option v-for="item in textureCondition" :key="item.name">{{item.name}}{{item.value}}</el-option> -->
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
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
          <div class="button">
            <el-row>
              <el-button class="el-primary-border" round @click="onExport">导出</el-button>
              <el-button class="el-primary-border" round @click="onExport">添加申请</el-button>
            </el-row>
          </div>
          <!-- 表格 -->
          <div class="table">
            <el-table :data="tableData3" stripe>
              <el-table-column type="selection" width="50" align="center"></el-table-column>
              <el-table-column prop="image" label="图片" width="110"></el-table-column>
              <el-table-column label="登记号" width="150" align="center"><template slot-scope="scope">{{ scope.row.date }}</template></el-table-column>
              <el-table-column prop="classi-fication" label="出库单号" width="130"></el-table-column>
              <el-table-column prop="name" label="藏品名称" width="130">
                <template slot-scope="scope">
                  <a class="m-btn" style="color:#0590FF;text-decoration:underline;cursor:pointer;" type="text" size="small" @click="getNameDetails(scope.row)">{{ scope.row.date }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="年代" width="130"></el-table-column>
              <el-table-column prop="name" label="藏品分类" width="130"></el-table-column>
              <el-table-column prop="texture" label="质地" width="120"></el-table-column>
              <el-table-column prop="degree" label="完残情况" width="120"></el-table-column>
              <el-table-column prop="number" label="审批状态" width="120"></el-table-column>
              <el-table-column prop="company" label="修复状态" width="120"></el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="130">
                <template>
                  <a class="m-btn" type="text" size="small" @click="dialogMoveVisible = true">备案</a>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination :current-page="listQuery.currentPage" :page-size="listQuery.size" :total="total" background layout="total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      // 搜索条件
        searchName: "",
        // 弹框标签
        dynamicTags: ['陶器', '东周', '未定级'],
        inputVisible: false,
        inputValue: '',
        addformTag:{
          collection: ''
        },
        formTag: {
          collection: ''
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
      dialogTableVisible: false,
      dialogMoveVisible: false,
      addDialogLablectVisible: false,
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
      sidebarData: [
        {
          name: '修护管理',
          icon: 'pro',
          index: '/collect/repair'
        },
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
        },
        {
          date: '2016-05-07',
          name: '王小',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
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
    handleClick(){
        if(this.$refs.span.innerHTML == '收起') {
            this.searchTag = this.searchTag.splice(0,3)
            this.$refs.span.innerHTML = '展开'
        } else{
            // this.getTag()
            // this.searchTag = this.searchTag.splice(0,3)
            this.$refs.span.innerHTML = '收起'
        }
    }  
  },
}
</script>

<style lang="scss" scoped>
// 重置样式
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
.content[data-v-22c69cfa] {
  background-color: #F2F3F8;
  padding: 30px 30px 61px 260px;
}
.content {
  padding: 30px 30px 30px 270px;
  .table {
      padding: 0 25px;
      background-color: #fff;
  }
  .search-content {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    .el-form {
        float: left;
      }
    .el-form-item {
      float: left;
      margin: 0 10px;
    }
    .el-breadcrumb {
      padding: 0 30px;
      height: 70px;
      line-height: 70px;
      background: #fff;
      .el-input {
        width: 17.5%;
        margin: 1% 0 0 70%
      }
    }
    .seh-content {
      background-color: #fff;
    }
  }
  .sch{
    display: flex;
    padding: 12px 30px;
    font-size: 14px;
    background-color: #fff;
    .sch-type {
        width: 75px;
        color: #B5B1DD;
    }
    .reset {
      height: 38px;
      margin: -4px 15px;
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
  .table-content {
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
.el-dialog {
  border: 1px blue;
}
.el-dialog__footer {
  text-align: center;
}
.el-dialog__title {
  text-align: center;
}

.el-table::before {
    height: 0;
    content:'';
}
.el-dialog__body {
    padding: 15px 0 20px 0!important;
}
 h3 {
    float: left;
    display: block;  
}
h3:nth-of-type(even) {
  margin-left: 20px;
}
h3:nth-child(3) {
  margin-left: 25%;
}
.MoveLibrary {
  .nowRoom {
  width: 27%;
  }
}
.el-tag {
  margin: 0 10px;
}
.storageRoom {
  height: 20px;
  margin-bottom: 40px;
}
.storageTime {
  height: 20px;
  margin-bottom: 5px;
}
.dialog-footer {
  margin-bottom: 15px;
}
.collectLable {
  width: 75px;
  line-height: 35px;
}
.labelTable {
  margin-bottom: 20px;
}
.cmp-sidebar {
  margin: 30px;
}
</style>
