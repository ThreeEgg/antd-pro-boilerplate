import React, { Component } from 'react'
import { PageContainer, } from '@ant-design/pro-layout';
import { Form, Button, Input, message, notification } from 'antd'
// import * as accountServices from '@/services/account'
import { history } from 'umi'

class EditPassword extends Component {

  state = {}

  onFinish = async params => {


  }


  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    }
    const tailLayout = {
      wrapperCol: { offset: 16, span: 8 },
    };
    return (
      <PageContainer>
        <Form name='editPasswordForm' onFinish={this.onFinish} {...layout} style={{ backgroundColor: 'white', padding: '50px 0' }}>
          <Form.Item
            name="oldPassword"
            label="原密码"
            rules={[
              { required: true, message: '请输入原密码' },
              { type: 'string', min: 6, max: 40, message: '请输入6-40个字符' },
              { pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, "g"), message: '密码只允许包含数字、字母和下划线' },
            ]}
          >
            <Input type='password' placeholder="此处为账号当前密码" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { type: 'string', min: 6, max: 40, message: '请输入6-40个字符' },
              { pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, "g"), message: '密码只允许包含数字、字母和下划线' },
              { pattern: new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,}$/, "g"), message: '密码必须包含数字、字母' },
            ]}
          >
            <Input type='password' placeholder="此处为账号新密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认密码"
            rules={[
              { required: true, message: '请再次输入新密码' },
              { type: 'string', min: 1, max: 40, message: '请输入1-40个字符' },
              { pattern: new RegExp(/^[0-9a-zA-Z_]{1,}$/, "g"), message: '密码只允许包含数字、字母和下划线' },
              { pattern: new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,}$/, "g"), message: '密码必须包含数字、字母' },
              ({ getFieldValue }) => ({
                validator(rule, value, callback) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return callback('两次密码输入必须相同！');
                },
              }),
            ]}
          >
            <Input type='password' placeholder="此处为账号新密码" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button form="editPasswordForm" htmlType="submit" type="primary">确认</Button>
          </Form.Item>
        </Form>
      </PageContainer>
    )
  }
}

export default EditPassword
