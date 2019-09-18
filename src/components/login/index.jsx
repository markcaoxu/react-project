import React, {Component} from 'react';
// 使用 ant design
import {Form, Icon, Input, Button, message} from 'antd';

import {reqLogin} from '../../api/index';

import logo from './logo.png'
import './index.less';

// 使用redux数据  引入高阶组件
import {connect} from 'react-redux';
import {saveUser} from '@redux/action-creators';

const {Item} = Form;

// 使用装饰器包装一下，connect可以直接调用,将方法传递给Login组件
@connect(
  // 第一个属性是传redux中的数据    这里不需要，这里不需要状态数据，只需要更新状态数据的方法
  null,
  {saveUser}
)
// 装饰器用法，底层调用第二次，并且自动将组将传参  Form.create()(底层传参调用)
@Form.create()
class Login extends Component {

  /*
  * getFieldDecorator高阶函数中规则的提取复用
  * 自定义表单校验的方法
  * */
  validator = (rule, value, callback) => {
    const name = rule.field === 'username' ? '用户名' : '密码';

    if (!value) {
      return callback(`请输入${name}`);
    }
    if (value.length < 3) {
      return callback(`${name}长度必须大于3位`);
    }
    if (value.length > 13) {
      return callback(`${name}长度必须小于13位`);
    }
    const reg = /^[a-zA-Z0-9_]{3,13}$/;
    if (!reg.test(value)) {
      return callback(`${name}只能包含英文、数字和下划线`);
    }
    // 必须有这一个回调
    callback();
  };

  /*
  * 登录函数
  * */
  login = (event) => {
    // 禁止默认行为
    event.preventDefault();
    console.log('测试成功');
    // 校验表单  validateFields方法，参数是一个函数
    this.props.form.validateFields(async (error, values) => {
      /*
        error 校验失败/错误
          校验失败就是 {}
          校验通过就是 null
        values
      */
      console.log('测试');
      if (!error) {
        // 校验通过
        // 获取表单项的值
        console.log(values);
        const {username, password} = values;

        /*
          发送请求遇见了跨域问题：（当前游览器端口是3000，要访问的服务器端口是5000）
          服务器与服务器之间没有跨域问题
          解决：
            1.jsonp 现在不适用
            2.cors 修改服务器代码，不现实
            3.proxy 服务器代理模式
              正向代理   --代理客户端
              反向代理（nginx）   --代理服务端
            工作原理：
              1.游览器发送请求给代理服务器
              2. 代理服务器将请求转发给目标服务器（因为服务器和服务器直接通信，没有跨域问题）
              3. 目标服务器返回响应给代理服务器
              4. 代理服务器返回响应给浏览器
            缺点：
              1. 只能用于开发环境，不能用于上线环境
        */

        /*axios.post('/login', {username, password})
          .then((response) => {
            console.log(response.data);
            // 请求成功，但是没有登录成功
            // 判断status的值，来决定是否登录成功
            if (response.data.status === 0) {
              // 登录成功
              message.success('登录成功！');

              // 跳转之前需要保存用户登录状态数据，保存在redux    持久化存储（cookie、localStorage-离线存储方案/sessionStorage-会话存储）
              // 这是redux存储，刷新就清除
              this.props.saveUser(response.data.data);

              // 跳转到Home组件  跳转到 / 路由
              // Redirect 不行，因为放在函数中，跳转了却没有渲染，没有渲染，代码就不会执行
              // 可以使用路由的三大属性   主组件是Route组件加载的
              // 重定向
              this.props.history.replace('/');
            } else {
              // 登录失败  可以确认 response.data.msg
              message.error(response.data.msg)
            }
          })
          .catch((error) => {
            // 请求失败 - 登录失败  4、5开头的错误
            message.error('未知错误！')
          })
          .finally(() => {
            this.props.form.resetFields(['password'])
          })*/

        // 发送请求
        reqLogin(username, password)
          .then((result) => {
            // 登录成功
            message.success('登录成功！');
            // 跳转之前需要保存用户登录状态数据，保存在redux    持久化存储（cookie、localStorage-离线存储方案/sessionStorage-会话存储）
            // 这是redux存储，刷新就清除
            this.props.saveUser(result);
            // 跳转到Home组件  跳转到 / 路由
            this.props.history.replace('/');
          })
          .finally(() => {
            // 清空密码
            this.props.form.resetFields(['password'])
          })

      }
    })
  }

  render() {
    // getFieldDecorator这个方法用来处理表单校验
    const {getFieldDecorator} = this.props.form;
    // 这里标志着要开始使用高阶组件，牵扯到form属性，一个本来没有，后来添加的属性，用Components开发工具查看Login组件是否有form属性
    // 高阶组件的目的就是为了更好地复用
    return <div className="login">
      {/*结构-->样式-->功能*/}
      <header className="login-header">
        <img src={logo} alt=""/>
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-section">
        <h3>用户登录</h3>
        <Form onSubmit={this.login}>
          <Item>
            {
              getFieldDecorator(
                // 高阶组件的使用
                // 第一个参数传一个有意义的key值
                'username',
                // 第二个参数传一个对象，包含rules规则，规则放进数组中
                {
                  rules: [
                    {validator: this.validator}
                  ]
                }
              )(
                <Input prefix={<Icon type="user"/>} placeholder="用户名"/>
              )
            }
          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules: [
                    {validator: this.validator}
                  ]
                }
              )(
                <Input prefix={<Icon type="lock"/>} placeholder="密码" type="password"/>
              )
            }
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
          </Item>
        </Form>
      </section>
    </div>
  }
}

// Form.create是一个高阶组件，用来给Login组件传递form属性  可以在开发者工具中查看
// const newLogin = Form.create()(Login);  这种方法有简化方法，使用装饰器语法

// 渲染新组件
export default Login;