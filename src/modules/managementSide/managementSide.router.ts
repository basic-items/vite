const children: any = [
  {
    path: "/licenseManagementSide",
    name: "LicenseManagementSide",
    meta: { title: "License管理", weight: 1, show: true, roles: [] },
    component: () =>
      import(/* webpackChunkName: 'managementSide' */ "./index/index.vue")
  }
]

export default children
