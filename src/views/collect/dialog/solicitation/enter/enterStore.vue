<template>
  <div>
    <el-dialog title="藏品入馆审批"  class="approval" :visible.sync="dialogPlanDatilVisible" width="900px" >
    <div class="timeLine">
      <el-timeline >
        <el-timeline-item
          v-for="(activity, index) in activities" :key="index">
          <img class="head-pic" :src=activity.userImage>
          {{activity.currentApproval}}
          {{activity.collectStatus}}
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="right">
      <h3>{{new Date()}}</h3>
      <h3 class="personName fr"></h3>
      <el-form ref="form" :model="form" label-width="104px"  class="fl">
        <el-row>
          <el-col :span="12">
            <el-form-item label="入馆凭证号 :" prop="enterSign">
              <el-input v-model="form.enterSign"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入馆凭证名称 :" label-width="95px" prop="enterSignName">
              <el-input v-model="form.enterSignName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收据号 :" prop="receiptNumber">
              <el-input v-model="form.receiptNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="单位或个人 :" prop="opertor">
              <el-input v-model="form.opertor" placeholder="万元"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="9"> 
            <el-form-item label="来源 :" prop="source">
              <el-date-picker v-model="form.source" type="year" value-format="yyyy"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="入馆备注 :" prop="enterRemarks">
          <el-input type="textarea" v-model="form.enterRemarks" style="resize:none"></el-input>
        </el-form-item>

        <el-form-item label="上传附件 :" prop="">
          <!-- 上传 -->
          <cmp-upload :callFun="uploadCallback" :fileList="remoteFileList" accept=".rar,.zip,.doc,.docx,.pdf,.jpg" :showName="true" :showTip="true" >
          </cmp-upload>
        </el-form-item>
          
      </el-form>
      
      <!-- 表格 -->
      <div class="table">
        <div class="operation">
          <h3>藏品明细</h3>
          <a class="m-btn fr" @click="add" type="text" size="small">添加</a>
          <a class="m-btn fr" type="text" size="small">
            <el-upload
              class="avatar-uploader g-inline-block"
              action=""
              :show-file-list="false"
              multiple
              :before-upload="beforeExport">
              <a class="m-btn">
                批量导入
              </a>
            </el-upload>
          </a>
          <a class="m-btn fr" @click="deleteDetail" type="text" size="small">删除</a>
        </div>
        <el-table :data="tableData" stripe @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName" @cell-click="cellClick">

          <el-table-column type="selection"></el-table-column>

          <el-table-column  v-if="false">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.collectId" >
            </template>
          </el-table-column>

          <el-table-column  v-if="false">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.pictureIds" >
            </template>
          </el-table-column>

          <el-table-column prop="collectCode" label="编号">
            <template slot-scope="scope">
              <span v-if="collectCode">{{scope.row.collectCode}}</span>
              <input type="text" v-model="scope.row.collectCode" v-else>
            </template>
          </el-table-column>

          <el-table-column label="图片">
            <template slot-scope="scope" prop="mainPicture">
              <a class="m-btn" @click="upLoadPicture" type="text" size="small">
                <img :src="scope.row.mainPicture" width="40" height="40" />
              </a>
            </template>
          </el-table-column>
          <el-table-column prop="collectName" label="藏品名称">
            <template slot-scope="scope">
              <span v-if="collectName">{{scope.row.collectName}}</span>
              <input type="text" v-model="scope.row.collectName" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="collectYear" label="年代">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.collectYear}}</span>
              <input type="text" v-model="scope.row.collectYear" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="collectType" label="藏品分类">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.collectType}}</span>
              <input type="text" v-model="scope.row.collectType" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="数量">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.num}}</span>
              <el-input-number v-model="scope.row.num" :min="1" label="描述文字" v-else>
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="numUnit" label="数量单位">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.numUnit}}</span>
              <input type="text" v-model="scope.row.numUnit" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="级别">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.name}}</span>
              <el-select size="medium" v-model="scope.row.collectLevel" v-else>
                <el-option v-for="item in collectLevel" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="质地">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.name}}</span>
              <el-select size="medium" v-model="scope.row.collectTexture" v-else>
                <el-option v-for="item in collectTexture" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="完残程度">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.collectDisablity}}</span>
              <el-select size="medium" v-model="scope.row.collectDisablity" v-else>
                <el-option v-for="item in collectDisablity" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center"  label="操作">
            <template slot-scope="scope">
              <a class="m-btn" @click="edit(scope.row)" type="text" size="small" >编辑</a>
              <a class="m-btn" @click="showLable" type="text" size="small">标签</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogPlanDatilVisible = false">取消</el-button>
      <el-button type="primary" @click="fromCollection">提交</el-button>
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

  <el-dialog title="选择出库藏品" :visible.sync="dialogCollectVisible" width="900px">
      <el-input
        placeholder="请输入"
        v-model="searchName">
        <i slot="prefix" class="el-input__icon el-icon-search addSearch"></i>
      </el-input>
      <el-table :data="tableDataList" >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column property="name" label="图片">
          <template slot-scope="scope">
            <a class="m-btn" type="text" size="small">
              <img :src="scope.row.head_pic" width="40" height="40" class="head_pic"/>
            </a>
          </template>
        </el-table-column>
        <el-table-column property="name" label="登记号" ></el-table-column>
        <el-table-column property="name" label="藏品名称"></el-table-column>
        <el-table-column property="name" label="年代"></el-table-column>
        <el-table-column property="name" label="藏品分类"></el-table-column>
        <el-table-column property="name" label="级别"></el-table-column>
        <el-table-column property="name" label="质地" ></el-table-column>
        <el-table-column property="name" label="完残程度"></el-table-column>
        <el-table-column property="name" label="数量"></el-table-column>
        <el-table-column property="name" label="库房名称"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogOpenctVisible = false">提交</el-button>
      </div>
    </el-dialog>
    

  <!-- 点击表格标签弹出标签弹框 -->
    <collectLable ref="lableDialog" :callFun = "buildCollect"></collectLable>

    <!-- 点击表格添加图片 -->
    <upPictureDetil ref="pictureDialog"></upPictureDetil>

  </div>
</template>

<script>
import collectLable from './lable'
import cmpUpload from '@cmp/my-upload/index'
import upPictureDetil from './upPicture'
export default {
  components: {
    collectLable,
    cmpUpload,
    upPictureDetil
  },
  // 接收回调
  // props: {
  //   callFun: Function
  // },

  data () {
    return {
      // 添加表格数据
      tableDataList: [
        {
        number: '1',
        name: '总登记号',
        address: '上'
      },
      {
        number: '1',
        name: '总登记号',
        address: '上'
      },
      {
        number: '1',
        name: '总登记号',
        address: '上'
      }
      ],
      // 搜索条件
      searchName: "",
      dialogCollectVisible: false,
      // 接口返回的附件列表
      remoteFileList: [],
      // 定义表格编辑状态
      collectName: true,
      collectCode: true,
      collectYear: true,
      collectType: true,
      collectNumber: true,
      collectDisablity: true,
      collectLevel: true,
      collectTexture: true,
      collectCode: true,
      dialogPlanDatilVisible: false,
      addDialogLablectVisible: false,
      form: {
        enterSign: '',
        enterSignName: '',
        receiptNumber: '',
        opertor: '',
        source: '',
      },
      // 定义表格数据
      tableData: [{
        number: '1',
        collect: '青花瓷',
        date: '2016-05-03',
        name: '王小',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      activities: [],
      addformTag:{
            collection: ''
        },
    } 
  },
  methods: {
     //  点击批量导入
    beforeExport(file) {
      let fd = new FormData()
      fd.append('file', file)
      this.$http.post('/collection/batchImport', fd)
      .then((res) => {
          console.log(res)
        if(res.success) {
          this.$message.success('批量导入成功')
          // this.fileList.push(res.result)
          this.table = res.result
        } else {
          this.$message.error(res.message)
        }
      })
    },
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex
    },
    cellClick(row,column,cell) {
      this.tableIndex = row.index
      if(cell.cellIndex == '2'){
        this.upLoadPicture()
      }
      // console.log(row.index)
      // console.log(cell)
    },
    // 上传图片
    uploadCallback(fileStr) {
      // this.files = fileStr
      this.form.attachmentIds = fileStr
    },
  
    // 定义父组件新建收藏弹框
    buildCollect () {
      this.addDialogLablectVisible = true
    },
    // 接收父组件弹出弹框
    enterShop () {
      // 渲染审批流程列表
      this.$http.get('/scheme/getApprovalDetailInfo')
      .then((res) => {
        console.log(res)
        if(res.success) {
          this.activities = res.result
        } else {
          this.$message.error(res.message)
        }
      })
      this.dialogPlanDatilVisible = true
    },
    // 点击表格图片添加图片
    upLoadPicture () {
      // this.dialogPhotosVisible = true
      // this.callFun && this.callFun()
      this.$refs.pictureDialog.upPicture()
    },
    // 点击提交
    fromCollection (formInfo) {
      this.$http.post('/enter/addOrUpdateEnter',this.form).then(res => {
        console.log(res)
        if(res.success) {
          this.$message.success('藏品入馆成功')
        }
        this.dialogPlanDatilVisible = false;
        this.$emit("initList")
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
    edit (row) {
       this.collectName = !this.collectName
       this.collectYear = !this.collectYear
       this.collectType = !this.collectType
       this.collectNumber = !this.collectNumber
       this.collectDanwei = !this.collectDanwei
       this.collectJibie = !this.collectJibie
       this.collectZhidi = !this.collectZhidi
       this.collectChengdu = !this.collectChengdu
    },
    // 表格上方添加按钮
    add () {
      this.dialogCollectVisible = true
    },
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
  .addSearch {
    position: absolute;
    left: 255px;
  }
</style>
