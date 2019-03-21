<!-- 征集计划审批 -->
<template>
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
    </template>

    <script>
    export default {
      data() {
        return {
             // 点击上传
      fileList: [{name: '概念设计文档', url: ''}],
       ruleForm: {
          shape: '',
          content: ''
        },
            ruleForm: {
          shape: '',
          content: ''
        },
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
      }
    }
    </script>



    
    <style lang="scss" scoped>
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
      
    </style>