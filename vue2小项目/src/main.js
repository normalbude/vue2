import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'lib-flexible';//对应设置根字体

import directives from '@/util/directives'
Object.entries(directives).forEach(([id, define]) => {
  Vue.directive(id, define)
})
Vue.config.productionTip = false
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
