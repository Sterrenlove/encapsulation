import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: () => import( '../layout/Home.vue'),
    meta: { title: '后台管理系统' },
    children: [
      {
        path: '/dashboard',
        component: () => import('../views/dashboard'),
        meta: { title: '首页' }
      },
      {
        path: '/table',
        component: () => import('../views/baseTable'),
        meta: { title: '基础表格' }
      },
      {
        // 富文本编辑器组件
        path: '/editor',
        component: () => import('../views/vueEditor'),
        meta: { title: '富文本编辑器' }
      },
      {
        // 图片上传组件
        path: '/upload',
        component: () => import('../components/common/upload'),
        meta: { title: '文件上传' }
      },
      {
        // 拖拽列表组件
        path: '/drag',
        component: () => import('../components/common/dragList'),
        meta: { title: '拖拽列表',permission: true }
      },
      {
        // 拖拽Dialog组件
        path: '/dialog',
        component: () => import('../components/common/dragDialog'),
        meta: { title: '拖拽弹框' }
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
]

const router = new VueRouter({
  routes
})

export default router
