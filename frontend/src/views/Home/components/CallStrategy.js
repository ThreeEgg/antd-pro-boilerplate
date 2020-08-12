import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Button, Input, Select, Row, Col,
  InputNumber, Form
} from 'antd'
import styles from './CallStrategy.less'
import StrategyEditor from "./StrategyEditor";

const { TextArea } = Input;
const { Option } = Select;

class CallStrategy extends Component {

  state = {
  }

  colAdapt = (xs, sm, md, lg, xl, xxl) => {
    return {
      xs, sm, md, lg, xl, xxl
    }
  }

  goToForbidStrategy = () => {
    const { history } = this.props;
    history.push('/forbidCallStrategy')
  }

  onFinish = params => {
    console.log('params', params)
  }

  render() {
    return (
      <div className={styles.CallStrategy}>
        <Form className={styles.baseInfoInput} onFinish={this.onFinish}>
          <div className={styles.titleBox}>
            <div className="title">
              <span>拨打策略集-智能对话</span>
              <Button type="link" onClick={this.goToForbidStrategy}>设置禁止&顺延拨打管理</Button>
            </div>
            <div className="btnBox">
              <Button>返回</Button>
              <Form.Item>
                <Button type="primary" htmlType="submit">保存</Button>
              </Form.Item>
            </div>
          </div>
          <Row>
            <Col {...this.colAdapt(24, 24, 24, 24, 10, 10)} className={styles.formItemBox}>
              <Form.Item label="策略名称">
                <Input />
              </Form.Item>
              <Form.Item label="总拨打次数上限">
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label="选择线路地区">
                <Select mode="multiple">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                </Select>
              </Form.Item>
              <Form.Item label="首次拨打生效间隔">
                <Select>
                  <Option value="1">立即生效</Option>
                  <Option value="2">1天</Option>
                </Select>
              </Form.Item>
              <Form.Item label="策略说明">
                <TextArea />
              </Form.Item>
            </Col>
          </Row>

        </Form>
        <div className={styles.svgBox}>
          <StrategyEditor />
        </div>
      </div>
    )
  }
}

export default withRouter(CallStrategy)
