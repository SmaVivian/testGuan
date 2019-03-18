<template>
  <div class="g-wrap">
    <div class="page-collect clearfix">
       <!-- 侧边栏 -->
      <sidebar :menuList="sidebarData" :activeIndex="`/collect`"></sidebar>
      <div class="content">
          <!-- 进度内容 -->
        <div class="schedule-content">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">藏品征集</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">征集计划</a></el-breadcrumb-item>
          </el-breadcrumb> 
          <el-steps class="schedule" :active="active" finish-status="success"  align-left>
            <el-step title="征集计划"></el-step>
            <el-step title="藏品入馆"></el-step>
            <el-step title="藏品建账"></el-step>
            <el-step title="藏品入库"></el-step>
        </el-steps>
<!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="计划名称">
                        <el-input v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                     <el-form-item label="计划编号">
                        <el-input v-model="form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="计划年度">
                        <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="年度计划" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="登记人">
                        <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="登记一" value="shanghai"></el-option>
                        <el-option label="登记二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态选择">
                        <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="状态一" value="shanghai"></el-option>
                        <el-option label="状态二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item> -->
                </el-form>
            </div>
            <div class="button">
            <el-row>
                <el-button round @click="onExport">导出</el-button>
                <el-button round @click="dialogOpenctVisible = true">创建计划</el-button>
                <el-button round @click="onExport">导出</el-button>
            </el-row>
            </div>
            <!-- 表格 -->
            <div class="table">
                <el-table
                :data="tableData3"
                stripe
                style="width: 100%"
                >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="image"
                    label="图片"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="登记号"
                    width="100">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                    prop="classi-fication"
                    label="分类号"
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="藏品名称"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="年代"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品分类"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="texture"
                    label="质地"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="degree"
                    label="完残程度"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="数量"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="company"
                    label="单位"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="storehouse"
                    label="库房名称"
                    width="80">
                </el-table-column>
                <!-- <el-table-column
                    prop="open"
                    label="是否公开"
                    width="80">
                </el-table-column> -->
                <el-table-column
                    prop="open"
                    label=" 藏品状态"
                    width="400">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    align="center"
                    label="操作"
                    width="300">
                    <template>
                    <el-button @click="dialogLablectVisible = true" type="text" size="small">标签</el-button>
                    <el-button type="text" size="small">移库</el-button>
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
     <!-- 藏品按钮点击事件 -->
    <el-dialog title="选择收藏夹" :visible.sync="dialogCollectVisible" width="300px">
      <el-form :model="form">
        <el-form-item a:label-width="formLabelWidth">
          <el-select v-model="formTag.collection" placeholder="请选择收藏夹" >
            <el-option label="收藏夹一" value="1"></el-option>
            <el-option label="收藏夹二" value="2"></el-option>
            <el-option label="收藏夹三" value="3"></el-option>
            <el-option label="新建收藏夹" value="4" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCollectVisible = false">取 消</el-button>
        <el-button type="primary" @click="fromCollection">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 公开藏品按钮点击事件 -->
     <el-dialog title="藏品公开属性设置" :visible.sync="dialogOpenctVisible" width="300px">
      <el-table :data="attribute" >
        <el-table-column property="number" label="序号" width="50"></el-table-column>
        <el-table-column property="name" label="属性名称" width="120"></el-table-column>
        <el-table-column type="selection"  width="60"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOpenctVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogOpenctVisible = false">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 表格标签按钮点击事件 -->
     <el-dialog title="藏品标签" :visible.sync="dialogLablectVisible" width="300px">
      <div class="labelTable">已选标签
          <div>
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
        {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
        </el-input>
      </div>
      </div>
      
      <el-form :model="form">
        <el-form-item a:label-width="formLabelWidth">
          <el-select v-model="formTag.collection" placeholder="选择标签">
            <el-option label="标签一" value="1"></el-option>
            <el-option label="标签二" value="2"></el-option>
            <el-option label="标签三" value="3"></el-option>
            <el-option label="新建标签" value="4" @click="newlyBuild"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLablectVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 藏品新建事件 -->
     <el-dialog title="新建收藏夹" :visible.sync="addDialogLablectVisible" width="350px">
      <!-- <span：</span> -->
      <el-form :model="addformTag">
        <el-form-item a:label-width="formLabelWidth">
          <el-input v-model="addformTag.collection"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogLablectVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCollection">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
export default {
  components: {
    cmpHeaderSub,
    sidebar,
  },
  data() {
    return {
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

        addDialogLablectVisible: false,
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
        dialogLablectVisible: false,
        dialogOpenctVisible: false,
        dialogTableVisible: false,
        dialogCollectVisible: false,
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
          name: '征集计划',
          icon: 'pro',
          index: '/1'
        },
        {
          name: '藏品入馆',
          icon: 'pro',
          index: '/2'
        },
        {
          name: '藏品建账',
          icon: 'pro',
          index: '/3'
        },
        {
          name: '藏品入库',
          icon: 'pro',
          index: '/4'
        },
      ],
      tabs: [
        {
          name: '藏品管理',
          path: 'mange'
        },
        {
          name: '审批',
          path: 'approval'
        },
        {
          name: '藏品征集',
          path: 'solicitation'
        },
        {
          name: '出库管理',
          path: 'library'
        },
        {
          name: '藏品修复',
          path: 'repair'
        },
        {
          name: '藏品调拨',
          path: 'allocation'
        },
        {
          name: '库房管理',
          path: 'store-house'
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

    

// 重置样式
 .el-breadcrumb {
      height: 50px;
      line-height: 50px;
      padding: 0px 0 0px 30px;
      font-size: 18px;
      margin-bottom:20px;
    }
    .schedule {
        margin: 0 80px;
    }
    .el-select-el-select-dropdown .el-popper {
    width: 150px!important;
}




    
.content[data-v-22c69cfa] {
  background-color: #F2F3F8;
  padding: 30px 30px 61px 260px;
}
.content {
  padding: 30px 30px 30px 240px;
  .table {
      padding: 0 25px;
      background-color: #fff;
  }
  .schedule-content {
    padding: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: #fff;
    // height: 200px;
    .el-breadcrumb {
      line-height: 56px;
      background: #fff;
    }
  }
  
  .table-content {
      background-color: #fff;
    //    .el-button + .el-button {
    //       margin-left: 0;
    //   }
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    border-radius: 4px;
    // border: 1px solid blue;
    .button {
      background-color: #fff;
      border-radius: 4px;
      .el-button:last-child{
           border: none;
           background-color: #fff;
         }
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

</style>
