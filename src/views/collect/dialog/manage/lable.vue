<template>
  <el-dialog :visible.sync="dialogLableVisible" class="swiper-collect" :close-on-click-modal="false"
    width="390px">
    <!-- 藏品标签 -->
    <div class="labelTable">
      <h3 class="collectLable">已选标签</h3>
      <div>
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" style="margin-bottom:30px">
        {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
        </el-input>
      </div>
    </div>
    
    <el-form :model="form">
      <el-form-item a:label-width="formLabelWidth">
        <el-select v-model="formTag.collection" placeholder="选择标签" class="content">
          <el-option label="标签一" value="1"></el-option>
          <el-option label="标签二" value="2"></el-option>
          <el-option label="标签三" value="3"></el-option>
          <el-option label="新建标签" value="4"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogLablectVisible = false">取 消</el-button>
      <el-button type="primary" @click="fromCollection">确 定</el-button>
    </div>
  </el-dialog>
      
</template>

<script>
export default {
   props: {
    callFun: Function
  },
  data() {
    return {
      inputVisible: false,
      dialogLableVisible: false,
      dynamicTags: ['陶器', '东周', '未定级'],
      form: {
          name: '',
          region: '',
          type:[]
        },
      formTag: {
        collection: ''
      },
    };
  },
  methods: {
    // 接受父组件弹出弹框
    lableContent () {
      console.log('ddd')
      this.dialogLableVisible = true
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    fromCollection(){
      if(this.formTag.collection == 4) {
        this.callFun && this.callFun()
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.el-dialog {
  .el-dialog__body {
    .labelTable {
      display: flex;
      height: 60px;
      .collectLable {
      width: 60px;
      line-height: 35px;
      }
      .el-tag {
        margin: 0 5px;
        height: 25px;
        line-height: 24px;
        border-radius: 15px;
        border: 1px solid #0590FF;
        background-color: #fff;
      }
      .el-tag:hover {
        background-color: #0590FF;
        color: #fff;
      }
    }
    .content {
        width: 100%;
      }
  }
}
  .dialog-footer {
    margin: 30px 0 0 0;
  }
  .el-dialog {
    width: 23%;
  }
</style>





