import React, {Component} from 'react';
// 引入路由，BrowserRouter as Router，使用as进行重命名
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./components/home";

// 引入路由配置
import routes from './config/route';

class App extends Component {
  render() {
    return <Router>
      {/*这种方法不智能，难维护*/}
      {/*<Route path='/' exact component={Home}/>*/}
      {/*<Route path='/login'  component={Login}/>*/}

      {/*使用路由配置文件*/}
      {
        routes.map((route, index) => {
          // 这种方法比较麻烦，可以直接使用。。。运算符
          // return <Route path={route.path} exact={route.exact} component={route.component}/>
          return <Route {...route} key={index}/>
        })
      }
    </Router>
  }
}

export default App;