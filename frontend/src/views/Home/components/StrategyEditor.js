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

  componentDidMount() {
    this.initConnector();
  }

  initConnector = () => {
    const connectorInstance = window.jsPlumb.newInstance({
      // anchor: ["Perimeter", { shape: "Square", anchorCount: 150 }],
      connectionsDetachable: true,
      reattachConnections: true,
      connector: ['Flowchart', { gap: 10, cornerRadius: 5, alwaysRespectStubs: true, midpoint: 0.08, }],
      paintStyle: { strokeWidth: 5, stroke: "rgba(0,165,200,0.3)" },
      hoverPaintStyle: {
        stroke: "rgba(0,0,255,0.8)",
      },
      connectionOverlays: [                 // 连线上的默认样式  这里是箭头
        ["Arrow", {
          location: 0.5,
          paintStyle: {
            stroke: '#00688B',
            fill: '#00688B',
          }
        }]
      ],
      endpoint: ["Dot", { radius: 8 }],
      endpointStyle: { fill: "#008dc2" },
      endpointHoverStyle: {
        fill: "#006dc2",
      },
      container: "editor",
    });

    /* // 绑定事件监听
    connectorInstance.bind("connection", function (c) {
      // console.log('connection', c);
    });

    // 更新
    connectorInstance.bind("connectionMoved", function (c) {
      // console.log('connectionMoved', c);
    });

    // 连线删除
    connectorInstance.bind("beforeDetach", function (c) {
      return true;
    }); */

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
    const { success, message: msg } = await strategyServices.addSubStrategy(params)
    if (success) {
      message.success(msg)
      getStrategyDetail();
      this.handleCancel()
    }
  }


  render() {
    const { sourceClassName, targetClassName, sourceSetClassName, addSubStrategyShow } = this;
    const { clientHeight, connectorInstance, subStrategyVisible } = this.state;
    const { subStrategyList = [], AllJudgeTypeList = [] } = this.props
    return (
      <div className={styles.container} id="editor">
        {
          subStrategyList.length > 0 && connectorInstance ? subStrategyList.map((subStrategyItem, index) => {
            return (
              <SubStrategy
                connector={connectorInstance}
                sourceClassName={sourceClassName}
                targetClassName={targetClassName}
                sourceSetClassName={sourceSetClassName}
                propsId={`list-${index + 1}`}
                propsIndex={index + 1}
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
