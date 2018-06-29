import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import thunkMiddleware from 'redux-thunk'

import commonStates from '../pages/App/reducer.js';
import LoginStates from '../pages/login/reducer.js'

 const win = window;

const reducer = combineReducers({
  commonStates,
  LoginStates
});

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-immutable-state-invariant').default());
}

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

export default createStore(reducer, {},storeEnhancers);

