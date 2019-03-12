import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@views/layout'
// 不区分用户角色
export const constantRouterMap = [
  { path: '/login', component: () => import('@views/login/index') },
  {
    path: '/',
    name: 'index',
    component: Layout,
    meta: { title: '首页' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@views/home/index'),
        meta: {title: '首页' }
      },
      {
        path: '/project',
        name: 'project',
        component: () => import('@/views/project/index'),
        meta: {title: '项目', rank: 1 }
      },
      // 项目二级页面
      {
        path: '/project/sub',
        name: 'projectSub',
        component: () => import('@/views/project/sub-index'),
        meta: {title: '项目二级菜单', rank: 2 }
      },
      {
        path: '/collect',
        name: 'collect',
        component: () => import('@/views/collect/index'),
        meta: {title: '藏品', rank: 1 }
      },
      {
        path: '/digital',
        name: 'digital',
        component: () => import('@/views/digital/index'),
        meta: {title: '数字资产', rank: 1 }
      },
    ]
  },
]

// 区分用户角色
export const asyncRouterMap = [
  {

  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})