<template>
  <el-dialog title="藏品入库"  class="approval" :visible.sync="dialogTotalVisible" width="900px" >
    <div class="tit">
      <h3>2018 / 01 / 11</h3>
      <h3 class="name">贾军</h3>
    </div>
    
      <el-form ref="form" :model="form" label-width="100px" >

        <div class="planName">
  
          <el-form-item label="入馆凭证号 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="注销凭证号 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>

        <div class="content">

          <div class="enterContent">
            <h6>总登记号: </h6> <div class="m-tit ml-20">12-20-12</div>
          </div>

          <div class="enterContent">
            <h6>入库日期: </h6> <div class="m-tit ml-20">2018/06/20</div>
          </div>

          <div class="enterContent">
            <h6>入库凭证号: </h6> <div class="m-tit ml-20">RGLS-2018-23</div>
          </div>

        </div>
        
        <div class="planName">
  
          <el-form-item label="分类号 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="入库库房 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

           <el-form-item label="存放地点 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        
        <div class="planName">
          <el-form-item label="藏品名称 :">
            <el-input v-model="form.collectName">{{form.collectName}}</el-input>
          </el-form-item>
          <el-form-item label="年代 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="藏品分类 :">
            <el-select v-model="form.region">
              <el-option label="说明" value="shanghai"></el-option>
              <el-option label="全部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="planName">
          <el-form-item label="数量 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="实际数量 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="单位 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>

        <div class="planName">
          <el-form-item label="单位或个人 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="来源 :">
            <el-select v-model="form.region">
              <el-option label="说明" value="shanghai"></el-option>
              <el-option label="全部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
            <h6>计划编号 :</h6> <span>26535</span>
        </div>

        <div class="planName">
          <el-form-item label="完残情况 :">
            <el-select v-model="form.region">
              <el-option label="说明" value="shanghai"></el-option>
              <el-option label="全部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="质地 :">
            <el-select v-model="form.region">
              <el-option label="说明" value="shanghai"></el-option>
              <el-option label="全部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="级别 :">
            <el-select v-model="form.region">
              <el-option label="说明" value="shanghai"></el-option>
              <el-option label="全部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="planName">
          <el-form-item label="通长 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="通宽 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="通高 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>

        <div class="planName">
          <el-form-item label="具体尺寸 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="质量范围 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="具体质量 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>

          
          <div class="main-content clearfix">
            <h3 class="collectLable mb-20">图片 :</h3>
            <div class="main">
              <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">上传</a>
            </div>
            <div class="main">
              <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">上传</a>
            </div>
            <div class="main">
              <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">上传</a>
            </div>
          </div>  

        <el-form-item label="上传附件 :" prop="">
        <!-- 上传 -->
        <cmp-upload :callFun="uploadCallback" :fileList="remoteFileList" :showName="true" :showTip="true"></cmp-upload>
        </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTotalVisible = false">取消</el-button>
      <el-button type="primary" @click="buildAccount">建账</el-button>
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
      // 接口返回的附件列表
      remoteFileList: [],
      form: {
        collectName: '青花瓷器入馆',
        name: '',
        region: '',
        type: []
      },
      value1: '',
      fileList: [{name: '概念设计文档', url: ''}],
      dialogTotalVisible: false
    }
  },
  methods: {
    buildAccount () {
      // this.$http.post('/scheme/addOrUpdateScheme',this.form).then(res => {
      //   console.log(res)
      //   if(res.success) {
      //     this.$message.success('藏品入库成功')
      //   }
      //   this.dialogPlanVisible = false;
      //   // 接受父组件传递过来刷新页面方法
      //   this.$emit("initList")
      // })
      this.dialogTotalVisible = false
    },
    uploadCallback() {
      // this.files = fileStr
      this.form.attachmentIds = fileStr
      console.log('附件id集合', this.files)
    },
    enterStore () {
      this.dialogTotalVisible = true
    },
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
.el-form {
  .main-content {
    display: flex;
    margin: 0 0 30px 58px;
      .main {
        width: 100px;
        height: 100px;
        margin-right: 30px;
        border: 1px dashed #0590FF;
        .m-btn {
          display: block;
          margin-left: 30px;
          line-height: 100px;
        }
        .view {
          margin: 20px;
        }
        .main:first-child {
          margin-left: 20px;
        }
    }
    h3 {
      margin-right: 20px;
    }
  }
  .content {
    display: flex;
    .enterContent {
      display: flex;
      margin: 15px 90px 0 0;
      .m-tit {
        width: 97px;
      }
    }
  }
  .number {
    height: 70px!important;
    .el-form-item {
      margin-bottom: 0px!important;
    }
  .el-input {
    width: 50% !important;
  }
}
  .planName {
    display: flex;
      .el-form-item {
        margin: 0 10px;
        margin-bottom: 0px;
        margin-right: -20px;
        .el-form-item__content{
          .el-input {
            width: 75%;
              /deep/.el-input__inner {
                color: #9699A2;
              }
          }
        }
      }
  }
}
  /deep/.el-form-item__label {
   width: 91px!important;
   color: #9699A2;
   text-align: right;
  }
.approval {
  .tit {
    display: flex;
    margin: 30px 0 15px 0;
  }
}
.uploadTit {
     display: flex;
}
/deep/.el-dialog__footer {
    border-top: 1px solid #EBEDF2;
    text-align: right;
  }
</style>
