import { Message, MessageBox } from 'element-ui';

// 公共方法
export const common = {
  confirm: function(params, okCall, cancalCall) {
    MessageBox.confirm(params.content || '', params.title || '', {
      customClass: 'cus-confirm',
      showClose: params.showClose || false,
      showCancelButton: params.showCancelButton || true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      center: true,
      dangerouslyUseHTMLString: true,
      showClose: false
    }).then(() => {
      okCall && okCall();
    }).catch(() => {
      cancalCall && cancalCall();
    });
  },
}

/**
 * @param {校验的字符串} str 
 * @param {校验类型 'phone' 'password'} type 
 * @Auth zhangwei
 * @date 20181029
 */
export const validate = (str, type) => {
  let isMatch = false,
    isNum = /^[0-9]+.?[0-9]*$/,
    isMobile = /^1[3578]\d{9}$|^147\d{8}$/,
    ispass = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;  // 6-20位字符；数字、字母、特殊字符（除空格），起码其中两种组合

  switch(type) {
    case 'phone':
      if(isMobile.test(str)) {
        isMatch = true;
      }
      break;
    case 'password':
      if(ispass.test(str)) {
        isMatch = true;
      }
      break;
    case 'number':
      if(isNum.test(str)) {
        isMatch = true;
      }
    break;
  }

  return isMatch;
}