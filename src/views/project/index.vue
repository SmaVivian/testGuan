<template>
  <div class="g-wrap">
    <div class="page-project clearfix">
      <sidebar :menuList="sidebarData" :activeIndex="`/project`" :openeds="openedsArr"></sidebar>
      <div class="content">
        <h1>全部项目</h1>
        <ul class="pro-list">
          <el-row :gutter="20">
            <el-col class="box" :xs="6" :sm="6" :md="6" :xl="4" v-for="(item, index) in menuData" :key="index">
              <el-card class="box-card">
                <router-link class="card-item" tag="div" :to="{path: '/project/sub?type=task'}">
                  <div :class="'card-pic card-pic-' + (index+1)"></div>
                  <h2 class="tc">{{item.name}}</h2>
                </router-link>
              </el-card>
            </el-col>

            <el-col class="box" :xs="6" :sm="6" :md="6" :xl="4">
              <el-card class="box-card box-card-add">
                <div class="card-add" @click="dialogVisible = true">
                  <div class="icon-add-box tc">
                    <svg-icon icon-class="add" class-name="icon-add" />
                  </div>
                  <p class="m-btn tc">创建新项目</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </ul>
      </div>
    </div>

    <el-dialog
      class="dialog-pro"
      title="新建项目"
      :show-close="false"
      :visible.sync="dialogVisible"
      :width="'900px'"
      :before-close="handleClose">
      <!-- <span>这是一段信息</span> -->
      <div class="clearfix">
        <ul class="pro-list g-dialog-pro">
          <el-row :gutter="10">
            <el-col class="box" :span="8" v-for="(item, index) in menuData" :key="index">
              <el-card class="box-card">
                <router-link class="card-item" tag="div" :to="{path: '/project/sub?type=task'}">
                  <div :class="'card-pic card-pic-' + (index+1)"></div>
                  <p class="name tc">{{item.name}}</p>
                </router-link>
              </el-card>
            </el-col>
          </el-row>
        </ul>
        <div class="m-btn fr">
          <svg-icon icon-class="add" class-name="icon-add" /><span class="m-btn">创建模板</span> 
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
  </div>
</template>

<script>
import sidebar from '@cmp/sidebar'
export default {
  components: {
    sidebar
  },
  data() {
    return {
      dialogVisible: false,
      menuData: [
        {
          name: '抗联展览项目'
        },
        {
          name: '抗联展览项目2'
        },
        {
          name: '抗联展览项目3'
        },
        {
          name: '抗联展览项目4'
        },
        {
          name: '抗联展览项目5'
        },
        {
          name: '抗联展览项目6'
        },
      ],
      sidebarData: [
        {
          name: '项目',
          icon: 'pro',
          index: '/project'
        },
        {
          name: '测试2',
          icon: 'pro',
          index: '/aa'
        },
        {
          name: '项目',
          icon: 'pro',
          children: [
            {
              name: '我参与的',
              index: '/project?type=1'
            },
            {
              name: '已归档项目',
              index: '/project?type=2'
            }
          ]
        },
        {
          name: '分组',
          // icon: 'el-icon-edit',
          icon: 'group',
          hasBtn: true,  // 新建分组按钮
          children: [
            {
              name: '展览项目',
              index: '11',
            },
            {
              name: '活动项目',
              index: '12',
            },
            {
              name: '活动项目1',
              index: '13',
            },
            {
              name: '活动项目2',
              index: '14',
            }
          ]
        },
      ],
      openedsArr: ['项目', '分组'],
      dialogData: [
        {
          name: '标准项目'
        },
        {
          name: '公众号运营'
        },
        {
          name: '临时展览项目'
        },
        {
          name: '学术研究项目'
        },
        {
          name: '文创产品开发项目'
        },
        {
          name: '社教课程策划项目'
        },
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
    getNavData() {
      this.sidebarData.splice(1, 1)
    },
    handleClose() {
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
    },
    onSubmit(formName) {
      // this.$message('submit!')
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
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
  },
  created() {
    // setTimeout(this.getNavData, 1000)
  },
  activated() {
    // this.$store.dispatch('changeBodyBg', 'bg1')
  },
  deactivated() {
    // this.$store.dispatch('changeBodyBg', '')
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 30px 30px 30px 240px;
  .pro-list {
    .box {
      margin-top: 30px;
    }
    .card-pic {
      height: 215px;
    }
    h2 {
      height: 55px;
      line-height: 55px;
    }
    .card-pic-1 {
      @include bg(url(~@images/project/card-1.svg), '', '', contain)
    }
    .card-pic-2 {
      @include bg(url(~@images/project/card-2.svg), '', '', contain)
    }
    .card-pic-3 {
      @include bg(url(~@images/project/card-3.svg), '', '', contain)
    }
    .card-pic-4 {
      @include bg(url(~@images/project/card-4.svg), '', '', contain)
    }
    .card-pic-5 {
      @include bg(url(~@images/project/card-5.svg), '', '', contain)
    }
    .card-pic-6 {
      @include bg(url(~@images/project/card-6.svg), '', '', contain)
    }
    .box-card {
      border:4px solid transparent;
    }
    .box-card:hover {
      box-shadow:0px 1px 10px 0px rgba(238,239,245,1);
      border-radius:4px;
      border:4px solid rgba(5,144,255,1);
    }
    .card-item {
      cursor: pointer;
    }
    .box-card-add {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 270px;
      .card-add {
        cursor: pointer;
      }
    }
  }
  .icon-add-box {
    .icon-add {
      font-size: 62px;
    }
  }
}
.dialog-pro {
  .el-card.is-always-shadow {
    box-shadow: 0 10px 10px 0 #EEEFF5;
  }
  .el-card {
    border: none;
  }
  .box {
    margin-bottom: 10px;
  }
  .pro-list {
    
  }
  
}
</style>


