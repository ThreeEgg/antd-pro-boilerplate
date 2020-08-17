import React, { Component } from 'react'
import { Button, Tag } from 'antd'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import JudgeTypeGather from './JudgeTypeGather'
import styles from './StrategyEditor.less'

class SubStrategy extends Component {

  state = {
    judgeTypeList: []
  }

  componentDidMount() {
    const { AllJudgeTypeList, subStrategyItem: { unusedJudgeTypeList } } = this.props;

    console.log()
  }


  render() {
    const { propsId, subStrategyItem, AllJudgeTypeList = [] } = this.props;
    const { strategyRuleList = [] } = subStrategyItem;
    const { judgeTypeList } = this.state
    console.log('subStrategyItem', subStrategyItem)
    return (
      <Droppable droppableId={subStrategyItem.id}>
        {(provided, snapshot) => (
          <div className={styles.item} id={propsId}
            // provided.droppableProps应用的相同元素.
            {...provided.droppableProps}
            // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
            ref={provided.innerRef}
          >
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
                                AllJudgeTypeList.find(demo => demo.nameCd === item).name
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
            <div className={styles.judgeTypeGatherBox}>
              {
                strategyRuleList.map((strategyRuleItem, index) => {
                  return (
                    <JudgeTypeGather strategyRuleItem={strategyRuleItem} key={strategyRuleItem.ruleId} propsIndex={index} AllJudgeTypeList={AllJudgeTypeList} />
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
