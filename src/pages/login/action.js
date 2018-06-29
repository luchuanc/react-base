import { SHOWCODE, HIDECODE, CODENUMBER } from "./actionTypes.js";
import * as commonActions from "../App/action.js";

export const showCode = () => ({
  type: SHOWCODE
});
export const hideCode = () => ({
  type: HIDECODE
});
export const changeCodeNumber = v => ({
  type: CODENUMBER,
  value: v
});
export const sendCode = opt => {
  return (dispatch, getState) => {
    dispatch(commonActions.loadingShow());
    Api.gtSmsCode.exec(opt, ret => {
      dispatch(commonActions.loadingHide());
      if (ret && ret.errCode == 0 && ret.data.sent == true) {
        dispatch(showCode());
        let timer = setInterval(() => {
          const LoginStates = getState().LoginStates;
          const codeNumber =
            LoginStates.codeNumber == undefined ? 60 : LoginStates.codeNumber;
          if (codeNumber > 1) {
            const v = codeNumber - 1;
            dispatch(changeCodeNumber(v));
          } else {
            clearInterval(timer);
            timer = null;
            dispatch(changeCodeNumber(60));
            dispatch(hideCode());
          }
        }, 1000);
        dispatch(commonActions.msg("验证码已通过短信发送"));
      } else {
        dispatch(commonActions.showErrMsg(ret));
      }
    });
  };
};
//登录
export const register = (opt,cb) => {
  return (dispatch, getState) => {
	dispatch(commonActions.loadingShow());
    Api.register.exec(opt, (ret) => {
		dispatch(commonActions.loadingHide());
		if (ret && ret.errCode == 0 && ret.data) {
			const userInfo = ret.data;
			//重新写localstorage cache
			localStorage.setItem("KEY_USER", JSON.stringify({"content": userInfo}));
			//注册成功了
			cb && cb();
		} else {
			dispatch(commonActions.showErrMsg(ret));
		}
	});
  };
};
