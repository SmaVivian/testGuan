<template>
  <div>
    <el-dialog title="藏品入馆审批"  class="approval" :visible.sync="dialogPlanDatilVisible" width="900px" >
    <div class="timeLine">
      <el-timeline >
        <el-timeline-item
          v-for="(activity, index) in activities2" :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size">
          {{activity.name}}
          {{activity.state}}
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="right">
      <h3>{{new Date()}}</h3>
      <h3 class="personName fr"></h3>
      <el-form ref="form" :model="form" label-width="104px"  class="fl">
        <el-row>
          <el-col :span="12">
            <el-form-item label="入馆凭证号 :">
              <el-input v-model="form.schemeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入馆凭证名称 :" label-width="95px">
              <el-input v-model="form.schemeNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收据号 :">
              <el-input v-model="form.schemeReason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="单位或个人 :">
              <el-input v-model="form.estimatedExpenditure" placeholder="万元"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="9"> 
            <el-form-item label="来源 :">
              <el-date-picker v-model="form.planYear" type="year" value-format="yyyy"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="入馆备注 :">
          <el-input type="textarea" v-model="form.schemeBasis" style="resize:none"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <div class="uploadTit">
          <h3>上传附件 :</h3>
          <a class="m-btn" style="color:#0590FF;" type="text" size="small">点击上传</a>
        </div>
        <span slot="tip" class="el-upload__tip">支持扩展名: .rar .zip .doc .pdf .jpg</span> 
      </el-upload>
      
      <!-- 表格 -->
      <div class="table">
        <div class="operation">
          <h3>精品明细</h3>
          <a class="m-btn fr" @click="add" type="text" size="small">添加</a>
          <a class="m-btn fr" @click="dialogLablectVisible = true" type="text" size="small">批量导入</a>
          <a class="m-btn fr" @click="deleteDetail" type="text" size="small">删除</a>
        </div>
        <el-table :data="tableData" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="number" label="编号"></el-table-column>
          <el-table-column prop="picture" label="图片">
            <template slot-scope="scope">
              <a class="m-btn" @click="upLoadPicture" type="text" size="small">
                <img :src="scope.row.head_pic" width="40" height="40" class="head_pic"/>
              </a>
            </template>
          </el-table-column>
          <el-table-column prop="collect" label="藏品名称">
            <template slot-scope="scope">
              <span v-if="collectName">{{scope.row.collect}}</span>
              <input type="text" v-model="scope.row.collect" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="年代">
            <template slot-scope="scope">
              <span v-if="collectYear">{{scope.row.name}}</span>
              <input type="text" v-model="scope.row.name" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="藏品分类">
            <template slot-scope="scope">
              <span v-if="collectType">{{scope.row.name}}</span>
              <input type="text" v-model="scope.row.name" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="数量">
            <template slot-scope="scope">
              <span v-if="collectNumber">{{scope.row.name}}</span>
              <input type="text" v-model="scope.row.name" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="数量单位">
            <template slot-scope="scope">
              <span v-if="collectDanwei">{{scope.row.name}}</span>
              <input type="text" v-model="scope.row.name" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="级别">
            <template slot-scope="scope">
              <span v-if="collectJibie">{{scope.row.name}}</span>
              <input type="text" v-model="scope.row.name" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="质地">
            <template slot-scope="scope">
              <span v-if="collectZhidi">{{scope.row.name}}</span>
              <input type="text" v-model="scope.row.name" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="完残程度">
            <template slot-scope="scope">
              <span v-if="collectChengdu">{{scope.row.name}}</span>
              <input type="text" v-model="scope.row.name" v-else>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center"  label="操作">
            <template>
              <a class="m-btn" @click="edit" type="text" size="small" >{{BtnName}}</a>
              <a class="m-btn" @click="showLable" type="text" size="small">标签</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogPlanDatilVisible = false">取 消</el-button>
      <el-button type="primary" @click="fromCollection">提 交</el-button>
    </div>
  </el-dialog>

  <el-dialog title="新建收藏夹" :visible.sync="addDialogLablectVisible" width="350px" class="new-collect">
    <el-form :model="addformTag">
      <el-form-item a:label-width="formLabelWidth" placeholder="收藏夹名称">
        <el-input v-model="addformTag.collection"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="addDialogLablectVisible = false">取 消</el-button>
      <el-button type="primary" @click="addCollection">确 定</el-button>
    </div>
  </el-dialog>
    

  <!-- 点击表格标签弹出标签弹框 -->
    <collectLable ref="lableDialog" :callFun = "buildCollect"></collectLable>
  </div>
</template>

<script>
import collectLable from './lable'
export default {
  components: {
    collectLable
  },
  // 接收回调
  props: {
    callFun: Function
  },

  data () {
    return {
      // 定义表格编辑状态
      collectName: true,
      collectYear: true,
      collectType: true,
      collectNumber: true,
      collectDanwei: true,
      collectJibie: true,
      collectZhidi: true,
      collectChengdu: true,
      // 编辑按钮切换
      BtnName: '编辑',
      dialogPlanDatilVisible: false,
      addDialogLablectVisible: false,
      form: {
        schemeName: '',
        schemeNumber: '',
        schemeReason: '',
        estimatedExpenditure: '',
        planYear: '',
        schemeBasis: '',
        mainDescription: '',
      },
      fileList: [{name: '概念设计文档', url: ''}],
      // 定义表格数据
      tableData: [{
        number: '1',
        collect: '青花瓷',
        date: '2016-05-03',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      activities2: [
        {
        name: '将明',
        state: '待审核',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more',
        },
        {
          name: '冯桂英',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },{
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },
        {
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        },{
          name: '将明',
          state: '待审核',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more',
        }
      ],
      addformTag:{
            collection: ''
        },
    } 
  },
  methods: {
    // 定义父组件新建收藏弹框
    buildCollect () {
      this.addDialogLablectVisible = true
    },
    // 接收父组件弹出弹框
    enterShop () {
      this.dialogPlanDatilVisible = true
    },
    lableContent () {
     
    },
    handlePreview(file) {
      console.log(file);
    },
    // 点击表格图片添加图片
    upLoadPicture () {
      this.dialogPhotosVisible = true
      this.callFun && this.callFun()
    },
    // 点击上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 点击提交
    fromCollection () {
      this.dialogPlanDatilVisible = false;
      this.$http.post('/scheme/getSchemeDetail',{
        schemeId: row.schemeId
      }).then(res => {
        console.log(res)
      })

    },
    // 点击获取表格序号
    handleSelectionChange(val){
      this.tableIndex = val
      console.log(val)
    },
    // 点击删除
    deleteDetail (tableIndex) {
       if(!this.tableIndex) {
        this.$message({
          message: '请选择藏品',
          type: 'warning'
        })
        return
      } else {
         console.log(this.tableIndex)
         this.tableData.splice(tableIndex, 1)
      }  
      // this.$http.post('/scheme/deleteScheme', {
      //   schemeId: row.schemeId,
      // }).then(res => {
      //   console.log(res)
      //   if(res.success) {
      //     this.$message.success('删除成功')
      //     this.initList()
      //   }
      // })
    },
    // 编辑功能
    edit () {
       this.collectName = !this.collectName
       this.collectYear = !this.collectYear
       this.collectType = !this.collectType
       this.collectNumber = !this.collectNumber
       this.collectDanwei = !this.collectDanwei
       this.collectJibie = !this.collectJibie
       this.collectZhidi = !this.collectZhidi
       this.collectChengdu = !this.collectChengdu
       this.BtnName = this.showInput ? '编辑' : '保存' 
    },
    // 表格上方添加按钮
    add () {
      var list = {
        number: this.number,
        picture: this.picture,
        type: this.type,
      }
      this.tableData.unshift(list)
    },
     // 点击表格标签
    // collectLable () {

    // },
    // 点击标签弹框弹框
    showLable () {
      this.$refs.lableDialog.showLable()
    },
    // 
    addCollection () {
      this.addDialogLablectVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .operation h3 {
     display: inline;
  }
   .table {
   margin-top: 30px;
   .m-btn {
     display: block;
     margin-bottom: 10px;
    
   }
   .m-btn:nth-last-child(2) {
     margin: 0 20px;
   }
 }
 /deep/.new-collect {
   .el-dialog__header {
     text-align: center;
   }
   .el-dialog__footer {
     padding: 0;
     margin-top: 30px;
     text-align: center;
   }
 }
 .upload-demo {
   .el-upload__tip {
     margin-left: 10px;
   }
  .m-btn {
    margin-left: 10px;
  }
 }
 /deep/.el-upload-list__item-name {
    margin-left: 60px;
  }
</style>
