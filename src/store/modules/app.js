const app = {
  state: {
    headerShow: true,
  },
  mutations: {
    TOGGLE_HEADER: (state, isShow) => {
      state.headerShow = isShow
    },
  },
  actions: {
    ToggleHeader({ commit }, isShow) {
      commit('TOGGLE_HEADER', isShow)
    },
  }
}

export default app