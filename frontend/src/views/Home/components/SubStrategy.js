import React, { Component } from 'react'
import { Button, Tag } from 'antd'
import JudgeTypeGather from './JudgeTypeGather'
import styles from './StrategyEditor.less'


class SubStrategy extends Component {

  state = {
    judgeTypeList: []
  }

  componentDidMount() {
    const { AllJudgeTypeList, subStrategyItem: { unusedJudgeTypeList } } = this.props;

    console.log()
  }

  render() {
    const { propsId, subStrategyItem, AllJudgeTypeList = [] } = this.props;
    const { strategyRuleList = [] } = subStrategyItem;
    const { judgeTypeList } = this.state
    console.log('subStrategyItem', subStrategyItem)
    return (
      <div className={styles.item} id={propsId}>
        <div className={styles.titleBox}>
          <div className="title">
            <span>子拨打策略1：</span>
            <span>{subStrategyItem.name || '暂未命名'}</span>
          </div>
          <div className="btnBox">
            <Button type="primary" size="small">保存</Button>
            <Button type="primary" size="small">新增</Button>
            <Button danger size="small">删除</Button>
            <Button type="primary" size="small">收起</Button>
          </div>
        </div>
        <div className={styles.judgeType}>
          <span>判断类型</span>
          <div className={styles.judgeTypeBox}>
            {
              subStrategyItem.unusedJudgeTypeList.map(item => {
                return (
                  <Tag color="rgb(22,155,213)" key={item}>{item}</Tag>
                )
              })
            }
          </div>
        </div>
        <div className={styles.judgeTypeGatherBox}>
          {
            strategyRuleList.map((strategyRuleItem, index) => {
              return (
                <JudgeTypeGather strategyRuleItem={strategyRuleItem} key={strategyRuleItem.ruleId} propsIndex={index} />
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default SubStrategy
