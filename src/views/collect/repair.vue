<template>
  <div class="g-wrap">
    <div class="page-collect clearfix">
      <!-- 顶部导航 -->
      <div class="g-collect-top">
        <top/>
      </div>
      <!-- 侧边栏 -->
      <div class="con">
        <sidebar :menuList="sidebarData" :activeIndex="`/collect/repair`" class="sidebarCont"></sidebar>
      </div>
        
      <div class="content">
        <!-- 搜索内容 -->
        <div class="search-content">
          <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/' }">藏品修复</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;" class="breadcrumb">修复管理</a></el-breadcrumb-item>
          </el-breadcrumb> 
          <el-input placeholder="请输入总登记号 / 藏品名称搜索" v-model="search" class="titSearch">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <!-- 搜索详情 -->
          <div>

            <div class="sch">
              <div class="sch-type">全部结果 :</div>
              <div>
                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" ref="tag">
                  {{tag}}
                </el-tag>
              </div>
              <!-- <el-button type="primary" class="reset" size="mini" style="width:20px" @click="dynamicTags = []">重置</el-button> -->
              <el-button type="primary" class="reset" size="mini" style="width:20px" @click="restTag(dynamicTags)">重置</el-button>
            </div>

            <div class="sch">
              <div class="sch-type gold">精品分类 :</div>
              <div class="sch-content">
                <span v-for="item in searchTag" :key="item.name">{{item.name}}&nbsp;({{item.number}})</span>
                <span @click="handleClick" ref="span">收起</span>
              </div>
            </div>

            <div class="sch">
              <div class="sch-type gold">所属年代 :</div>
              <div class="sch-content">
                <span v-for="item in searchYear" :key="item.number">{{item.name}}&nbsp;({{item.number}})</span>
                <span>收起 ></span>
              </div>
            </div>

            <div class="sch">
              <div class="sch-type gold">文物级别 :</div>
              <div class="sch-content">
                <span v-for="item in searchLeve" :key="item.name">{{item.name}}&nbsp;({{item.number}})</span>
                <span>更多</span>
              </div>
            </div>

            <div class="sch">
              <div class="sch-type select">高级选项 :</div>
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
                      <el-option label="说明" value="shanghai"></el-option>
                      <el-option label="全部" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="form.region" placeholder="完残程度">
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
              <el-button class="el-primary-border" round @click="onExport"><svg-icon icon-class="daochu" />&nbsp;导出</el-button>
              <el-button class="el-primary-border" round><svg-icon icon-class="gongkai" class="open"/>&nbsp;添加申请</el-button>
            </el-row>
          </div>
            <!-- 表格 -->
          <div class="table">
            <el-table :data="tableData3" stripe>
              <el-table-column type="selection" align="center"></el-table-column>
              <el-table-column prop="image" label="图片" ></el-table-column>
              <el-table-column label="总登记号" align="center">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column prop="classi-fication" label="出库单号"></el-table-column>
              <el-table-column label="藏品名称">
                <template slot-scope="scope">
                  <a class="m-btn" style="color:#0590FF;cursor:pointer;" type="text" size="small" @click="getDetails(scope.row)">{{ scope.row.name }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="" label="年代"></el-table-column>
              <el-table-column prop="" label="商品分类"></el-table-column>
              <el-table-column prop="texture" label="质地"></el-table-column>
              <el-table-column prop="degree" label="完残情况"></el-table-column>
              <el-table-column prop="open" label="审批状态"></el-table-column>
              <el-table-column prop="open" label="修复状态"></el-table-column>
              <el-table-column prop="open" label="藏品状态"></el-table-column>
              <el-table-column fixed="right" align="center" label="操作">
                <template>
                  <a class="m-btn" @click="prepare" type="text" size="small">备案</a>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container">
              <el-pagination :current-page="listQuery.currentPage" :page-size="listQuery.size" :total="total" background layout="total, prev, pager, next"  @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- 备案按钮弹框 -->
     <el-dialog title="藏品修复备案"  class="approval" :visible.sync="dialogPrepareVisible" width="900px" >
      <div class="right">
        <h3 class="fl">2018 / 01 / 11</h3>
        <h3 class="personName fr">贾军</h3>
          <el-form ref="form" :model="form" label-width="105px" class="fl">
            <el-row>
              <el-col :span="9">
                <el-form-item label="出库单号 :">
                  <el-input v-model="form.name" placeholder="XF-42"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
              <el-form-item label="出库单号名称 :">
                <el-input v-model="form.name" placeholder="藏品修复1号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="负责人 :">
                <el-input v-model="form.name" placeholder="张三"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="参与人员 :">
                <el-input v-model="form.name" placeholder="张三 李四"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6"> 
              <el-form-item label="修复保护人 :">
                <el-input v-model="form.name" placeholder="李四"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="8">
              <el-form-item label="修复单位 :">
                <el-input v-model="form.name" placeholder="苏丹红修复单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="9">
              <el-form-item label="修复类型: ">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="修复一" value="shanghai"></el-option>
                <el-option label="修复二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="完成日期: ">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>      
            </el-form-item>
            </el-col>
          </el-row>

          <div class="textareaCont">
            <div class="picture">
              <h3>修复后图片: </h3>  <h3 class="ico"><svg-icon icon-class="add"/>&nbsp;</h3>
            </div>
            <el-form-item label="修复后状态描述 :" prop="shape">
              <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
            </el-form-item>
            <el-form-item label="检测方法和结果 :" prop="content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="修复方案 :" prop="content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="专家论证意见 :" prop="content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="修复过程描述 :" prop="content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="修复使用材料 :" prop="content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
          </div>
          
        </el-form>
      </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPrepareVisible = false">回 库</el-button>
          <el-button type="primary" @click="dialogPrepareVisible = false">取 消</el-button>
        </div>
      </el-dialog>

  </div>
</template>

<script>
import top from '@cmp/topbar'
import sidebar from '@cmp/sidebar'
import lableDialog from './dialog/manage/lable'
export default {
  components: {
    sidebar,
    lableDialog,
    top,
  },
  data() {
    return {
      dialogPrepareVisible: false,
      value1: '',
      ruleForm: {
        shape: '',
        content: ''
      },
      // 搜索条件
      search: "",
      searchName: "",
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
      form: {
        name: '',
        region: '',
        type:[]
      },
      // 当前选中页面
      currentPage: 5,
      sidebarData: [
        {
          name: '修复管理',
          icon: 'cangpinguanli',
          index: '/collect/repair'
        },
      ],
      // 表格数据
      tableData3: [{
        date: '2016-05-03',
        name: '翠卧牛',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
          date: '2016-05-02',
          name: '翠卧牛',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '翠卧牛',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '翠卧牛',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '翠卧牛',
        }],
       dynamicTags: ['陶器', '东周', '未定级'],
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
  // 点击备案弹框按钮
  prepare () {
    this.dialogPrepareVisible = true;
  },
  // 重置标签方法
  restTag (dynamicTags) {
    this.dynamicTags = [];
  },
  handleClose(tag) {
    this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
  },
  //  按钮事件
  onExport(){
    console.log('点我')
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
.el-form-item {
  margin: 0 10px;
  margin-right: 0!important;
}
// 重置样式
/deep/ .el-dialog__footer {
    padding-bottom: 0!important;
    padding: 0!important;
    margin-top: 20px;
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
.g-container {
  .content {
    padding: 30px 30px 30px 260px;
    .titSearch {
      width: 21.5%;
      background-color: #fff;
      margin: -40px 3%;
      float: right;
    }
    .table {
      padding: 0 30px;
      border-radius: 5px;
      background-color: #fff;
    }
    .search-content {
      padding: 30px 30px 20px 30px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
        .el-breadcrumb {
          font-size: 18px;
          line-height: 20px;
          margin-bottom: 30px;
          background: #fff;
        } 
      }
  .sch{
    display: flex;
    padding: 10px 0;
    font-size: 14px;
    background-color: #fff;
      .gold {
        line-height: 14px;
      }
      .select {
        line-height: 35px;
      }
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
  height: 24px;
  line-height: 17px;
  margin: 0 15px;
}
.reset:hover {
  color: #fff;
  background-color: $primary;
}
  .sch-content {
    width: 100%;
      .lableSearch {
        width: 208px;
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
      margin: 30px 5px 30px 30px;
      padding: 10px 23px;
      }
  }
}
  .el-dialog__header {
    .el-dialog__title {
      text-align: center;
    }
  }
  .el-dialog__body {
    padding: 15px 0 20px 0!important;
    .right {
      h3 {
        margin-bottom: 20px;
      }
    }
    .picture {
      margin: 20px 25px;
      padding-left: 20px;
      display: flex;
        .ico {
          width: 80px;
          height: 80px;
          margin-left: 10px;
          border: 1px dashed #0590FF;
          border-radius: 5px;
          .svg-icon {
            margin: 30px 30px;
            font-size: 20px;
            color: #0590FF;
            cursor: pointer;
          }
        }
    }
    .el-form {
      margin-left: -20px;
        .textareaCont {
        /deep/.el-form-item {
          .el-form-item__content {
            margin-left: 118px !important;
          }
          .el-form-item__label {
            width: 118px !important;
          }
        }
      }
    }
    .el-form-item {
      margin-bottom: 20px;
      /deep/.el-textarea__inner {
        height: 80px;
      }
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
  .cmp-sidebar {
    margin-top: 20px;
  }
}
.el-table::before {
height: 0;
content:'';
}
.el-button {
  margin-left: 5px;
  .open {
    font-size: 14px;
  }
}
.el-input__icon {
  color: #0590FF;
}
/deep/.el-input__prefix {
  left: 78%;
}
/deep/.el-input__inner {
  padding-left: 15px;
}
.con {
  height: 95px;
}
.el-date-editor {
  width: 150px;
}
</style>
