import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/css/tailwind.css'
import { DynamicScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.config.productionTip = false

Vue.component('DynamicScroller', DynamicScroller)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
