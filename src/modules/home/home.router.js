const children = [
  {
    path: "/",
    name: "Home",
    meta: { title: "首页", weight: 1, show: true, roles: [] },
    component: () =>
      import(/* webpackChunkName: 'Home' */ "./index/index.vue")
  }
]

export default children
