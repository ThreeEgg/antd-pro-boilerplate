import React, { Component } from 'react';
import { Tag } from 'antd';
import styles from './StrategyEditor.less';
import SubStrategy from './SubStrategy'

class StrategyEditor extends Component {

  instance = null;

  state = {
    clientHeight: document.documentElement.clientHeight
  }

  componentDidMount() {
    this.initJsPlumbInstance();
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

    const list1El = window.document.querySelector("#list-one");
    const list2El = window.document.querySelector("#list-two");
    const list3El = window.document.querySelector("#list-three");
    const list4El = window.document.querySelector("#list-four");

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

  render() {
    const { clientHeight } = this.state;
    return (
      <div className={styles.container} style={{ height: clientHeight - 265 }} id="editor">

        <SubStrategy propsId="list-one" />
        <SubStrategy propsId="list-two" />
        <SubStrategy propsId="list-three" />
        <SubStrategy propsId="list-four" />
      </div>
    );
  }
}

export default StrategyEditor;
