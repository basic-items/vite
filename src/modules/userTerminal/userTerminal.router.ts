const children: any = [
  {
    path: "/",
    name: "LicenseUserTerminal",
    meta: { title: "License", weight: 1, show: true, roles: [] },
    component: () =>
      import(/* webpackChunkName: 'userTerminal' */ "./index/index.vue")
  }
]

export default children
