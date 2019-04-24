<template>
  <el-dialog title="藏品标签" :visible.sync="dialogLableVisible" class="swiper-collect" :close-on-click-modal="false"
    width="390px">
    <!-- 藏品标签 -->
    <div class="labelTable">
      <h3 class="collectLable">已选标签</h3>
      <div>
        <el-tag v-for="tag in markName" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)" style="margin-bottom:30px" ref="tag">
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
        <el-select v-model="formTag.collection" placeholder="选择标签" class="content" @change="seletState">
          <el-option label="新建标签" value="0" ></el-option>
          <el-option
            v-for="item in state" :key="item.markId" :value="item.markId" :label="item.markName">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogLableVisible = false">取消</el-button>
      <el-button type="primary" @click="fromCollection">确定</el-button>
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
      collectId: '',
      inputVisible: false,
      dialogLableVisible: false,
      markName: [],
      markId:[],
      markNameStr:'',
      form: {
          name: '',
          region: '',
          type:[]
        },
        state: [],
      formTag: {
        collection: ''
      },
    };
  },
  methods: {
    seletState(val){
      console.log(val)
      if( this.markName.every( (item,index) => {
        return this.markName != this.formTag.collection
      } ) ){
        this.markName.push( this.formTag.collection )

      }
    },
    // 接受父组件弹出弹框\
    showLable (collectId) {
      this.collectId = collectId
      // 渲染下拉列表
      this.$http.get('/collection/getMarkList')
      .then((res) => {
        // console.log(res)
        this.state = res.result
      })
      this.dialogLableVisible = true
    },
    // 标签删除方法
    handleClose(tag) {
      this.markName.splice(this.markName.indexOf(tag), 1);
    },
    // 确定提交数据
    fromCollection(){
      if(this.formTag.collection == 0) {
        this.callFun && this.callFun()
      }
      for(var i=0;i<this.markName.length;i++){
        this.markNameStr = this.markNameStr+','+this.markName[i]
      }
      this.$http.post('/collection/updateCollectMark', {
        collectId: this.collectId,
        markName: this.markNameStr
      })
      .then((res) => {
        if(res.success) {
          this.$message.success('藏品标签添加成功')
        }
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





