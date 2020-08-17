import React, { Component } from 'react';
import * as strategyServices from '@/services/strategy'
import { PlusCircleTwoTone } from '@ant-design/icons';
import { Modal, Form, Input } from 'antd'
import styles from './StrategyEditor.less';
import SubStrategy from './SubStrategy';

class StrategyEditor extends Component {

  instance = null;

  state = {
    clientHeight: document.documentElement.clientHeight,
    subStrategyVisible: true,
  }

  componentDidMount() {
    // this.initJsPlumbInstance();
  }



  initJsPlumbInstance = () => {
    this.instance = window.jsPlumb.newInstance({
      connector: ['Flowchart', { midpoint: 0.1, cornerRadius: 4 }],
      paintStyle: { strokeWidth: 2, stroke: "#ffa500" },
      endpoint: ["Dot", { radius: 8 }],
      endpointStyle: { fill: "#ffa500" },
      container: "editor"
    });

    const { instance } = this;

    const list1El = window.document.querySelector("#list-1");
    const list2El = window.document.querySelector("#list-2");
    const list3El = window.document.querySelector("#list-3");
    const list4El = window.document.querySelector("#list-4");

    // 设置Source
    const items = list1El.querySelectorAll(".source");
    for (let i = 0; i < items.length; i += 1) {
      instance.makeSource(items[i], {
        allowLoopback: false,
        anchor: ["Left", "Right"]
      });
    }
    // 设置Target
    instance.makeTarget(list2El, {
      allowLoopback: false,
      anchor: ["Top"]
    });
    instance.makeTarget(list3El, {
      allowLoopback: false,
      anchor: ["Top"]
    });
    instance.makeTarget(list4El, {
      allowLoopback: false,
      anchor: ["Top"]
    });

    // 附加list类名，用于list中的节点联动
    Array.from(window.document.querySelectorAll('.source-set')).forEach(el => {
      instance.addList(el);
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
    const { clientHeight, subStrategyVisible } = this.state;
    const { subStrategyList = [], AllJudgeTypeList = [] } = this.props
    return (
      <div className={styles.container} style={{ height: clientHeight - 300 }} id="editor">
        {
          subStrategyList.length > 0 ? subStrategyList.map((subStrategyItem, index) => {
            return (
              <SubStrategy
                propsId={`list-${index + 1}`}
                subStrategyItem={subStrategyItem}
                key={subStrategyItem.id}
                AllJudgeTypeList={AllJudgeTypeList}

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
