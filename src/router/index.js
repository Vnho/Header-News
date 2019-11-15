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
    component: layOut,
    children: [
      {
        path: '',
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

export default router
