<template>
  <div class="g-wrap">
    <div class="page-collect clearfix">
       <!-- 侧边栏 -->
      <sidebar :menuList="sidebarData" :activeIndex="`/collect`"></sidebar>
      <div class="content">
          <!-- 搜索内容 -->
        <div class="search-content">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">藏品管理</a></el-breadcrumb-item>
          </el-breadcrumb> 
          <!-- 搜索详情 -->
           <div>
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
            
            
         
        </div>     
        </div>
        <!-- 表格内容 -->
        <div class="table-content">
         <div class="button">
          <el-row>
            <el-button class="el-primary-border" round @click="onExport">导出</el-button>
            <el-button class="el-primary-border" round @click="dialogOpenctVisible = true">公开藏品</el-button>
            <el-button class="el-primary-border" round  @click="dialogCollectVisible = true">收藏</el-button>
            <el-button style="float: right; padding: 35px 35px" type="text">选择公开字段</el-button>
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
          name: '藏品管理',
          icon: 'pro',
          index: '/collect'
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
    //  getTag() {
    //      axios.get(url, params).then(res => {
    //          this.searchTag = res.data
    //      })
    //  },
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
    // height: 200px;
    .el-breadcrumb {
      padding: 0 20px;
      line-height: 56px;
      background: #fff;
    }
  }
  .sch{
    display: flex;
    padding: 0 20px;
    font-size: 14px;
    height: 50px;
    // line-height: 40px;
    background-color: #fff;
    .sch-type {
        width: 75px;
        color: #B5B1DD;
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
