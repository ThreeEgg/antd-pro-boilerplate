import * as strategyServices from '@/services/strategy'
import moment from '@/utils/moment'
import { getParameter } from '@/utils/tools'
import { Button, Form, Input, InputNumber, message, Select } from 'antd'
import React, { Component, createRef } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { withRouter } from 'react-router-dom'
import styles from './CallStrategy.less'
import ForbidCallStrategy from './ForbidCallStrategy'
import StrategyEditor from "./StrategyEditor";

const { TextArea } = Input;
const { Option } = Select;


class CallStrategy extends Component {

  state = {
    strategy: {},
    ForbidInitialValues: {
      waitDivideMoneyOperator: '<=',
      waitDivideMoneyPercent: 0,
      caseType: ['B', 'C'],
      caseStopCall: '1',
      remissionAccount: '1',
      status: ['Stop'],
      deletedPhone: '1',
      delFlag: '1',
      notXiaoGo: '1',
      taskPauseGreatSevenDay: '1',
      seekWarning: ['wei', 'xian', 'jing', 'su'],

      taskDayCallLimit: 2,
      phoneDayCallLimit: 3,
      dayStopCall: moment('20:00', 'HH:mm'),
      weekendStop: '0',
      holidayStop: '0',
    },
    routeList: [],
    strategyId: getParameter('strategyId'),
  }

  forbidCallRef = createRef()

  strategyDetailForm = createRef()

  StrategyEditorRef = createRef()

  componentDidMount() {
    this.getJudgeType()
    this.getRouteList()
  }

  setInitialValues = (ForbidInitialValues) => {
    this.setState({
      ForbidInitialValues
    })
  }

  getRouteList = async () => {
    const { success, result } = await strategyServices.getRouteList()
    if (success) {
      this.setState({
        routeList: result
      })
    }
  }

  getJudgeType = async () => {
    const { strategyId } = this.state;
    const { success, result } = await strategyServices.getJudgeType();
    if (success) {
      this.setState({
        AllJudgeTypeList: result
      }, () => {
        if (strategyId) {
          this.getStrategyDetail()
        }

      })
    }
  }

  getStrategyDetail = async () => {
    const { strategyId } = this.state;
    const { success, result } = await strategyServices.getStrategyDetail({ strategyId })
    if (success) {
      const { setFieldsValue } = this.strategyDetailForm.current;
      setFieldsValue({
        strategyName: result.strategyName,
        callTimeLimit: result.callTimeLimit,
        areaIdList: result.areaIdList,
        firstCallInterval: result.firstCallInterval,
        comment: result.comment,
      })

      this.setState({
        strategy: this.handleStrategy(result),
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
    const { strategy: { stopCallTask }, strategyId } = this.state;
    if (strategyId && stopCallTask) {
      const ForbidInitialValues = stopCallTask;
      ForbidInitialValues.caseType = typeof (ForbidInitialValues.caseType) === 'string' ? ForbidInitialValues.caseType.split(',') : ForbidInitialValues.caseType;
      ForbidInitialValues.status = typeof (ForbidInitialValues.status) === 'string' ? ForbidInitialValues.status.split(',') : ForbidInitialValues.status;
      ForbidInitialValues.seekWarning = typeof (ForbidInitialValues.seekWarning) === 'string' ? ForbidInitialValues.seekWarning.split(',') : ForbidInitialValues.seekWarning;
      ForbidInitialValues.dayStopCall = moment(ForbidInitialValues.dayStopCall, 'HH:mm')
      this.setState({
        ForbidInitialValues
      }, () => {
        this.forbidCallRef.current.handleOk()
      })

    } else {
      this.forbidCallRef.current.handleOk()
    }

  }

  onFinish = paramsData => {
    const params = paramsData || {};
    const { strategyId, ForbidInitialValues } = this.state;
    params.strategyType = 1;

    if (strategyId) {   // 更新
      // params.stopCallTask = ForbidInitialValues
      params.id = strategyId;
      this.updateStrategy(params)
    } else {  // 新建
      ForbidInitialValues.waitDivideMoneyOperator = '<=';
      ForbidInitialValues.waitDivideMoneyPercent = 0;
      ForbidInitialValues.dayStopCall = moment(ForbidInitialValues.dayStopCall, 'HH:mm').format('HH:mm')
      ForbidInitialValues.caseType = typeof (ForbidInitialValues.caseType) === 'string' ? ForbidInitialValues.caseType : ForbidInitialValues.caseType.join(',');
      ForbidInitialValues.status = typeof (ForbidInitialValues.status) === 'string' ? ForbidInitialValues.status : ForbidInitialValues.status.join(',');
      ForbidInitialValues.seekWarning = typeof (ForbidInitialValues.seekWarning) === 'string' ? ForbidInitialValues.seekWarning : ForbidInitialValues.seekWarning.join(',');
      params.stopCallTask = ForbidInitialValues
      this.addStrategy(params)
    }
  }

  updateStrategy = async (params) => {
    const { success, message: msg } = await strategyServices.updateStrategy(params)
    if (success) {
      message.success(msg)
    }
  }

  addStrategy = async (params) => {
    const { success, result, message: msg } = await strategyServices.addStrategy(params)
    if (success) {
      message.success(msg)
      result.subStrategyList = []
      this.setState({
        strategy: result,
        strategyId: result.id
      })
    }
  }

  selectRouteLimit = (rule, value, callback) => {
    if (!value || value.length === 0) {
      callback('请选择线路')
      return
    }
    if (value.find(item => item === "0") && value.length !== 1) {
      callback('选择全部时，禁止选择其他线路')
      return
    }
    if (value.length > 10) {
      callback('最多选择十条线路')
    }
  }

  onDragEnd = result => {

    const { destination, source, draggableId } = result
    const { strategy } = this.state;
    if (!destination) {
      return
    }

    strategy.subStrategyList.forEach(subStrategyItem => { // 子拨打=> 判断类型集
      let flag1 = false;
      let flag2 = false;
      if (subStrategyItem.strategyRuleList.find(strategyRuleItem => strategyRuleItem.ruleId === source.droppableId)) {
        flag1 = true;
      }
      if (subStrategyItem.strategyRuleList.find(strategyRuleItem => strategyRuleItem.ruleId === destination.droppableId)) {
        flag2 = true;
      }
      if (source.droppableId === subStrategyItem.id) {
        const itemName = draggableId.split('-')[1];
        subStrategyItem.strategyRuleList.forEach(strategyRuleItem => {
          if (destination.droppableId === strategyRuleItem.ruleId) {
            subStrategyItem.unusedJudgeTypeList = subStrategyItem.unusedJudgeTypeList.filter(demo => demo !== itemName)
            strategyRuleItem.judgeTypeList.unshift(itemName)
          }
        })
      } else if (flag1 && flag2) {  // 判断类型集=> 判断类型集
        subStrategyItem.strategyRuleList.forEach(strategyRuleItem => {
          const itemName = draggableId.split('-')[1];
          if (strategyRuleItem.ruleId === source.droppableId) {
            strategyRuleItem.judgeTypeList = strategyRuleItem.judgeTypeList.filter(demo => demo !== itemName)
          }
          if (strategyRuleItem.ruleId === destination.droppableId) {
            strategyRuleItem.judgeTypeList.unshift(itemName)
          }
        })
      } else if (destination.droppableId === subStrategyItem.id) {  // 判断类型集=>子拨打
        const itemName = draggableId.split('-')[1];
        subStrategyItem.strategyRuleList.forEach(strategyRuleItem => {
          if (source.droppableId === strategyRuleItem.ruleId) {
            strategyRuleItem.judgeTypeList = strategyRuleItem.judgeTypeList.filter(demo => demo !== itemName)
            subStrategyItem.unusedJudgeTypeList.unshift(itemName)
          }
        })
      }
    })

    // console.log(,StrategyEditorRef)

    this.setState({
      strategy
    })

    return result;
  }

  render() {
    const {
      strategy: { subStrategyList }, ForbidInitialValues, AllJudgeTypeList,
      routeList, strategyId, strategy: { stopCallTask }
    } = this.state

    return (
      <div className={styles.CallStrategy}>
        {/* 标题 */}
        <div className={styles.titleBox}>
          <div className="title">
            <span>拨打策略集-智能对话</span>
            <Button type="link" onClick={this.goToForbidStrategy}>设置终止&顺延拨打管理</Button>
          </div>
          <div className="btnBox">
            <Button type="primary" htmlType="submit" form='form'>保存</Button>
          </div>
        </div>
        <Form id='form' className={styles.baseInfoInput} layout='inline' onFinish={this.onFinish}
          ref={this.strategyDetailForm}>
          <Form.Item label="策略名称"
            name="strategyName"
            rules={[
              { required: true, message: '请输入策略名称' },
              { type: "string", max: 200, message: '策略名称不得超过200个字' }
            ]}
          >
            <Input style={{ width: 200 }} placeholder="请输入策略名称" />
          </Form.Item>
          <Form.Item label="总拨打次数上限"
            name="callTimeLimit"
            rules={[{ required: true, message: '请输入拨打次数上限' }]}
          >
            <InputNumber max={999} min={1}
              step={1}
              precision={0}
              placeholder="请输入拨打次数上限" />
          </Form.Item>
          <Form.Item label="选择线路地区"
            name="areaIdList"
            rules={[
              { required: true, message: ' ' },
              { validator: this.selectRouteLimit }
            ]}
          >
            <Select style={{ width: 250 }} mode="multiple"
              placeholder="请选择线路地区"
              allowClear
            >
              {
                routeList.map(item => {
                  return (
                    <Option value={item.id} key={item.id} disabled={item.areaUseState === '0'}>{item.areaName}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="首次拨打生效间隔"
            name="firstCallInterval"
            rules={[{ required: true, message: '请选择手次拨打生效间隔' }]}
          >
            <Select style={{ width: 100 }} placeholder="请选择首次拨打生效间隔">
              <Option value={0}>立即生效</Option>
              <Option value={1}>1天</Option>
            </Select>
          </Form.Item>
          <Form.Item label="策略说明"
            name="comment"
            rules={[{ required: true, message: '请输入策略说明' }]}
          >
            <TextArea className={styles.textarea} maxLength={400} placeholder="请输入策略说明，不超过400字" />
          </Form.Item>
        </Form>
        <div className={styles.strategyEditor}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {strategyId && <StrategyEditor
              ref={this.StrategyEditorRef}
              subStrategyList={subStrategyList}
              AllJudgeTypeList={AllJudgeTypeList}
              getStrategyDetail={this.getStrategyDetail}
              strategyId={strategyId}
            />}
          </DragDropContext>
        </div>
        <ForbidCallStrategy
          ref={this.forbidCallRef}
          initialValues={ForbidInitialValues}
          setInitialValues={this.setInitialValues}
          strategyId={strategyId}
          forbidCallTaskId={stopCallTask ? stopCallTask.id : null}
        />
      </div>
    )
  }
}

export default withRouter(CallStrategy)
