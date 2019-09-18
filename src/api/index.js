/*
* 封装发送请求的函数
* */
import axios from './request';
export const reqLogin = (username,password) => axios.post('/login',{ username, password });