<template>
<!-- 上传文件类型 -->
<!-- accept="image/*" -->
<!-- accept="video/*" -->
<!-- accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png" -->
<!-- accept=".doc,.txt,.pdf,.xls,.docx,.xlsx" -->
<!-- accept="video/mp4, video/ogg, video/flv,video/avi,video/wmv,video/rmvb" -->
  <div class="cmp-upload g-inline-block">
    <ul class="file-list" v-if="showName">
      <li v-for="(item, index) in fileList" :key="index">
        <span @click="download(item)">
          <svg-icon :icon-class="'file-'+item.fileType" class="g-icon-upload" />
          {{item.realFileName}}
        </span>
        <i class="el-icon-close" @click="dele(item, index)"></i>
      </li>
    </ul>
    <el-upload
      class="avatar-uploader g-inline-block"
      action=""
      :accept="accept"
      :show-file-list="false"
      multiple
      :before-upload="beforeAvatarUpload">
      <a class="m-btn">
        <svg-icon icon-class="upload" class="g-icon-upload" v-if="hasIcon" />
        上传
      </a>
    </el-upload>
    <span class="m-tit ml-10" v-if="showTip">支持扩展名：.rar .zip .doc .docx .pdf .jpg</span>
  </div>
</template>

<script>
export default {
  props: {
    accept: {
      type: String,
      default: ''
    },
    hasIcon: {
      type: Boolean,
      default: true
    },
    // 初始化文件列表
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    // 显示文件列表
    showName: {
      type: Boolean,
      default: false
    },
    // 显示扩展名说明
    showTip: {
      type: Boolean,
      default: false
    },
    callFun: Function
  },
  data() {
    return {
      // fileList: []
    }
  },
  methods: {
    // 上传
    beforeAvatarUpload(file) {
      var isLt2M = file.size / 1024 / 1024 < 500;
      if (!isLt2M) {
          this.$message({message: '上传文件大小不能超过 500MB!', type: 'warning' })
          // self.$refs.upload.uploadFiles = []; 
          return;
      }
      // if(this.accept.split(',').indexOf(file.type) === -1) {
      //   this.$message.warning('请上传正确的视频格式');
      // }
      console.log('file', file)
      console.log('类型', file.type)

      let fd = new FormData()
      fd.append('file', file)
      fd.append('tableName', 'bsScheme')  // 所属业务名
      fd.append('tableId', '') // 所属业务ID

      this.$http.post('/attach/upload', fd)
      .then((res) => {
        if(res.success) {
          this.$message.success('上传成功')
          this.fileList.push(res.result)
          this.sentCallback(this.fileList)
        } else {
          this.$message.error(res.message)
        }
      })
      return true
    },
    // 下载
    download(item) {
      location.href = '/singleMuseum/attach/downloadFile?attachmentId=' + item.id
    },
    // 删除附件
    dele(item, index) {
      console.log(item.id)
      this.$http.get('/attach/deleteAttachment', {
        id: item.id
      }).then((res) => {
        if(res.success) {
          this.$message.success('删除成功')
          this.fileList.splice(index, 1)
          this.sentCallback(this.fileList)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 回调
    sentCallback(fileList) {
      let arr = []
      fileList.forEach((item, index) => {
        arr.push(item.id)
      })
      this.callFun && this.callFun(arr.join(','))
    }
  }
}
</script>


<style lang="scss" scoped>
.file-list {
  li {
    line-height: 30px;
    font-size: 14px;
    color: $color5;
    cursor: pointer;
  }
}
</style>

