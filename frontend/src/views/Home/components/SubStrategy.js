import * as strategyServices from '@/services/strategy'
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Button, Form, Input, message, Modal, Tag} from 'antd'
import classNames from 'classnames';
import React, {Component} from 'react'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import JudgeTypeGather from './JudgeTypeGather'
import styles from './SubStrategy.less';

const {confirm} = Modal;

class SubStrategy extends Component {

  state = {
    addStrategyRuleVisible: false,
    collapsed: false,
  }

  makeList = (el) => {
    this.props.connector.addList(el);
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

    this.setState({
      subStrategyItem: this.props.subStrategyItem
    });

    if (this.props.connector) {
      const {sourceClassName, targetClassName, sourceSetClassName, propsId} = this.props;
      const container = document.getElementById(propsId);
      Array.from(container.querySelectorAll('.' + sourceSetClassName)).forEach(this.makeList);
      Array.from(container.querySelectorAll('.' + targetClassName)).forEach(this.makeTarget);
    }
  }

  addSubStrategyShow = () => {
    this.props.addSubStrategyShow()
  }

  updateSubStrategy = async () => {
    const {subStrategyItem} = this.state;
    console.log('subStrategyItem', subStrategyItem)
    const params = {
      id: subStrategyItem.id,
      name: subStrategyItem.name,
      strategyId: subStrategyItem.strategyId,
      strategyRuleList: subStrategyItem.strategyRuleList,
    }
    const {success} = await strategyServices.updateSubStrategy(params);

  }

  handleCancel = () => {
    this.setState({
      addStrategyRuleVisible: false,
    })
  }

  addJudgeTypeGather = () => {
    this.setState({
      addStrategyRuleVisible: true,
    })
  }

  onFinish = params => {
    console.log('params', params)
    const {subStrategyItem} = this.state;
    subStrategyItem.strategyRuleList.push({
      strategyRuleList: [],
      callTimeLimit: 1,
      remindUser: true,
      progressHidden: true,
      followInterval: 1,
      followIntervalType: 1,
      nextSubStrategyId: '',
    })
    this.setState({
      subStrategyItem
    }, () => {
      this.updateSubStrategy()
    })
  }

  deleteSubStrategyConfirm = () => {
    const that = this
    confirm({
      title: '删除该子策略',
      icon: <ExclamationCircleOutlined/>,
      content: '请确认',
      onOk() {
        that.deleteSubStrategy()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  deleteSubStrategy = async () => {
    const {subStrategyItem: {id}} = this.state;
    const {success, message: msg} = await strategyServices.deleteSubStrategy({subStrategyId: id})
    if (success) {
      message.success(msg);
      this.props.getStrategyDetail()
    }
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const {propsId, subStrategyItem, AllJudgeTypeList = [], sourceClassName, targetClassName, sourceSetClassName, connector} = this.props;
    const {strategyRuleList = []} = subStrategyItem;
    const {addStrategyRuleVisible, collapsed} = this.state
    return (
      <Droppable droppableId={subStrategyItem.id}>
        {(provided, snapshot) => (
          <div className={styles.item} id={propsId}
            // provided.droppableProps应用的相同元素.
               {...provided.droppableProps}
            // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
               ref={provided.innerRef}
          >
            <div className={classNames(styles.connectorHandler, targetClassName)}/>
            <div className={styles.titleBox}>
              <div className="title">
                <span>子拨打策略1：</span>
                <span>{subStrategyItem.name || '暂未命名'}</span>
              </div>
              <div className="btnBox">
                <Button type="primary" size="small" onClick={this.updateSubStrategy}>保存</Button>
                <Button type="primary" size="small" onClick={this.addSubStrategyShow}>新增</Button>
                <Button danger size="small" onClick={this.deleteSubStrategyConfirm}>删除</Button>
                <Button type="primary" size="small" onClick={this.toggleCollapse}>{collapsed ? '展开' : '收起'}</Button>
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
                        key={item}
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
                strategyRuleList.length > 0 && strategyRuleList.map((strategyRuleItem, index) => {
                  return (
                    <JudgeTypeGather
                      key={strategyRuleItem.ruleId}
                      connector={connector}
                      sourceClassName={sourceClassName}
                      propsIndex={index}
                      strategyRuleItem={strategyRuleItem}
                      AllJudgeTypeList={AllJudgeTypeList}
                      collapsed={collapsed}
                    />
                  )
                })
              }
              <div className={styles.addJudgeTypeGather} onClick={this.addJudgeTypeGather}>
                +新增判断类型集
              </div>
            </div>
            <Modal
              title="新增判断类型集"
              visible={addStrategyRuleVisible}
              // onOk={this.handleOk}
              onCancel={this.handleCancel}
              okButtonProps={{
                form: 'judgeTypeGatherForm',
                htmlType: 'submit',
              }}
            >
              <Form name="judgeTypeGatherForm" onFinish={this.onFinish}>
                <Form.Item
                  label="判断类型集名称"
                  name="ruleName"
                  rules={[
                    {required: true, message: '请输入判断类型集名称'},
                  ]}
                >
                  <Input placeholder="请输入判断类型集名称" maxLength={40}/>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        )

        }
      </Droppable>
    )
  }
}

export default SubStrategy
