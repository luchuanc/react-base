import {LOADING_HIDE, LOADING_SHOW,MSG_HIDE,MSG_SHOW} from './actionTypes.js';
export const loadingHide = () => ({
    type: LOADING_HIDE
});
export const loadingShow = () => ({
    type: LOADING_SHOW
});
export const showMsg = (msg) => ({
    type: MSG_SHOW,
    msg:msg
});
export const hideMsg = () => ({
    type: MSG_HIDE
});
export const msg = (msg)=>{
    return (dispatch,getState)=>{
        dispatch(showMsg(msg));
        setTimeout(() => {
            dispatch(hideMsg());
        }, 1500);
    }
}
export const showErrMsg = (ret)=>{
    return (dispatch,getState)=>{
        let info = "接口调用错误，请稍后再试";
        if (ret && ret.errCode != 0) {
            if (ret.errMsg)
            info = ret.errMsg;
            if (typeof ret.errData != "undefined") {
                info = info + "(" + ret.errCode + " " + ret.errData.substr(0, 20) + ")";
            } else {
                info = info + "(" + ret.errCode + ")";
            }
        }
        dispatch(msg(info));
    }
}