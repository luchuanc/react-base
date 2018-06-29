import axios from "axios"
import {isDP,is360,isWeChat,isAliPay} from "./common.js"
import md5 from "./md5.js"
import b64 from "./base64.js"

const win = window;
win.baseURL = "https://tlogin.kfc.com.cn/KBS/api";


if (-1 != win.location.href.indexOf("https://plogin")) {
    win.baseUrl = "https://plogin.kfc.com.cn/KBS/api", isWeChat() ? (win.clientKey = "kbwxpnJ9wYqnUJV1", win.sign = "emwyVnRSdlltUkRLVXJ3MA==") : is360() ? (win.clientKey = "k360pbJGZG8eEXk6", win.sign = "MUdyN2duaUZiUHhWUURIaQ==") : isDP() ? (win.clientKey = "kbdppMaFFZJNsb6d", win.sign = "ZG5GOEpJMG9MUW8wZ01FQQ==") : isAliPay() ? (win.clientKey = "kzfbp3tkKUsXCiJ6", win.sign = "Y0lEWkcyZzVYc0pwSXhkSg==") : (win.clientKey = "kbwapzJAAUs1g2od", win.sign = "ZmVnRkxWTUpKODhJZjJocA==")
} else if (-1 != win.location.href.indexOf("https://tlogin") || -1 != win.location.href.indexOf("file://")) {
    win.baseUrl = "https://tlogin.kfc.com.cn/KBS/api", isWeChat() ? (win.clientKey = "kbwxtWeMjrviqTtg", win.sign = "aHRBMEJvbGt2QUhPNWpySA==") : is360() ? (win.clientKey = "k360tzCOHLuMJhj6", win.sign = "TXdUcHprR0NvSExvcm9PaQ==") : isDP() ? (win.clientKey = "kbdptKdq3A4rumrC", win.sign = "cmtiblpCMEVOd0d0QjNVQg==") : isAliPay() ? (win.clientKey = "kzfbtlv5DjaD6uBS", win.sign = "S2NRTFg1UVlQWUdFNmNUVQ==") : (win.clientKey = "kbwxtWeMjrviqTtg", win.sign = "aHRBMEJvbGt2QUhPNWpySA==")
} else {
    win.baseUrl = "https://login.kfc.com.cn/KBS/api", isWeChat() ? (win.clientKey = "kbwxpnJ9wYqnUJV1", win.sign = "emwyVnRSdlltUkRLVXJ3MA==") : is360() ? (win.clientKey = "k360pbJGZG8eEXk6", win.sign = "MUdyN2duaUZiUHhWUURIaQ==") : isDP() ? (win.clientKey = "kbdppMaFFZJNsb6d", win.sign = "ZG5GOEpJMG9MUW8wZ01FQQ==") : isAliPay() ? (win.clientKey = "kzfbp3tkKUsXCiJ6", win.sign = "Y0lEWkcyZzVYc0pwSXhkSg==") : (win.clientKey = "kbwxpnJ9wYqnUJV1", win.sign = "emwyVnRSdlltUkRLVXJ3MA==")
}
class Api {
    constructor(opt){
        if (!opt)
            return;
        if (opt.serviceName || opt.url) {
            this.serviceName = opt.serviceName || opt.url;
        } else {
            throw ('Api error: 必须输入serviceName');
        }
        
    }
    exec(opt,cb) {
        this.getdata(opt, cb);
    }
    getdata(option, sc){
        var ajaxOption = {};
        var url = this.serviceName;
        var optionName = []
        for (var i in option) {
            if (i.indexOf("{") != -1 && i != "{type}") {
                url = url.replace(i, option[i]);
                delete option[i];
            } else {
                if (i != "{type}")
                    optionName[optionName.length] = i;

            }
        }
        console.log('url='+url);
        optionName = optionName.sort();
        var kbcts = new Date().getTime();
        ajaxOption.url = win.baseUrl + url;
        if (option["{type}"] == "POST") {
            ajaxOption.type = "POST";
            delete option["{type}"];
            ajaxOption.data = JSON.stringify(option);
        } else if (option["{type}"] == "DELETE") {
            ajaxOption.type = "DELETE";
            ajaxOption.traditional = true;
            delete option["{type}"];
            //ajaxOption.data = option;
        } else {
            ajaxOption.type = "GET";
            ajaxOption.traditional = true;
            delete option["{type}"];
            ajaxOption.data = option;
        }
        console.log('sign='+win.sign);
        var signStr = win.clientKey + "\t" + b64({
                data: win.sign,
                type: 1,
                unicode: !1
            }) + "\t" + kbcts + "\t" + url;
        var queryStr = "";
        if (ajaxOption.type == "GET"||ajaxOption.type == "DELETE") {
            for (var i = 0; i < optionName.length; i++) {
                var value = option[optionName[i]];
                if (typeof (value) == "undefined" || value == "") {
                    continue;
                } else if (value instanceof Array) {
                    for (var j = 0; j < value.length; j++)
                        queryStr = queryStr + optionName[i] + "=" + value[j] + "&";
                } else
                    queryStr = queryStr + optionName[i] + "=" + value + "&";

            }
            signStr = signStr + "\t" + queryStr.substr(0, queryStr.length - 1);
        } else
            signStr = signStr + "\t\t" + JSON.stringify(option);
        console.log(signStr);
        if (ajaxOption.type == "DELETE") {
            signStr=signStr+"\t";
            ajaxOption.url = ajaxOption.url+"?"+queryStr.substr(0, queryStr.length - 1);
        }
        const instance = this.setAxios(ajaxOption,win.clientKey,kbcts,signStr);
        this.send(instance,sc);
        
    }
    setAxios(ajaxOption,clientKey,kbcts,signStr){
        let obj = {
            url: ajaxOption.url,
            method:ajaxOption.type,
            data:ajaxOption.data,
            headers:{
                'kbck':clientKey,
                'kbcts':kbcts,
                'kbsv':md5(signStr),
                'requestTo':"Pilot",
                'Content-Type': 'application/json; charset=UTF-8',
                'timeout': 2000 * 10
            }
        }
        if(ajaxOption.type=="GET"){
            obj.params = ajaxOption.data;
        }
        const instance = axios.create(obj);
        return instance;
    }
    send(instance,sc){
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
          }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
          });
        
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
        instance().then((ret)=>{
            sc && sc(ret.data)
        });
    }
}
export default Api;