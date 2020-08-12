import React, { Component } from 'react'
import {
  Button, Tag, InputNumber, Radio, Input,
  Select,
} from 'antd'
import classNames from 'classnames'
import styles from './StrategyEditor.less'

const { Option } = Select
class JudgeTypeGather extends Component {

  state = {

  }

  render() {
    return (
      <div className={classNames(styles.JudgeTypeGather, 'source')}>
        <div className={styles.gatherTitleBox}>
          <div className="title">
            <span>判断类型集1：</span>
            <span>需人工</span>
          </div>
          <div className="btnBox">
            <Button danger size="small" type="link">删除</Button>
          </div>
        </div>
        <div className={styles.judgeBox}>
          <Tag color="rgb(22,155,213)">身体异常</Tag>
          <Tag color="rgb(22,155,213)">承诺还款</Tag>
          <Tag color="rgb(22,155,213)">投诉预警</Tag>
          <Tag color="rgb(22,155,213)">人工介入</Tag>
        </div>
        <div className={styles.formInputGroup}>
          <div className="formInputItem">
            <span>单规则拨打次数上限</span>
            <InputNumber
              min={0}
              max={999}
            />
          </div>
          <div className="formInputItem">
            <span>本次拨打结果提示人工</span>
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </div>
          <div className="formInputItem">
            <span>本次拨打结果隐藏催记</span>
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </div>
          <div className="formInputItem">
            <span>下次拨打跟进间隔</span>
            <div className="multipleBox">
              <Input style={{ width: 100 }} />
              <Select style={{ width: 80, marginLeft: 5 }}>
                <Option value={1}>天</Option>
                <Option value={2}>小时</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JudgeTypeGather
