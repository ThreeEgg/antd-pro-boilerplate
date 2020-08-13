import React, { Component } from 'react'
import {
  Form, Button, Select, Input, Checkbox, Row,
  Col, Radio, TimePicker, InputNumber,
} from 'antd';
import moment from '@/utils/moment'
import styles from './index.less'

const { Option } = Select

class ForbidCallStrategy extends Component {

  state = {
    initialValues: {
      waitDivideMoneyOperator: '<',
      waitDivideMoneyPercent: '100%',
      caseType: ['在催', '退案', '闭案'],


    }
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
    const { initialValues } = this.state;
    return (
      <div className={styles.ForbidCallStrategy}>
        <Form
          name="forbidForm"
          className={styles.forbidForm}
          initialValues={initialValues}
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
                <Select style={{ width: 100 }} value={initialValues.waitDivideMoneyOperator}>
                  <Option value='<'>{'<'}</Option>
                  <Option value='<='>≤</Option>
                  <Option value='='>=</Option>
                </Select>
                <InputNumber
                  defaultValue={100}
                  min={0}
                  max={100}
                  value={initialValues.waitDivideMoneyPercent}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  style={{ width: 100, marginLeft: 5 }}
                />
                {/* <Input addonAfter="%" style={{ width: 100, marginLeft: 5 }} ></Input> */}
              </Form.Item>
              <Form.Item label="案件状态类型" name="caseType">
                <Checkbox.Group>
                  <Row>
                    <Col span={4}>
                      <Checkbox value="在催">在催</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="退案">退案</Checkbox>
                    </Col>
                    <Col span={4}>
                      <Checkbox value="闭案">闭案</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item label="案件停催" name="caseStopCall">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="减免账户" name="remissionAccount">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="案件状态" name="status">
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
              <Form.Item label="已删除电话" name="deletedPhone">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="隐藏电话" name="delFlag">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="禁止小Go拨打" name="notXiaoGo">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="任务暂停大于7天" name="taskPauseGreatServenDay">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <div className="title">
                <span>顺延拨打任务</span>
              </div>
              <Form.Item label="单任务单日拨打上限" name="taskDayCallLimit">
                <Input addonAfter="次" style={{ width: 130 }} type="number" />
              </Form.Item>
              <Form.Item label="单电话单日拨打上限" name="phoneDayCallLimit">
                <Input addonAfter="次" style={{ width: 130 }} />
              </Form.Item>
              <Form.Item label="每日截至拨打时间" name="dayStopCallTime">
                <TimePicker
                  defaultValue={moment('12:00', 'HH:mm')}
                  format="HH:mm"
                  allowClear={false}
                />
              </Form.Item>
              <Form.Item label="周末不拨打" name="weekendStop">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="节假日不拨打" name="holidayStop">
                <Radio.Group>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
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
