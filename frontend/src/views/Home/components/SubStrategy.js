import * as strategyServices from '@/services/strategy'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Tag, Tooltip } from 'antd'
import classNames from 'classnames';
import React, { Component, createRef } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import JudgeTypeGather from './JudgeTypeGather'
import styles from './SubStrategy.less';

const { confirm } = Modal;
const { Search } = Input;

class SubStrategy extends Component {

  state = {
    addStrategyRuleVisible: false,
    subStrategyItem: {},
    collapsed: false,
    nameEdit: false,
  }

  judgeTypeGatherRefs = {}

  componentDidMount() {
    this.setState({
      subStrategyItem: this.props.subStrategyItem
    });

    if (this.props.connector) {
      const { sourceClassName, targetClassName, sourceSetClassName, propsId } = this.props;
      const container = document.getElementById(propsId);
      Array.from(container.querySelectorAll(`.${sourceSetClassName}`)).forEach(this.makeList);
      Array.from(container.querySelectorAll(`.${targetClassName}`)).forEach(this.makeTarget);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subStrategyItem !== this.props.subStrategyItem) {
      this.setState({
        subStrategyItem: this.props.subStrategyItem
      });
    }
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

  // 获取当前所有的连接
  getConnections = () => {
    return this.props.connector.connections;
  };


  addSubStrategyShow = () => {
    this.props.addSubStrategyShow()
  }

  setSubStrategyItem = (subStrategyItem, flag) => {
    this.setState({
      subStrategyItem,
    }, async () => {
      const success = await this.updateSubStrategy()
      if (success) {
        if (flag === 1) {
          message.success('删除成功')
          this.props.getStrategyDetail()
        } else if (flag === 2) {
          message.success('修改成功')
        }
      }
    })
  }

  updateSubStrategy = async (flag) => {
    const { subStrategyItem } = this.state;


    Object.keys(this.judgeTypeGatherRefs).forEach(key => {
      subStrategyItem.strategyRuleList.forEach(item => {
        if (item.ruleId === key) {
          item.callTimeLimit = this.judgeTypeGatherRefs[key].current.state.callTimeLimit;
          item.remindUser = this.judgeTypeGatherRefs[key].current.state.remindUser;
          item.progressHidden = this.judgeTypeGatherRefs[key].current.state.progressHidden;
          item.followInterval = this.judgeTypeGatherRefs[key].current.state.followInterval;
          item.followIntervalType = this.judgeTypeGatherRefs[key].current.state.followIntervalType;
        }
      })
    })
    const params = {
      id: subStrategyItem.id,
      name: subStrategyItem.name,
      strategyId: subStrategyItem.strategyId,
      strategyRuleList: subStrategyItem.strategyRuleList,
    };

    // 遍历每个判断类型集，更新连接情况
    const connections = this.getConnections();

    subStrategyItem.strategyRuleList.forEach(strategyRule => {
      const { ruleId } = strategyRule;
      if (!ruleId) {
        return;
      }
      // 重置连接数据，再重新从当前的连接中遍历出完整的数据
      strategyRule.nextSubStrategyId = null;
      connections.find(connection => {
        const { source, target, proxies } = connection;
        let sourceId = source.dataset.id;
        let targetId = target.dataset.id;

        if (proxies && proxies.length) {
          // 如果存在劫持，从劫持中找到真实的source、target
          // 刚场景存在于，list劫持了内部的source，比如列表滚动导致source元素隐藏，list此时会代理source
          const innerSourceId = source.id;
          const innerTargetId = target.id;
          proxies.forEach(proxy => {
            const { ep, originalEp } = proxy;
            // source被劫持
            if (ep.element.id === innerSourceId) {
              sourceId = originalEp.element.dataset.id;
              return;
            }
            // target被劫持
            if (ep.element.id === innerTargetId) {
              targetId = originalEp.element.dataset.id;
            }
          });
        }
        if (sourceId === ruleId) {
          strategyRule.nextSubStrategyId = targetId;
          return true;
        }
        return false;
      });
    });

    const { success } = await strategyServices.updateSubStrategy(params);
    if (success) {
      if (flag === 0) {
        message.success('保存成功')
      }

      /* result.unusedJudgeTypeList = subStrategyItem.unusedJudgeTypeList
      this.setState({
        subStrategyItem: result
      }, () => {

      }) */

      this.handleCancel()
      // return success;
    }
    return success


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
    const { subStrategyItem } = this.state;

    subStrategyItem.strategyRuleList.push({
      judgeTypeList: [],
      callTimeLimit: 999,
      remindUser: false,
      progressHidden: false,
      followInterval: 12,
      followIntervalType: 2,
      nextSubStrategyId: '',
      ...params,
    })
    this.setState({
      subStrategyItem
    }, async () => {
      const success = await this.updateSubStrategy()
      if (success) {
        message.success('新增成功')
        this.props.getStrategyDetail()

      }
    })
  }

  deleteSubStrategyConfirm = () => {
    const { subStrategyItem } = this.state
    const { connector } = this.props
    const that = this
    confirm({
      title: '是否删除该子策略',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        if (subStrategyItem.id) {
          const { connections } = connector;
          Array.from(connections).forEach((connection) => {
            const { source, target } = connection;
            const sourceId = source.dataset.id;
            const targetId = target.dataset.id;

            if (subStrategyItem.strategyRuleList.find(strategyRuleItem => strategyRuleItem.ruleId === sourceId)) {
              connector.deleteConnection(connection);
            }
            if (targetId === subStrategyItem.id) {
              connector.deleteConnection(connection);
            }
          })
        }
        that.deleteSubStrategy()
      },
      onCancel() {
      },
    });
  }

  deleteSubStrategy = async () => {
    const { subStrategyItem: { id } } = this.state;
    const { success, message: msg } = await strategyServices.deleteSubStrategy({ subStrategyId: id })
    if (success) {
      message.success(msg);
      this.props.getStrategyDetail()
    }
  }

  toggleCollapse = () => {
    this.setState((prevState) => ({ collapsed: !prevState.collapsed }))
  }

  editSubStrategyName = () => {
    this.setState({ nameEdit: true })
  }

  updateSubStrategyName = value => {
    const { subStrategyItem } = this.state
    subStrategyItem.name = value
    this.setState({
      subStrategyItem
    }, () => {
      const success = this.updateSubStrategy()
      if (success) {
        message.success('修改成功')
        this.setState({ nameEdit: false })
      }
    })
  }

  render() {
    const { propsId, AllJudgeTypeList = [], sourceClassName, targetClassName, sourceSetClassName, connector, propsIndex } = this.props;
    const { addStrategyRuleVisible, subStrategyItem, collapsed, nameEdit } = this.state;
    const { strategyRuleList = [] } = subStrategyItem;
    let isLong = false
    if (subStrategyItem.name && subStrategyItem.name.length > 5) {
      subStrategyItem.abbName = subStrategyItem.name.substring(0, 5)
      subStrategyItem.abbName += '...'
      isLong = true;
    }
    return (
      <Droppable droppableId={subStrategyItem.id}>
        {(provided, snapshot) => (
          <div className={styles.item} id={propsId}>
            <div className={classNames(styles.connectorHandler, targetClassName)}
              data-id={subStrategyItem.id}
              style={{ background: '#e6e6e6' }}
            />
            <div className={styles.titleBox}>
              <div className="title" onDoubleClick={this.editSubStrategyName}>
                <span>子拨打策略{propsIndex}：</span>
                {
                  nameEdit ? <Search defaultValue={subStrategyItem.name} enterButton="确认"
                    onSearch={value => this.updateSubStrategyName(value)} /> :
                    <Tooltip
                      title={subStrategyItem.name}
                    >
                      <span>{isLong ? subStrategyItem.abbName : (subStrategyItem.name || '暂未命名')}</span>
                    </Tooltip>
                }

              </div>
              <div className="btnBox">
                <Button type="primary" size="small" onClick={() => this.updateSubStrategy(0)}>保存</Button>
                <Button type="primary" size="small" onClick={this.addSubStrategyShow}>新增</Button>
                <Button danger size="small" onClick={this.deleteSubStrategyConfirm}>删除</Button>
                <Button type="primary" size="small" onClick={this.toggleCollapse}>{collapsed ? '展开' : '收起'}</Button>
              </div>
            </div>
            <div className={styles.judgeType}
              // provided.droppableProps应用的相同元素.
              {...provided.droppableProps}
              // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
              ref={provided.innerRef}
            // isDraggingOver={snapshot.isDraggingOver}
            >
              <span>判断类型</span>
              <div className={styles.judgeTypeBox}>
                {
                  subStrategyItem.unusedJudgeTypeList && subStrategyItem.unusedJudgeTypeList.map((item, index) => {
                    return (
                      <Draggable
                        draggableId={`${subStrategyItem.id}-${item}`}
                        index={index}
                        key={`${subStrategyItem.id}-${item}`}
                      >
                        {
                          (provided1, snapshot1) => (
                            <span
                              {...provided1.draggableProps}
                              {...provided1.dragHandleProps}
                              ref={provided1.innerRef}
                            // isDragging={snapshot1.isDragging}
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
                  let ref = this.judgeTypeGatherRefs[`${strategyRuleItem.ruleId}`];
                  if (!ref) {
                    this.judgeTypeGatherRefs[strategyRuleItem.ruleId] = createRef();
                    ref = this.judgeTypeGatherRefs[strategyRuleItem.ruleId];
                  }
                  return (
                    <JudgeTypeGather
                      ref={ref}
                      strategyRuleItem={strategyRuleItem}
                      subStrategyItem={subStrategyItem}
                      key={strategyRuleItem.ruleId}
                      connector={connector}
                      propsIndex={index}
                      AllJudgeTypeList={AllJudgeTypeList}
                      setSubStrategyItem={this.setSubStrategyItem}
                      updateSubStrategy={this.updateSubStrategy}
                      sourceClassName={sourceClassName}
                      targetClassName={targetClassName}
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
              destroyOnClose
            >
              <Form name="judgeTypeGatherForm" onFinish={this.onFinish}>
                <Form.Item
                  label="判断类型集名称"
                  name="ruleName"
                  rules={[
                    { required: true, message: '请输入判断类型集名称' },
                  ]}
                >
                  <Input placeholder="请输入判断类型集名称" maxLength={40} />
                </Form.Item>
              </Form>
            </Modal>
            {provided.placeholder}
          </div>
        )

        }
      </Droppable>
    )
  }
}

export default SubStrategy
