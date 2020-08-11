import React, { Component } from 'react'
import styles from './CallStrategy.less'
import { withRouter } from 'react-router-dom'
import { Button, Input, Select, Row, Col } from 'antd'
const { TextArea } = Input;
const { Option } = Select;

class CallStrategy extends Component {

  state = {
  }

  colAdapt = (xs, sm, md, lg, xl, xxl) => {
    return {
      xs, sm, md, lg, xl, xxl
    }
  }

  goToForbidStrategy = () => {
    const { history } = this.props;
    history && history.push('/forbidCallStrategy')
  }

  render() {
    return (
      <div className={styles.CallStrategy}>
        <div className={styles.baseInfoInput}>
          <div className={styles.titleBox}>
            <div className="title">
              <span>拨打策略集-智能对话</span>
              <Button type="link" onClick={this.goToForbidStrategy}>设置禁止&顺延拨打管理</Button>
            </div>
            <div className="btnBox">
              <Button>返回</Button>
              <Button type="primary" style={{ marginLeft: 5 }}>保存</Button>
            </div>
          </div>
          <Row className={styles.inputBox}>
            <Col className="inputBoxLeft" {...this.colAdapt(24, 24, 24, 14, 8, 8)}>
              <div className="inputItem">
                <span>策略名称</span>
                <Input type="text" />
              </div>
              <div className="inputItem">
                <span>总拨打次数上限</span>
                <Input type="text" />
              </div>
              <div className="inputItem">
                <span>选择线路地区</span>
                <Select mode="multiple"
                >
                  <Option value={1}>111</Option>
                  <Option value={2}>222</Option>
                  <Option value={3}>333</Option>
                  <Option value={4}>444</Option>
                </Select>
              </div>
              <div className="inputItem">
                <span>首次拨打生效间隔</span>
                <Select
                >
                  <Option value={1}>立即生效</Option>
                  <Option value={2}>1天</Option>
                </Select>
              </div>
              <div className="inputItem">
                <span>策略说明</span>
                <TextArea />
              </div>
            </Col>
          </Row>

        </div>
        <div className="svgBox">

        </div>
      </div>
    )
  }
}

export default withRouter(CallStrategy)
