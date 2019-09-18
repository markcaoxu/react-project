/*
* 封装axios代码
* */

import axios from 'axios';
import { message } from 'antd';
import store from '@redux/store';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  // header: {}
});

// 设置请求拦截器，发送请求之前触发函数
instance.interceptors.request.use(
  (config) => {
    // /api/login 不需要加上请求头参数
    const {token} = store.getState().user;
    // 加上公共请求头参数
    // config就是发送请求的配置信息（请求方法、请求头、请求参数...）
    // store.getState()得到所有数据 .user中有user和token数据
    // 如果token有值，就加请求头参数,没值就不设置    这样可以过滤掉login
    if (token) {
      config.headers.authorization = token;
    }
    return config
  },
  /*(error)=>{
      return Promise.reject(error);
  }*/
)
// 设置响应拦截器，处理响应之前触发函数
instance.interceptors.response.use(
  (response) => {
    // result就是响应体数据
    const result = response.data;

    // 请求成功 但不代表功能成功
    if (result.status === 0){
      // 功能成功   后面触发then
      return result.data;
    } else {
      // 功能失败  返回一个失败的代码   后面触发catch
      // 错误提示
      message.error(result.msg);
      return Promise.reject(result.msg);
    }
  },
  (error) => {
    // 请求失败 --> 响应状态码 400 500
    console.log('axios请求失败:',error);
    message.error('未知错误，请联系管理员~');
    return Promise.reject('未知错误~');
  }
)

export default instance;
