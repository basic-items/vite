import { createApp } from 'vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import { createRouter, createWebHistory } from 'vue-router'
import { routes, beforeEach, afterEach } from "./router"
import Module from './plugins/module'
import API from './api'
import App from './App.vue'

import './assets/stylus/Init.styl'
import './assets/stylus/variables.styl'
import './assets/iconfont/iconfont.css'

const { __POWERED_BY_QIANKUN__ } = qiankunWindow
let router = null
let history: any = null

function render(props: any = {}) {
  const { container, name } = props
  const historyAddress = __POWERED_BY_QIANKUN__
    ? name
    : '/'
  history = createWebHistory(historyAddress);
  router = createRouter({
    history,
    routes
  })
  router.beforeEach((to: any, from: any, next: any) => {
    beforeEach(to, from, next)
  })
  router.afterEach(() => {
    afterEach()
  })

  window.licenseApp = createApp(App);
  window.licenseApp.use(API)
  window.licenseApp.use(router)
  window.licenseApp.use(Module)
  window.licenseApp.mount(container
    ? container.querySelector('#license_app')
    :document.getElementById('license_app'))
}

renderWithQiankun({
  mount(props: any) {
    render(props)
  },
  update(props: any) {
    console.log('update', props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount(props: any) {
    history.destroy()
    if (window.licenseApp) {
      window.licenseApp.unmount()
    }
    router = null
    window.licenseApp = null
  },
})

if (!__POWERED_BY_QIANKUN__) {
  render()
}
