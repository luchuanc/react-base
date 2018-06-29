import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route,Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import FastClick from 'fastclick'

//import styles
import "./style/base.less"
import 'weui'
import 'react-weui/build/packages/react-weui.css'
import "./style/common.less"

//router
import routes from "./router"
//store 
import store from "./store/Store.js"
import App from "./pages/App/App.js"

import "./utils/apiConfig.js"

console.log($);
window.addEventListener('load', () => {
    FastClick.attach(document.body);
});
ReactDOM.render(
  <Provider store={store}>
    <App>
        <Router>
            <Switch>
                {
                    routes.map( route=> (
                        <Route key={route.path} path={route.path} exact={route.exact} component={route.component}/>
                    ))
                }
            </Switch>
        </Router>
    </App>
    
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();