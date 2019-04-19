<template>
  <div class="g-content">
    <div class="page-exhibits">
      <!-- 操作 -->
      <div class="btns-warap clearfix">
        <div class="left fl">
          <el-button class="el-primary-border" @click="addCollect"><svg-icon icon-class="add" class-name="icon-add" />&nbsp;添加藏品</el-button>
          <el-button class="el-primary-border" @click="importCollect"><svg-icon icon-class="daoru" />&nbsp;从收藏夹导入</el-button>
          <el-button class="el-primary-border" @click="exportItem"><svg-icon icon-class="daochu" />&nbsp;导出</el-button>
          <el-button class="el-primary-border" @click="dele"><i class="el-icon-close"></i>&nbsp;移除</el-button>

          <el-button class="el-primary-border" v-if="!showSearch" @click="showSearch=true"><i class="el-icon-search"></i>&nbsp;搜索</el-button>
          <el-input class="input-block ml-20" suffix-icon="el-icon-search g-icon-search" 
            style="width:300px;" 
            placeholder="输入关键字" 
            @keyup.enter.native="getDataList"
            v-if="showSearch" 
            v-model="listQuery.key">
          </el-input>
        </div>
        <!-- <a href="javascript:;" class="btn-view m-btn fr">查看管内藏品</a> -->
      </div>

      <!-- 列表 -->
      <el-table
      v-loading="listLoading"
      :data="dataList"
      @selection-change="handleSelectionChange"
      element-loading-text="Loading"
      stripe
      highlight-current-row>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" label="序号" width="70">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column v-for="(item, index) in titleList" :label="item.name">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="分类号" width="110">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="藏品名称">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="质地" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年代" align="center">
          <template slot-scope="scope">
            {{ scope.row.count }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="尺寸" width="200" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="具体质量" width="110">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.statusStr }}</el-tag>
          </template>
        </el-table-column> -->

        <!-- <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <router-link :to="{path: '/list/detail', query: {id: scope.row.id}}">
              <el-button type="primary" size="small">详情</el-button>
            </router-link>
            <router-link :to="{path: '/list/edit', query: {id: scope.row.id}}">
              <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
            </router-link>
          </template>
        </el-table-column> -->
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          :current-page="listQuery.currentPage"
          :page-size="listQuery.size"
          :total="total"
          background
          layout="total, prev, pager, next, sizes, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>

      <cmp-collect-add ref="addCollectDialog"></cmp-collect-add>
      <cmp-collect-import ref="importCollectDialog"></cmp-collect-import>
      <cmp-footer></cmp-footer>
    </div>
  </div>
</template>

<script>
import cmpFooter from '@cmp/footer'
import cmpCollectAdd from './dialog/dialog-collect-add'
import cmpCollectImport from './dialog/dialog-collect-import'
export default {
  components: {
    cmpFooter,
    cmpCollectAdd,
    cmpCollectImport,
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '2': 'success',
        '1': 'gray',
        '0': 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      showSearch: false,
      dataList: null,
      total: 0,
      listLoading: true,
      listQuery: {
        key: '',
        currentPage: 1,
        size: 10
      },
      titleList: [
        {
          name: '分类号'
        },
        {
          name: '藏品名称'
        },
        {
          name: '质地'
        },
        {
          name: '年代'
        },
        {
          name: '尺寸'
        },
        {
          name: '具体质量'
        },
      ],
      multipleSelection: []
    }
  },
  methods: {
    addCollect() {
      this.$refs.addCollectDialog.init()
    },
    // 导入藏品
    importCollect() {
      this.$refs.importCollectDialog.init()
    },
    // 导出
    exportItem() {
      if(!this.multipleSelection.length) {
        this.$message({
          message: '请选择藏品',
          type: 'warning'
        })
        return
      }
      console.log(this.multipleSelection)
    },
    // 移除
    dele() {
      if(!this.multipleSelection.length) {
        this.$message({
          message: '请选择藏品',
          type: 'warning'
        })
        return
      }
      console.log(this.multipleSelection)
    },
    // 勾选复选框
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getDataList() {
      this.listLoading = true
      this.$http.get('/list', {
        ...this.listQuery
      }).then(response => {
        this.dataList = response.data.list
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
    }
  },
  created() {
    this.getDataList()
  },
}
</script>

<style lang="scss" scoped>
.btns-warap {
  margin-bottom: 20px;
  .btn-view {
    line-height: 40px;
  }
}
</style>


