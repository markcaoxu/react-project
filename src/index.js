/*
* 本js文件负责渲染主组件
* */

import React from 'react';
import ReactDOM from 'react-dom';
// 引入Provider，用于重渲染
import { Provider } from 'react-redux';
// 监控配合store进行选择更新
import store from './redux/store';

import './assets/less/index.less';

import App from './App';

ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'));