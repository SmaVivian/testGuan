<template>
  <el-dialog title="藏品入库"  class="approval" :visible.sync="dialogEnterVisible" width="900px" >
    <div class="tit">
      <h3>2018 / 01 / 11</h3>
      <h3>贾军</h3>
    </div>
    
      <el-form ref="form" :model="form" label-width="100px" >

        <div class="content">
          <div class="enterContent">
            <h6>总登记号: </h6> <div class="m-tit ml-20">12-20-12</div>
          </div>

          <div class="enterContent">
            <h6>登记日期: </h6> <div class="m-tit ml-20">2018/06/20</div>
          </div>

          <div class="enterContent">
            <h6>入馆凭证号: </h6> <div class="m-tit ml-20">RGLS-2018-23</div>
          </div>
        </div>
        
        <div class="planName">
          <el-form-item label="分类别 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="分类号 :">
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
        </div>

        <div class="planName">
          <el-form-item label="藏品名称 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          
          <el-form-item label="藏品分类 :">
            <el-select v-model="form.region">
              <el-option label="说明" value="shanghai"></el-option>
              <el-option label="全部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="number">
          <el-form-item label="入馆凭证号 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="planName">
          <el-form-item label="数量 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="实际数量 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="数量单个 :">
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
          <el-form-item label="计划编号 :">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
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
      </el-form>

    <div class="upload">
      <h3>上传照片 :</h3>
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

    <div class="upload">
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
      <el-button @click="dialogNameDetailsVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogNameDetailsVisible = false">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        collectName: '青花瓷器入馆',
        name: '',
        region: '',
        type: []
      },
      value1: '',
      fileList: [{name: '概念设计文档', url: ''}],
      dialogEnterVisible: false
    }
  },
  methods: {
    enterStore () {
      this.dialogEnterVisible = true
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
  }
}
</style>
