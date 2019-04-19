<template>
  <div>
    <div class="right">
      <h3>2018 / 01 / 11</h3>
      <h3 class="personName fr">贾军</h3>
       <el-form ref="form" :model="form" label-width="104px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="入库库房 :">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存放地点 :">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            </el-col>
        </el-row>
        
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
        <el-button @click="dialogEnterlVisible = false">取 消</el-button>
        <el-button type="primary" @click="fromCollection">提 交</el-button>
      </div>
  </div>    
</template>

<script>
export default {
  data() {
    return {
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
      fileList: [{name: '概念设计文档', url: ''}],
    };
  },
  methods: {
    handlePreview(file) {
      console.log(file);
    },
    // 点击上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
  }
};
</script>
<style lang="scss" scoped>
  .dialog-footer {
    margin: 20px 0 0 0;
  }
</style>





