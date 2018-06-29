import React from "react";
import { connect } from "react-redux";
import { Page, Button, Agreement } from "react-weui";
import Ripples from "react-ripples";
import Popup from "../../components/popup";
import PropTypes from "prop-types";
import "./login.less";
import * as actions from "./action.js";
import * as commonActions from "../App/action.js";
import * as utils from "../../utils/common.js";
import Apis from "../../utils/api.js";

class Login extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showRule: false, //显示规则
      agreeRule: false, //是否同意
      phone: "15827195158",
      code: "",
      // 极验
      gtInfo: {},
      gtStatus: false, //极验预加载的状态信息
      gtCaptchaObject: null,
      smsTimer: null, //验证码计时器
      okBtnCallback: null
    };
  }
  static propTypes = {
    showCodeNumber: PropTypes.bool,
    codeNumber: PropTypes.number
  };
  static defaultProps = {
    showCodeNumber: false,
    codeNumber: 60
  };

  componentDidMount() {}
  showGtCaptcha() {
    const _this = this;
    let startCaptcha = new Apis({
      url: "/svc/startCaptcha"
    });
    startCaptcha.exec(
      {
        "{type}": "GET"
      },
      function(ret) {
        _this.setState({
          gtInfo: ret.data,
          gtStatus: true
        });
        initGeetest(
          {
            gt: ret.data.gt,
            challenge: ret.data.challenge,
            //product: "popup",
            offline: !ret.data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
          },
          captchaObj => {
            _this.handlerGtPopup(captchaObj);
          }
        );
      },
      function(ret) {
        console.log(ret);
      }
    );
  }
  handlerGtPopup(captchaObj) {
    const _this = this;
    console.log(captchaObj);
    this.setState({
      gtCaptchaObject: captchaObj
    });
    captchaObj.onRefresh(function() {
      console.log("ok refresh");
    });
    captchaObj.onSuccess(function() {
      var validate = captchaObj.getValidate();
      if (!validate) {
        alert("请先完成验证！");
        return;
      }
      //发送短信
      _this.props.sendCode(validate);
    });
  }
  getCodeParams(validate) {
    if (!validate) validate = this.state.gtCaptchaObject.getValidate() || {};
    var res = {
      "{type}": "POST",
      gtChallenge: validate.geetest_challenge,
      gtValidate: validate.geetest_validate,
      gtSeccode: validate.geetest_seccode,
      userid: this.state.gtInfo.userid,
      gtServerStatus: this.state.gtInfo.gtServerStatus,
      type: "MOBILE",
      deviceId: utils.getDeviceId(), 
      deviceType: utils.getDeviceType(),
      jPushRegId: utils.getDeviceId(),
      phone: utils.trim(this.state.phone)
    };
    return res;
  }
  clickRule() {
    this.setState({
      showRule: true
    });
  }
  clickSendCode() {
    //校验手机号
    const phone = utils.trim(this.state.phone);
    if (!utils.reCellphone.test(phone)) {
      this.props.showMsg("请输入正确的手机号!");
      return;
    }

    if (null != this.state.gtCaptchaObject) {
      this.state.gtCaptchaObject.refresh();
    } else {
      //gt没有初始化
      try {
        this.showGtCaptcha();
      } catch (e) {
        this.props.sendCode();
      }
    }
    setTimeout(() => {
      this.props.sendCode(this.getCodeParams());
    }, 1000);
  }
  agreeRuleChange() {
    this.setState({
      agreeRule: !this.state.agreeRule
    });
  }

  phoneChange(event) {
    if (!utils.reNumber.test(event.target.value)) {
      this.props.showMsg("请输入正确的数字!");
      return;
    }
    this.setState({
      phone: event.target.value
    });
  }

  codeChange(event) {
    if (!utils.reNumber.test(event.target.value)) {
      this.props.showMsg("请输入正确的数字!");
      return;
    }
    this.setState({
      code: event.target.value
    });
  }

  getRegisterParams(){
	const dType = "WX";
	let opt = {
		'phone': utils.trim(this.state.phone),
		'smsCode': utils.trim(this.state.code),
		'sns': dType,
		'snsUID': utils.getDeviceId(),
		'snsToken': utils.getDeviceId(),
		'deviceId': utils.getDeviceId(),
		'deviceType': utils.getDeviceType(),
		'jPushRegId': utils.getDeviceId(),
		'{type}': "POST",
		'sendType': "0"
	};
	//获取缓存userInfo
	// if (utils.isWeChat()) {
	// 	opt.tuToken = amGloble.userInfo.token;
	// }
	return opt;

  }

  clickLogin() {
	if(!this.state.phone){
		this.props.showMsg("请先输入手机号!");
		return;
	}
	if(!this.state.code){
		this.props.showMsg("请先输入验证码!");
		return;
	}
    this.props.login(this.getRegisterParams(),
      () => {
        this.props.history.push("/details/");
      }
    );
  }

  render() {
    return (
      <Page
        className="page_login"
        transition={false}
        ptr={false}
        infiniteLoader={false}
      >
        <Popup
          title="活动细则"
          show={this.state.showRule}
          className="test"
          onRequestClose={() => {
            this.setState({
              showRule: false
            });
          }}
        >
          <p>1. 被邀请的新用户注册成功并登录App后你也可同时获得优惠券一张。</p>
          <p>
            2. 您邀请的好友为非会员才能领取优惠券， 老会员将不能参与此活动。
          </p>
          <p>
            3. 本活动赠送优惠券有使用期限限制， 请在有效期使用， 过期将失效。
          </p>
          <p>
            4. 奖励的优惠券发放入您的账号， 您可在肯德基App - “我的卡包”
            中查看。
          </p>
        </Popup>
        <div className="header">
          <img src={require("../../images/banner.png")} />
        </div>
        <div className="footBox">
          <div className="userform">
            <div className="item">
              <div className="c-center">
                <div className="c-center-body">
                  <input
                    value={this.state.phone}
                    onChange={this.phoneChange.bind(this)}
                    type="text"
                    placeholder="请输入手机号码"
                  />
                </div>
              </div>
              <div className="c-left icon1"> </div>
              <div className="c-right usercode">
                {this.props.showCodeNumber ? (
                  <span>
                    还剩 {this.props.codeNumber}
                    秒
                  </span>
                ) : (
                  <span className="red" onClick={this.clickSendCode.bind(this)}>
                    发送验证码
                  </span>
                )}
              </div>
              <div className="clearfix"> </div>
            </div>
            <div className="item">
              <div className="c-center">
                <div className="c-center-body">
                  <input
                    value={this.state.code}
                    onChange={this.codeChange.bind(this)}
                    type="text"
                    placeholder="请输入短信验证码"
                  />
                </div>
              </div>
              <div className="c-left icon2"> </div>
              <div className="c-right usercode"> </div>
              <div className="clearfix"> </div>
            </div>
          </div>
          <div className="userAgree">
            <Agreement
              checked={this.state.agreeRule}
              className="userRuleInput"
              onChange={this.agreeRuleChange.bind(this)}
            >
              <span className="agree"> 我已阅读并同意 </span>
              <span className="red"> 会员协议 </span>
              <span className="circle"> </span>
              <span className="red"> 隐私条款 </span>
              <span className="circle"> </span>
              <span className="red"> APP会员条款 </span>
            </Agreement>
          </div>
          <div className="userBtn">
			{
				this.state.agreeRule?(<Ripples className="btnBox">
				<div
				  className="userBtn_give light"
				  onClick={this.clickLogin.bind(this)}
				>
				  注册并领取
				</div>
			  </Ripples>):(<div
                className="userBtn_give"
              >
                注册并领取
              </div>)
			}
            
          </div>
          <div className="userRule">
            <Ripples
              onClick={this.clickRule.bind(this)}
              color="rgba(255, 255, 255, .3)"
            >
              <span> 活动细则 > </span>
            </Ripples>
          </div>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const LoginStates = state.LoginStates;
  return {
    showCodeNumber: LoginStates.showCodeNumber,
    codeNumber: LoginStates.codeNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendCode: opt => {
      dispatch(actions.sendCode(opt));
    },
    login: (userInfo, cb) => {
		dispatch(actions.register(userInfo,cb));
    },
    showMsg: msg => {
      dispatch(commonActions.msg(msg));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
