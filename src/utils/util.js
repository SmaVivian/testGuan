import { Message, MessageBox } from 'element-ui';

// 公共方法
export const common = {
  // confirm弹出框
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
  /**
   * parseTime(time, '{y}-{m}-{d}')
   * parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
   */
  parseTime: function(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },
  getStrParam: function(str, name){ 
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
    var r = str.split('?')[1].match(reg);
    if (r!=null) return unescape(r[2]); return null; 
  },
  // 手动打开日期
  openDate: function(ele) {
    document.getElementById(ele || 'openDate').focus()
  }
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