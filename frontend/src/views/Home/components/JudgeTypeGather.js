import {Button, Input, InputNumber, Radio, Select, Tag,} from 'antd'
import classNames from 'classnames'
import React, {Component, createRef} from 'react'
import styles from './JudgeTypeGather.less'

const {Option} = Select

class JudgeTypeGather extends Component {
  state = {
    callTimeLimit: null,
    remindUser: null,
    progressHidden: null,
    followInterval: null,
    followIntervalType: null,
  }

  container = createRef();
  content = createRef();

  makeSource = (el) => {
    this.props.connector.makeSource(el, {
      allowLoopback: false,
      anchor: ["Left", "Right"]
    });
  }

  componentDidMount() {
    const {strategyRuleItem} = this.props
    this.setState({
      callTimeLimit: strategyRuleItem.callTimeLimit,
      remindUser: strategyRuleItem.remindUser,
      progressHidden: strategyRuleItem.progressHidden,
      followInterval: strategyRuleItem.followInterval,
      followIntervalType: strategyRuleItem.followIntervalType,
    });

    if (this.props.connector) {
      const container = this.container.current;
      Array.from(container.querySelectorAll('.' + this.props.sourceClassName)).forEach(this.makeSource);
    }

    var height = this.content.current.scrollHeight
    this.content.current.style.setProperty('--max-height', height + 'px')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.strategyRuleItem !== this.props.strategyRuleItem) {
      const {strategyRuleItem} = this.props
      this.setState({
        callTimeLimit: strategyRuleItem.callTimeLimit,
        remindUser: strategyRuleItem.remindUser,
        progressHidden: strategyRuleItem.progressHidden,
        followInterval: strategyRuleItem.followInterval,
        followIntervalType: strategyRuleItem.followIntervalType,
      }, () => {
      })
    }
  }

  render() {
    const {callTimeLimit, remindUser, progressHidden, followInterval, followIntervalType,} = this.state;
    const {strategyRuleItem, propsIndex, AllJudgeTypeList = [], sourceClassName, collapsed} = this.props;
    const {judgeTypeList = []} = strategyRuleItem
    return (
      <div className={classNames(styles.JudgeTypeGather, {[styles.collapsed]: collapsed})} ref={this.container}>
        <div className={styles.gatherTitleBox}>
          <div className="title">
            <span>判断类型集{propsIndex + 1}：</span>
            <span>{strategyRuleItem.ruleName}</span>
          </div>
          <div className="btnBox">
            <Button danger size="small" type="link">删除</Button>
            <span className={classNames(styles.dot, sourceClassName)}/>
          </div>
        </div>
        <div className={styles.content} ref={this.content}>
          <div className={styles.judgeBox}>
            {
              judgeTypeList.length > 0 && judgeTypeList.map(item => {
                return (
                  <Tag color="rgb(22,155,213)" key={item}>{
                    AllJudgeTypeList.find(demo => demo.nameCd === item) && AllJudgeTypeList.find(demo => demo.nameCd === item).name
                  }</Tag>
                )
              })
            }
          </div>
          <div className={styles.formInputGroup}>
            <div className="formInputItem">
              <span>单规则拨打次数上限</span>
              <InputNumber
                value={callTimeLimit}
                min={0}
                max={999}
                onChange={value => {
                  this.setState({
                    callTimeLimit: value
                  })
                }}
              />
            </div>
            <div className="formInputItem">
              <span>本次拨打结果提示人工</span>
              <Radio.Group value={remindUser} onChange={e => this.setState({remindUser: e.target.value})}>
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </div>
            <div className="formInputItem">
              <span>本次拨打结果隐藏催记</span>
              <Radio.Group value={progressHidden} onChange={e => this.setState({progressHidden: e.target.value})}>
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </div>
            <div className="formInputItem">
              <span>下次拨打跟进间隔</span>
              <div className="multipleBox">
                <Input style={{width: 100}} value={followInterval}
                       onChange={e => this.setState({followInterval: e.target.value})}/>
                <Select style={{width: 80, marginLeft: 5}} value={followIntervalType}
                        onChange={value => this.setState({followIntervalType: value})}>
                  <Option value={1}>天</Option>
                  <Option value={2}>小时</Option>
                </Select>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default JudgeTypeGather
