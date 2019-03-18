<template>
  <div class="g-content">
    <div class="page-exhibits">
      <div class="btns-warap clearfix">
        <!-- 侧边栏 -->
          <sidebar :menuList="sidebarData" :activeIndex="`/collect`"></sidebar>
        <div class="left fl">
          <el-button class="el-primary-border">导出</el-button>
          <el-button class="el-primary-border">公开商品</el-button>
          <el-button class="el-primary-border">收藏</el-button>
        </div>
        <a href="javascript:;" class="btn-view m-btn fr">选择公开字段</a>
        <!-- <el-button class="fr" type="primary">查看管内藏品</el-button> -->
      </div>

      <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      highlight-current-row>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" label="图片" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="登记号" width="110">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="分类号">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="藏品名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="年代" align="center">
          <template slot-scope="scope">
            {{ scope.row.count }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="商品分类" width="200" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="质地" width="110">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.statusStr }}</el-tag>
          </template>
        </el-table-column>
         <el-table-column align="center" prop="created_at" label="完残程度" width="110">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.statusStr }}</el-tag>
          </template>
        </el-table-column>
         <el-table-column align="center" prop="created_at" label="数量" width="110">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.statusStr }}</el-tag>
          </template>
        </el-table-column>

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
</template>

<script>
export default {
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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        size: 5
      }
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
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
    }
  }
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


