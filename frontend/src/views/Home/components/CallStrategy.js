import React, { Component, createRef } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Button, Input, Select, Row, Col,
  InputNumber, Form
} from 'antd'
import moment from '@/utils/moment'
import * as strategyServices from '@/services/strategy'
import { DragDropContext } from 'react-beautiful-dnd'
import styles from './CallStrategy.less'
import StrategyEditor from "./StrategyEditor";
import ForbidCallStrategy from './ForbidCallStrategy'

const { TextArea } = Input;
const { Option } = Select;


class CallStrategy extends Component {

  state = {
    strategy: {
      /* id: '策略id',
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
          unusedJudgeTypeList: [],
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
            {
              ruleId: '规则id3',
              ruleName: '说了不知道了',
              judgeTypeList: ['承诺还款'],
              callTimeLimit: 888,
              remindUser: true,
              progressHidden: false,
              followInterval: 4,
              followIntervalType: 2, // 跟进间隔时间类型，1:天，2:小时
              nextSubStrategyId: '箭头关联的子策略id'
            },
          ]
        },
        {
          id: '456123556',
          name: '子策略名称',
          strategyId: '策略id',
          unusedJudgeTypeList: [],
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
          unusedJudgeTypeList: [],
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
          unusedJudgeTypeList: [],
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
      ] */
    },
    initialValues: {
      waitDivideMoneyOperator: '<=',
      waitDivideMoneyPercent: 100,
      caseType: ['B', 'C'],
      caseStopCall: 1,
      remissionAccount: 1,
      status: ['Stop'],
      deletedPhone: 1,
      delFlag: 1,
      notXiaoGo: 1,
      taskPauseGreatSevenDay: 1,

      taskDayCallLimit: 2,
      phoneDayCallLimit: 3,
      dayStopCallTime: moment('20:00', 'HH:mm'),
      weekendStop: 0,
      holidayStop: 0,
    },
    routeList: []
  }

  forbidCallRef = createRef()

  componentDidMount() {

    this.getJudgeType()
    this.getRouteList()
  }

  getRouteList = async () => {
    const result = await strategyServices.getRouteList()
    this.setState({
      routeList: result
    })
    console.log('data', result)
    /* if (success) {
      this.setState({
        routeList: result
      })
    } */
  }

  getJudgeType = async () => {
    const { success, result } = await strategyServices.getJudgeType();
    if (success) {
      this.setState({
        AllJudgeTypeList: result
      }, () => {
        this.getStrategyDetail()
      })
    }
  }

  getStrategyDetail = async () => {
    const { success, result } = await strategyServices.getStrategyDetail({ strategyId: '5f35f497f70a6b4fdd7b47f7' })
    if (success) {
      this.setState({
        strategy: this.handleStrategy(result)
      })
    }
  }

  handleStrategy = strategy => {
    const { AllJudgeTypeList } = this.state;
    const AllJudgeTypeIdList = [];
    AllJudgeTypeList.forEach(item => {
      AllJudgeTypeIdList.push(item.nameCd);
    })
    strategy.subStrategyList.forEach(subStrategyItem => {
      let nowJudgeTypeList = []
      subStrategyItem.strategyRuleList.forEach(item => {
        nowJudgeTypeList = nowJudgeTypeList.concat(item.judgeTypeList)
      })
      const unusedJudgeTypeList = []
      AllJudgeTypeIdList.forEach(item => {
        if (!nowJudgeTypeList.find(demo => demo === item)) {
          unusedJudgeTypeList.push(item)
        }
      })
      subStrategyItem.unusedJudgeTypeList = unusedJudgeTypeList
    })
    return strategy
  }

  colAdapt = (xs, sm, md, lg, xl, xxl) => {
    return {
      xs, sm, md, lg, xl, xxl
    }
  }

  goToForbidStrategy = () => {
    this.forbidCallRef.current.handleOk()
  }

  onFinish = params => {
    console.log('params', params)
  }

  selectRouteLimit = (rule, value, callback) => {
    if (!value) {
      callback('请选择线路')
      return
    }
    if (value.length > 10) {
      callback('最多选择十条线路')
    } else if (value.length === 0) {
      callback('')
    } else {
      callback('')
    }
  }

  onDragEnd = result => {

    return result;
  }

  render() {
    const { strategy: { subStrategyList }, initialValues, AllJudgeTypeList,
      routeList,
    } = this.state

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
              <Form.Item label="策略名称"
                name="strategyName"
                rules={[{ required: true, message: '请输入策略名称' }]}
              >
                <Input placeholder="请输入策略名称" />
              </Form.Item>
              <Form.Item label="总拨打次数上限"
                name="callTimeLimit"
                rules={[{ required: true, message: '请输入拨打次数上限' }]}
              >
                <InputNumber style={{ width: '100%' }} max={999} min={1} placeholder="请输入拨打次数上限" />
              </Form.Item>
              <Form.Item label="选择线路地区"
                name="areaIdList"
                rules={[
                  { required: true, message: ' ' },
                  { validator: this.selectRouteLimit }
                ]}
              >
                <Select mode="multiple"
                  placeholder="请选择线路地区"
                >
                  {
                    routeList.map(item => {
                      return (
                        <Option value={item.id} key={item.id}>{item.routeName}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item label="首次拨打生效间隔"
                name="firstCallInterval"
                rules={[{ required: true, message: '请选择手次拨打生效间隔' }]}
              >
                <Select placeholder="请选择首次拨打生效间隔">
                  <Option value={0}>立即生效</Option>
                  <Option value={1}>1天</Option>
                </Select>
              </Form.Item>
              <Form.Item label="策略说明"
                name="comment"
                rules={[{ required: true, message: '请输入策略说明' }]}
              >
                <TextArea maxLength={400} placeholder="请输入策略说明，不超过400字" />
              </Form.Item>
            </Col>
          </Row>

        </Form>
        <div className={styles.svgBox}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {subStrategyList && <StrategyEditor subStrategyList={subStrategyList} AllJudgeTypeList={AllJudgeTypeList} />}
          </DragDropContext>
        </div>
        <ForbidCallStrategy ref={this.forbidCallRef} initialValues={initialValues} callStrategy={this} />
      </div>
    )
  }
}

export default withRouter(CallStrategy)
