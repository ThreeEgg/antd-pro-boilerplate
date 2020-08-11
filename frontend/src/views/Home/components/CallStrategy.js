import React, { Component } from 'react'
import styles from './CallStrategy.less'
import { Button, } from 'antd'
import StrategyEditor from "./StrategyEditor";
class CallStrategy extends Component {
  render() {
    return (
      <>
        <div className={styles.baseInfoInput}>
          <div className={styles.titleBox}>
            <div className="title">拨打策略集-智能对话</div>
            <div className="btnBox">
              <Button>返回</Button>
              <Button type="primary">保存</Button>
            </div>
          </div>


        </div>
        <div className="svgBox">
            <StrategyEditor />
        </div>
      </>
    )
  }
}

export default CallStrategy
