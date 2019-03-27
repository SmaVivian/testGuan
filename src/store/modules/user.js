import Cookies from 'js-cookie'

const user = {
  state: {
    token: '',
    userid: '',
    userName: '',
    headImg: '',
    phone: '',
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      if(userInfo) {
        state.token = userInfo.token
        state.userid = userInfo.userid
        state.userName = userInfo.userName
        state.headImg = userInfo.headImg
        state.phone = userInfo.phone
      } else {
        state.token = ''
        state.userid = ''
        state.userName = ''
        state.headImg = ''
        state.phone = ''
      }
    },
    SET_USER_PHONE(state, val) {
      state.phone = val
    }
  },
  actions: {
    setUserIfo({ commit }, info) {
      commit('SET_USER_INFO', info)
    },
    // 用户名登录
    LoginUser({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        this._vm.$http.post("/postLogin.do", userInfo).then((res)=>{
          if(res.data.success==1) {
            let data = res.data
            commit('SET_USER_PHONE', data.phone)
            commit('SET_USER_INFO', {
              token: data.token,
              userid: data.id,
              userName: data.userName,
              headImg: data.avatarLink,
              phone: data.phone
            })
            Cookies.set('token', data.token, { expires: 7 })
            Cookies.set('userid', data.id, { expires: 7 })
            Cookies.set('userName', data.userName, { expires: 7 })
            Cookies.set('headImg', data.avatarLink, { expires: 7 })
            Cookies.set('phone', data.phone, { expires: 7 })
            resolve()
          }else{
            this._vm.$message.error(res.data.error.message)
            reject()
          }
        }, error => {
          this._vm.$message.error('服务器异常')
        })
      })
    },
    LoginOut({ commit }) {
      commit('SET_USER_INFO', '')
      Cookies.remove('userid')
    }
  }
}

export default user
