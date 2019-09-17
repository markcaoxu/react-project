import React, { Component } from 'react';

import './index.less';

import logo from './logo.png'

// 使用 ant design
import { Form, Icon, Input, Button } from 'antd';
const { Item } = Form;



class Login extends Component {
  state = {

  };
  render() {
    return <div className="login">
      {/*结构-->样式-->功能*/}
      <header className="login-header">
        <img src={logo} alt=""/>
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-section">
        <h3>用户登录</h3>
        <Form>
          <Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="用户名"
            />
          </Item>
          <Item>
            <Input
              prefix={<Icon type="lock" />}
              placeholder="密码"
              type="password"
            />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
          </Item>
        </Form>
      </section>
    </div>
  }
}

export default Login;