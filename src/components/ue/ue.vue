<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>
//主体文件引入
import '../../../public/ueditor1/ueditor.config';
import '../../../public/ueditor1/ueditor.all';
import '../../../public/ueditor1/lang/zh-cn/zh-cn';
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    mounted() {
      const _this = this;
      // 保存原始的 getActionUrl 方法
      if(!UE.Editor.prototype._bkGetActionUrl){
        UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
      }
      // 自定义
      UE.Editor.prototype.getActionUrl = function (action) {
        console.log('action', action)
        if (action == 'uploadimage') {
          // return `http://api.demo.com/upload/img`; // 调整上传图片的接口
          return `/vivi/upload`; // 调整上传图片的接口
        } else if (action == 'uploadVideo') {
          return `http://api.demo.com/upload/video`; // 调整上传视频接口
        } else {
          return this._bkGetActionUrl.call(this, action); // 其他上传使用原始的 getActionUrl 方法
        }
      }

      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        

        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
      console.log("上传这堆错误不用理会，上传接口需自行开发配置");
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      getUEContentTxt() { // 获取纯文本内容方法
        return this.editor.getContentTxt()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
