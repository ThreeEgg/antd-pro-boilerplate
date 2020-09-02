export default {
  /**
   *  urlName:url
   */
  strategyDetail: '/xiaoGoRobot/strategy/getStrategy',// 获取策略详情
  addStrategy: '/xiaoGoRobot/strategy/saveStrategy',// 保存新增策略
  updateStrategy: '/xiaoGoRobot/strategy/updateStrategy',// 更新策略
  addSubStrategy: '/xiaoGoRobot/strategy/saveSubStrategy',// 保存新增子策略
  updateSubStrategy: '/xiaoGoRobot/strategy/updateSubStrategy', // 更新子策略
  deleteSubStrategy: '/xiaoGoRobot/strategy/deleteSubStrategy',// 删除子策略

  updateStopCallTask: '/xiaoGoRobot/strategy/updateStopCallTask', // 更新禁止拨打任务

  judgeType: '/xiaoGoRobot/strategy/listJudgeTypes',// 获取判断类型
  routeList: '/xiaoGoRobot/callCenter/listAllCallCenterAreas',// 获取所有线路

  caseStatusList: '/xiaoGoRobot/fetchConfig/listProgressCodes', // 获取案件状态
}
