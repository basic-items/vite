const children = [
  {
    path: "/webRtc",
    name: "WebRtc",
    meta: { title: "端对端", weight: 1, show: true, roles: [] },
    component: () =>
      import(/* webpackChunkName: 'Home' */ "./index/index.vue")
  }
]

export default children
