## 项目搭建

### 创建项目

1. create-react-app 项目名

   cd 项目名

2. 使用customize-cra，react-app-rewired扩展create-react-app   解决每次cnpm i 就把包数据覆盖问题

   ① cnpm i customize-cra react-app-rewired -D

   ② packages.json同级目录下创建config-overrides.js

   ​	可以在config-overrides.js中写相关配置

   ③修改packages.json

   ```javascript
   "scripts": {
       "start": "react-app-rewired start",
       "build": "react-app-rewired build",
       ...
   }
   ```

3. 添加@修饰符 config-overrides.js

   ```javascript
   const { override, addWebpackAlias } = require('customize-cra');
   const path = require('path');
   module.exports = {
     addWebpackAlias({
       '@': path.resolve(__dirname, 'src'),
       'components': path.resolve(__dirname, 'src/components');
     })
   }
   ```

4. 引入 less

   ```javascript
   cnpm i less less-loader -S
   ```

   config-overrides.js

   ```javascript
   module.exports = override(
     ...
     addLessLoader({
       lessOptions: {
         javascriptEnabled: true
       }
     })
   )
   ```

5. 设置支持CSS Modules

   config-overrides.js                                                           安装classnames   cnpm i classnames -S

   ```javascript
   const lessRegex = /\.less$/;
   
   module.exports = override(
     ...
     addWebpackModuleRule({
       test: lessRegex,
       use: ['style-loader', {
         loader: 'css-loader',
         options: {
           modules: true,
         }
       }, 'less-loader'],
     })
   )
   ```

6. src>assets>css>reset.css    重置样式文件的引入

   src>index.js中引入

   ```javascript
   import './assets/css/reset.css'
   ```

7. 引入antd组件库

   cnpm i antd -S

   src>index.js 引入css样式

   ```javascript
   import 'antd/dist/antd.dark.css';   // 暂定为暗黑主题，之后进行主题设定
   ```

8. 引入axios

   cnpm i axios -S

   utils下新建  api.js 存放所有api       axios.js   请求数据方法再封装          getEchartsData.js echarts请求数据方法

9. 创建路由

   ①router中创建router.js

   ②app.js中引入，并且渲染路由

   ③引入react-router-dom cnpm i react-router-dom -S

   ④若使用withRouter(App) 包裹，

   ```javascript
   ReactDOM.render(
     <Router>
       <App />
     </Router>,
     document.getElementById('root')
   );
   ```

10. 配置代理

    暂时使用package.json的方式，之后修改下

    ```
    {
    	...
    	"proxy": "http://172.16.1.152:8082"
    }
    ```

11. 安装echarts



