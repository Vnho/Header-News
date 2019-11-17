import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui'
import axios from 'axios'
// import jsonBigint from 'json-bigint'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// axios收到相应数据后会先经过这里
// axios.defaults.transformResponse = [function (data, heades) {
//   try {
//     return jsonBigint.parse(data)
//   } catch (err) {
//     console.log(err)
//     return {}
//   }
// }]

Vue.prototype.$axios = axios // 将axios共享给所有的实例使用
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
