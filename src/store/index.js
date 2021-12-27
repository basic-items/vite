import { createStore } from 'vuex'
import { state, getters } from './variable'
import { mutations, actions } from './method'
const modulesFiles = import.meta.globEager('./modules/*.js')
const modules = {}
Object.keys(modulesFiles).forEach((key) => {
  const module = modulesFiles[key].default
  const moduleKey = `${key.replace(/(\.\/|\.js)/g, "")}`

  modules[module.name || moduleKey] = module
  modules[module.name || moduleKey]["namespaced"] = true
})

const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules
})

export default store
