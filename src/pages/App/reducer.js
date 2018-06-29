import {LOADING_HIDE, LOADING_SHOW,MSG_HIDE,MSG_SHOW} from './actionTypes.js';
// import * as Status from './status.js';
export default (state, action) => {
    switch(action.type) {
        case LOADING_HIDE: {
            return {...state,showLoading: false};
        }
        case LOADING_SHOW: {
            return {...state,showLoading: true};
        }
        case MSG_HIDE: {
            return {...state,showMsg: false};
        }
        case MSG_SHOW: {
            return {...state,showMsg: true,msg:action.msg};
        }
        default: {
            return state==undefined?{}:state;
        }
    }
}
