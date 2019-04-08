<template>
<!-- 上传文件类型 -->
<!-- accept="image/*" -->
<!-- accept="video/*" -->
<!-- accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png" -->
<!-- accept=".doc,.txt,.pdf,.xls,.docx,.xlsx" -->
<!-- accept="video/mp4, video/ogg, video/flv,video/avi,video/wmv,video/rmvb" -->
  <div class="cmp-upload g-inline-block">
    <el-upload
      class="avatar-uploader g-inline-block"
      action=""
      :accept="accept"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload">
      <a class="m-btn">
        <svg-icon icon-class="upload" class="g-icon-upload" v-if="hasIcon" />
        上传
      </a>
    </el-upload>
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
    callFun: Function
  },
  data() {
    return {

    }
  },
  methods: {
    // 上传
    beforeAvatarUpload(file) {
      // if(this.accept.split(',').indexOf(file.type) === -1) {
      //   this.$message.warning('请上传正确的视频格式');
      // }
      console.log('类型', file.type)

      let fd = new FormData()
      fd.append('file', file)
      fd.append('projectName', 'post_pub_user')

      this.$http.post('/upload', fd)
      .then((res) => {
        if(res.success) {
          this.$message.success('上传成功')
          this.callFun && this.callFun()
          // this.form1.imageUrl = res.data.data.errorPath
          // this.imgId = res.data.data.id
        } else {
          // this.$message.error(res.data.msg)
        }
      })
      return true
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

