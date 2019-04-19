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
    <h3></h3>
    <h3 class="personName fr">ddd</h3>
    <el-form label-width="104px"  class="fl" :model="form" ref="form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="计划名称 :" prop="schemeName">
            <el-input v-model="form.schemeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计划编号 :" label-width="95px" prop="schemeNumber">
            <el-input v-model="form.schemeNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="征集目的 :" prop="schemeReason">
            <el-input v-model="form.schemeReason" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="预计经费 :" prop="estimatedExpenditure">
            <el-input v-model="form.estimatedExpenditure" placeholder="万元"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="9"> 
          <el-form-item label="年度计划 :" prop="planYear">
            <el-date-picker v-model="form.planYear" type="year" value-format="yyyy"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="征集依据 :" prop="schemeBasis">
        <el-input type="textarea" v-model="form.schemeBasis" style="resize:none"></el-input>
      </el-form-item>
      <div class="article">
        <el-form-item label="正文内容 :" prop="mainDescription">
          <el-input type="textarea" v-model="form.mainDescription"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="上传附件 :" prop="">
        <!-- 上传 -->
        <cmp-upload :callFun="uploadCallback" :fileList="remoteFileList" accept=".rar,.zip,.doc,.docx,.pdf,.jpg" :showName="true" :showTip="true"></cmp-upload>
      </el-form-item>
      
    </el-form>
    
    <!-- 上传 -->
    <!-- <cmp-upload :callFun="uploadCallback"></cmp-upload> -->
    <!-- <el-upload
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
    </el-upload> -->
  </div>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogPlanVisible = false">取 消</el-button>
    <el-button type="primary" @click="fromSubmit(form)">提 交</el-button>
  </div>

  </el-dialog>
</template>

<script>
import cmpUpload from '@cmp/my-upload/index'
export default {
  // props: {
  //   callFun: Function
  // },
  components: {
    cmpUpload
  },
  data () {
    return {
      // 接口返回的附件列表
      remoteFileList: [
        {realFileName: '123'},
        {realFileName: '123'},
        {realFileName: '123'},
      ],
      files: '',   // 附件id集合
      
      dialogPlanVisible: false,
      form: {
        schemeName: '',
        schemeNumber: '',
        schemeReason: '',
        estimatedExpenditure: '',
        planYear: '',
        schemeBasis: '',
        mainDescription: '',
      },
      fileList: [{name: '概念设计文档', url: ''}],
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
    uploadCallback(fileStr) {
      this.files = fileStr
      console.log('附件id集合', this.files)
    },
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
    fromSubmit (formInfo) {
      this.$http.post('/scheme/addOrUpdateScheme',this.form).then(res => {
        console.log(res)
        if(res.success) {
          this.$message.success('创建成功')
        }
        this.dialogPlanVisible = false;
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  margin: 0;
}

</style>