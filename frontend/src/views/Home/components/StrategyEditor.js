import React, {Component} from 'react';
import styles from './StrategyEditor.less';
import SubStrategy from './SubStrategy'

class StrategyEditor extends Component {


  state = {
    clientHeight: document.documentElement.clientHeight,
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
      connector: ['Flowchart', {midpoint: 0.1, cornerRadius: 4}],
      paintStyle: {strokeWidth: 2, stroke: "#ffa500"},
      endpoint: ["Dot", {radius: 8}],
      endpointStyle: {fill: "#ffa500"},
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

  render() {
    const {sourceClassName, targetClassName, sourceSetClassName} = this;
    const {clientHeight, connectorInstance} = this.state;
    const {subStrategyList = [], AllJudgeTypeList = []} = this.props;
    return (
      <div className={styles.container} style={{height: clientHeight - 265}} id="editor">
        {
          subStrategyList.map((subStrategyItem, index) => {
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
              />
            )
          })
        }
      </div>
    );
  }
}

export default StrategyEditor;
