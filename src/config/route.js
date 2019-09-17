/*
* 路由配置文件
* */

import Login from '../components/login';
import Home from '../components/home';


const routes = [
  {
    path: '/',//路由路径
    exact: true,// 严格匹配
    component: Home//UI组件
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
];

export default routes;