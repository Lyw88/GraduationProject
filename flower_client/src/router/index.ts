import { useUserStore } from './../stores/modules/user'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/register',
      component: () => import('@/views/login/register.vue'),
      meta: { title: '注册' }
    },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/sort',
          component: () => import('@/views/sort/index.vue'),
          meta: { title: '分类' }
        },
        {
          path: '/user',
          component: () => import('@/views/user/index.vue'),
          meta: { title: '我的' }
        },
        {
          path: '/shopcar',
          component: () => import('@/views/shopcar/index.vue'),
          meta: { title: '购物车' }
        }
      ]
    },
    {
      path: '/user/address',
      component: () => import('@/views/user/addressPage.vue'),
      meta: { title: '地址' }
    },
    {
      path: '/product',
      component: () => import('@/views/product/index.vue'),
      meta: { title: '商品浏览' }
    },
    {
      path: '/items',
      component: () => import('@/views/product/items.vue'),
      meta: { title: '商品详情' }
    },
    {
      path: '/order',
      component: () => import('@/views/order/index.vue'),
      meta: { title: '订单详情' }
    },
    {
      path: '/allorder',
      component: () => import('@/views/order/AllOrder.vue'),
      meta: { title: '订单' }
    }
  ]
})

//访问权限设置
router.beforeEach((to) => {
  NProgress.start()
  const store = useUserStore()
  const whitelist = ['/login', '/register']
  if (!store.user?.token && !whitelist.includes(to.path)) {
    router.push('/login')
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title || ''}`
  NProgress.done()
})

NProgress.configure({
  showSpinner: false
})

export default router
