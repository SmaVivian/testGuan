<template>
<el-dialog title="征集计划审批"  class="approval" :visible.sync="dialogPlanVisible" width="900px" >
  <div class="timeLine">
    <el-timeline >
      <el-timeline-item
        v-for="(activity, index) in activities" :key="index">
        <img class="head-pic" :src=activity.userImage>   
        {{activity.currentApproval}}
        {{activity.collectStatus}}
      </el-timeline-item>
    </el-timeline>
  </div>
  <div class="right">
    <h3></h3>
    <h3 class="personName fr">dddddd</h3>
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
  </div>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogPlanVisible = false">取消</el-button>
    <el-button type="primary" @click="fromSubmit(form)">提交</el-button>
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
      remoteFileList: [],
      dialogPlanVisible: false,
      form: {
        schemeName: '',
        schemeNumber: '',
        schemeReason: '',
        estimatedExpenditure: '',
        planYear: '',
        schemeBasis: '',
        mainDescription: '',
        attachmentIds:''// 附件id集合
      },
      fileList: [{name: '概念设计文档', url: ''}],
      activities: [],
    }
  },
  methods: {
    uploadCallback(fileStr) {
      // this.files = fileStr
      this.form.attachmentIds = fileStr
      console.log('附件id集合', this.files)
    },
    createPlan() {
      // 渲染审批流程
      this.$http.get('/scheme/getApprovalDetailInfo')
      .then((res) => {
        console.log(res)
        if(res.success) {
          this.activities = res.result
        } else {
          this.$message.error(res.message)
        }
      })
      this.dialogPlanVisible = true
    },
    // 点击提交
    fromSubmit (formInfo) {
      this.$http.post('/scheme/addOrUpdateScheme',this.form).then(res => {
        console.log(res)
        if(res.success) {
          this.$message.success('创建成功')
        }
        this.dialogPlanVisible = false;
        // 接受父组件传递过来刷新页面方法
        this.$emit("initList")
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