<template>
  <el-dialog
    class="dialog-pro-setting"
    title="项目设置"
    :show-close="false"
    :visible.sync="dialogVisible"
    :width="'900px'">
    <!-- <span>这是一段信息</span> -->
    <div class="clearfix">
      <div class="pro-list g-dialog-pro tc">
        <el-card class="box-card" style="width: 260px;display: inline-block;">
          <router-link class="card-item" tag="div" :to="{path: '/project/sub?type=task'}">
            <div class="card-pic card-pic-1"></div>
            <p class="name tc">标准项目</p>
          </router-link>
        </el-card>
      </div>
      <div class="m-btn tc mb-30 mt-30">
        <el-button class="el-primary-border">上传新封面</el-button>
      </div>
    </div>
    <h1>项目信息</h1>
    <el-form ref="form" :model="form" :rules="rules" label-width="0">
      <el-form-item class="mb-30" label="" prop="name">
        <el-input autofocus v-model="form.name" placeholder="项目名称"/>
      </el-form-item>
  
      <!-- 下拉框静态 -->
      <el-form-item class="mb-20" label="" prop="region">
        <el-select v-model="form.region" placeholder="项目分组（可多选）" style="display:block;">
          <el-option label="上海" value="shanghai"/>
          <el-option label="北京" value="beijing"/>
        </el-select>
      </el-form-item>
    </el-form>
    <p class="m-assist">公开范围：仅项目组成员可见</p>
    <span slot="footer" class="dialog-footer">

      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        region: ''
      },
      rules: {
        name: [
          {required: true, message: '必填', trigger: 'blur'}
        ],
        region: [
          {required: true, message: '请选择项目分组', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    init() {
      this.dialogVisible = true
    },
    handleClose() {
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          let forms = this.form;
          console.log(111, { forms })

          console.log(222, { ...this.form })
          this.dialogVisible = false;
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>


