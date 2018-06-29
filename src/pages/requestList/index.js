import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { InfiniteLoader, Page, LoadMore } from "react-weui";
import Ripples from "react-ripples";
import Popup from "../../components/popup";
import Mask from "../../components/mask";
import "./requestList.less";

class RequestList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [...Array(20).keys()],
      height: "100px",
      contentHeight: "100px",
      showRule: false,
      showShareMask: false
    };
  }
  componentWillMount() {
    const h = document.body.clientHeight;
    this.setState({
      height: h - 278 - 10 + "px",
      contentHeight: h - 198 + "px"
    });
  }
  clickRule() {
    this.setState({ showRule: true });
  }
  render() {
    return (
      <Page
        transition={true}
        className="page_requestList"
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
          <p className="p1">邀请好友，得优惠礼券</p>
          <p className="p2">好友注册会员成功并登录App您可获赠专属优惠券</p>
          <div className="userBtn">
            <Ripples
              className="btnBox"
              onClick={() => {
                this.setState({ showShareMask: true });
              }}
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

        <div className="content" style={{ height: this.state.contentHeight }}>
          <div className="c-title">
            <div className="p1">
              <span className="c-line" />
              <span className="c-text">邀请记录</span>
              <span className="c-line" />
            </div>
            <p className="p2">
              已成功邀请<span className="c-red">5位</span>好友，共获得<span className="c-red">
                3张
              </span>优惠券
            </p>
          </div>
          <div>
            <InfiniteLoader
              onLoadMore={(resolve, finish) => {
                //mock request
                setTimeout(() => {
                  if (this.state.items.length > 22) {
                    finish();
                  } else {
                    this.setState(
                      {
                        items: this.state.items.concat([
                          this.state.items.length
                        ])
                      },
                      () => resolve()
                    );
                  }
                }, 100);
              }}
              loaderDefaultIcon={<LoadMore />}
              height={this.state.height} //287
            >
              <div className="c-item">
                <div className="c-center">
                  <div className="c-center-body">
                    <div className="p1">name</div>
                    <div className="p2">05-01 20:00</div>
                  </div>
                </div>
                <div className="c-left empty" />
                <div className="c-right">好友登录App后您可得券</div>
                <div className="clearfix" />
              </div>
              <div className="c-item">
                <div className="c-center">
                  <div className="c-center-body">
                    <div className="p1">name</div>
                    <div className="p2">05-01 20:00</div>
                  </div>
                </div>
                <div className="c-left empty" />
                <div className="c-right">好友登录App后您可得券</div>
                <div className="clearfix" />
              </div>
              <div className="c-item">
                <div className="c-center">
                  <div className="c-center-body">
                    <div className="p1">name</div>
                    <div className="p2">05-01 20:00</div>
                  </div>
                </div>
                <div className="c-left empty" />
                <div className="c-right">好友登录App后您可得券</div>
                <div className="clearfix" />
              </div>
              <div className="c-item">
                <div className="c-center">
                  <div className="c-center-body">
                    <div className="p1">name</div>
                    <div className="p2">05-01 20:00</div>
                  </div>
                </div>
                <div className="c-left empty" />
                <div className="c-right">好友登录App后您可得券</div>
                <div className="clearfix" />
              </div>
              <div className="c-item">
                <div className="c-center">
                  <div className="c-center-body">
                    <div className="p1">name</div>
                    <div className="p2">05-01 20:00</div>
                  </div>
                </div>
                <div className="c-left empty" />
                <div className="c-right">好友登录App后您可得券</div>
                <div className="clearfix" />
              </div>
              <div className="c-item">
                <div className="c-center">
                  <div className="c-center-body">
                    <div className="p1">name</div>
                    <div className="p2">05-01 20:00</div>
                  </div>
                </div>
                <div className="c-left empty" />
                <div className="c-right">好友登录App后您可得券</div>
                <div className="clearfix" />
              </div>
              <div className="c-item">
                <div className="c-center">
                  <div className="c-center-body">
                    <div className="p1">name</div>
                    <div className="p2">05-01 20:00</div>
                  </div>
                </div>
                <div className="c-left empty" />
                <div className="c-right">好友登录App后您可得券</div>
                <div className="clearfix" />
              </div>
            </InfiniteLoader>
          </div>
        </div>
      </Page>
    );
  }
}

export default RequestList;
