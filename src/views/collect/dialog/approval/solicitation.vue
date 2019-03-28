<template>
  <div>
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
        <el-button @click="dialogSolicitationVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSolicitationVisible = false">确 定</el-button>
      </div>
  </div>      
</template>

<script>
export default {
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
      form: {
        name: '',
          region: ''
        },
        fileList: [{name: '概念设计文档', url: ''}],
      // 时间选择器
      value1: '',
      ruleForm: {
        shape: '',
        content: ''
      },
      handlePreview(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    };
  }
};
</script>
<style lang="scss">
  
</style>





