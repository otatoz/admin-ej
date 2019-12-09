import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/customer',
    children: [{
      path: 'customer',
      name: '顾客管理',
      component: () => import('@/views/customer/index'),
      meta: { title: '顾客管理', icon: 'dashboard' }
    }]
  },

  {
    path: '/product',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '产品管理',
        component: () => import('@/views/product/index'),
        meta: { title: '产品管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '订单管理',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
