<template>
  <el-dialog title="藏品标签" :visible.sync="dialogLableVisible" class="swiper-collect" :close-on-click-modal="false"
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
          <el-option label="新建标签" value="0"></el-option>
          <el-option
            v-for="item in state" :key="item.dictCode" :label="item.dictName" :value="item.name">
          </el-option>
          <!-- <el-option label="标签一" value="1"></el-option>
          <el-option label="标签二" value="2"></el-option>
          <el-option label="标签三" value="3"></el-option> -->
          
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogLableVisible = false">取 消</el-button>
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
        state: [
          {name:"借展出库", value: 1},
        {name:"陈列出库", value: 2}, 
        {name:"藏品观摩", value: 3}, 
        {name:"修复出库", value: 4}, 
        {name:"调拨出库", value: 5},
        {name:"藏品注销出库", value: 6},   
        ],
      formTag: {
        collection: ''
      },
    };
  },
  methods: {
    // 接受父组件弹出弹框
   
    showLable (row) {
      console.log(row)
      this.collectId= row.collectId
      console.log(this.collectId)
      this.dialogLableVisible = true
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    fromCollection(){
      if(this.formTag.collection == 0) {
        this.callFun && this.callFun()
        this.addDialogLablectVisible = true
        return
      }
      this.$http.post('/collection/updateCollectMark', {
        collectId:collectId,
        markName:markName
      })
      .then((res) => {
          console.log(res)
        // if(res.success) {
        //   this.$message.success('批量导入成功')
        //   // this.fileList.push(res.result)
        //   this.table = res.result
        // } else {
        //   this.$message.error(res.message)
        // }
      })
      this.dialogLableVisible = false
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
  .el-dialog {
    width: 23%;
  }
  /deep/.el-dialog__footer {
    padding: 0;
    margin-top: 30px;
    text-align: center;
  }
  /deep/.el-dialog__header {
    text-align: center;
    margin-bottom: 10px;
  }
</style>





