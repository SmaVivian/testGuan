<template>
<el-dialog title="征集计划审批"  class="approval" :visible.sync="dialogPlanVisible" width="900px" >
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
        <el-col :span="12">
          <el-form-item label="计划名称 :">
            <el-input v-model="form.name" placeholder="计划一"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计划编号 :" label-width="95px">
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
        <el-col :span="7">
          <el-form-item label="预计经费 :">
            <el-input v-model="form.name" placeholder="万元"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="9"> 
          <el-form-item label="年度计划 :">
            <el-date-picker v-model="value1" type="date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="征集依据 :" prop="shape">
        <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
      </el-form-item>
      <div class="article">
        <el-form-item label="正文内容 :" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      </div>
    </el-form>
    
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
      <div class="uploadTit">
        <h3>上传附件 :</h3>
        <a class="m-btn" style="color:#0590FF;" type="text" size="small">点击上传</a>
      </div>
      <span slot="tip" class="el-upload__tip">支持扩展名: .rar .zip .doc .pdf .jpg</span> 
    </el-upload>
  </div>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogPlanVisible = false">取 消</el-button>
    <el-button type="primary" @click="fromSubmit">提 交</el-button>
  </div>

  </el-dialog>
</template>

<script>
export default {
  props: {
    callFun: Function
  },
  data () {
    return {
      dialogPlanVisible: false,
      form: {
        name: '',
        region: '',
        type: []
      },
      fileList: [{name: '概念设计文档', url: ''}],
      value1: '',
      form: {
        name: '',
      },
      ruleForm: {
        shape: '',
        content: ''
      },
      activities2: [
        {
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
        },
        {
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },{
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
        },{
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        }
      ],
    }
  },
  methods: {
    createPlan() {
      this.dialogPlanVisible = true
    },
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
    // 点击提交
    fromSubmit () {
      this.dialogPlanVisible = false;
    }
  }
}
</script>
<style lang="scss" scoped>
  .dialog-footer {
    margin: 0;
  }
</style>