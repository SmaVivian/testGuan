<template>
  <div>
    <p>sksjdflksjfd</p>
    <!-- 加载编辑器的容器 -->
    <script id="container" name="content" type="text/plain">
      这里写你的初始化内容
    </script>
  </div>
</template>

<script>
import '../../../public/ueditor1/ueditor.config';
import '../../../public/ueditor1/ueditor.all';
import '../../../public/ueditor1/lang/zh-cn/zh-cn';
export default {
  components: {

  },
  data() {
    return {
      ue: ''
    }
  },
  methods: {
    
  },
  mounted() {
    console.log(UE)
    var ue = UE.getEditor('container');
    // this.ue = UE.getEditor('container',{
    //   BaseUrl: '',
    //   UEDITOR_HOME_URL: 'public/ueditor1/',
    //   toolbars: [
    //     ['fullscreen', 'source', 'undo', 'redo'],
    //     ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
    //   ]
    // })
  },
}
</script>

<style lang="scss" scoped>

</style>




