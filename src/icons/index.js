import Vue from 'vue'
import svgIcon from '@cmp/svg-icon' // svg组件

// register globally
Vue.component('svg-icon', svgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
