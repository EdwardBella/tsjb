// import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import moment from 'moment'
import '@/assets/iconfont/iconfont.css' // icon
import 'element-ui/lib/theme-chalk/index.css'
import 'css/common/reset.css'
import "css/common/default-style.less";
import 'css/common/element-reset.less'
import 'css/common/classes.less'
import 'css/common/myStyle.css'
import * as directive from './utils/directives'
import warp from '@/components/warp'
import modal from './utils/modal'

import './permission' // permission control

import './utils/directive' //引入全局拖拽


// 分页组件
import Pagination from "@/components/Pagination/index.vue"

Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

Vue.prototype.$modal = modal


ElementUI.Dialog.props.closeOnClickModal.default = false

Vue.use(ElementUI, {
  // size: "small",
  zIndex: 3000
})

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.directive("permission", directive.permission);

Vue.component('warp', warp)
Vue.component('Pagination', Pagination)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
