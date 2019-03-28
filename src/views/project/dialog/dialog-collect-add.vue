<template>
  <el-dialog
    class="dialog-add-collect"
    :visible.sync="dialogShow"
    :show-close="false"
    width="1200px">
    <el-alert
      class="cus-alert mb-20"
      :closable="false"
      title="本列表为馆内公开藏品数据，若未找到您要的藏品，请联系馆方进行公开"
      type="warning"
      show-icon>
    </el-alert>

    <!-- 查询区域 -->
    <div class="search-wrap">
      <el-form class="form-search" ref="form" :model="form" label-width="85px">
        <el-form-item label="常用条件：">
          <el-input class="item sch" placeholder="输入一普编号/藏品名称搜索" v-model="form.key"></el-input>
        </el-form-item>

        <el-form-item label="选择时间：">
          <el-select class="item mr-10" placeholder="常用年代" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          <el-select class="item mr-10" placeholder="其他年代" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          <el-select class="item mr-10" placeholder="入藏时间" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品条件：">
          <el-select class="item mr-10" placeholder="藏品条件" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          <el-select class="item mr-10" placeholder="文物级别" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          <el-select class="item mr-10" placeholder="藏品质地" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          <el-select class="item mr-10" placeholder="文物来源" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>

          <el-select class="item mr-10" placeholder="收藏单位" v-model="form.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </div>

    <!-- 已选择 -->
    <p class="m-primary mb-10">已选择：0件藏品</p>

    <el-table
      v-loading="listLoading"
      :data="list"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange"
      element-loading-text="Loading"
      stripe
      highlight-current-row>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="分类号" width="110">
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
            <span>{{ scope.row.count }}</span>
            <!-- <el-tag :type="scope.row.status | statusFilter">{{ scope.row.statusStr }}</el-tag> -->
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
        <!-- 操作 -->
        <div class="btns">
          <el-button @click="dialogShow=false">取消</el-button>
          <el-button type="primary" @click="add">添加</el-button>
        </div>
      </div>

    <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
      <i class="anticon anticon-info-circle ant-alert-icon"></i>
      已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
      <a style="margin-left: 24px" @click="onClearSelected">清空</a>
    </div> -->

    <!-- <a-table 
      ref="dialog"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :dataSource="list"
      rowKey="id"
      :pagination="ipagination"
      :loading="loading"
      @change="handleTableChange">
      <span slot="action" slot-scope="text, record">
        <a @click="test(record)">添加</a>
      </span>
    </a-table> -->
  </el-dialog>
</template>


<script>
export default {
  data() {
    return {
      dialogShow: false,
      emptyText: '请搜索您要添加的藏品',
      queryParam: {},
      form: {
        date1: '',
        name: '',
        desc: '',
      },
      multipleSelection: [], // 已选择
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        currentPage: 1,
        size: 5
      }
    }
  },
  methods: {
    init() {
      this.dialogShow = true
      this.getDataList()
    },
    // 批量添加
    add() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    getDataList() {
      this.listLoading = true
      this.$http.get('/list', {
        ...this.listQuery
      }).then(response => {
        this.list = []
        this.total = 0
        // this.list = response.data.list
        // this.total = response.data.page.allRow
        this.listLoading = false
        // this.emptyText = '暂无数据'
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
.dialog-add-collect {
  .search-wrap {
    .item {
      width: 150px;
    }
    .item.sch {
      width: 310px;
    }
  }
  .pagination-container {
    position: relative;
    padding-right: 250px;
    .btns {
      position: absolute;
      right: 0;
      top: -3px;
    }
  }
}
</style>

