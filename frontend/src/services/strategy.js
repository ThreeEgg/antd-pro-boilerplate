import axios from "@/utils/axios";
import { stringify } from 'qs'
import api from "@/utils/api";

export const getStrategyDetail = params => {
  return axios.get(`${api.strategyDetail}?${stringify(params)}`)
}

export const addStrategy = params => {
  return axios.post(`${api.addStrategy}`, params)
}

export const updateStrategy = params => {
  return axios.put(`${api.updateStrategy}`, params)
}

/* export const updateStrategy = params => {
  return axios.get(`${api.updateStrategy}?${stringify(params)}`)
} */

export const addSubStrategy = params => {
  return axios.post(`${api.addSubStrategy}`, params)
}

export const updateSubStrategy = params => {
  return axios.post(`${api.updateSubStrategy}`, params)
}

export const deleteSubStrategy = params => {
  return axios.delete(`${api.deleteSubStrategy}?${stringify(params)}`)
}

export const getJudgeType = () => {
  return axios.get(`${api.judgeType}`)
}

export const getRouteList = () => {
  return axios.get(`${api.routeList}`)
}

export const updateStopCallTask = params => {
  return axios.post(`${api.updateStopCallTask}`, params)
}
