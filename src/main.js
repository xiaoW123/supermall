import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(toast) //安装自己封装的插件，本质上调用该插件的 install方法
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})

//解决移动端3000ms的延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
