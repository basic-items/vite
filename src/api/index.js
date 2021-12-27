
const serveFiles = import.meta.globEager('./modules/**/*.api.js')
const Interface = {}
Object.keys(serveFiles).forEach((key) => {
  console.log('serveFiles[key]', serveFiles[key])
  const urlArr = key.split('/')
  const apiKey=urlArr[urlArr.length-1].split('.')[0]
  Interface[apiKey] = serveFiles[key].default()
})

export {Interface}

export default {
  install: (Vue) => {
    Vue.config.globalProperties.$api = Interface
  }
}
