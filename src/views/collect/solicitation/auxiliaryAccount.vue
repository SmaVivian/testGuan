<template>
  <div class="g-wrap">
    <div class="page-project"> 
      <div class="storeContent">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">藏品征集</el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">藏品建账</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="javascript:;">藏品辅助账</a></el-breadcrumb-item>
        </el-breadcrumb>
        <el-steps class="schedule" :active="active" finish-status="success"  align-left>
          <el-step title="征集计划"></el-step>
          <el-step title="藏品入馆"></el-step>
          <el-step title="藏品建账"></el-step>
          <el-step title="藏品入库"></el-step>
        </el-steps>
      </div>
    </div>

     <div class="left fl">
       <div class="leftContent">
         <el-input placeholder="库房名称搜索" v-model="searchName" class="titSearch">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
       </div>
    </div>

      <div class="rightContent">
        <!-- 搜索内容 -->
        <div class="search-content">
          <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">藏品管理</a></el-breadcrumb-item>
          </el-breadcrumb> 
          <el-input placeholder="请输入总登记号 / 藏品名称搜索" v-model="searchName" class="titSearch">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <!-- 搜索详情 -->
          <div>

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
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
        <el-button class="el-primary-border" round @click="onExport"><svg-icon icon-class="daochu" />&nbsp;导出</el-button>
        <!-- 表格 -->
        <div class="table">
          <el-table :data="tableData3" stripe>
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column prop="image" label="图片" width="100"></el-table-column>
            <el-table-column label="登记号" width="100" align="center">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="classi-fication" label="分类号" width="100"></el-table-column>
            <el-table-column prop="name" label="藏品名称"  width="100"></el-table-column>
            <el-table-column prop="name" label="年代" width="100"></el-table-column>
            <el-table-column prop="name" label="藏品分类" width="100"></el-table-column>
            <el-table-column prop="texture" label="来源" width="120"></el-table-column>
            <el-table-column prop="degree" label="级别" width="120"></el-table-column>
            <el-table-column prop="number" label="质地" width="120"></el-table-column>
            <el-table-column prop="company" label="完残程度" width="120"></el-table-column>
            <el-table-column prop="storehouse" label="状态" width="120"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">建账</a>
                <a class="m-btn"  @click="handleDelete(scope.$index, scope.row)" type="text" size="small">转总账</a>
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
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      searchName: "",
      form: {
        name: '',
        region: '',
      },
      active: 4,
      dynamicTags: ['陶器', '东周', '未定级'],
      value1: '',
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
        {name: '新时期时代 ', number:'1251'},
        {name: '商 ', number:'2151'},
        {name: '周 ', number:'125'},
        {name: '西周 ', number:'122'},
        {name: '东周 ', number:'143'},
        {name: '西汉 ', number:'324'},
        {name: '唐 ', number:'23553'},
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
      total: 10,
      listQuery: {
        currentPage: 1,
        size: 5
      },
    }
  },
  methods: {
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
.m-btn:nth-last-child(2) {
     margin: 0 20px;
   }
.el-form-item {
  margin: 0 10px;
  margin-right: 0!important;
}
.el-input  {
  width: 50px;
}
.g-wrap {
  .left {
    width: 210px;
    height: 100%;
    margin-top: 30px;
    border-radius: 5px;
    background-color: #fff;
      .leftContent {
        height: 550px;
          .el-input {
            width: 71%;
            margin: 30px;
          }
      }
  }
  .rightContent {
    height: 100%;
    margin: 30px 0px 0 240px;
    .search-content {
      padding: 30px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
        .el-breadcrumb {
          height: 50px;
          font-size: 18px;
          line-height: 20px;
          background: #fff;
        }
        .titSearch {
          width: 21.5%;
          background-color: #fff;
          margin: -40px 3%;
          float: right;
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
    }
    .table-content {
      border-radius: 5px;
      margin-top: 30px;
      padding: 30px;
      background-color: #fff;
        .el-button {
          margin: 0 0 30px 30px;
        }
    }
  }
  .storeContent {
    padding: 30px;
    border-radius: 5px;
    background-color: #fff;
      .el-breadcrumb {
        height: 50px;
        line-height: 20px!important;
        line-height: 50px;
        font-size: 18px;
      }
      .schedule {
        margin: 0 20px;
      }
  }
}
 .el-breadcrumb::after {
   display: none;
}

</style>


