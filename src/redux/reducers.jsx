/*
* 根据prevState和action对象来生成新的状态 state
* */

import { combineReducers } from 'redux';

import { SAVE_USER } from './action-types';

import { getItem,setItem,removeItem } from '../utils/storage'

// 初始化数据
const initUser = {
  // 在初始化数据中再操作一下，如果localStorage中有数据，就读取，没有就 空
  user: getItem('user') || {},
  token: getItem('token') || ''
};
function user(prevState = initUser,action) {
  switch (action.type) {
    case SAVE_USER:
      // 在返回之前先进行持久化存储
      setItem('user',action.data.user);
      setItem('token',action.data.token);
      return action.data;
    default:
      return prevState;
  }
}

export default combineReducers({
  user
})