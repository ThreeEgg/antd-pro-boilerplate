import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from "react-router-dom"
import App from './App';
import 'antd/dist/antd.css';
import '@/assets/css/reset.css'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <Router>
    <ConfigProvider locale={zh_CN}>
      <App />
    </ConfigProvider>
  </Router>,
  document.getElementById('root')
);
