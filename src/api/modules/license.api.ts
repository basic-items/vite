const urlName = '/genesis-license/license'
export default (Axios: any) => {
  return {
    exportLic (data: any) {
      return new Promise(res => res(true))
    }
  }
}