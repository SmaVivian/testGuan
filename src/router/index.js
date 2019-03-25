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
        path: '/collect/manage',
        name: 'collect',
        component: () => import('@/views/collect/manage'),
        meta: {title: '藏品管理' }
      },
      {
        path: '/collect/approval',
        name: 'collectapproval',
        component: () => import('@/views/collect/approval'),
        meta: {title: '审批' }
      },
      {
        path: '/collect/solicitation',
        name: 'collesolicitation',
        component: () => import('@/views/collect/solicitation'),
        meta: {title: '藏品征集' }
      },
      {
        path: '/collect/outGoing',
        name: 'collesolioutGoing',
        component: () => import('@/views/collect/outGoing'),
        meta: {title: '出库管理' }
      },
     






      // {
      //   path: '/collect',
      //   name: 'collect',
      //   component: () => import('@/views/collect/manage'),
      //   meta: {title: '藏品', rank: 1 },
      //   children: [
      //     { path: 'manage', component: '@/views/collect/manage/sidebar' },
      //   ]
      // },
     





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