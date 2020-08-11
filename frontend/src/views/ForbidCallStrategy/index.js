import React, { Component } from 'react'
import styles from './index.less'
import {
  Form, Button, Select, Input, Checkbox, Row,
  Col, Radio, TimePicker,
} from 'antd'
const { Option } = Select

class ForbidCallStrategy extends Component {

  state = {

  }

  colAdapt = (xs, sm, md, lg, xl, xxl) => {
    return {
      xs, sm, md, lg, xl, xxl
    }
  }

  onFinish = params => {
    console.log('params', params)
  }

  render() {
    return (
      <div className={styles.ForbidCallStrategy}>
        <Form
          name="forbidForm"
          className={styles.forbidForm}
          // initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <div className="title">
            <span>终止拨打策略</span>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </div>
          <Row >
            <Col {...this.colAdapt(24, 24, 24, 24, 12, 12)}>
              <Form.Item label="最新欠款金额/委案金额" className="moneyInput">
                <Select style={{ width: 100 }}>
                  <Option value='<'>{'<'}</Option>
                  <Option value='<='>≤</Option>
                  <Option value='='>=</Option>
                </Select>
                <Input addonAfter="%" style={{ width: 100, marginLeft: 5 }}></Input>
              </Form.Item>
              <Form.Item label="案件状态类型">
                <Checkbox.Group>
                  <Row>
                    <Col span={4}>
                      <Checkbox value="A">A</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="B">B</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="C">C</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item label="案件停催">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="减免账户">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="案件状态">
                <Checkbox.Group>
                  <Row>
                    <Col span={4}>
                      <Checkbox value="Found_1">Found_1</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="ptp">ptp</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="ptpn">ptpn</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="check">check</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="stop">stop</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="payoff">payoff</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item label="已删除电话">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="隐藏电话">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="禁止小Go拨打">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="任务暂停大于7天">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <div className="title">
                <span>顺延拨打任务</span>
              </div>
              <Form.Item label="单任务单日拨打上限">
                <Input addonAfter="次" style={{ width: 130 }}></Input>
              </Form.Item>
              <Form.Item label="单电话单日拨打上限">
                <Input addonAfter="次" style={{ width: 130 }}></Input>
              </Form.Item>
              <Form.Item label="每日截至拨打时间">
                <TimePicker
                  format="HH:mm"
                  allowClear={false}
                ></TimePicker>
              </Form.Item>
              <Form.Item label="周末不拨打">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="节假日不拨打">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={2}>否</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default ForbidCallStrategy
