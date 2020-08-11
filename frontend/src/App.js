import React, { Component } from 'react';
import routes from '@/router';
import { Route, Switch, } from "react-router-dom";
class App extends Component {

  renderRouters = () => {
    return (
      <Switch>
        {
          routes.map(item => {
            return (
              // <PrivateRoute path={item.path} component={item.component} key={item.path} exact></PrivateRoute>
              <Route path={item.path} component={item.component} key={item.path} exact></Route>
            )
          })
        }
      </Switch >
    )
  }

  render() {
    return (
      <>
        {
          this.renderRouters()
        }
      </>
    )
  }
}

export default App
