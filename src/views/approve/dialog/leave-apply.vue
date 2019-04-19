<template>
  <el-dialog
    class="dialog-add-collect"
    title="请假申请"
    :visible.sync="dialogShow"
    width="600px">
    <el-form class="form mt-10" @keyup.enter.native="submitForm('ruleForm')" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <!-- <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入您的姓名"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="phoneNo">
        <el-input v-model="ruleForm.phoneNo" placeholder="请输入您的电话号码"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="验证码" class="vertify" prop="code">
        <el-input v-model="ruleForm.code" placeholder="验证码"></el-input>
        <span class="m-btn" @click="sendMsg()" v-if="!resetMsg">发送验证码</span>
        <span class="m-btn diable" v-if="resetMsg">重新发送({{resetMsg}}s)</span>
      </el-form-item> -->

      <el-form-item label="请假类型：" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择" style="width:100%;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker
          v-model="ruleForm.startTime"
          :picker-options="pickerOptions"
          :value-format="'yyyy-MM-dd'"
          type="date"
          placeholder="选择日期" style="width: 100%;">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间：" prop="endTime">
        <el-date-picker
          v-model="ruleForm.endTime"
          :picker-options="pickerOptions"
          :value-format="'yyyy-MM-dd'"
          type="date"
          placeholder="选择日期" style="width: 100%;">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="时长">
        <span>{{ruleForm.times || ' --'}}</span>
      </el-form-item>

      <el-form-item label="请假事由：" prop="reason">
        <el-input class="reason-area" type="textarea" v-model="ruleForm.reason" placeholder="请输入请假事由"></el-input>
      </el-form-item>

      <el-form-item label="图片：">
        <img src="@images/login.png" alt="" style="width:100px;height:100px;">
        <span>上传</span>
      </el-form-item>
      
      <div class="dialog-footer tr">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: false,
      ruleForm: {
        type: '',
        startTime: '',
        endTime: '',
        times: '',
        reason: '',
        pics: ''
      },
      rules: {
        type: [
          { required: true, message: '请选择请假类型', trigger: 'blur' },
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' },
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' },
        ],
        reason: [
          { required: true, message: '请输入请假事由', trigger: 'blur' },
        ],
      },
      options: [
        {
          value: '1',
          label: '预约讲解'
        }, 
        {
          value: '2',
          label: '预约参观'
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          const day = 1 * 24 * 3600 * 1000;
          const weeks = 14 * 24 * 3600 * 1000;
          const minTime = Date.now();
          const maxTime = minTime + weeks;
          return time.getTime() < (minTime-day) || time.getTime() > maxTime;
        }
      }, 
    }
  },
  methods: {
    init() {
      this.dialogShow = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.ruleForm.code !== this.serverCode) {
            this.$message.error('验证码不正确')
            return
          }
          this.$http.post('/orderExplain/save.do', {
            orderType: this.ruleForm.type, // 预约类型
            name: this.ruleForm.name, // 姓名
            phone: this.ruleForm.phoneNo, // 电话
            orderDateStr: this.ruleForm.day, // 预约日期
            timePart: this.ruleForm.time, //  预约时间段
          }).then((res) => {
            if(res.data.success === 1) {
              this.dialogVisible = false
              this.showMessage = true
            } else {
              this.$message.error(res.data.data)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  /deep/ .reason-area {
    textarea {
      height: 100px;
    }
  }
}
</style>


