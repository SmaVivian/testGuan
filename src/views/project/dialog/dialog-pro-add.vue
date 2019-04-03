<template>
  <div class="dialog-pro-add">
    <el-dialog
      class="dialog-pro"
      title="新建项目"
      :show-close="false"
      :visible.sync="dialogVisible"
      :width="'900px'"
      :before-close="handleClose">
      <!-- <span>这是一段信息</span> -->
      <div class="dialog-pro-wrap">
        <div class="clearfix">
          <ul class="pro-list g-dialog-pro">
            <el-row :gutter="10">
              <el-col class="box" :span="8" v-for="(item, index) in menuData" :key="index">
                <el-card class="box-card" :class="{'active': item.id === activePro.id}">
                  <div class="card-item" @click.stop="handleSelect(item)">
                    <div :class="'card-pic card-pic-' + (index+1)"></div>
                    <p class="name tc">{{item.name}}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </ul>
          <div class="m-btn fr" @click="addProModel">
            <svg-icon icon-class="add" class-name="icon-add" />&nbsp;<span class="m-btn">创建模板</span> 
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
        <div class="dialog-footer tr mt-30">

          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 项目模板设置 -->
    <cmp-dialog-pro-setting ref="dialogProSetting"></cmp-dialog-pro-setting>
  </div>
</template>

<script>
import cmpDialogProSetting from './dialog-pro-model-setting'
export default {
  components: {
    cmpDialogProSetting,
  },
  data() {
    return {
      dialogVisible: false,
      activePro: {}, 
      menuData: [
        {
          name: '抗联展览项目',
          id: 1
        },
        {
          name: '抗联展览项目2',
          id: 2
        },
        {
          name: '抗联展览项目3',
          id: 3
        },
        {
          name: '抗联展览项目4',
          id: 4
        },
        {
          name: '抗联展览项目5',
          id: 5
        },
        {
          name: '抗联展览项目6',
          id: 6
        }
      ],
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

      this.$nextTick(() => {
        this.resetForm()
      })
    },
    // 创建项目模板
    addProModel() {
      this.$refs.dialogProSetting.init()
    },
    // 选中项目
    handleSelect(item) {
      this.activePro = item
    },
    handleClose() {
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
    },
    // 重置
    resetForm() {
      this.activePro = this.menuData[0]
      this.$refs['form'].resetFields()
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          let forms = this.form;
          console.log(111, { forms })

          this.form.activePro = { ...this.activePro }
          console.log(222, { ...this.form })
          this.dialogVisible = false;
        } else {
          return false
        }
      })
    },
    // onCancel() {
    //   this.$message({
    //     message: 'cancel!',
    //     type: 'warning'
    //   })
    // },
  }
}
</script>

<style lang="scss" scoped>
.dialog-pro {
  .dialog-pro-wrap {
    padding: 10px;
    max-height: 650px;
    overflow-y: auto;
  }
  .el-card.is-always-shadow {
    box-shadow: 0px 1px 10px 0px rgba(238,239,245,1);
    border-radius: 4px;
  }
  .el-card {
    border: 4px solid transparent;
    &.active {
      border:4px solid rgba(5,144,255,1);
    }
  }
  .box {
    margin-bottom: 10px;
    cursor: pointer;
  }
}
</style>


