// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@config'
declare module '@layout'
declare module '@assets'



declare module '@const' {
  /**
   * val: 类型
   * key: 映射
   */
  export type AgencyArrayType = { key: number, val: string, mode?: string, color?: string }
  export const publicRule: { required: true, trigger: ['blur', 'input']}
  /** 
   * id: 机构id;
   * name: 机构名称;
   * adminInfo: 管理员信息;
   * areaNum: 区域机构数量;
   * authenticationWay: 认证方式：0=容器认证，1=私有云认证，2=公有云认证;
   * containerWay: 容器认证方式：0=单体认证，1=区域认证;
   * provinceId: 省id;
   * provinceName: 省名称;
   * cityId: 市id;
   * cityName: 市名称;
   * countyId: 区县id;
   * countyName: 区县名称;
   * codeNum: 机构代码;
   * description: 描述;
   * detailedAddress: 详细地址;
   * beginTime: 有效期，开始时间;
   * endTime: 有效期，结束时间;
   */
  export const actuatorInit: {
    id?: number,
    name: string,
    adminInfo: string,
    areaNum: number,
    authenticationWay: number,
    containerWay: number,
    provinceId: null | number,
    provinceName: string,
    cityId: null | number,
    cityName: string,
    countyId: null | number,
    countyName: string,
    codeNum: string,
    description: string,
    detailedAddress: string,
    beginTime: string,
    endTime: string,
  }
  export const timeTypeList: AgencyArrayType[]
  export const verificationMethodList: AgencyArrayType[]
  export const containerList: AgencyArrayType[]
  export const AgencyType: AgencyArrayType[]
  export const AgencyState: AgencyArrayType[]
}

declare module '*.png'
declare module '*.jpg'

declare interface Window {
  /** 子项目实例 */
  licenseApp: any
}

declare interface ImportMeta {
  globEager: any
}
