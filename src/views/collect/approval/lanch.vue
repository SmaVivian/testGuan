<template>
  <div class="g-wrap">
    <div class="page-project">
      <div class="content">
        <div class="approvalContent">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">发起审批</a></el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 内容 -->
          <h3 class="addTit m-btn" @click="dialogRejectVisible = true">驳回原因</h3>
          <h3 class="addTit m-btn" @click="dialogCollectVisible = true">选择出库藏品</h3>
          <ul class="pro-list">

            <el-row :gutter="50" v-for="(item, index) in menuData" :key="index">
              <el-col class="box" :xs="6" :sm="8" :md="8" :xl="8" >
                <el-card class="box-card" >                 
                  <div class="card-item" @click="handleDialog(index + 1)">
                    <div :class="'card-pic card-pic-' + (index+1) + '1'"></div>
                  </div>
                </el-card>
              </el-col>
              <el-col class="box" :xs="6" :sm="8" :md="8" :xl="8" >
                 <el-card class="box-card">                 
                  <div class="card-item" @click="handleDialog(index + 2)">
                    <div :class="'card-pic card-pic-' + (index+1) + '2'"></div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog title="驳回原因" :visible.sync="dialogRejectVisible" width="420px" class="rejectTit">
        <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogOpenctVisible = false">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择出库藏品" :visible.sync="dialogCollectVisible" width="900px">
      <el-input
        placeholder="请输入"
        v-model="searchName">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-table :data="attribute" >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column property="name" label="图片">
          <template slot-scope="scope">
            <a class="m-btn" @click="dialogPhotosVisible = true" type="text" size="small">
              <img :src="scope.row.head_pic" width="40" height="40" class="head_pic"/>
            </a>
          </template>
        </el-table-column>
        <el-table-column property="name" label="登记号" ></el-table-column>
        <el-table-column property="name" label="藏品名称"></el-table-column>
        <el-table-column property="name" label="年代"></el-table-column>
        <el-table-column property="name" label="藏品分类"></el-table-column>
        <el-table-column property="name" label="级别"></el-table-column>
        <el-table-column property="name" label="质地" ></el-table-column>
        <el-table-column property="name" label="完残程度"></el-table-column>
        <el-table-column property="name" label="数量"></el-table-column>
        <el-table-column property="name" label="库房名称"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogOpenctVisible = false">提交</el-button>
      </div>
    </el-dialog>
  
    <el-dialog title="出库类型" :visible.sync="dialogTypeVisible" width="300px" class="outTit">
      <el-form :model="form">
        <el-form-item a:label-width="formLabelWidth">
          <el-select v-model="formTag.collection" placeholder="出库类型" >
            <el-option v-for="(item, index) in list" :value="item.name" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialogFooter">
        <el-button @click="dialogTypeVisible = false">取 消</el-button>
        <el-button type="primary" @click="collectType(value)">确 定</el-button>
      </div>
    </el-dialog>
    
    <!-- 点击图片上传图片 -->
    <el-dialog title="上传藏品照片" :visible.sync="dialogPhotosVisible" width="470px">
      <div class="labelTable clearfix">
        <h3 class="collectLable">上传照片</h3>
        <el-row class="photoContent fl">
          <el-col :span="8" class="main">
            <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">上传</a>
            <h3 class="view">主视图</h3>
          </el-col>
        </el-row>
         <el-row class="photoContent fl">
          <el-col :span="8" class="main">
            <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">上传</a>
            <h3 class="view">侧视图</h3>
          </el-col>
        </el-row>
         <el-row class="photoContent fl">
          <el-col :span="8" class="main">
            <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">上传</a>
            <h3 class="view">俯视图</h3>
          </el-col>
        </el-row>
      </div>
       <h3 class="condition">( 最少上传一种类型的图片 )</h3>   
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLablectVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
   
    <el-dialog title="征集计划审批"  class="approval" :visible.sync="dialogSolicitationVisible" width="900px" >
      <solicitationDialog />
    </el-dialog>

    <el-dialog title="藏品入馆审批"  class="approval" :visible.sync="dialogEnterVisible" width="900px" >
      <enterDialog />
    </el-dialog>

    <el-dialog title="藏品标签" :visible.sync="dialogEnterVisible">
       <lableDialog :callFun = "buliLable"/>
     </el-dialog>


  </div>
</template>

<script>
import top from '@cmp/topbar'
import cmpHeaderSub from '@cmp/header-sub'
import sidebar from '@cmp/sidebar'
import enterDialog from '../dialog/approval/lanch/enter'
import solicitationDialog from '../dialog/approval/lanch/solicitation'
import lableDialog from '../dialog/manage/lable'
export default {
  components: {
    sidebar,
    cmpHeaderSub,
    enterDialog,
    solicitationDialog,
    top,
    lableDialog
  },
  data() {
    return {
      list: [
        {name:"借展出库", value: 1},
        {name:"陈列出库", value: 2}, 
        {name:"藏品观摩", value: 3}, 
        {name:"修复出库", value: 4}, 
        {name:"调拨出库", value: 5},
        {name:"藏品注销出库", value: 6},    
      ],
      // 顶部导航栏数据
      currentTab: 'approval',
      // 搜索条件
      searchName: "",
      // 选择出库藏品表格数据
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
      ruleForm: {
        shape: '',
        content: ''
      },
      // 时间选择器
      value1: '',
      formTag: {
        collection: ''
      },
      dialogPhotosVisible: false,
      dialogTypeVisible: false,
      dialogSolicitationVisible: false,
      dialogRejectVisible: false,
      dialogEnterVisible: false,
      dialogCollectVisible: false,
      dialog: [  
      ],
      menuData: [
        {
          name: ''
        },
        {
          name: ''
        }
      ],
      form: {
      name: '',
        region: ''
      },
    }
  },
  methods: {
    // 入馆审批表格标签弹框
    buliLable () {
      
    },
    collectType(value) {
      this.dialogEnterVisible = true;
    },
    // 弹框循环事件
    handleDialog(index){
      if (index === 1) {
        this.dialogSolicitationVisible = true
      } else if (index === 2) {
        this.dialogEnterVisible = true
      } else if (index === 3) {
        this.dialogTypeVisible = true
      } else if (index === 4) {
        this.dialogRejectVisible = true
      }
    },
    typeDilogVisible(value) {
      if( value === 1) {
        this.dialogEnterVisible = true
      }
    },
     //  顶部导航栏
     changeTab(path) {
      this.$router.push({path: '/collect/' + path})
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100px;
  height: 100px;
  margin-right: 30px;
  border: 1px dashed #0590FF;
  .main:first-child {
    margin-left: 20px;
  }
  .m-btn {
    display: block;
    margin-left: 30px;
    line-height: 100px;
  }
}
.el-dialog__body {
  .condition {
  margin: 55px 0 0 109px;
  
  }
}
.el-table {
  margin-top: 30px;
}

 /deep/ .el-dialog__header {
    text-align: center;
    padding-bottom: 30px;
    font-size: 18px;
    font-weight: bold;
}
/deep/ .approval {
  .el-dialog {
   .el-timeline-item__content {
      width: 45px;
      color: #9699A2;
        }
      .el-dialog__footer {
        text-align: center!important;
        padding-top: 20px!important;
        padding: 0;
          }
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
 .timeLine {
   padding-top: 30px;
   float: left;
   width: 140px;
   border-right: 1px solid #EBEDF2;
 }
 .right {
   margin-left: 25px;
   padding-left: 145px;
   padding-top: 30px;
  //  border-bottom: 1px solid #EBEDF2;
   .el-form-item {
     margin-left: -23px;
     margin-bottom: 0;
   }
   .voucher {
     line-height: 45px;
   }
   .voucher h3 {
     margin-right: 10px;
   }
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

.content {
    padding: 0!important;
  .approvalContent {
    padding: 30px;
    margin-left: 10px;
    background-color: #fff;
    .addTit {
      display: block;
      margin: 15px 0 5px 30px;
    }
    .el-breadcrumb {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
    }
    .el-row {
      margin-left: -55px!important;
      margin-right: 150px!important;
      padding: 0 0 100px 44px;
    }
    // .card-item {
  
    // }
  }
  .pro-list {
    .box {
      margin-top: 50px;
    }
    .card-pic {
      height: 160px;
    }
    .card-pic-11 {
      @include bg(url(~@images/approval/collect-4.svg), '', '', contain)
    }
    .card-pic-12 {
      @include bg(url(~@images/approval/collect-3.svg), '', '', contain)
    }
    .card-pic-21 {
      @include bg(url(~@images/approval/collect-2.svg), '', '', contain)
    }
    .card-pic-22 {
      @include bg(url(~@images/approval/collect-1.svg), '', '', contain)
    }
    .box-card {
      border:4px solid transparent;
    }
    .box-card:hover {
      box-shadow:0px 1px 10px 0px rgba(238,239,245,1);
      border-radius:4px;
      border:4px solid rgba(5,144,255,1);
    }
    .card-item {
      cursor: pointer;
    }

  }
}
  .box {
    margin-bottom: 10px;
  }
.view {
   text-align: center;
}
// 侧边栏样式
.cmp-sidebar {
  margin: 30px;
}
/deep/ .dialog-footer {
    border-top: 1px solid #EBEDF2;
    text-align: center;
    padding-top: 30px;
}
/deep/ .el-dialog__footer {
    padding-bottom: 0!important;
    padding: 0!important;
    margin-top: 20px;
}
/deep/ .el-input__prefix {
  text-align: right;
    right: 10px;
}
.el-select {
  width: 100%;
  margin-bottom: 5px;
}
</style>


