import loadable from '@/util/loadable'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'
import hooks from './hooks'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/lesson',
    name: 'lesson',
    component: loadable(() => import('@/views/lesson/index.vue')),//默认白页 加载完毕后再去渲染
    meta: {
      needLogin: true//访问该页面需要登录
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: loadable(() => import('@/views/profile/index.vue')),
  },
  {
    path: '/reg',
    name: 'reg',
    component: loadable(() => import('@/views/reg/index.vue'))
  },
  {
    path: '/login',
    name: 'login',
    component: loadable(() => import('@/views/login/index.vue'))
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
Object.values(hooks).forEach(hook => {//循环添加路由守卫
  router.beforeEach(hook)
})
export default router
