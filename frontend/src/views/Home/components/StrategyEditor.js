import * as strategyServices from '@/services/strategy'
// import * as strategyServices from '@/services/strategy'
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Form, Input, message, Modal } from 'antd'
import React, { Component } from 'react';
import styles from './StrategyEditor.less';
import SubStrategy from './SubStrategy';

class StrategyEditor extends Component {
  state = {
    clientHeight: document.documentElement.clientHeight,
    subStrategyVisible: false,
    connectorInstance: null,
  }

  sourceClassName = 'source';

  targetClassName = 'target';

  // 列表元素类名
  sourceSetClassName = 'source-set';

  initConnector = () => {
    const connectorInstance = window.jsPlumb.newInstance({
      connector: ['Flowchart', { midpoint: 0.1, cornerRadius: 4 }],
      paintStyle: { strokeWidth: 3, stroke: "#008dc2" },
      hoverPaintStyle: {
        stroke: "#006dc2",
      },
      endpoint: ["Dot", { radius: 8 }],
      endpointStyle: { fill: "#008dc2" },
      endpointHoverStyle: {
        fill: "#006dc2",
      },
      container: "editor"
    });

    // 绑定事件监听
    connectorInstance.bind("connection", function (c) {
      console.log('connection', c);
    });

    // 更新
    connectorInstance.bind("connectionMoved", function (c) {
      console.log('connectionMoved', c);
    });

    // 连线删除
    connectorInstance.bind("beforeDetach", function (c) {
      return true;
    });

    connectorInstance.bind("dblclick", function (c) {
      connectorInstance.deleteConnection(c);
    });

    connectorInstance.addList(document.getElementById('editor'));

    this.setState({
      connectorInstance,
    });
  };

  addSubStrategyShow = () => {
    this.setState({
      subStrategyVisible: true
    })
  }

  /* addSubStrategy = async (paramsData) => {
    const { strategyId } = this.props
    const params = {
      ...paramsData,
      strategyId,
      strategyRuleList: [],
    }
    const { success, message: msg } = await strategyServices.addSubStrategy(params)
    if (success) {
      message.success(msg)
    }
  } */

  handleCancel = () => {
    this.setState({
      subStrategyVisible: false
    })
  }

  onFinish = async (paramsData) => {
    const { strategyId, getStrategyDetail } = this.props
    const params = {
      name: paramsData.name,
      strategyId,
      strategyRuleList: [],
    }
    const { success, result, message: msg } = await strategyServices.addSubStrategy(params)
    if (success) {
      message.success(msg)
      getStrategyDetail();
      this.handleCancel()
    }
  }

  componentDidMount() {
    this.initConnector();
  }

  render() {
    const { sourceClassName, targetClassName, sourceSetClassName, addSubStrategyShow } = this;
    const { clientHeight, connectorInstance, subStrategyVisible } = this.state;
    const { subStrategyList = [], AllJudgeTypeList = [] } = this.props
    return (
      <div className={styles.container} style={{ height: clientHeight - 300 }} id="editor">
        {
          subStrategyList.length > 0 && connectorInstance ? subStrategyList.map((subStrategyItem, index) => {
            return (
              <SubStrategy
                connector={connectorInstance}
                sourceClassName={sourceClassName}
                targetClassName={targetClassName}
                sourceSetClassName={sourceSetClassName}
                propsId={`list-${index + 1}`}
                subStrategyItem={subStrategyItem}
                key={subStrategyItem.id}
                AllJudgeTypeList={AllJudgeTypeList}
                addSubStrategyShow={addSubStrategyShow}
                getStrategyDetail={this.props.getStrategyDetail}
              />
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
          // onOk={this.addSubStrategy}
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
