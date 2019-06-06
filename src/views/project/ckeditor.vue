<template>
  <div>
    <textarea id="editor" cols="10" name="editor" rows="10" data-sample-short="" contenteditable="true"></textarea>
  </div>
</template>

<script>
import CKEDITOR from 'CKEDITOR'
export default {
  data() {
    return {
      content: '1233'
    }
  },
  methods: {
    // https://ckeditor.com/docs/ckeditor4/latest/examples/image2.html   文档
    initEditor() {
      // CKEDITOR.replace('editor', {
      //   language: 'zh-CN',//改成中文版
      //   extraPlugins: 'image2,uploadimage',
      //   // extraPlugins: 'easyimage',
      //   // removePlugins: 'image',
      //   // removeDialogTabs: 'link:advanced',
      //   toolbar: [{
      //       name: 'clipboard',
      //       items: ['Undo', 'Redo']
      //     },
      //     {
      //       name: 'styles',
      //       items: ['Styles', 'Format']
      //     },
      //     {
      //       name: 'basicstyles',
      //       items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
      //     },
      //     {
      //       name: 'paragraph',
      //       items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
      //     },
      //     {
      //       name: 'links',
      //       items: ['Link', 'Unlink']
      //     },
      //     {
      //       name: 'insert',
      //       items: ['Image', 'Table']
      //     },
      //     {
      //       name: 'tools',
      //       items: ['Maximize']
      //     },
      //     {
      //       name: 'editing',
      //       items: ['Scayt']
      //     }
      //   ],
      //   imageUploadUrl : 'https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
      //    // filebrowserBrowseUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      //   // filebrowserImageBrowseUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      //   // filebrowserUploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
      //   filebrowserImageUploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',
      //   format_tags: 'p;h1;h2;h3;pre',
      //   removeDialogTabs: 'image:advanced;link:advanced',
      // })
      CKEDITOR.replace('editor', {
        language: 'zh-CN',//改成中文版
        extraPlugins: 'image2,uploadimage',
        // extraPlugins: 'easyimage',
        // removePlugins: 'image',
        // removeDialogTabs: 'link:advanced',
        toolbar: [{
            name: 'clipboard',
            items: ['Undo', 'Redo']
          },
          {
            name: 'styles',
            items: ['Styles', 'Format']
          },
          {
            name: 'basicstyles',
            items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
          },
          {
            name: 'paragraph',
            items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']
          },
          {
            name: 'links',
            items: ['Link', 'Unlink']
          },
          {
            name: 'insert',
            items: ['Image', 'Table']
          },
          {
            name: 'tools',
            items: ['Maximize']
          },
          {
            name: 'editing',
            items: ['Scayt']
          }
        ],
        imageUploadUrl : 'https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
        // filebrowserBrowseUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
        // filebrowserImageBrowseUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
        // filebrowserUploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files',
        filebrowserImageUploadUrl: 'https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images',
        // imageUploadUrl : '/action/article/editor_upload',
        // Reduce the list of block elements listed in the Format drop-down to the most commonly used.
        format_tags: 'p;h1;h2;h3;pre',
        // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
        removeDialogTabs: 'image:advanced;link:advanced',
      })

      //  CKEditor 初始化完成加载数据
      CKEDITOR.on('instanceReady', e => {
        this.setContent()
      })

      //  CKEditor 数据改变-监听
      CKEDITOR.instances.editor.on('change', e => {
        this.getContent()
      })
    },
    setContent () {
      CKEDITOR.instances.editor.setData(this.content)
    },
    getContent () {
        // 参照vue子组件传值给
      this.$emit('catchData', CKEDITOR.instances.editor.getData())
    }
  },
  mounted() {
    this.initEditor()
  },  
}
</script>

<style lang="scss" scoped>

</style>


