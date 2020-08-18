import React, { Component } from 'react'
import {
  Form, Select, Input, Checkbox, Row,
  Col, Radio, TimePicker, InputNumber, Modal, message,
} from 'antd';
import moment from '@/utils/moment'
import * as strategyServices from '@/services/strategy'
import styles from './index.less'

const { Option } = Select

class ForbidCallStrategy extends Component {

  state = {
    forbidCallVisible: false,
    waitDivideMoneyOperator: '<=',
    waitDivideMoneyPercent: 100,
  }

  componentDidMount() {
    const { initialValues } = this.props;
    this.setState({
      waitDivideMoneyOperator: initialValues.waitDivideMoneyOperator,
      waitDivideMoneyPercent: initialValues.waitDivideMoneyPercent,
    })
  }

  colAdapt = (xs, sm, md, lg, xl, xxl) => {
    return {
      xs, sm, md, lg, xl, xxl
    }
  }

  onFinish = paramsData => {
    const { waitDivideMoneyOperator, waitDivideMoneyPercent } = this.state;
    const { setInitialValues, strategyId, forbidCallTaskId: id } = this.props;
    const params = paramsData;
    params.waitDivideMoneyOperator = waitDivideMoneyOperator;
    params.waitDivideMoneyPercent = waitDivideMoneyPercent;
    params.dayStopCallTime = moment(params.dayStopCallTime).format('HH:mm');
    params.caseType = params.caseType.join(',');
    params.status = params.status.join(',');
    setInitialValues(params)

    params.strategyId = strategyId;
    params.id = id

    if (strategyId) {
      this.updateStopCallTask(params);
      return
    }
    this.handleCancel()
  }

  updateStopCallTask = async (params) => {
    const { success, message: msg } = await strategyServices.updateStopCallTask(params);
    if (success) {
      message.success(msg)
      this.handleCancel()
    }
  }

  handleOk = () => {
    this.setState({
      forbidCallVisible: true
    })
  }

  handleCancel = () => {
    this.setState({
      forbidCallVisible: false
    })
  }

  render() {
    const { forbidCallVisible, waitDivideMoneyOperator, waitDivideMoneyPercent } = this.state;
    const { initialValues } = this.props;
    return (
      <Modal
        width="60%"
        title="禁止&顺延拨打管理"
        visible={forbidCallVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          form: 'forbidForm',
          htmlType: "submit",
        }}
      >
        <div className={styles.ForbidCallStrategy}>
          <Form
            name="forbidForm"
            className={styles.forbidForm}
            initialValues={initialValues}
            onFinish={this.onFinish}
          >
            <div className="title">
              <span>终止拨打策略</span>
              {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item> */}
            </div>
            <Row >
              <Col span={24}>
                <Form.Item label="最新欠款金额/委案金额" className="moneyInput">
                  <Select style={{ width: 100 }} value={waitDivideMoneyOperator}
                    onChange={value => this.setState({ waitDivideMoneyOperator: value })}
                  >
                    <Option value='<'>{'<'}</Option>
                    <Option value='<='>≤</Option>
                    <Option value='='>=</Option>
                  </Select>
                  <InputNumber
                    min={0}
                    max={100}
                    value={waitDivideMoneyPercent}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    onChange={value => {
                      this.setState({ waitDivideMoneyPercent: value })
                    }}
                    style={{ width: 100, marginLeft: 5 }}
                  />
                  {/* <Input addonAfter="%" style={{ width: 100, marginLeft: 5 }} ></Input> */}
                </Form.Item>
                <Form.Item label="案件状态类型" name="caseType">
                  <Checkbox.Group>
                    <Row>
                      <Col span={4}>
                        <Checkbox value="A">在催</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="B">退案</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="C">闭案</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <Form.Item label="案件停催" name="caseStopCall">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="减免账户" name="remissionAccount">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="案件状态" name="status">
                  <Checkbox.Group>
                    <Row>
                      <Col span={4}>
                        <Checkbox value="Found1">Found_1</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="PTP">ptp</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="PTPn">ptpn</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Check">check</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Stop">stop</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="Payoff">payoff</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                <Form.Item label="已删除电话" name="deletedPhone">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="隐藏电话" name="delFlag">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="禁止小Go拨打" name="notXiaoGo">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="任务暂停大于7天" name="taskPauseGreatSevenDay">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
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
                    defaultValue={moment('20:00', 'HH:mm')}
                    format="HH:mm"
                    allowClear={false}
                  />
                </Form.Item>
                <Form.Item label="周末不拨打" name="weekendStop">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="节假日不拨打" name="holidayStop">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>

    )
  }
}

export default ForbidCallStrategy
