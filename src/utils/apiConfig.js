import Api from "./api.js"

const win = window;
win.Api = {
    test: new Api({
        url: "/camp/coffee/order"
    }),
    getWXState:new Api({
        url:"/wx/fr/getNewWechatState"
    }),
    register:new Api({
        url:"/user/rlu"
    }),
    gtSmsCode:new Api({
        url:"/svc/gtSmsCode"
    })
}