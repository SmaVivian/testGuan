<template>
  <div class="g-container">
    <div class="page-login">
      <cmp-login-pic></cmp-login-pic>
      
      <div class="content" :class="{'type-forget': pageType === 'forget'}">
        <h1 class="title">{{pageType === 'add' ? '注册' : '忘记密码'}}</h1>

        <el-form @keyup.enter.native="submitForm('ruleForm')" :label-position="`top`" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form cus-form-top">
          <el-form-item label="账号" prop="name" v-if="pageType === 'add'">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="手机号" required>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="phoneNo">
                  <el-input v-model="ruleForm.phoneNo" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="vertify" prop="code">
                  <el-input v-model="ruleForm.code" placeholder="验证码"></el-input>
                  <span class="m-btn" @click="sendMsg()" v-if="!resetMsg">发送验证码</span>
                  <span class="m-btn diable" v-if="resetMsg">重新发送({{resetMsg}}s)</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item :label="pageType === 'add' ? '密码' : '重置密码'" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="设置6至20位登录密码"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次输入登录密码"></el-input>
          </el-form-item>
        </el-form>

        <el-button class="btn-sure" type="primary" @click="submitForm('ruleForm')">{{pageType === 'add' ? '注册' : '重置'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { validate } from '@/utils/util'
// import md5 from 'js-md5'
import cmpLoginPic from './components/login-pic'
export default {
  components: {
    cmpLoginPic
  },
  watch: {
    $route() {
      this.pageType = this.$route.query.type;  // add 注册   forget 忘记密码
    }
  },
  data() {
    let validatePhoneNo = (rule, value, callback) => {
      if(!validate(value, 'phone')) {
        callback(new Error('手机号不存在'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (!validate(value, 'password')) {
        callback(new Error('6-20位数字、字母、特殊字符至少包含两种'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pageType: this.$route.query.type,
      resetMsg: '', // 重新发送倒计时
      // codeEnable: true,  // 验证码按钮是否可用
      ruleForm: {
        name: '',
        phoneNo: '',
        code: '',
        pass: '',
        checkPass: ''  // 再次输入密码
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' },
        ],
        phoneNo: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: validatePhoneNo, trigger: 'blur'}
        ],
        code: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' },
        ],
        pass: [
          { required: true, message: '设置6至20位登录密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入登录密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取验证码
    sendMsg() {
      let api = this.pageType == 'add' ? '/login/sendSecretCode' : '/login/front/sendForgetPasswordCode';
      this.$refs.ruleForm.validateField('phoneNo', (str, errorMsg) => {
        if(!errorMsg) {
          this.timeDown();
          // 发送验证码
          this.$http.post(api, {
            phone: this.ruleForm.phoneNo
          }).then((res) => {
            if(!res.success) {
              this.$message.error(res.message);
            }
          })
        }
      })
    },
    // 倒计时
    timeDown() {
      this.resetMsg = 60;
      let times = setInterval(() => {
        if (this.resetMsg <= 0) {
          this.resetMsg = '';
          clearInterval(times);
        } else {
          this.resetMsg--;
        }
      }, 1000)
    },
    // 注册、忘记密码
    submitForm(formName) {
      let api = this.pageType == 'add' ? '/login/front/register' : '/login/front/forgetPassword';

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(api, {
            // id: this.$store.state.user.userid,
            userName: this.ruleForm.name,
            phone: this.ruleForm.phoneNo,
            verificationCode: this.ruleForm.code,
            pwd: this.ruleForm.pass,
            // surePassword: this.ruleForm.checkPass
          }).then((res) => {
            if(res.success) {
              this.$message({
                duration: 2000,
                message: this.pageType == 'add' ? '注册成功' : '修改密码成功',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.push({ path: '/login'});
              }, 1000);
            } else {
              this.$message.error(res.message);
            }
          })
        } else {
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
}
</script>

<style lang="scss" scoped>
.g-container {
  padding-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .page-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      padding: 50px 60px;
      width: 500px;
      height: 592px;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0px 10px 20px 0px rgba(181,177,221,0.3);
      &.type-forget {
        padding-top: 80px;
      }
      h1.title {
        position: relative;
        padding-bottom: 14px;
        margin-bottom: 30px;
        font-size:24px;
        color: $primary;
        letter-spacing: 5px;
        &:after {
          display: block;
          content: '';
          position: absolute;
          left: 3px;
          bottom: 0;
          width: 20px;
          height: 4px;
          background:rgba(5,144,255,1);
        }
      }
      .form {
        .vertify {
          position: relative;
          .m-btn {
            position: absolute;
            right: 15px;
            top: 0;
            &.diable {
              color: #c9cacc;
            }
          }
          /deep/ .el-input__inner {
            padding-right: 90px;
          } 
        }
      }
      .btn-sure {
        width: 100%;
        margin-top: 8px;
      }
    }
  }
} 
</style>


