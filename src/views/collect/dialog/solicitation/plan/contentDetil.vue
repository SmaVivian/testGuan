<template>
  <el-dialog title="征集计划详情"  class="approval" :visible.sync="dialogPlanDatilVisible" width="900px" >
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
      <h3></h3>
      <h3 class="personName fr"></h3>
      <el-form ref="form" :model="form" label-width="104px"  class="fl">
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划名称 :">
              <el-input v-model="form.name" placeholder="计划一"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划编号 :" label-width="95px">
              <el-input v-model="form.name" placeholder="计划一"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="征集目的 :">
              <el-input v-model="form.name" placeholder="计划一"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="预计经费 :">
              <el-input v-model="form.name" placeholder="万元"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="9"> 
            <el-form-item label="年度计划 :">
              <el-date-picker v-model="value1" type="date"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="征集依据 :" prop="shape">
          <el-input type="textarea" v-model="ruleForm.shape" style="resize:none"></el-input>
        </el-form-item>
        <div class="article">
          <el-form-item label="正文内容 :" prop="content">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        </div>
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
      <div class="table">
        <div class="operation">
          <h3>精品明细</h3>
        </div>
        <el-table :data="tableData" stripe>
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="image" label="编号" width="60"></el-table-column>
          <el-table-column label="添加图片" width="60" align="center" prop="name">
          <template slot-scope="scope">
            <a class="m-btn" @click="dialogPhotosVisible = true" type="text" size="small">
              <img :src="scope.row.head_pic" width="40" height="40" class="head_pic"/>
            </a>
          </template>
          </el-table-column>
          <el-table-column prop="classi-fication" label="藏品名称" width="80"></el-table-column>
          <el-table-column prop="name" label="年代"  width="60"></el-table-column>
          <el-table-column prop="name" label="藏品分类" width="80"></el-table-column>
          <el-table-column prop="name" label="数量" width="60"></el-table-column>
          <el-table-column prop="texture" label="数量单位" width="60"></el-table-column>
          <el-table-column prop="degree" label="级别" width="60"></el-table-column>
          <el-table-column prop="number" label="质地" width="60"></el-table-column>
          <el-table-column prop="company" label="完残程度"  width="80"></el-table-column>
          <!-- <el-table-column fixed="right" align="center"  label="操作" width="100">
            <template>
              <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">编辑</a>
              <a class="m-btn" @click="dialogLablectVisible = true" type="text" size="small">标签</a>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogEnterlVisible = false">取 消</el-button>
      <el-button type="primary" @click="fromCollection">提 交</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
export default {
  props: {
    callFun: Function
  },
  data () {
    return {
      dialogPlanDatilVisible: false,
      form: {
        name: '',
        region: '',
        type: []
      },
      fileList: [{name: '概念设计文档', url: ''}],
      value1: '',
      form: {
        name: '',
      },
      ruleForm: {
        shape: '',
        content: ''
      },
      tableData: [{
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
    } 
  },
  methods: {
    namDetail () {
      this.dialogPlanDatilVisible = true
    },
    createPlan() {
      this.dialogPlanVisible = true
    },
    handlePreview(file) {
      console.log(file);
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
    
  }
}
</script>

<style lang="scss" scoped>
  .operation h3 {
    margin-bottom: 20px;
  }
  .table {
    margin-top: 30px;
  }
</style>
