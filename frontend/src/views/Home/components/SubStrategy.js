import { Button, Tag } from 'antd'
import classNames from 'classnames';
import React, { Component } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import JudgeTypeGather from './JudgeTypeGather'
import styles from './SubStrategy.less';

class SubStrategy extends Component {

  state = {
    judgeTypeList: []
  }

  makeList = (el) => {
    this.props.connector.addList(el);
  }

  makeSource = (el) => {
    this.props.connector.makeSource(el, {
      allowLoopback: false,
      anchor: ["Left", "Right"]
    });
  }

  makeTarget = (el) => {
    this.props.connector.makeTarget(el, {
      allowLoopback: false,
      anchor: ["Top"]
    });
  }

  componentDidMount() {
    console.log(this.props.subStrategyItem.strategyRuleList);

    console.log(this.props.connector)
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.connector) {
      if (prevProps.connector !== this.props.connector) {
        const { sourceClassName, targetClassName, sourceSetClassName, propsId } = this.props;
        const container = document.getElementById(propsId);
        console.log(Array.from(container.querySelectorAll(sourceSetClassName)))
        Array.from(container.querySelectorAll(sourceSetClassName)).forEach(this.makeList);
        Array.from(container.querySelectorAll(sourceClassName)).forEach(this.makeSource);
        Array.from(container.querySelectorAll(targetClassName)).forEach(this.makeTarget);
      }
    }
  }

  render() {
    const { propsId, subStrategyItem, AllJudgeTypeList = [], sourceClassName, targetClassName, sourceSetClassName } = this.props;
    const { strategyRuleList = [] } = subStrategyItem;
    const { judgeTypeList } = this.state
    return (
      <Droppable droppableId={subStrategyItem.id}>
        {(provided, snapshot) => (
          <div className={styles.item} id={propsId}
            // provided.droppableProps应用的相同元素.
            {...provided.droppableProps}
            // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
            ref={provided.innerRef}
          >
            <div className={classNames(styles.connectorHandler, targetClassName)} />
            <div className={styles.titleBox}>
              <div className="title">
                <span>子拨打策略1：</span>
                <span>{subStrategyItem.name || '暂未命名'}</span>
              </div>
              <div className="btnBox">
                <Button type="primary" size="small">保存</Button>
                <Button type="primary" size="small">新增</Button>
                <Button danger size="small">删除</Button>
                <Button type="primary" size="small">收起</Button>
              </div>
            </div>
            <div className={styles.judgeType}>
              <span>判断类型</span>
              <div className={styles.judgeTypeBox}>
                {
                  subStrategyItem.unusedJudgeTypeList.map((item, index) => {
                    return (
                      <Draggable
                        draggableId={item}
                        index={index}
                        key={index}
                      >
                        {
                          (provided1, snapshot1) => (
                            <span
                              {...provided1.draggableProps}
                              {...provided1.dragHandleProps}
                              ref={provided1.innerRef}
                              isDragging={snapshot1.isDragging}
                            >
                              <Tag color="rgb(22,155,213)" key={item}>{
                                AllJudgeTypeList.find(demo => demo.nameCd === item) && AllJudgeTypeList.find(demo => demo.nameCd === item).name
                              }</Tag>
                            </span>
                          )
                        }
                      </Draggable>

                    )
                  })
                }
              </div>
            </div>
            {/* 判断类型集列表 */}
            <div className={classNames(styles.judgeTypeGatherBox, sourceSetClassName)}>
              {
                strategyRuleList.map((strategyRuleItem, index) => {
                  return (
                    <JudgeTypeGather strategyRuleItem={strategyRuleItem} key={strategyRuleItem.ruleId}
                      propsIndex={index} AllJudgeTypeList={AllJudgeTypeList} />
                  )
                })
              }
              <div className={styles.addJudgeTypeGather}>
                +新增判断类型集
              </div>
            </div>
          </div>
        )

        }
      </Droppable>
    )
  }
}

export default SubStrategy
