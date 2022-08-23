import Axios from "axios";
const { error } = console;
// import { Loading } from 'element-ui'
/**
 *
 * @param { baseURL: 'https://api.***.com' } String 域名 必传参数
 * @param { url: '/getUserInfo' } String 请求路径 必传参数
 * @param { withCredentials: true | false } Boolean 是否允许携带凭证 可选参数 默认true
 * @param { method: 'get' | 'post' | 'put' | 'delete' | ... } String 请求方式 可选参数 默认get
 * @param { timeout: 3000 } Number 请求超时 单位毫秒 可选参数 默认3秒
 * @param { headers: {} } Json header体 可选参数 默认为空
 * @param { data: {} } Json|Number|String|Array body体 可选参数 默认为空
 * @param { params: {} } Json URL参数 可选参数 默认为空
 * @param { reqFn: (config) => {} } 函数 请求前拦截 参数config
 * @param { resFn: (response) => {} } 函数 响应后拦截 参数response
 * @param { res: (res) => {} } 函数 请求成功处理 回传参数res
 * @param { rej: (err) => {} } 函数 请求失败处理 回传参数err
 * @param { await: [{ method: 请求方式, url: 请求路径 }] } Array 需要同步的接口 方式为可选参数，路径为必传参数
 **/
class NewAxios {
  config: any;
  lineUp: any;
  errTimeout: any;
  instance: any;
  errorArr: Array<any>;
  antiShake: any;
  loadingSwitch: number;
  Loading: any;
  requestCount: number;
  constructor(parameter: any) {
    this.config = {
      method: "get", // 请求方式
      timeout: 1000 * 60 * 5, // 请求时长
      antiShakeTime: 300, // 防抖时间
      isAntiShake: 1, // 是否防抖
      url: "", // 接口路由
      baseURL: "", // 基础请求地址
      prompt: true, // 是否打开报错提示（需要与message配合）
      withCredentials: false, // 是否允许携带凭证
      headers: {}, // header参数
      data: {}, // body体参数
      params: {}, // url参数
      message: null, // 错误处理（需打开prompt）
      reqFn: null, // 请求前拦截
      resFn: null, // 请求后拦截
      await: null, // 需等待的接口
      cancelToken:null, //取消请求
    };
    this.lineUp = {
      switch: false,
      timeout: null,
      await: [],
      first: [],
      after: [],
    };
    this.errTimeout = null;
    this.instance = null;
    this.errorArr = [];
    this.antiShake = {};
    this.loadingSwitch = 0;
    this.requestCount = 0;
    this.Loading = null;
    Object.assign(this.config, parameter);
    if (this.config.await && this.config.await.length) {
      this.config.switch = true;
      this.config.await.forEach((item: any) => {
        const val = JSON.stringify(item);
        this.lineUp.await.push(val);
      });
    }

    this.interceptors();
  }

  async reset(options: any) {
    options && Object.assign(this.config, options);
  }

  async interceptors() {
    // 请求拦截
    return new Promise((res) => {
      this.instance = Axios.create({});
      this.instance.interceptors.request.use(
        (config: any) => {
          this.config.reqFn && this.config.reqFn(config);
          config.headers.authorization = localStorage.getItem("authorization");
          config.headers['projectId'] = localStorage.getItem("projectName");
          config.headers.language = localStorage.getItem("language");
          if (config.headers.bolb) {
            config.responseType = "blob";
          }
          return config;
        },
        (err: any) => Promise.reject(err)
      );

      this.instance.interceptors.response.use(
        (response: any) => {
          this.config.resFn && this.config.resFn(response);
          return response;
        },
        (err: any) => {
          if (
            err.message.includes("timeout") ||
            err.message.includes("Network Error")
          ) {
            error(`网络异常，请重新尝试`);
            this.config.message &&
              this.config.message({
                showClose: true,
                message: `网络异常，请重新尝试`,
                type: "error",
              });
          }
          Promise.reject(err);
          return err;
        }
      );
      res(true);
    });
  }

  errorHandling() {
    this.errorArr.forEach((item) => {
      if (item.type) {
        item.type = 0;
        this.config.message &&
          this.config.message({
            showClose: true,
            message: item.val,
            type: "error",
          });
      }
    });
    this.errorArr.length = 0;
  }

  getError(data: any, prompt: boolean) {
    const { code, msg } = data || {};
    if (![2000, 200, 0].includes(+code) && prompt) {
      const val = msg || "接口错误";
      if (this.errorArr.length) {
        const isExists = this.errorArr.every((item) => item.val === msg);
        !isExists &&
          this.errorArr.push({
            type: 1,
            val,
          });
      } else {
        this.errorArr.push({
          type: 1,
          val,
        });
      }
    }
  }

  clearAntiShake(tag: string) {
    +this.config.isAntiShake === 1 &&
      setTimeout(() => {
        delete this.antiShake[tag];
      }, this.config.antiShakeTime || this.config.timeout);
  }

  parade(obj: any) {
    const { method, url } = obj;
    const tag = JSON.stringify({ method, url });
    if (this.lineUp.await.includes(url) || this.lineUp.await.includes(tag)) {
      this.lineUp.first.push(this.Request(obj));
    } else {
      this.lineUp.after.push(obj);
    }
    clearTimeout(this.lineUp.timeout);
    this.lineUp.timeout = setTimeout(() => {
      Promise.all(this.lineUp.first)
        .then(() => {
          this.lineUp.after.forEach((params: any) => {
            this.Request(params);
          });
          this.lineUp.first.length = 0;
          this.lineUp.after.length = 0;
        })
        .catch(() => {
          this.lineUp.first.length = 0;
          this.lineUp.after.length = 0;
        });
      this.config.switch = false;
    }, 500);
  }

  Request(obj: any) {
    obj = obj || {};
    const {
      url = this.config.url,
      method = this.config.method,
      timeout = this.config.timeout,
      baseURL = this.config.baseURL,
      prompt = this.config.prompt,
      withCredentials = this.config.withCredentials,
      headers = this.config.headers,
      isAntiShake = this.config.isAntiShake,
      data = this.config.data,
      params = this.config.params,
      noErr = false,
      cancelToken = this.config.cancelToken,
    } = obj;
    const tag: string = JSON.stringify(obj);
    if (+isAntiShake === 1) {
      if (this.antiShake[tag]) {
        return Promise.reject({
          showClose: true,
          code: 3003,
          msg: `重复请求: ${method} ${url}`,
          params: obj,
          type: "error",
        });
      }
      this.antiShake[tag] = true;
    }
    this.requestCount++
    return new Promise((resolve, reject) => {
      if (!this.loadingSwitch) {
        // this.Loading = Loading.service({
        //   lock: true,
        //   text: '...数据加载中',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(225, 225, 225, 0.3)'
        // })
      }
      this.loadingSwitch++;
      this.instance({
        baseURL: baseURL,
        withCredentials: withCredentials,
        method: method,
        url: url,
        timeout: timeout,
        headers: headers, // header体
        data: data, // body参数
        params: params, //  URL参数
        cancelToken:cancelToken,
      })
        .then((resData: any) => {
          if (
            resData.request &&
            resData.request.response &&
            typeof resData.request.response === "string"
          ) {
            let re = JSON.parse(resData.request.response);
            if (re.code === 500) {
              reject(re);
            }
          }
          this.loadingSwitch--;
          if (!this.loadingSwitch) {
            // this.Loading.close()
          }
          const { status } = resData.response || {};
          const { code } = resData.data;
          const privilegeKeys = [401, 403];
          if (
            privilegeKeys.includes(+status) ||
            privilegeKeys.includes(+code)
          ) {
            const { pathname, origin } = location;
            localStorage.clear();
            !pathname.includes("/login") &&
              window.location.replace(`${origin}/login`);
          }
          this.clearAntiShake(tag);
          if (noErr && resData.status !== 500) {
            resolve({
              res: resData.data,
              disposition: resData.headers["content-disposition"],
            });
            return;
          }
          if (
            [2000, 200, 0].includes(+code)
          ) {
            resolve({ ...resData.headers, ...resData.data });
          } else {
            this.getError(resData.data, prompt);
            reject(resData.data);
          }
          this.requestCount--
          if (!this.requestCount) {
            this.errorHandling();
          }
        })
        .catch((err: any) => {
          this.loadingSwitch--;
          this.requestCount--;
          if (!this.requestCount) {
            this.errorHandling();
          }
          this.clearAntiShake(tag);
          reject(err);
          return err;
        });
    });
  }

  GetByUrl(
    url: string,
    params: any,
    baseURL: string,
    prompt: boolean,
    timeout: number
  ) {
    return this.Request({
      method: "get", // 请求方式
      url, // 请求路径
      timeout, // 请求超时
      prompt,
      baseURL,
      params, //  URL参数
    });
  }

  PostByUrl(
    url: string,
    data: any,
    baseURL: string,
    prompt: boolean,
    timeout: number
  ) {
    data = JSON.stringify(data);
    data = data.replace(/}|{|"/g, "");
    data = data.replace(/:/g, "=");
    data = data.replace(/,/g, "&");
    data = data.replace(/null/g, "");
    return this.Request({
      method: "post", // 请求方式
      url, // 请求路径
      timeout, // 请求超时
      prompt,
      baseURL,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      }, // header体
      data, //  URL参数
    });
  }

  GetByBody(
    url: string,
    data: any,
    baseURL: string,
    prompt: boolean,
    timeout: number
  ) {
    return this.Request({
      method: "get", // 请求方式
      url, // 请求路径
      timeout, // 请求超时
      prompt,
      baseURL,
      headers: {
        "content-type": "application/json",
      }, // header体
      data, // body参数
    });
  }

  PostByBody(
    url: string,
    data: any,
    baseURL: string,
    prompt: boolean,
    timeout: number,
    isAntiShake: boolean | string
  ) {
    return this.Request({
      method: "post", // 请求方式
      url, // 请求路径
      timeout, // 请求超时
      prompt,
      baseURL,
      isAntiShake,
      headers: {
        "content-type": "application/json",
      }, // header体
      data, // body参数
    });
  }

  PostFormDate(
    url: string,
    data: any,
    baseURL: string,
    prompt: boolean,
    timeout: number
  ) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] || data[key] === "" || data[key] === 0) {
        if ({}.toString.call(data[key]) === "[object Array]") {
          data[key].forEach((item: any) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    return this.Request({
      method: "post",
      url,
      timeout, // 请求超时
      prompt,
      baseURL,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
  }

  PostExport(
    url: string,
    data: any,
    baseURL: string,
    prompt: boolean,
    timeout: number
  ) {
    return this.Request({
      method: "post", // 请求方式
      url, // 请求路径
      timeout, // 请求超时
      prompt,
      baseURL,
      noErr: true,
      headers: {
        "content-type": "application/json;charset=utf-8",
        bolb: true,
      }, // header体
      data, // body参数
    }).then(({ res, disposition }: any) => {
      let name = disposition.split('"')[1];
      if (name) {
        name = decodeURI(name)
      }
      
      const blob = new Blob([res], {
        type: "application/vnd.ms-excel;charset=utf-8",
      });

      if ("download" in document.createElement("a")) {
        const eLink = document.createElement("a");
        eLink.download = name || `${new Date().valueOf()}.xls`;
        eLink.style.display = "none";
        eLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eLink);
        eLink.click();
        URL.revokeObjectURL(eLink.href);
        document.body.removeChild(eLink);
      }
      return res;
    });
  }
}

export default NewAxios;
