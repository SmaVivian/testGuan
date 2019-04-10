<template>
  <div class="g-container">
    <div class="page-login">
      <cmp-login-pic></cmp-login-pic>
      
      <div class="content">
        <h1 class="title">登录</h1>

        <el-form @keyup.enter.native="submitForm('ruleForm')" :label-position="`top`" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form cus-form-top">
          <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名/手机号"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>

        <div class="other-way mt-20">
          <router-link tag="span" :to="{path: '/register?type=forget'}" class="m-btn">忘记密码</router-link>
          <router-link tag="span" :to="{path: '/register?type=add'}" class="m-btn fr">注册账户</router-link>
        </div>

        <el-button class="btn-sure" type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { validate } from '@/utils/util';
import cmpLoginPic from './components/login-pic'
export default {
  components: {
    cmpLoginPic
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (!validate(value, 'password')) {
        callback(new Error('6-20位数字、字母、特殊字符至少包含两种'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('LoginUser', {
            loginName: this.ruleForm.name,
            password: this.ruleForm.pass,
          })
          .then((res) => {
            this.$router.push({ path: '/'})
          }).catch(() => {
            
          })
        } else {
          return false
        }
      })
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
      padding: 80px 60px;
      width: 500px;
      height: 592px;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0px 10px 20px 0px rgba(181,177,221,0.3);
      h1.title {
        position: relative;
        padding-bottom: 14px;
        margin-bottom: 60px;
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
      .btn-sure {
        width: 100%;
        margin-top: 60px;
      }
      .form {
        .el-form-item {
          margin-bottom: 30px;
        }
      }
    }
  }
} 
</style>


