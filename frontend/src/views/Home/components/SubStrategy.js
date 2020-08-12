import React, { Component } from 'react'
import { Button, Tag } from 'antd'
import JudgeTypeGather from './JudgeTypeGather'
import styles from './StrategyEditor.less'


class SubStrategy extends Component {

  state = {

  }

  render() {
    const { propsId } = this.props;
    return (
      <div className={styles.item} id={propsId}>
        <div className={styles.titleBox}>
          <div className="title">
            <span>子拨打策略1：</span>
            <span>暂未命名</span>
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
            <Tag color="rgb(22,155,213)">身体异常</Tag>
            <Tag color="rgb(22,155,213)">承诺还款</Tag>
            <Tag color="rgb(22,155,213)">投诉预警</Tag>
            <Tag color="rgb(22,155,213)">人工介入</Tag>
            <Tag color="rgb(22,155,213)">身体异常</Tag>
            <Tag color="rgb(22,155,213)">承诺还款</Tag>
            <Tag color="rgb(22,155,213)">投诉预警</Tag>
            <Tag color="rgb(22,155,213)">人工介入</Tag>
          </div>
        </div>
        <div className={styles.judgeTypeGatherBox}>
          <JudgeTypeGather />
          <JudgeTypeGather />
          <JudgeTypeGather />
        </div>
      </div>
    )
  }
}

export default SubStrategy
