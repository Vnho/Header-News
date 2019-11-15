import Vue from 'vue'
import VueRouter from 'vue-router'
import layOut from '../views/layout'
import Login from '../views/login'
import Home from '../views/home/index.vue' // 在vue-cli中，@永远在src目录中查找
import Article from '../views/article/index.vue'
import Publish from '../views/publish/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/layout',
    component: layOut,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/publish',
        component: Publish
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

/*
路由拦截器 beforeEach的用法
接受一个函数作为参数
参数1: to 表示去哪里的信息
参数2: from 表示来自哪里的信息
参数3: next 是一个方法,用于路由放行
*/
// 具体要做的就是:判断用户登录状态,有通过,没有不通过

router.beforeEach((to, from, next) => {
  // 判断，如果访问的是登录页，直接放行
  if (to.path === '/login') {
    return next()
  } else {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
