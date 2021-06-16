import Axios from 'axios';

export function request(config) {
  const instance = Axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5', //数据接口
    timeout: 5000  //请求时间
  })
  //请求拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err)
  })

  //响应拦截器
  instance.interceptors.response.use(res => {
    return res
  },err => {
    console.log(err)
  })

  return instance(config)
}