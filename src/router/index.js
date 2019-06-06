import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@views/layout'

//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
  beforeRouteLeave:function(to, from, next){
    //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
    if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank) {
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions)
          {
            var key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys  = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },
  // beforeRouteUpdate:function(to, from, next){
  //   debugger
  // } 
});

// 不区分用户角色
export const constantRouterMap = [
  { path: '/login', component: () => import('@views/login/index') },
  { path: '/register', component: () => import('@views/login/register') },
  { path: '/test', component: () => import('@views/project/test') },
  { path: '/test2', component: () => import('@views/project/test2') },
  { path: '/test3', component: () => import('@views/project/ckeditor') },
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
        path: '/mysocket',
        name: 'mysocket',
        component: () => import('@/views/project/mySocket'),
        meta: {title: '测试' }
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
        // redirect: '/project/task',
        name: 'projectSub',
        component: () => import('@/views/project/sub-index'),
        meta: {title: '项目二级菜单' },
      },
      {
        path: '/collect/manage',
        name: 'collect',
        component: () => import('@/views/collect/manage'),
        meta: {title: '藏品管理' }
      },
      {
        path: '/collect/approval',
        component: () => import('@/views/collect/approval/index'),
        redirect: '/collect/approval/lanch',
        name: 'collectApproval',
        meta: {title: '审批' },
        children: [
          {
            path: '/collect/approval/lanch',
            name: 'approvalLanch',
            component: () => import('@/views/collect/approval/lanch'),
            meta: { title: '发起审批' },
          },
          {
            path: '/collect/approval/myLanch',
            name: 'approvalMyLanch',
            component: () => import('@/views/collect/approval/myLanch'),
            meta: { title: '我发起的' },
          },
          {
            path: '/collect/approval/wait',
            name: 'approvalMyLanch',
            component: () => import('@/views/collect/approval/wait'),
            meta: { title: '待审批' },
          },
        ]
      },
      {
        path: '/collect/solicitation',
        redirect: '/collect/solicitation/plan',
        component: () => import('@/views/collect/solicitation/index'),
        name: 'collectSolicitation',
        meta: {title: '藏品征集' },
        children: [
          {
            path: '/collect/solicitation/plan',
            name: 'solicitationPlan',
            component: () => import('@/views/collect/solicitation/plan'),
            meta: { title: '征集计划' },
          },
          {
            path: '/collect/solicitation/enter',
            name: 'solicitationEnter',
            component: () => import('@/views/collect/solicitation/enter'),
            meta: { title: '藏品入馆' },
          },
          {
            path: '/collect/solicitation/totalLedger',
            redirect: '',
            name: 'solicitationEnter',
            component: () => import('@/views/collect/solicitation/totalLedger'),
            meta: { title: '藏品总账' },
          },
          {
            path: '/collect/solicitation/typeAccount',
            redirect: '',
            name: 'solicitationEnter',
            component: () => import('@/views/collect/solicitation/typeAccount'),
            meta: { title: '藏品分类账' },
          },
          {
            path: '/collect/solicitation/auxiliaryAccount',
            redirect: '',
            name: 'solicitationEnter',
            component: () => import('@/views/collect/solicitation/auxiliaryAccount'),
            meta: { title: '藏品辅助账' },
          },
          
          {
            path: '/collect/solicitation/enterStore',
            name: 'solicitationEnterStore',
            component: () => import('@/views/collect/solicitation/enterStore'),
            meta: { title: '藏品入库' },
          },
        ]
      },
      {
        path: '/collect/outGoing',
        component: () => import('@/views/collect/outGoing/index'),
        redirect: '/collect/outGoing/outLibrary',
        name: 'collectOutGoing',
        meta: {title: '出库管理' },
        children: [
          {
            path: '/collect/outGoing/outLibrary',
            name: 'collectEnter',
            component: () => import('@/views/collect/outGoing/outLibrary'),
            meta: { title: '出库管理' },
          },
          {
            path: '/collect/outGoing/enterLibrary',
            name: 'collectEnter',
            component: () => import('@/views/collect/outGoing/enterLibrary'),
            meta: { title: '出库管理' },
          }
        ]
      },
      {
        path: '/collect/repair',
        name: 'collectRepair',
        component: () => import('@/views/collect/repair'),
        meta: {title: '藏品修复' }
      },
      {
        path: '/collect/allocation',
        name: 'collectAllocation',
        component: () => import('@/views/collect/allocation'),
        meta: {title: '藏品调拨' }
      },
      {
        path: '/collect/store',
        component: () => import('@/views/collect/store/index'),
        redirect: '/collect/store/basic',
        name: 'collectStore',
        meta: {title: '基本信息' },
        children: [
          {
            path: '/collect/store/basic',
            name: 'storeBasic',
            component: () => import('@/views/collect/store/basic'),
            meta: { title: '征集计划' },
          },
          {
            path: '/collect/store/inventory',
            name: 'storeBasic',
            component: () => import('@/views/collect/store/inventory'),
            meta: { title: '征集计划' },
          },
          {
            path: '/collect/store/temperature',
            name: 'storeBasic',
            component: () => import('@/views/collect/store/temperature'),
            meta: { title: '征集计划' },
          }
        ]
      },
      {
        path: '/digital',
        name: 'digital',
        component: () => import('@/views/digital/index'),
        meta: {title: '数字资产', rank: 1 }
      },
      {
        path: '/approve',
        redirect: '/approve/start',
        name: 'approve',
        component: () => import('@/views/approve/index'),
        meta: {title: '审批' },
        children: [
          {
            path: '/approve/start',
            name: 'approveStart',
            component: () => import('@/views/approve/start'),
            meta: { title: '发起审批' },
          },
          {
            path: '/approve/pending',
            name: 'approvePending',
            component: () => import('@/views/approve/pending'),
            meta: { title: '待我审批的' },
          },
          {
            path: '/approve/done',
            name: 'approveDone',
            component: () => import('@/views/approve/done'),
            meta: { title: '我已审批的' },
          },
          {
            path: '/approve/done',
            name: 'approveDone',
            component: () => import('@/views/approve/done'),
            meta: { title: '我已审批的' },
          },
          {
            path: '/approve/mystart',
            name: 'approveMyStart',
            component: () => import('@/views/approve/mystart'),
            meta: { title: '我发起的' },
          },
          {
            path: '/approve/copy',
            name: 'approveCopy',
            component: () => import('@/views/approve/copy'),
            meta: { title: '抄送我的' },
          },
        ]
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