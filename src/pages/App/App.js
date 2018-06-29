import React from 'react'
import { connect } from 'react-redux'
import {Toast} from 'react-weui'
import * as commonActions from './action.js'
import PropTypes from 'prop-types'
import Msg from "../../components/msg"
class App extends React.Component{
    constructor(){
        super(...arguments);
    }
    componentDidMount() {
        let _this = this;
        if (window.location.href.indexOf("https://tlogin") != -1 || window.location.href.indexOf("http://localhost") != -1
          || window.location.href.indexOf("file://") != -1 ) {
            window.hostUrl = "https://tlogin.kfc.com.cn/superapp_wechat/superapp_wechat/coffeeCouponsDemoWX/";  //uat
        } else {
            window.hostUrl = "https://login.kfc.com.cn/CRM/superapp_wechat/PaymentWechat/";  //prod
        }
        const initVerySdk = function() {  //提前处理：不区分b
            var params = _this.getDefaultShareParams();
            var envLink = params.link;
            var share_timeline_data = {
                title: params.title,
                link: envLink,
                img_url: params.imgUrl,
                callbackfunc: function(){}
            };
            var share_app_data = {
                title: params.title,
                desc: params.desc,
                link: envLink,
                img_url: params.imgUrl,
                callbackfunc: function(){}
            };
            //加载费睿js文件，wx装载成功时，初始化
            construct("wx97deba69fd949ca2", "", location.href, ['chooseWXPay','onMenuShareTimeline', 'onMenuShareAppMessage', 'getLocation', 'showOptionMenu', 'closeWindow','hideOptionMenu'], share_timeline_data, share_app_data);
        };
        initVerySdk();
        if(!this.getWxInfo()){
            this.wxRedirect();
        }
    }
    getWxInfo(){
        let wx_Info = localStorage.getItem("wx_Info");
        let ret = null;
        try{
            if(wx_Info){
                ret = JSON.parse(wx_Info);
            }
        }catch(e){}
        return ret;
    }
    wxRedirect() {
        let _this = this;
		var pv = "";
		if (window.location.href.indexOf("https://tlogin") != -1 || window.location.href.indexOf("http://localhost") != -1
			|| window.location.href.indexOf("file://") != -1 ) {
			pv = "superapp_wechat/coffeeCouponsDemoWX/index";
		} else {
			pv = "superapp_wechat/PaymentWechat/index";
		}
		var url = location.href.split("?")[0];

		var opt = {
			redirectUrl: window.baseUrl + "/wx/fr/newWx_redirectWithSU.do?pv=" + pv,
			"{type}": "POST"
		};
		Api.getWXState.exec(opt, function (ret) {
			console.log(ret);
			if (typeof ret === "string")
				ret = JSON.parse(ret);
			if (ret.errCode != 0 || ret.data == null) {
				alert(JSON.stringify(ret));
			} else {
				var data = ret.data.data;
                data = JSON.parse(data);
                try{
                    localStorage.getItem("SUPERAPP_WECHAT_openid",data.app_id);
                    localStorage.setItem("wx_Info",ret.data.data);
                }catch(e){}
				var url = data.redirect;
				if(window.location.href.indexOf("localhost")==-1){
                    location.replace(url);
                }
			}
		}, function (ret) {
			_this.props.errMsg(ret);
		});
	}
    getDefaultShareParams(){
		return {
			title: "超值咖啡来袭 花样红包开心享",
			desc: "咖啡优惠随心选，一大波咖啡现金券让你和好友齐分享。买超值咖啡券最高可得7元咖啡抵用券，买55元咖啡券最高可得免费咖啡兑换券。	",
			imgUrl:hostUrl + "images/share_coffee.jpg",
			link: hostUrl + "index.html"
		}
	}
    render() {
        return (
            <div className="page_main">
                {this.props.children}
                <Toast icon="loading" show={this.props.showLoading}>Loading...</Toast>
                <Msg show={this.props.showMsg} msg={this.props.msg}></Msg>
            </div>
            
        );
      }
}
App.propTypes = {
    showLoading:PropTypes.bool,
    showMsg:PropTypes.bool,
    msg:PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
    const app = state.commonStates;
    return {
        showLoading: app.showLoading,
        showMsg:app.showMsg,
        msg:app.msg
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      Loading: () => {
        dispatch(commonActions.loadingShow());
      },
      Msg: msg => {
        dispatch(commonActions.msg(msg));
      },
      errMsg: msg => {
        dispatch(commonActions.showErrMsg(msg));
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App)
