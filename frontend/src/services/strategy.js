import axios from "@/utils/axios";
import { stringify } from 'qs'
import api from "@/utils/api";

export const getStrategyDetail = params => {
  return axios.get(`${api.strategyDetail}?${stringify(params)}`)
}

export const getJudgeType = () => {
  return axios.get(`${api.judgeType}`)
}