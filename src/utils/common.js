export const getQueryParameter= (name)=>{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    // if (r!=null) return unescape(r[2]); return null;
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}
export const isDP = ()=>{
    var dpid = getQueryParameter("dpid");
    if (dpid == null || dpid == "") {
        return false;
    }
    else {
        return true;
    }
}
export const is360 = ()=>{
    var id360 = getQueryParameter("id360");
    if (id360 == null || id360 == "")
        return false;
    else
        return true;
}
export const isWeChat = ()=>{
    return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ? !0 : !1
}
export const isAliPay = ()=>{
    return -1 === navigator.userAgent.indexOf("AlipayClient") ? !1 : !0
}
export const trim = (x)=>{
    return x.replace(/^\s+|\s+$/gm,'');
}
export const reCellphone= /^0?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
export const reNumber = /^[0-9]*$/;
export const getDeviceType= ()=>{
    var ua = navigator.userAgent;
    if (ua.indexOf("iPhone") != -1 || ua.indexOf("iPad") != -1 || ua.indexOf("iPod") != -1) {
        return "ios";
    } else if (ua.indexOf("Android") != -1)
        return "android";
    else
        return "ios";
}
export const newGuid=()=>
{
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
      guid +=   n;
      if((i==8)||(i==12)||(i==16)||(i==20))
        guid += "-";
    }
    return guid;    
}
export const getDeviceId= ()=>{
    var deviceId;
    if (isWeChat()) {
        deviceId = localStorage.getItem("SUPERAPP_WECHAT_openid");
    } else {
        deviceId = localStorage.getItem("SUPERAPP_OTHER_openid");
        if (!deviceId || deviceId == "" || deviceId == "null" || deviceId == "undefined") {
            deviceId = newGuid();
            localStorage.setItem("SUPERAPP_OTHER_openid", deviceId);
        }
    }
    return deviceId;
}