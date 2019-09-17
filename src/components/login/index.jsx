import React, { Component } from 'react';

import './index.less';

import logo from './logo.png'

// 使用 ant design
import { Form, Icon, Input, Button } from 'antd';
const { Item } = Form;

// 装饰器用法，自己调用
@Form.create()
class Login extends Component {

  /*
  * getFieldDecorator高阶函数中规则的提取复用
  * 自定义表单校验的方法
  * */
  validator = (rule,value,callback)=>{
    const name = rule.field === 'username'?'用户名':'密码'

    if (!value){
      return callback(`请输入${name}`);
    }
    if (value.length < 3){
      return callback(`${name}长度必须大于3位`);
    }
    if (value.length > 13){
      return callback(`${name}长度必须小于13位`);
    }
    const reg = /^[a-zA-Z0-9_]{3,13}$/;
    if (!reg.test(value)){
      return callback(`${name}只能包含英文、数字和下划线`);
    }
  }

  render() {
    // getFieldDecorator这个方法用来处理表单校验
    const { getFieldDecorator } = this.props.form;
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
        <Form>
          <Item>
            {
              getFieldDecorator(
                // 高阶组件的使用
                // 第一个参数传一个有意义的key值
                'username',
                // 第二个参数传一个对象，包含rules规则，规则放进数组中
                {
                  rules:[
                    {
                      validator:this.validator
                    }
                  ]
                }
              )(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="用户名"
                />
              )
            }
          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules:[
                    {
                      validator:this.validator
                    }
                  ]
                }
              )(
                <Input
                  prefix={<Icon type="lock" />}
                  placeholder="密码"
                  type="password"
                />
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