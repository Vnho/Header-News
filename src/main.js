import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui'
import axios from 'axios'
import jsonBigint from 'json-bigint'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import Moment from 'moment'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// axios收到相应数据后会先经过这里
axios.defaults.transformResponse = [function (data, heades) {
  try {
    return jsonBigint.parse(data)
  } catch (err) {
    console.log(err)
    return {}
  }
}]

// axios请求拦截器
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('user-token')
  if (token) {
    console.log('请求拦截器生效', config)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('响应拦截器')
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.use(ElementUI, {
  size: 'small'
})

// 定义全局过滤器
// 任何组件模板都可以直接访问
// 参数1：过滤器名称
// 参数2：函数
// 调用方式：在模板中 {{ 数据 | 过滤器名称 }}
// | 管道符前面的数据会作为参数传递给过滤器
Vue.filter('dataFormat', value => {
  // console.log(value)
  return Moment(value).format('YYYY-MM-DD')
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
