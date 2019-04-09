<template>
  <div class="g-wrap">
    <div class="storeContent">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">库房管理</el-breadcrumb-item>
        <el-breadcrumb-item><a href="javascript:;">温度记录</a></el-breadcrumb-item>
      </el-breadcrumb>

      <div class="search">
        <el-form ref="form" :model="form" label-width="92px" class="searchBottom">
          <el-form-item label="温度(摄氏度)">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="湿度">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="状态一" value="shanghai"></el-option>
              <el-option label="状态二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <el-form ref="form" :model="form" label-width="69px" class="searchBottom">
          <el-form-item label="选择日期">
            <el-date-picker class="fl" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>                  
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>   
          <el-button class="el-primary-border searchBton" @click="onExport">查询</el-button>
        </el-form>
      </div>
    </div>
    <div class="left fl">
        <div class="leftContent">
          <el-input placeholder="库房名称搜索" v-model="searchName" class="titSearch">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
    </div>
    <div class="totalContent ">
      <div class="table">
        <el-button class="el-primary-border" round @click="onExport"><svg-icon icon-class="daochu" />&nbsp;导出</el-button>
        <el-button class="el-primary-border" round @click="onExport">添加记录</el-button>
        <el-button class="el-primary-border" round @click="onExport"><svg-icon icon-class="shezhi" />&nbsp;设置</el-button>
        <div class="table">
          <el-table :data="tableData3" stripe>
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" prop="image" label="日期"></el-table-column>
            <el-table-column align="center" prop="image" label="温度(摄氏度)"></el-table-column>
            <el-table-column align="center" prop="classi-fication" label="温度"></el-table-column>
            <el-table-column align="center" prop="name" label="日温差"></el-table-column>
            <el-table-column align="center" prop="name" label="温度正常范围"></el-table-column>
            <el-table-column align="center" prop="name" label="状态"></el-table-column>
            <el-table-column align="center" prop="name" label="记录时间"></el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
              <template slot-scope="scope">
                <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">查看</a>
                <a class="m-btn"  @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination :current-page="listQuery.currentPage" :page-size="listQuery.size" :total="total" background
              layout="total, prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
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
  },
}
</script>

<style lang="scss" scoped>
.g-wrap {
  .left {
   width: 210px;
   height: 100%;
   border-radius: 5px;
   margin-top: 30px;
   background-color: #fff;
    .leftContent {
      height: 550px;
        .el-input {
          width: 71%;
          margin: 30px;
        }
    }
  }
  .totalContent {
    margin-left: 240px;
      .table {
        margin-top: 30px;
        border-radius: 5px;
        padding: 0 20px 20px 20px;
        background-color: #fff;
          .el-button {
          margin: 30px 0 0 30px;
          }
      }
  }
  .storeContent {
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
    .el-breadcrumb {
      height: 50px;
      line-height: 70px!important;
      line-height: 50px;
      padding: 0px 0 0px 20px;
      font-size: 18px;
      margin-bottom:20px;
      background: #fff;
    }
    .search {
      .el-button {
        // margin: 0px!important;
        margin: 0 30px;
      }
    }
    .searchBottom {
      display: flex;
      margin-left: 30px;
      .el-date-editor:nth-child(2) {
        margin-left: 15px;
      }
      .el-form-item {
        margin-right: 30px;
      }
      .el-button {
        height: 40px;
        background-color: #0590FF;
        color: #fff;
      }
    }
    .el-button {
      margin: 15px 0 30px 30px;
    }
  }
}
.m-btn {
  margin-left: 10px;
} 
</style>


