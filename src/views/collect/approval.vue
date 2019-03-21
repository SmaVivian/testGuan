<template>
  <div class="g-wrap">
    <div class="page-project clearfix">
      <sidebar :menuList="sidebarData" :activeIndex="`/project`" class="sidebarCont"></sidebar>
      <div class="content">
        <div class="approvalContent">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">藏品管理</a></el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 内容 -->
          <h3 class="addTit m-btn" @click="dialogEnterVisible = true">新增商品</h3>
          <h3 class="addTit m-btn" @click="dialogEnterVisible = true">新增商品</h3>
          <ul class="pro-list">
            <el-row :gutter="50">
              <el-col class="box" :xs="6" :sm="8" :md="8" :xl="8" v-for="(item, index) in menuData" :key="index">
                <el-card class="box-card">                 
                  <div class="card-item" @click="dialogApprovalVisible = true">
                    <div :class="'card-pic card-pic-' + (index+1)"></div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </ul>
        </div>
      </div>
    </div>

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

<!-- 审批计划 -->
  <el-dialog title="征集计划审批"  class="approval" :visible.sync="dialogApprovalVisible" width="900px" >
    <div class="timeLine">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities2" :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size">
          {{activity.name}}
          {{activity.state}}
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="right">
      <h3>2018 / 01 / 11</h3>
      <h3 class="personName fr">贾军</h3>
       <el-form ref="form" :model="form" label-width="100px" class="fl">
         <el-row>
          <el-col :span="12">
            <el-form-item label="计划名称 :">
              <el-input v-model="form.name" placeholder="计划一"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划编号 :">
              <el-input v-model="form.name" placeholder="计划一"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="征集目的 :">
              <el-input v-model="form.name" placeholder="计划一"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计经费 :">
              <el-input v-model="form.name" placeholder="万元"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8"> 
            <el-form-item label="年度计划 :">
              <el-date-picker v-model="value1" type="date"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="活动形式 :" prop="shape">
          <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
        </el-form-item>
        <el-form-item label="正文内容 :" prop="content">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <h3>上传附件 :</h3>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">支持扩展名: .rar .zip .doc .pdf .jpg</div>
      </el-upload>
    </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogApprovalVisible = false">取 消</el-button>
        <el-button type="primary" @click="fromCollection">确 定</el-button>
      </div>
    </el-dialog>
    
    <!-- 藏品入馆 -->
    <el-dialog title="藏品入馆审批"  class="approval" :visible.sync="dialogEnterVisible" width="900px" >
    <div class="timeLine">
      <el-timeline >
        <el-timeline-item
          v-for="(activity, index) in activities2" :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size">
          {{activity.name}}
          {{activity.state}}
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="right">
      <h3>2018 / 01 / 11</h3>
      <h3 class="personName fr">贾军</h3>
       <el-form ref="form" :model="form" label-width="104px"  class="fl">
         <el-row>
          <el-col :span="9" class="voucher">
            <h3 class="fl">入馆凭证号 :</h3>
            <span class="fl" >RGLS-2018-13</span>
          </el-col>
          <el-col :span="15">
            <el-form-item label="入馆凭证名称 :">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收据号 :">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位或个人 :">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="8"> 
            <el-form-item label="来源 :">
              <el-date-picker v-model="value1" type="date"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="入馆备注 :" prop="shape"  >
          <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
        </el-form-item>
      </el-form>
      <h3>上传附件 :</h3>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">支持扩展名: .rar .zip .doc .pdf .jpg</div>
      </el-upload>
    </div>
    
    <div class="table">
      <div class="operation">
        <a class="m-btn fl" @click="dialogLablectVisible = true" type="text" size="small">精品明细</a>
        <a class="m-btn fr" @click="dialogLablectVisible = true" type="text" size="small">添加</a>
        <a class="m-btn fr" @click="dialogLablectVisible = true" type="text" size="small">批量导入</a>
        <a class="m-btn fr" @click="dialogLablectVisible = true" type="text" size="small">删除</a>
      </div>
            <el-table
              :data="tableData3"
              stripe
              >
              <el-table-column
                type="selection"
                width="50" align="center">
              </el-table-column>
              <el-table-column
                prop="image"
                label="编号"
                width="60">
              </el-table-column>
              <el-table-column
                label="图片"
                width="60" align="center">
                <template slot-scope="scope">
                  <a class="m-btn" @click="dialogPhotosVisible = true" type="text" size="small">
                    <img :src="scope.row.head_pic" width="40" height="40" class="head_pic"/>
                  </a>
                </template>
              </el-table-column>
              <el-table-column
                prop="classi-fication"
                label="藏品名称"
                width="80">
              </el-table-column>
              <el-table-column
                prop="name"
                label="年代"
                 width="60">
              </el-table-column>
              <el-table-column
                prop="name"
                label="藏品分类"
                 width="80">
              </el-table-column>
              <el-table-column
                prop="name"
                label="数量"
                 width="60">
              </el-table-column>
              <el-table-column
                prop="texture"
                label="单位"
                 width="60">
              </el-table-column>
              <el-table-column
                prop="degree"
                label="级别"
                 width="60">
              </el-table-column>
              <el-table-column
                prop="number"
                label="质地"
                 width="60">
              </el-table-column>
              <el-table-column
                prop="company"
                label="完残程度"
                 width="80">
              </el-table-column>
              <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="100">
                <template>
                  <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">标签</a>
                </template>
              </el-table-column>
              </el-table>
             <div class="pagination-container">
            </div>
          </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEnterlVisible = false">取 消</el-button>
        <el-button type="primary" @click="fromCollection">提 交</el-button>
        
      </div>
    </el-dialog>

  </div>
</template>

<script>
import sidebar from '@cmp/sidebar'
export default {
  components: {
    sidebar
  },
  data() {
    return {
      
      // 表格数据
       tableData3: [{
          head_pic: '<img src="" alt="">',
          name: '王小',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      // 点击上传
      fileList: [{name: '概念设计文档', url: ''}],
       ruleForm: {
          shape: '',
          content: ''
        },
      // 时间选择器
         value1: '',
       activities2: [{
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          name: '冯桂英',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        }],
       formTag: {
            collection: ''
        },
      dialogApprovalVisible: false,
      dialogEnterVisible: false,
      dialogPhotosVisible: false,
      menuData: [
        {
          name: ''
        },
        {
          name: ''
        },
        {
          name: ''
        },
        {
          name: ''
        }
      ],
      sidebarData: [
        {
          name: '发起审批',
          icon: 'pro',
          index: '/project'
        },
        {
          name: '我发起的',
          icon: 'pro',
          index: '/aa'
        },
         {
          name: '待我审批的',
          icon: 'pro',
          index: '/bb'
        },
      ],
      form: {
      name: '',
        region: ''
      },
    }
  },
  methods: {
    // 点击上传
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
     fromCollection(){
        //    alert(this.formTag.collection)
           if(this.formTag.collection == 4) {
            //    alert(1)
               this.addDialogLablectVisible = true;
               return;
           }

           this.dialogApprovalVisible = false
       },

    getNavData() {
      this.sidebarData.splice(1, 1)
    },
    onSubmit(formName) {
      // this.$message('submit!')
      this.$refs[formName].validate((valid) => {
        if(valid) {
          let forms = this.form;
          console.log(111, { forms })
          console.log(222, { ...this.form })
          this.dialogVisible = false;
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
  },
  created() {
    // setTimeout(this.getNavData, 1000)
  },
  activated() {
    // this.$store.dispatch('changeBodyBg', 'bg1')
  },
  deactivated() {
    // this.$store.dispatch('changeBodyBg', '')
  }
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
  // border-bottom: 1px solid #000;
  margin: 55px 0 0 109px;
  }
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
        // border-top: 1px solid blue;
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
   margin-top: 30px;
   float: left;
   width: 140px;
   border-right: 1px solid #EBEDF2;
 }
 .right {
   margin-left: 25px;
   padding-left: 140px;
   padding-top: 30px;
   .el-form-item {
     margin-left: -23px;
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
 .el-textarea {
   .el-textarea__inner {
      width: 560px;
      height: 100px;
   }
  
 }
 .el-input {
   width: 90%;
 }
}

.content {
  .approvalContent {
    margin-left: 30px;
    background-color: #fff;
    .addTit {
      display: block;
      margin: 15px 0 5px 30px;
    }
    .el-breadcrumb {
      height: 50px;
      line-height: 50px;
      padding: 10px 0 0px 30px;
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
  padding: 25px 30px 40px 240px;
  .pro-list {
    .box {
      margin-top: 50px;
    }
    .card-pic {
      height: 160px;
    }
    .card-pic-1 {
      @include bg(url(~@images/approval/collect-1.svg), '', '', contain)
    }
    .card-pic-2 {
      @include bg(url(~@images/approval/collect-2.svg), '', '', contain)
    }
    .card-pic-3 {
      @include bg(url(~@images/approval/collect-3.svg), '', '', contain)
    }
    .card-pic-4 {
      @include bg(url(~@images/approval/collect-4.svg), '', '', contain)
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

</style>


