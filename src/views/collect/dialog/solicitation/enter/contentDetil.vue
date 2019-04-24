<template>
  <div>
    <el-dialog title="征集计划详情"  class="approval" :visible.sync="dialogPlanDatilVisible" width="900px" >
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
          <cmp-upload  :fileList="remoteFileList" accept=".rar,.zip,.doc,.docx,.pdf,.jpg" :showUpload="false" :showName="true" :showTip="false"></cmp-upload>
        </el-form-item>
      </el-form>
      
      <!-- 表格 -->
      <div class="table">
        <div class="operation">
          <h3>藏品明细</h3>
        </div>
        <el-table :data="table" stripe  >
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

          <el-table-column  label="添加图片">
            <template slot-scope="scope" prop="mainPicture">
              <a class="m-btn"
                type="text" size="small">
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
        </el-table>
      </div>
    </div>
  </el-dialog>
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
  data () {
    return {
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
      // 定义提交表单数据
      form: {
        schemeId: '',
        attachmentIds:''// 附件id集合
      },
      // 定义提交表格数据
      table: [],
      list: {
        schemeId: '',
      },
      activities: [],
      // 接口返回的附件列表
      remoteFileList: [],
      addformTag:{
        collection: ''
      },
      dialogPlanDatilVisible: false
    } 
  },
  methods: {
   
    // 接收父组件参数弹出弹框
    namDetail (form, table, activities) {
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
