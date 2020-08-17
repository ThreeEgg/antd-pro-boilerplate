import React, { Component } from 'react';
// import * as strategyServices from '@/services/strategy'
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Modal, Form, Input } from 'antd'
import styles from './StrategyEditor.less';
import SubStrategy from './SubStrategy';

class StrategyEditor extends Component {


  state = {
    clientHeight: document.documentElement.clientHeight,
    subStrategyVisible: true,
    connectorInstance: null,
  }

  sourceClassName = 'source';

  targetClassName = 'target';

  sourceSetClassName = 'source-set';

  componentDidMount() {
    this.initConnector();
  }

  initConnector = () => {
    const connectorInstance = window.jsPlumb.newInstance({
      connector: ['Flowchart', { midpoint: 0.1, cornerRadius: 4 }],
      paintStyle: { strokeWidth: 2, stroke: "#ffa500" },
      endpoint: ["Dot", { radius: 8 }],
      endpointStyle: { fill: "#ffa500" },
      container: "editor"
    });

    // 绑定事件监听
    connectorInstance.bind("connection", function (c) {
      console.log('connection', c);
    });

    connectorInstance.bind("connection", function (c) {
      console.log('connectionDetached', c);
    });

    connectorInstance.bind("connectionMoved", function (c) {
      console.log('connectionMoved', c);
    });

    this.setState({
      connectorInstance,
    });
  }

  addSubStrategyShow = () => {
    this.setState({
      subStrategyVisible: true
    })
  }

  addSubStrategy = () => {

  }

  handleCancel = () => {
    this.setState({
      subStrategyVisible: false
    })
  }

  onFinish = paramsData => {
    const params = paramsData;
    console.log('params', params)
  }

  render() {
    const { sourceClassName, targetClassName, sourceSetClassName } = this;
    const { clientHeight, connectorInstance, subStrategyVisible } = this.state;
    const { subStrategyList = [], AllJudgeTypeList = [] } = this.props
    return (
      <div className={styles.container} style={{ height: clientHeight - 300 }} id="editor">
        {
          subStrategyList.length > 0 ? subStrategyList.map((subStrategyItem, index) => {
            return (
              <SubStrategy
                connector={connectorInstance}
                sourceClassName={sourceClassName}
                targetClassName={targetClassName}
                sourceSetClassName={sourceSetClassName}
                propsId={`list-${index + 1}`}
                subStrategyItem={subStrategyItem}
                key={subStrategyItem.id}
                AllJudgeTypeList={AllJudgeTypeList} />
            )
          }) :
            <div className={styles.empty} onClick={this.addSubStrategyShow}>
              <PlusCircleTwoTone />
            </div>
        }

        {/* 新增子策略弹窗 */}
        <Modal
          title="新增子策略"
          visible={subStrategyVisible}
          onOk={this.addSubStrategy}
          onCancel={this.handleCancel}
          okButtonProps={{
            form: 'subStrategyForm',
            htmlType: 'submit',
          }}
        >
          <Form name="subStrategyForm" onFinish={this.onFinish}>
            <Form.Item
              label="子拨打策略名称"
              name="name"
              rules={[
                { required: true, message: '请输入子拨打策略名称' },
              ]}
            >
              <Input placeholder="请输入子拨打策略名称" maxLength={40} />
            </Form.Item>
          </Form>

        </Modal>
      </div>
    );
  }
}

export default StrategyEditor;
