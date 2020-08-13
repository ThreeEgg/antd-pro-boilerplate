import React, { Component } from 'react';
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

  render() {
    const { clientHeight } = this.state;
    const { subStrategyList = [], judgeTypeList = [] } = this.props
    return (
      <div className={styles.container} style={{ height: clientHeight - 265 }} id="editor">
        {
          subStrategyList.map((subStrategyItem, index) => {
            return (
              <SubStrategy propsId={`list-${index + 1}`} subStrategyItem={subStrategyItem} key={subStrategyItem.id} judgeTypeList={judgeTypeList} />
            )
          })
        }
      </div>
    );
  }
}

export default StrategyEditor;
