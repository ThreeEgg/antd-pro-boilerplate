import { Button, Input, InputNumber, Radio, Select, Tag, Modal } from 'antd'
import classNames from 'classnames'
import React, { Component, createRef } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styles from './JudgeTypeGather.less'

const { Option } = Select
const { confirm } = Modal;
const { Search } = Input;


class JudgeTypeGather extends Component {
  state = {
    callTimeLimit: null,
    remindUser: null,
    progressHidden: null,
    followInterval: null,
    followIntervalType: null,
    editName: false,
  }

  container = createRef();

  content = createRef();

  sourceElement = createRef();



  componentDidMount() {
    const { strategyRuleItem } = this.props
    this.setState({
      callTimeLimit: strategyRuleItem.callTimeLimit,
      remindUser: strategyRuleItem.remindUser,
      progressHidden: strategyRuleItem.progressHidden,
      followInterval: strategyRuleItem.followInterval,
      followIntervalType: strategyRuleItem.followIntervalType,
    });

    if (this.props.connector) {
      const container = this.container.current;
      Array.from(container.querySelectorAll(`.${this.props.sourceClassName}`)).forEach(this.makeSource);
      setTimeout(() => {
        // 在宏循环后初始化连接
        Array.from(document.querySelectorAll(`.${this.props.targetClassName}`)).find(item => {
          if (item.dataset.id === strategyRuleItem.nextSubStrategyId) {
            this.initConnection(item);
          }
        });
      });
    }

    // const height = this.content.current.scrollHeight;
    // this.content.current.style.setProperty('--max-height', `${height}px`)

  }

  componentDidUpdate(prevProps) {
    if (prevProps.strategyRuleItem !== this.props.strategyRuleItem) {
      const { strategyRuleItem } = this.props
      this.setState({
        callTimeLimit: strategyRuleItem.callTimeLimit,
        remindUser: strategyRuleItem.remindUser,
        progressHidden: strategyRuleItem.progressHidden,
        followInterval: strategyRuleItem.followInterval,
        followIntervalType: strategyRuleItem.followIntervalType,
      }, () => {
      })
    }
  }

  makeSource = (el) => {
    this.props.connector.makeSource(el, {
      allowLoopback: false,
      anchor: ["Left", "Right"],
      maxConnections: 1,
    });
  }

  initConnection = (targetElement) => {
    this.props.connector.connect({
      source: this.sourceElement.current,
      target: targetElement,
    });
  }

  deleteJudgeTypeGather = (strategyRuleItem) => {

    const { subStrategyItem, setSubStrategyItem } = this.props;
    subStrategyItem.strategyRuleList = subStrategyItem.strategyRuleList.filter((item) => item.ruleId !== strategyRuleItem.ruleId)

    confirm({
      title: '确认删除吗',
      icon: <ExclamationCircleOutlined />,
      content: '确认',
      onOk() {
        setSubStrategyItem(subStrategyItem, 1)
      },
      onCancel() {
      },
    });

  }

  editJudgeTypeGather = () => {
    this.setState({
      editName: true,
    })
  }

  updateStrategyRuleName = (value, strategyRuleItem) => {
    const { subStrategyItem, setSubStrategyItem } = this.props;
    subStrategyItem.strategyRuleList.forEach(item => {
      if (item.ruleId === strategyRuleItem.ruleId) {
        item.ruleName = value
      }
    })
    setSubStrategyItem(subStrategyItem, 2)
    this.setState({
      editName: false,
    })
  }

  render() {
    const { callTimeLimit, remindUser, progressHidden, followInterval, followIntervalType, editName } = this.state;
    const { strategyRuleItem, propsIndex, AllJudgeTypeList = [], sourceClassName, collapsed } = this.props;
    const { judgeTypeList = [] } = strategyRuleItem
    return (
      <Droppable droppableId={strategyRuleItem.ruleId}>
        {(provided, snapshot) => (
          <div
            className={classNames(styles.JudgeTypeGather, { [styles.collapsed]: collapsed })}
            ref={this.container}
          >
            <span
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <div className={styles.gatherTitleBox}>
                <div className="title" onDoubleClick={this.editJudgeTypeGather}>
                  <span>判断类型集{propsIndex + 1}：</span>
                  {
                    editName ?
                      <Search
                        defaultValue={strategyRuleItem.ruleName}
                        enterButton="确认"
                        onSearch={value => this.updateStrategyRuleName(value, strategyRuleItem)}
                        size="small"
                      />
                      :
                      <span>{strategyRuleItem.ruleName}</span>
                  }

                </div>
                <div className="btnBox">
                  <Button danger size="small" type="link" onClick={() => this.deleteJudgeTypeGather(strategyRuleItem)}>删除</Button>
                  <span ref={this.sourceElement} className={classNames(styles.dot, sourceClassName)}
                    data-id={strategyRuleItem.ruleId} />
                </div>
              </div>


              <div className={styles.content} ref={this.content}>
                <div className={styles.judgeBox}>
                  {
                    judgeTypeList && judgeTypeList.length > 0 && judgeTypeList.map((demoItem, demoIndex) => {
                      return (
                        <Draggable
                          draggableId={`${strategyRuleItem.ruleId}-${demoItem}`}
                          index={demoIndex}
                          key={`${strategyRuleItem.ruleId}-${demoItem}`}
                        >
                          {
                            (provided1, snapshot1) => (
                              <span
                                {...provided1.draggableProps}
                                {...provided1.dragHandleProps}
                                ref={provided1.innerRef}
                                isDragging={snapshot1.isDragging}
                              >
                                <Tag color="rgb(22,155,213)" key={demoItem}>{
                                  AllJudgeTypeList.find(demo => demo.nameCd === demoItem) && AllJudgeTypeList.find(demo => demo.nameCd === demoItem).name
                                }</Tag>
                              </span>
                            )
                          }
                        </Draggable>

                      )
                    })
                  }
                </div>
                <div className={styles.formInputGroup}>
                  <div className="formInputItem">
                    <span>单规则拨打次数上限</span>
                    <InputNumber
                      value={callTimeLimit}
                      min={0}
                      max={999}
                      onChange={value => {
                        this.setState({
                          callTimeLimit: value
                        })
                      }}
                    />
                  </div>
                  <div className="formInputItem">
                    <span>本次拨打结果提示人工</span>
                    <Radio.Group value={remindUser} onChange={e => this.setState({ remindUser: e.target.value })}>
                      <Radio value>是</Radio>
                      <Radio value={false}>否</Radio>
                    </Radio.Group>
                  </div>
                  <div className="formInputItem">
                    <span>本次拨打结果隐藏催记</span>
                    <Radio.Group value={progressHidden} onChange={e => this.setState({ progressHidden: e.target.value })}>
                      <Radio value>是</Radio>
                      <Radio value={false}>否</Radio>
                    </Radio.Group>
                  </div>
                  <div className="formInputItem">
                    <span>下次拨打跟进间隔</span>
                    <div className="multipleBox">
                      <Input style={{ width: 100 }} value={followInterval}
                        onChange={e => this.setState({ followInterval: e.target.value })} />
                      <Select style={{ width: 80, marginLeft: 5 }} value={followIntervalType}
                        onChange={value => this.setState({ followIntervalType: value })}>
                        <Option value={1}>天</Option>
                        <Option value={2}>小时</Option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </span>
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    )
  }
}
export default JudgeTypeGather
