import React from "react";
import { Page, Button, Agreement } from "react-weui";
import Ripples from "react-ripples";
import Popup from "../../components/popup";
import Mask from "../../components/mask";
import "./details.less";

class Login extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      showRule: false,
      showShareMask: false
    };
  }

  componentDidMount() {}
  clickRule() {
    this.setState({ showRule: true });
  }
  render() {
    return (
      <Page
        transition={true}
        className="page_details"
        ptr={false}
        infiniteLoader={false}
      >
        {this.state.showShareMask ? (
          <Mask
            className="shareMask"
            onClick={() => {
              this.setState({
                showShareMask: false
              });
            }}
          />
        ) : null}

        <Popup
          title="活动细则"
          show={this.state.showRule}
          className="test"
          onRequestClose={() => {
            this.setState({ showRule: false });
          }}
        >
          <p>1.被邀请的新用户注册成功并登录App后你也可同时获得优惠券一张。</p>
          <p>2.您邀请的好友为非会员才能领取优惠券，老会员将不能参与此活动。 </p>
          <p>3.本活动赠送优惠券有使用期限限制，请在有效期使用，过期将失效 。</p>
          <p>
            4.奖励的优惠券发放入您的账号，您可在肯德基App-“我的卡包”中查看。
          </p>
        </Popup>
        <div className="header">
          <img src={require("../../images/banner2.png")} />
        </div>
        <div className="footBox">
          <div className="userBtn">
            <Ripples className="btnBox">
              <div className="userBtn_give light">下载APP并领取新人好礼</div>
            </Ripples>
          </div>
          <div className="userText">
            邀请好友注册会员并登录App，您可获得专属的优惠券哦！
          </div>
          <div className="requestBtn">
            <Ripples
              onClick={()=>{this.setState({ showShareMask: true })}}
              className="btnBox"
              color="rgba(0, 0, 0, .1)"
            >
              <div className="userBtn_give light">立即邀请</div>
            </Ripples>
          </div>
          <div className="userRule">
            <Ripples
              onClick={this.clickRule.bind(this)}
              color="rgba(255, 255, 255, .3)"
            >
              <span>活动细则></span>
            </Ripples>
          </div>
        </div>
      </Page>
    );
  }
}

export default Login;
