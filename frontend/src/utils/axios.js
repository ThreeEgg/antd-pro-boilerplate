import Axios from 'axios';
// import qs from 'qs';
import { notification } from 'antd';

const axios = Axios.create({
  validateStatus(status) {
    return status < 500 && status !== 400; // Resolve only if the status code is less than 500
  },
});
axios.defaults.baseURL = '/lxcs-admin'
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(
  configData => {
    const config = configData
    if (config.method === 'post') {
      config.data = JSON.stringify(config.data);
    }
    /* const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = token;
    } */
    return config;
  },
  error => {
    notification.error({
      message: '失败',
      description: '请求超时',
      duration: 1000,
      placement: 'topRight',
    });
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    const { config } = response;
    if (config.responseType === 'blob') {
      return response.data
    }
    const { status } = response;
    if (status !== 200) {
      notification.error({
        message: status,
        // description: isDev ? url.split('?')[0] : '',
        placement: 'topRight',
      });

    } else {
      const {
        data: {
          success, message: msg,
        },
        config: {
          url
        }
      } = response
      const isDev = process.env.NODE_ENV === "development"
      if (!success) {
        notification.error({
          message: msg,
          description: isDev ? url.split('?')[0] : '',
          placement: 'topRight',
        });
      }
    }
    // if (status === 403) {
    //   localStorage.clear();
    //   window.location.reload();
    // }
    return response.data;
  },
  error => {
    notification.error({
      message: '失败',
      description: '请求失败',
      placement: 'topRight',
    });
    // Do something with response error
    return Promise.reject(error);
  },
);
export default axios;
