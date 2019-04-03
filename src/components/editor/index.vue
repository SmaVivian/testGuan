<template>
  <div class="cmp-editor">
    <div ref="editor" style="text-align:left;height:200px;"></div>
    <button v-on:click="getContent" style="position:absolute;z-index:99999;">查看内容</button>
  </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    name: 'editor',
    data () {
      return {
        editorContent: ''
      }
    },
    methods: {
      getContent: function () {
        alert(this.editorContent)
      }
    },
    mounted() {
      let editor = new E(this.$refs.editor)
      // editor.customConfig.uploadImgShowBase64 = true
      editor.customConfig.uploadImgServer = '/vivi/upload/wangEditor'
      editor.customConfig.pasteTextHandle = function (content) {
        console.log(content)
        return content
      }

      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
    }
  }
</script>

<style lang="scss" scoped>
.cmp-editor {
  /deep/ .w-e-toolbar {
    .w-e-menu:nth-last-child(1),
    .w-e-menu:nth-last-child(2),
    .w-e-menu:nth-last-child(3),
    .w-e-menu:nth-last-child(4), {
      display: none;
    }
  }
  /deep/ .w-e-text-container {
    height: 180px !important;
  }
}
</style>
