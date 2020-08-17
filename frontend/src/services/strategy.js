import axios from "@/utils/axios";
import { stringify } from 'qs'
import api from "@/utils/api";

export const getStrategyDetail = params => {
  return axios.get(`${api.strategyDetail}?${stringify(params)}`)
}

export const addStrategy = params => {
  return axios.post(`${api.addStrategy}`, params)
}

export const addSubStrategy = params => {
  return axios.post(`${api.addSubStrategy}`, params)
}

export const getJudgeType = () => {
  return axios.get(`${api.judgeType}`)
}

export const getRouteList = () => {
  return axios.get(`${api.routeList}`)
}
