import axios from './../utils/axios'
const Axios = new axios({
  // baseURL: 'https://api.***.com', // String 域名 必传参数
  isAntiShake: false,
  timeout: 300000,
  antiShakeTime: 500,
  message: ({message}: any) => {
    // window.$message.error(message)
  }
})

const serveFiles: any = import.meta.globEager('./modules/**/*.api.ts')
const Interface: any = {}
Object.keys(serveFiles).forEach((key) => {
  const urlArr = key.split('/')
  const apiKey=urlArr[urlArr.length-1].split('.')[0]
  Interface[apiKey] = serveFiles[key].default(Axios)
})

export {Interface}

export default {
  install: (Vue: any) => {
    Vue.mixin({
      data () {
        return {
          $api: Interface
        }
      }
    })
  }
}
