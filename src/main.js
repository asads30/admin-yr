import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'
import ruLang from 'element-ui/lib/locale/lang/ru-RU'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import './icons'
import './permission'
import './utils/error-log'

import * as filters from './filters'

import AxiosPlugin from 'vue-axios-cors'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  locale: ruLang
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(AxiosPlugin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
