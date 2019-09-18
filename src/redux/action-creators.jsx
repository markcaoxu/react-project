/*
* 存储多个创建action对象的工厂函数
* */
import { SAVE_USER } from './action-types';

// 保存用户数据
export const saveUser = (user)=>({type: SAVE_USER, data: user});