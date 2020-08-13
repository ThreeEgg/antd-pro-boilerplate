import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Button, Input, Select, Row, Col,
  InputNumber, Form
} from 'antd'
import * as strategyServices from '@/services/strategy'
import styles from './CallStrategy.less'
import StrategyEditor from "./StrategyEditor";

const { TextArea } = Input;
const { Option } = Select;

class CallStrategy extends Component {

  state = {
    strategy: {
      id: '策略id',
      strategyName: '策略名称',
      callTimeLimit: 999,
      weekendStop: true,
      holidayStop: true,
      areaIdList: [1, 2, 3, 4, 5],
      firstCallInterval: 0,
      comment: '策略说明',
      subStrategyList: [
        {
          id: '4561235',
          name: '子策略名称',
          strategyId: '策略id',
          strategyRuleList: [
            {
              ruleId: '规则id1',
              ruleName: '暂定为这个',
              judgeTypeList: ['身体异常'],
              callTimeLimit: 999,
              remindUser: true,
              progressHidden: true,
              followInterval: 2,
              followIntervalType: 1, // 跟进间隔时间类型，1:天，2:小时
              nextSubStrategyId: '箭头关联的子策略id'
            },
            {
              ruleId: '规则id2',
              ruleName: '不知道',
              judgeTypeList: ['承诺还款'],
              callTimeLimit: 777,
              remindUser: true,
              progressHidden: false,
              followInterval: 48,
              followIntervalType: 2, // 跟进间隔时间类型，1:天，2:小时
              nextSubStrategyId: '箭头关联的子策略id'
            },
          ]
        },
        {
          id: '456123556',
          name: '子策略名称',
          strategyId: '策略id',
          strategyRuleList: [
            {
              ruleId: '规则id',
              ruleName: '暂定为这个',
              judgeTypeList: ['本人'],
              callTimeLimit: 999,
              remindUser: true,
              progressHidden: true,
              followInterval: 24,
              followIntervalType: 1, // 跟进间隔时间类型，1:天，2:小时
              nextSubStrategyId: '箭头关联的子策略id'
            }
          ]
        },
        {
          id: '45612357',
          name: '子策略名称',
          strategyId: '策略id',
          strategyRuleList: [
            {
              ruleId: '规则id',
              ruleName: '暂定为这个',
              judgeTypeList: ['本人'],
              callTimeLimit: 999,
              remindUser: true,
              progressHidden: true,
              followInterval: 24,
              followIntervalType: 1, // 跟进间隔时间类型，1:天，2:小时
              nextSubStrategyId: '箭头关联的子策略id'
            }
          ]
        },
        {
          id: '45612354',
          name: '子策略名称',
          strategyId: '策略id',
          strategyRuleList: [
            {
              ruleId: '规则id',
              ruleName: '暂定为这个',
              judgeTypeList: ['本人'],
              callTimeLimit: 999,
              remindUser: true,
              progressHidden: true,
              followInterval: 24,
              followIntervalType: 1, // 跟进间隔时间类型，1:天，2:小时
              nextSubStrategyId: '箭头关联的子策略id'
            }
          ]
        }
      ]
    },
    judgeTypeList: ['身体异常', '承诺还款', '投诉预警', '人工介入',]
  }

  componentDidMount() {
    this.getStrategyDetail()
    this.getJudgeType()
  }

  getJudgeType = async () => {
    const data = await strategyServices.getJudgeType()
  }

  getStrategyDetail = async () => {
    const data = await strategyServices.getStrategyDetail({ strategyId: '5f33b440f637117892e6df4e' })
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
    const { strategy: { subStrategyList }, judgeTypeList } = this.state

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
          <StrategyEditor subStrategyList={subStrategyList} judgeTypeList={judgeTypeList} />
        </div>
      </div>
    )
  }
}

export default withRouter(CallStrategy)
