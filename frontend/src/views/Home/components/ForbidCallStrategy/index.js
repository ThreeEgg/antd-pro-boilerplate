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
    waitDivideMoneyPercent: 0,
    caseStatusList: [],
  }

  componentDidMount() {
    const { initialValues } = this.props;
    this.getCaseStatusList()
    this.setState({
      waitDivideMoneyOperator: initialValues.waitDivideMoneyOperator,
      waitDivideMoneyPercent: initialValues.waitDivideMoneyPercent,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialValues !== this.props.initialValues) {
      const { initialValues } = this.props;
      this.setState({
        waitDivideMoneyOperator: initialValues.waitDivideMoneyOperator,
        waitDivideMoneyPercent: initialValues.waitDivideMoneyPercent,
      })
    }
  }

  getCaseStatusList = async () => {
    const { success, result } = await strategyServices.getCaseStatusList()
    if (success) {
      this.setState({
        caseStatusList: result
      })
    }
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
    params.dayStopCall = moment(params.dayStopCall, "HH:mm").format('HH:mm');
    params.caseType = (params.caseType || []).join(',');
    params.status = (params.status || []).join(',');
    params.seekWarning = (params.seekWarning || []).join(',');

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
      this.props.getStrategyDetail()
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
    const { forbidCallVisible, waitDivideMoneyOperator, waitDivideMoneyPercent, caseStatusList } = this.state;
    const { initialValues } = this.props;
    return (
      <Modal
        width="64%"
        title="终止&顺延拨打管理"
        visible={forbidCallVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okButtonProps={{
          form: 'forbidForm',
          htmlType: "submit",
        }}
        destroyOnClose
      >
        <div className={styles.ForbidCallStrategy}>
          <Form
            name="forbidForm"
            className={styles.forbidForm}
            initialValues={initialValues}
            onFinish={this.onFinish}
            layout={{
              labelCol: { span: 4 },
              wrapperCol: { span: 14 },
            }}
          >
            <div className="title">
              <span>终止拨打任务</span>
              {/* <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item> */}
            </div>
            <Row >
              <Col span={24}>
                <Form.Item label="最新欠款金额/委案金额不打" className="moneyInput">
                  <Select style={{ width: 100 }} value={waitDivideMoneyOperator}
                    onChange={value => this.setState({ waitDivideMoneyOperator: value })}
                  >
                    <Option value='<'>{'<'}</Option>
                    <Option value='<='>≤</Option>
                    <Option value='='>=</Option>
                  </Select>
                  <InputNumber
                    min={0}
                    step={1}
                    max={100}
                    precision={0}
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
                <Form.Item label="案件状态类型不打" name="caseType">
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
                <Form.Item label="案件停催不打" name="caseStopCall">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="减免账户不打" name="remissionAccount">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="案件状态不打" name="status">
                  <Select mode="multiple"
                    placeholder="请选择案件状态"
                    allowClear
                  >
                    {
                      caseStatusList.map(item => {
                        return (
                          <Option value={item.nameCd} key={item.nameCd}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item label="已删除电话不打" name="deletedPhone">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="隐藏电话不打" name="delFlag">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="禁止小Go拨打不打" name="notXiaoGo">
                  <Radio.Group disabled>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="投诉预警不打" name="seekWarning">
                  <Checkbox.Group>
                    <Row>
                      <Col span={4}>
                        <Checkbox value="wei">危</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="xian">险</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="jing">警</Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox value="su">诉</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
                {/* <Form.Item label="任务暂停大于7天" name="taskPauseGreatSevenDay">
                  <Radio.Group>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </Radio.Group>
                </Form.Item> */}
                <div className="title">
                  <span>顺延拨打任务</span>
                </div>
                <Form.Item label="单任务单日拨打上限" name="taskDayCallLimit"
                  rules={[
                    { required: false, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: "请输入正整数" }
                  ]}
                >
                  <Input addonAfter="次" style={{ width: 130 }} type="number" max={999} min={0} />
                </Form.Item>
                <Form.Item label="单电话单日拨打上限" name="phoneDayCallLimit"
                  rules={[
                    { required: false, pattern: new RegExp(/^[1-9]\d*$/, "g"), message: "请输入正整数" }
                  ]}
                >
                  <Input addonAfter="次" style={{ width: 130 }} type="number" max={999} min={0} />
                </Form.Item>
                <Form.Item label="每日截至拨打时间" name="dayStopCall">
                  <TimePicker
                    // defaultValue={moment('20:00', 'HH:mm')}
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
