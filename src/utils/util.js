import { Message, MessageBox } from 'element-ui';

// 公共方法
export const common = {
  prompt: function(okCall, cancalCall, title, content, showClose, showCancelButton) {
    MessageBox.prompt(content || '', title || '', {
      showClose: showClose || false,
      showCancelButton: showCancelButton || false,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPlaceholder: '请输入',
      inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: '邮箱格式不正确',
      center: true
    }).then(({ value }) => {
      okCall();
      // this.$message({
      //   type: 'success',
      //   message: '你的邮箱是: ' + value
      // });
    }).catch(() => {
      cancalCall();
      // this.$message({
      //   type: 'info',
      //   message: '取消输入'
      // });       
    });
  },
  confirm: function(okCall, cancalCall, title, content, showClose, showCancelButton) {
    MessageBox.confirm(content || '', title || '', {
      showClose: showClose || false,
      showCancelButton: showCancelButton || false,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      center: true,
      dangerouslyUseHTMLString: true,
      showClose: false
    }).then(() => {
      okCall();
      // this.$message({
      //   type: 'success',
      //   message: '取消成功!'
      // });
      // item.isCollect=false
    }).catch(() => {
      cancalCall();
      // this.$message({
      //   type: 'info',
      //   message: '已取消删除'
      // });
    });
  }
}