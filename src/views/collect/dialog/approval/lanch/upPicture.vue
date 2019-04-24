<template>

  <!-- 点击图片上传图片 -->
    <el-dialog class="up-picture" title="上传藏品照片" :visible.sync="dialogPhotosVisible" width="470px">
        <h3 class="collectLable mb-20">上传照片</h3>
        <div class="main-content clearfix">

          <div class="main">
            <img :src="fileMain" style="height: 100px; width: 100px; display: inline-block;">
            <el-upload
              class="avatar-uploader g-inline-block"
              action="/attach/uploadEditPic"
              :show-file-list="false"
              :on-success="onloadOk"
              multiple
              :before-upload="mainPicture"
              list-type="picture">
              <a class="m-btn">上传</a>
            </el-upload>
            <h3 class="view">主视图</h3>
          </div>
          
          <div class="main">
            <img :src="fileSide" style="height: 100px; width: 100px; display: inline-block;">
            <el-upload
              class="avatar-uploader g-inline-block"
              action=""
              :show-file-list="false"
              multiple
              :before-upload="sidePicture">
              <a class="m-btn">上传</a>
            </el-upload>
            <h3 class="view">侧视图</h3>
          </div>

          <div class="main">
            <img :src="fileTop" style="height: 100px; width: 100px; display: inline-block;">
            <el-upload
              class="avatar-uploader g-inline-block"
              action=""
              :show-file-list="false"
              multiple
              :before-upload="topPicture">
              <a class="m-btn">上传</a>
            </el-upload>
            <h3 class="view">俯视图</h3>
          </div>

        </div>
       <h3 class="condition">( 最少上传一种类型的图片 )</h3>   
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPhotosVisible = false">取 消</el-button>
        <el-button @click="confirm" type="primary">确 定</el-button>
      </div>
    </el-dialog>

</template>

<script>
export default {
  data () {
    return {
      absolutePath:'',
      fileMain: '',
      fileSide: '',
      fileTop: '',
      fileMainId:'',
      fileSideId:'',
      fileTopId:'',
      pics:'',
      fileList: '',
      dialogPhotosVisible: false,
      parentIndex: '123'  // 父组件列表index
    }
  },
  props: {
    callFun: {
      type: Function
    }
  },
  methods: {
    confirm(){
      if(this.fileMain != ''){
          this.absolutePath = this.fileMain
          this.pics = this.fileMainId
      }
      if(this.fileSide != ''){
        if(this.absolutePath == ''){
          this.absolutePath = this.fileSide
          this.pics = this.fileSideId
        }else{
          this.pics = this.pics+','+this.fileSideId
        }
      }
      if(this.fileTop != ''){
        if(this.absolutePath == ''){
          this.absolutePath = this.fileTop
          this.pics = this.fileTopId
        }else{
          this.pics = this.pics+','+this.fileTopId
        }
      }

      this.dialogPhotosVisible = false
      this.callFun && this.callFun(this.parentIndex, this.absolutePath,this.pics)
    },
    onloadOk(res){
      console.log(res)
    },
    // 接受父组件时间弹出弹框
    upPicture (index) {
      this.dialogPhotosVisible = true
      this.parentIndex = index
    },
    // 主视图
    mainPicture(file) {
      let fd = new FormData()
      fd.append('file', file)
      fd.append('projectName', 'bsScheme')  // 所属业务名
      this.$http.post('/attach/uploadEditPic', fd)
      .then((res) => {
        console.log(res)
        this.fileMain = res.result.absolutePath
        this.fileMainId = res.result.id
        // console.log(this.fileList)
        if(res.success) {
          this.$message.success('上传成功')
        } 
      })
      return true
    },

    // 侧视图
    sidePicture(file) {
      let fd = new FormData()
      fd.append('file', file)
      fd.append('projectName', 'bsScheme')  // 所属业务名
      this.$http.post('/attach/uploadEditPic', fd)
      .then((res) => {
        console.log(res)
        this.fileSide = res.result.absolutePath
        this.fileSideId = res.result.id
        console.log(this.fileList)
        if(res.success) {
          this.$message.success('上传成功')
        } 
      })
      return true
    },

    // 俯视图
    topPicture(file) {
      let fd = new FormData()
      fd.append('file', file)
      fd.append('projectName', 'bsScheme')  // 所属业务名
      this.$http.post('/attach/uploadEditPic', fd)
      .then((res) => {
        console.log(res)
        this.fileTop = res.result.absolutePath
        this.fileTopId = res.result.id
        console.log(this.fileList)
        if(res.success) {
          this.$message.success('上传成功')  
        } 
      })
      return true
    },

  },
}
</script>

<style lang="scss" scoped>
// .m-btn {
//   margin-left: 30px!important;
// }
</style>
