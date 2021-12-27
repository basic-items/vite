const routerFiles = import.meta.globEager('./../modules/**/*.router.js')
let routes = []
Object.keys(routerFiles).forEach((key) => {
  const routerArr = routerFiles[key].default
  routes = routes.concat(routerArr)
})

export default routes
