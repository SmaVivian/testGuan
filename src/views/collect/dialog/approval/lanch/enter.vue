<template>
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
            <el-form-item label="收据号 :" label-width="85px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位或个人 :" label-width="118px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="7"> 
            <el-form-item label="来源 :" label-width="75px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="入馆备注 :" prop="shape" label-width="100px">
          <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
        </el-form-item>

        <el-form-item label="上传附件 :" prop="">
          <!-- 上传 -->
          <cmp-upload :callFun="uploadCallback" :fileList="remoteFileList" accept=".rar,.zip,.doc,.docx,.pdf,.jpg" :showUpload="true" :showName="true" :showTip="true" >
          </cmp-upload>
        </el-form-item>
      </el-form>
      
      

      <div class="table">
        <div class="operation">
          <h3>精品明细</h3>
          <a class="m-btn fr" @click="dialogLablectVisible = true" type="text" size="small">添加</a>
          <a class="m-btn fr" @click="dialogLablectVisible = true" type="text" size="small">批量导入</a>
          <a class="m-btn fr" @click="dialogLablectVisible = true" type="text" size="small">删除</a>
        </div>
        <el-table :data="tableData3" stripe>
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="image" label="编号" width="60"></el-table-column>
          <el-table-column label="添加图片" width="60" align="center" prop="name">
          <template slot-scope="scope">
            <a class="m-btn" @click="upLoadPicture" type="text" size="small">
              <img :src="scope.row.head_pic" width="40" height="40" class="head_pic"/>
            </a>
          </template>
          </el-table-column>
          <el-table-column prop="classi-fication" label="藏品名称" width="80"></el-table-column>
          <el-table-column prop="name" label="年代"  width="60"></el-table-column>
          <el-table-column prop="name" label="藏品分类" width="80"></el-table-column>
          <el-table-column prop="name" label="数量" width="60"></el-table-column>
          <el-table-column prop="texture" label="数量单位" width="60"></el-table-column>
          <el-table-column prop="degree" label="级别" width="60"></el-table-column>
          <el-table-column prop="number" label="质地" width="60"></el-table-column>
          <el-table-column prop="company" label="完残程度"  width="80"></el-table-column>
          <el-table-column fixed="right" align="center"  label="操作" width="100">
            <template>
              <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">编辑</a>
              <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">标签</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
  
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogEnterlVisible = false">取 消</el-button>
      <el-button type="primary" @click="fromCollection">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import cmpUpload from '@cmp/my-upload/index'
export default {
  components: {
    cmpUpload
  },
  data() {
    return {
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
      // 表格数据
      tableData3: [{
        head_pic: '<img src="" alt="">',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      fileList: [{name: '概念设计文档', url: ''}],
      form: {
        name: '',
        region: ''
      },
      ruleForm: {
        shape: '',
        content: ''
      },
      // 时间选择器
      value1: '',
      dialogEnterVisible: false,
      // 接口返回的附件列表
      remoteFileList: [],
    };
  },
  methods: {
    enter() {
      this.dialogEnterVisible = true
    },
    // 上传图片
    uploadCallback(fileStr) {
      // this.files = fileStr
      this.form.attachmentIds = fileStr
    },
    fromCollection(){
      //    alert(this.formTag.collection)
          if(this.formTag.collection == 4) {
          //    alert(1)
              this.addDialogLablectVisible = false;
              return;
          }

          this.dialogApprovalVisible = false
      },
    }
};
</script>
<style lang="scss" scoped>
.el-dialog__body {
  .dialog-footer {
    margin-top: 30px;
  }
  .timeLine {
    height: 610px;
  }
  .upload-demo {
    margin-top: 43%;
    .el-upload {
      .uploadTit {
        display: flex;
          .m-btn {
            margin: 0 20px;
          }
      }
    }
    .el-upload-list {
      .el-upload-list__item-name {
        margin: 0 80px;
      }
    }
  }
}
 .operation h3 {
  display: inline;
 }
</style>





