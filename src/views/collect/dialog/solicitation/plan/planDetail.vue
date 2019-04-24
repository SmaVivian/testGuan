<template>
  <div>
    <el-dialog title="征集计划详情"  class="approval" :visible.sync="dialogPlanDatilVisible" width="900px" >
    <div class="timeLine">
      <el-timeline >
        <el-timeline-item
          v-for="(activity, index) in activities" :key="index">
          <img class="head-pic" :src=activity.userImage width="24px" height="24px">   
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
            <el-form-item label="计划名称 :">
              <el-input v-model="form.schemeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划编号 :" label-width="95px">
              <el-input v-model="form.schemeNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="征集目的 :">
              <el-input v-model="form.schemeReason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="预计经费 :">
              <el-input v-model="form.estimatedExpenditure" placeholder="万元"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="9"> 
            <el-form-item label="年度计划 :">
              <el-date-picker v-model="form.planYear" type="year" value-format="yyyy"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="征集依据 :">
          <el-input type="textarea" v-model="form.schemeBasis" style="resize:none"></el-input>
        </el-form-item>
        <div class="article">
          <el-form-item label="正文内容 :">
          <el-input type="textarea" v-model="form.mainDescription"></el-input>
        </el-form-item>
        </div>

        <el-form-item label="上传附件 :" prop="">
          <!-- 上传 -->
          <cmp-upload :callFun="uploadCallback" :fileList="remoteFileList" accept=".rar,.zip,.doc,.docx,.pdf,.jpg" :showUpload="false" :showName="true" :showTip="true" >
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
        <el-table :data="table" :row-class-name="tableRowClassName" stripe @selection-change="handleSelectionChange" @cell-click="cellClick">
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
              <span v-if="scope.row.collectId">{{scope.row.collectCode}}</span>
              <input type="text" v-model="scope.row.collectCode" v-else>
            </template>
          </el-table-column>

          <el-table-column  label="添加图片">
            <template slot-scope="scope" prop="mainPicture">
              <a class="m-btn" @click="upLoadPicture" type="text" size="small">
                <img :src="scope.row.mainPicture" width="40" height="40" />
              </a>
            </template>
          </el-table-column>

          <el-table-column prop="collectName" label="藏品名称">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.collectName}}</span>
              <input type="text" v-model="scope.row.collectName" v-else>
            </template>
          </el-table-column>

          <el-table-column prop="collectYear" label="年代">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.collectYear}}</span>
              <el-select size="medium" v-model="scope.row.collectYear" v-else>
                <el-option v-for="item in collectYear" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="collectType" label="藏品分类">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.collectType}}</span>
              <el-select size="medium" v-model="scope.row.collectType" v-else>
                <el-option v-for="item in collectType" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="数量" width="200px">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.num}}</span>
              <el-input-number v-model="scope.row.num" :min="1" label="描述文字" v-else></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="numUnit" label="数量单位">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.numUnit}}</span>
              <input type="text" v-model="scope.row.numUnit" v-else>
            </template>
          </el-table-column>
          <el-table-column prop="collectLevel" label="级别">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.collectLevel}}</span>
              <el-select size="medium" v-model="scope.row.collectLevel" v-else>
                <el-option v-for="item in collectLevel" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="collectTexture" label="质地">
            <template slot-scope="scope">
              <span v-if="scope.row.collectId">{{scope.row.collectTexture}}</span>
              <el-select size="medium" v-model="scope.row.collectTexture" v-else>
                <el-option v-for="item in collectTexture" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="collectDisablity" label="完残程度">
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
              <a class="m-btn" @click="showLable(scope.row)" type="text" size="small">标签</a>
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

  <el-dialog title="新建标签" :visible.sync="addDialogLablectVisible" width="350px" class="new-collect">
    <el-form>
      <el-form-item a:label-width="formLabelWidth" placeholder="收藏夹名称">
        <el-input v-model="markName"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="addDialogLablectVisible = false">取 消</el-button>
      <el-button type="primary" @click="addCollection">确 定</el-button>
    </div>
  </el-dialog>
    

    <!-- 点击表格标签弹出标签弹框 -->
    <collectLable ref="lableDialog" :callFun = "buildCollect"></collectLable>

    <!-- 点击表格添加图片 -->
    <upPictureDetil ref="pictureDialog" :callFun="upPicture"></upPictureDetil>
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
  props: {
    callFun: Function
  },
  data () {
    return {
      // show: false,
      pics:'',
      deleteCollectIds:[],
      deleteCollectIdsStr:'',
      schemeId: '',
      // 定义表格编辑状态
      collectName: true,
      num: true,
      collectYear: '',
      collectType: '',
      collectNumber: '',
      numUnit: true,
      collectDisablity: '',
      collectTexture: '',
      collectLevel: '',
      collectCode: true,
      mainPicture: true,
      // 编辑按钮切换
      // BtnName: '编辑',
      dialogPlanDatilVisible: false,
      addDialogLablectVisible: false,
      // 定义提交表单数据
      form: {
        schemeId: '',
        attachmentIds:'',// 附件id集合
        deleteCollectIdsStr:''
      },
      // 定义提交表格数据
      table: [],
      list: {
        schemeId: '',
      },
      fileList: [{name: '概念设计文档', url: ''}],
      activities: [],
      // 接口返回的附件列表
      remoteFileList: [],
      // 表格接口返回的列表
      remoteFile: [
        {
          realFileName: '123'
        }
      ],
      markName: '',
      nowSelector:[],
    } 
  },
  methods: {
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
    upPicture(index, picUrl,pics) {
      // this.table.forEach( item => {
      //   if( item.collectCode == index ){
      //     item.fileMain = picUrl
      //   }
      // })
      this.table[index].mainPicture = picUrl
      this.table[index].pictureIds = pics
    },
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

    // 上传图片
    uploadCallback(fileStr) {
      // this.files = fileStr
      this.form.attachmentIds = fileStr
    },
    // 新建标签弹框
    buildCollect () {
      this.addDialogLablectVisible = true
    },
    // 接收父组件参数弹出弹框
    outDetail (form, table, activities) {
      this.dialogPlanDatilVisible = true
      this.schemeId = form.schemeId
      this.activities = activities
      var arr = ['collection_year','collection_type','collection_level','collection_texture',
      'degree_disability']
      this.$http.post('/collectDict/getSelectDataByArr', {arr:arr}
        ).then(res => { 
          console.log(res)
          var success = res.success
          if(success){
            var data = res.result
            this.collectYear = data.collection_year
            this.collectLevel = data.collection_level
            this.collectType = data.collection_type
            this.collectDisablity = data.degree_disability
            this.collectTexture = data.collection_texture
          }else{
            var msg = res.message
            this.$message({
            message: msg,
            type: 'warning'
           })
          }
        })
      
      // 表单数据
      this.form = form
      // 表格数据
      this.table = table
      this.remoteFileList = form.attachmentList
    },
    lableContent () {
     
    },
    handlePreview(file) {
      
    },
    // 点击表格图片添加图片
    upLoadPicture () {
      this.dialogPhotosVisible = true
      this.$refs.pictureDialog.upPicture(this.tableIndex)
    },
    // 点击上传
    handleRemove(file, fileList) {
      
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
      this.$emit("initList")
      for(var i=0;i<this.deleteCollectIds.length;i++){
        this.deleteCollectIdsStr = this.deleteCollectIdsStr+','+this.deleteCollectIds[i]
      }
      this.form.deleteCollectIdsStr = this.deleteCollectIdsStr
      this.$http.post('/scheme/addOrUpdateScheme', this.form).then(res => {
        if (res.success) {
           this.$message.success('导入成功')
        }
      })
    },
    // 点击获取表格序号
    handleSelectionChange(val){
      this.nowSelector = val.map( item => item )
      console.log(this.nowSelector)
      this.tableIndex = val
    },
    // 点击删除
    deleteDetail () {
      if(!this.tableIndex) {
        this.$message({
          message: '请选择藏品',
          type: 'warning'
        })
        return
      } else {
         console.log(this.tableIndex)
         console.log(this.tableData[this.tableIndex])
         if(this.tableData[this.tableIndex].collectId != null && this.tableData[this.tableIndex].collectId != ''){
          this.deleteCollectIds.push(this.tableData[this.tableIndex].collectId,1)
         }
         this.tableData.splice(this.tableIndex, 1)
        
      }
    },
    // 编辑功能
    edit () {
       this.collectName = !this.collectName
       this.collectYear = !this.collectYear
       this.collectType = !this.collectType
       this.collectNumber = !this.collectNumber
       this.num = !this.num
       this.numUnit = !this.numUnit
       this.collectZhidi = !this.collectZhidi
       this.collectDisablity = !this.collectDisablity
       this.collectTexture = !this.collectTexture
       this.collectLevel = !this.collectLevel
       this.collectCode = !this.collectCode
       this.mainPicture = !this.mainPicture
      //  this.BtnName = this.showInput ? '编辑' : '保存' 
    },
    // 导入
    exportFil () {
      this.loading = true;
      this.$http.get('/collection/batchExport', 
        this.dicts
      ).then(res => {
        this.state = res.result
      })
    },
    // 表格上方添加按钮
    add () {
      var list = {}
      this.table.unshift(list)
    },
    // 点击标签弹框
    showLable (row) {
      var collectId = row.collectId
      console.log(collectId)
      this.$refs.lableDialog.showLable(collectId)
    },
    // 新建标签
    addCollection () {
      this.$http.post('/collection/addMark', {
        markName: this.markName
      })
      .then((res) => {
        console.log(res)
        if(res.success) {
          this.$message.success('标签创建成功')
        }
      })
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
  .head-pic {
    border-radius: 50%;
  }
</style>
