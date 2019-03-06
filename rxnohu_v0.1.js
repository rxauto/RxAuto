var GateGlobal = {
    _currentLayer: null,
    _appConfig: null,
    _currentGameID: 0,
    _gamesInfo: [],
    _gamesInfoArray: [],
    LOCAL_KEY: {
        MUSIC: "music",
        SOUND: "sound",
        VIRATE: "virate",
        INVITION: "invition",
        TYPE_LOGINED: "logined",
        USER_NAME: "username",
        PASS: "pass"
    },
    TYPE_LOGINED: {
        DEVICE: 0,
        NORMAL: 1
    },
    DIALOG_TYPE: {
        NOTIFY: 0,
        CONFIRM: 1
    },
    DIALOG_ACTION: {
        OK: 0,
        CANCEL: 1
    },
    LOCAL_Z_ODER: {
        WAITING: 1E4,
        DIALOG: 1E3,
        CHOICE_MINIGAME: 99,
        MINIGAME: 1,
        POPUP: 102
    },
    TAG_LAYER: {
        WAITING: 1E3,
        MINI_GAME: 39919,
        TOAST: 9996,
        DOWNLOAD_VIEW: 9997,
        LOGIN: 100,
        SETTING: 101,
        PROFILE: 102,
        HISTORY: 103,
        GIFTCODE: 104,
        SHOP: 105,
        SECURITY: 106,
        FORGET_PASS: 107,
        LOYALTY: 108,
        AGENCY: 109,
        DOI_THUONG: 110,
        EVENT: 111,
        UNLOCK_GAME: 113,
        VONG_QUAY: 114,
        TET: 115
    },
    EVENT: {
        ON_LOGIN_FACEBOOK: "onLoginFacebook",
        ON_DATE_PICKER: "onDatePicker",
        ON_IAP: "onIAP",
        LOGIN_SUCESS: "loginSuccess",
        UPDATE_BALANCE: "updateBalance",
        UPDATE_USER_INFO: "updateUserInfo",
        SOCKET_MANANGER: "socketManager",
        LOGOUT: "logout",
        UPDATE_NICKNAME: "update_nickname"
    },
    GAME_ID: {
        SINBAD: 1,
        ZEUS: 2,
        KIM_CUONG: 4,
        GAME_POKER: 5,
        GAME_TLMN_DL: 6,
        BAN_CA: 7,
        TAI_XIU: 1001,
        CANDY: 1002,
        MINIPOKER: 1003,
        THIEN_DIA: 1004,
        SIEU_XE: 1005,
        LOC_THU: 1006
    },
    TYPE_NOTYFY: {
        SUCCESS: 0,
        FAIL: 1
    },
    TELCO_CONFIG: null,
    TELCO_ID: {
        VINA: 1,
        MOBI: 2,
        VIETTEL: 3
    }
};
GateGlobal._appConfig = {
    version_app: 1,
    version_update: 1,
    linkStore: "",
    BC: !0,
    api: {
        Login: "https://w-portapi.apino.club/acc/Login",
        Logout: "https://w-portapi.apino.club/acc/Logout",
        LoginOTP: "https://w-portapi.apino.club/acc/LoginOTP",
        FacebookLoginMobile: "https://w-portapi.apino.club/acc/FacebookLoginMobile",
        CreateAccounts: "https://w-portapi.apino.club/acc/CreateAccounts",
        checkauthen: "https://w-portapi.apino.club/acc/checkauthen",
        GetAccountInfo: "https://w-portapi.apino.club/acc/GetAccountInfo",
        GiftCodeCharging: "https://w-portapi.apino.club/GiftCode/GiftCodeCharging",
        GetCaptcha: "https://w-portapi.apino.club/captcha/get",
        GetBalanceFreeze: "https://w-portapi.apino.club/acc/GetBalanceFreeze",
        AccountFreeze: "https://w-portapi.apino.club/acc/AccountFreeze",
        AccountUnFreeze: "https://w-portapi.apino.club/acc/AccountUnFreeze",
        AccountChangePassword: "https://w-portapi.apino.club/acc/AccountChangePassword",
        AccountChangePasswordConfirm: "https://w-portapi.apino.club/acc/AccountChangePasswordConfirm",
        GetHistory: "https://w-portapi.apino.club/acc/GetHistory",
        GetHistoryTranfer: "https://w-portapi.apino.club/acc/SP_Account_GetHistory_Tranfer",
        UpdateNickName: "https://w-portapi.apino.club/acc/UpdateNickName",
        TranferStep1: "https://w-portapi.apino.club/acc/TranferStep1",
        TranferStep2: "https://w-portapi.apino.club/acc/TranferStep2",
        AgencyList: "https://w-portapi.apino.club/agency/AgencyList",
        UpdatePhone: "https://w-portapi.apino.club/acc/UpdatePhone",
        VerifyPhone: "https://w-portapi.apino.club/acc/VerifyPhone",
        ResetPhoneNumber: "https://w-portapi.apino.club/acc/ResetPhoneNumber",
        ResetPhoneNumberNotOTP: "https://w-portapi.apino.club/acc/ResetPhoneNumberNotOTP",
        RegisterAuthenOtp: "https://w-portapi.apino.club/acc/RegisterAuthenOtp",
        GetOTP: "https://w-portapi.apino.club/OtpAPI/Get",
        GetJackpot: "https://w-jackpot.apino.club/jackpot/ListJackpot",
        TelcoCaptcha: "https://w-telco.apino.club/Captcha/Get",
        TelcoPayment: "https://w-telco.apino.club/telco/TelcoPayment",
        TelcoPaymentHistory: "https://w-telco.apino.club/telco/TelcoPaymentHistory",
        TelcoGetConfig: "https://w-telco.apino.club/telco/TelcoGetConfig",
        TelcoBuyCardHistoryDetail: "https://w-portapi.apino.club/telco/TelcoBuyCardHistoryDetail",
        TelcoBuyCardHistory: "https://w-portapi.apino.club/telco/TelcoBuyCardHistory",
        TelcoBuyCardStep1: "https://w-portapi.apino.club/telco/TelcoBuyCardStep1",
        TelcoBuyCardStep2: "https://w-portapi.apino.club/telco/TelcoBuyCardStep2",
        AccountForgetPassword: "https://w-portapi.apino.club/acc/AccountForgetPassword",
        AccountForgetPasswordConfirm: "https://w-portapi.apino.club/acc/AccountForgetPasswordConfirm",
        UnlockGame_list: "https://w-portapi.apino.club/acc/UnlockGame_list",
        UnlockGame: "https://w-portapi.apino.club/acc/UnlockGame",
        VQMM: {
            Account_GetInfor: "https://vongquay.apino.club/gameAPI/Account_GetInfor",
            FreeSpin_Get: "https://vongquay.apino.club/gameAPI/FreeSpin_Get",
            Spin: "https://vongquay.apino.club/gameAPI/Spin",
            GetCaptcha: "https://vongquay.apino.club/captcha/get"
        },
        Inbox: {
            NotificationsGetList: "https://w-inboxapi.apino.club/Notify/NotificationsGetList",
            NotifyAndInboxGetList: "https://w-inboxapi.apino.club/Notify/NotifyAndInboxGetList",
            NotifyGetDetail: "https://w-inboxapi.apino.club/Notify/NotifyGetDetail",
            InboxGetDetail: "https://w-inboxapi.apino.club/Inbox/InboxGetDetail",
            NotifyDelete: "https://w-inboxapi.apino.club/Notify/NotifyDelete",
            InboxDelete: "https://w-inboxapi.apino.club/Inbox/InboxDelete"
        },
        Loyal: {
            RankingVipGet: "https://w-portapi.apino.club/Loyal/RankingVipGet",
            AccountVPGet: "https://w-portapi.apino.club/Loyal/AccountVPGet",
            AccountVPTrade: "https://w-portapi.apino.club/Loyal/AccountVPTrade",
            EventTopVipPointAlphaTest: "https://w-portapi.apino.club/Loyal/EventTopVipPointAlphaTest",
            BigEventTopVipPoint_single: "https://w-portapi.apino.club/Loyal/BigEventTopVipPoint_single",
            BigEventTopVipPoint_list: "https://w-portapi.apino.club/Loyal/BigEventTopVipPoint_list"
        },
        Event: {
            InventoryGetList: "https://w-inboxapi.apino.club/Account/InventoryGetList",
            InventoryReceiveStar: "https://w-inboxapi.apino.club/Account/InventoryReceiveStar",
            TimeGetList: "https://w-inboxapi.apino.club/EventAPI/TimeGetList",
            VinhDanh: "https://w-inboxapi.apino.club/EventAPI/VinhDanh",
            EventJackpotGet: "https://w-inboxapi.apino.club/EventAPI/EventJackpotGet",
            GetTimeEvent: "https://w-sieuxe.apino.club/api/SuperNova/GetTimeEvent",
            CheckEvent: "https://w-sieuxe.apino.club/api/SuperNova/CheckEvent",
            GetHonorEvent: "https://w-sieuxe.apino.club/api/SuperNova/GetHonorEvent",
            TDVCGetEventTime: "https://w-thiendia.apino.club/api/GetEventTime",
            TDVCEventGetTop: "https://w-thiendia.apino.club/api/EventGetTop",
            TDVCEventTimeGetList: "https://w-thiendia.apino.club/api/EventTimeGetList"
        },
        EventTet: {
            DapHeo: {
                Account_GetInfor: "https://banhchungtet.apino.club/gameAPI/Account_GetInfor",
                FreeSpin_Get: "https://banhchungtet.apino.club/gameAPI/FreeSpin_Get",
                Spin: "https://banhchungtet.apino.club/gameAPI/Spin",
                GetCaptcha: "https://banhchungtet.apino.club/captcha/get",
                VinhDanh_GetList: "https://banhchungtet.apino.club/gameAPI/VinhDanh_GetList",
                HistorySpin_GetList: "https://banhchungtet.apino.club/gameAPI/HistorySpin_GetList",
                Inventories_GetList: "https://banhchungtet.apino.club/gameAPI/Inventories_GetList",
                Inventories_Receive_Telco: "https://banhchungtet.apino.club/gameAPI/Inventories_Receive_Telco",
                Inventory_Receive_Star: "https://banhchungtet.apino.club/gameAPI/Inventory_Receive_Star"
            },
            DauGia: {
                negotiate: "https://daugia.apino.club/signalr/negotiate",
                hub: "daugiaHub",
                CheckEvent: "https://daugia.apino.club/api/CheckEvent"
            }
        },
        SocketNotify: {
            negotiate: "https://w-socket.apino.club/signalr/negotiate",
            hub: "gameHub"
        },
        TaiXiu: {
            negotiate: "https://w-taixiu.apino.club/signalr/negotiate",
            hub: "minigamehub"
        }
    }
};
GateGlobal.API = GateGlobal._appConfig.api;

GateIsWebMode = !0;

var GateWebSocketManager = {
    _isInit: !1,
    init: function() {
        GateWebSocketManager._isInit || (GateWebSocketManager._isInit = !0,
        GateWebSocketManager._listSignalR = [],
        cc.eventManager.addCustomListener(GateGlobal.EVENT.SOCKET_MANANGER, function(a) {
            GateUIUtils.removeWaiting();
            GateUIUtils.dialog(GateStrings.NETWORK_ERROR, function(a) {
                GateUIUtils.addWaiting();
                for (a = 0; a < GateWebSocketManager._listSignalR.length; a++)
                    GateWebSocketManager._listSignalR[a].reconnect()
            }, "Th\u1eed l\u1ea1i")
        }))
    },
    pushSignalR: function(a) {
        0 <= GateWebSocketManager._listSignalR.indexOf(a) || GateWebSocketManager._listSignalR.push(a)
    },
    removeSignalR: function(a) {
        0 > GateWebSocketManager._listSignalR.indexOf(a) || GateWebSocketManager._listSignalR.splice(GateWebSocketManager._listSignalR.indexOf(a), 1)
    },
    closeAllSocket: function() {
        for (var a = 0; a < GateWebSocketManager._listSignalR.length; a++)
            GateWebSocketManager._listSignalR[a].close(),
            GateWebSocketManager._listSignalR[a] = null;
        GateWebSocketManager._listSignalR = []
    }
};

var GateRequest = {
    STATE: {
        SUCCESS: 1,
        FAIL: 2,
        ERROR: 3
    },
    get: function(a, b) {
        var c = cc.loader.getXMLHttpRequest();
        c.onreadystatechange = function() {
            c.responseText && (4 == c.readyState && 200 == c.status ? (cc.log(a + "ResponseText \x3d " + c.responseText),
            b && b(GateRequest.STATE.SUCCESS, c.responseText)) : b && b(GateRequest.STATE.FAIL, c.responseText))
        }
        ;
        c.ontimeout = function() {
            cc.log("ON TIME OUT");
            b && b(GateRequest.STATE.ERROR)
        }
        ;
        c.onerror = function() {
            cc.log("ON ERROR");
            b && b(GateRequest.STATE.ERROR)
        }
        ;
        c.timeout = 2E4;
        cc.log("GET URL " + a);
        c.open("GET", a);
        c.setRequestHeader("Content-Type", "application/json; charset\x3dUTF-8");
        GateIsWebMode ? c.withCredentials = !0 : GateUserInfo.cookie && c.setRequestHeader("cookie", GateUserInfo.cookie);
        c.send()
    },
    post: function(a, b, c) {
        var d = cc.loader.getXMLHttpRequest();
        d.onreadystatechange = function() {
            d.responseText && (4 == d.readyState && 200 == d.status ? (cc.log(a + "ResponseText \x3d " + d.responseText),
            c && c(GateRequest.STATE.SUCCESS, d.responseText)) : c && c(GateRequest.STATE.FAIL, d.responseText))
        }
        ;
        d.ontimeout = function() {
            c && c(GateRequest.STATE.ERROR)
        }
        ;
        d.onerror = function() {
            c && c(GateRequest.STATE.ERROR)
        }
        ;
        d.timeout = 2E4;
        cc.log("POST URL " + a + " PARAM " + JSON.stringify(b));
        d.open("POST", a);
        d.setRequestHeader("Content-Type", "application/json; charset\x3dUTF-8");
        GateIsWebMode ? d.withCredentials = !0 : GateUserInfo.cookie && (cc.log("set cookie "),
        d.setRequestHeader("cookie", GateUserInfo.cookie));
        d.send(JSON.stringify(b))
    },
    getReturnXHR: function(a, b) {
        var c = cc.loader.getXMLHttpRequest();
        c.onreadystatechange = function() {
            c.responseText && (4 == c.readyState && 200 == c.status ? (cc.log(a + "ResponseText \x3d " + c.responseText),
            b && b(GateRequest.STATE.SUCCESS, c)) : b && b(GateRequest.STATE.FAIL, c))
        }
        ;
        c.ontimeout = function() {
            cc.log("ON TIME OUT");
            b && b(GateRequest.STATE.ERROR)
        }
        ;
        c.onerror = function() {
            cc.log("ON ERROR");
            b && b(GateRequest.STATE.ERROR)
        }
        ;
        c.timeout = 2E4;
        cc.log("GET URL " + a);
        c.open("GET", a);
        c.setRequestHeader("Content-Type", "application/json; charset\x3dUTF-8");
        GateIsWebMode ? c.withCredentials = !0 : GateUserInfo.cookie && (cc.log("set cookie " + GateUserInfo.cookie),
        c.setRequestHeader("cookie", GateUserInfo.cookie));
        c.send()
    },
    postReturnXHR: function(a, b, c) {
        if (cc.isObject(b)) {
            var d = cc.loader.getXMLHttpRequest();
            d.onreadystatechange = function() {
                cc.log("Response: " + d.responseText);
                d.responseText && (4 == d.readyState && 200 == d.status ? c && c(GateRequest.STATE.SUCCESS, d) : c && c(GateRequest.STATE.FAIL, d))
            }
            ;
            d.ontimeout = function() {
                c && c(GateRequest.STATE.ERROR)
            }
            ;
            d.onerror = function() {
                c && c(GateRequest.STATE.ERROR)
            }
            ;
            d.timeout = 2E4;
            d.open("POST", a);
            cc.log("POST URL " + a + " PARAM " + JSON.stringify(b));
            d.setRequestHeader("Content-Type", "application/json; charset\x3dUTF-8");
            GateIsWebMode ? d.withCredentials = !0 : GateUserInfo.cookie && (cc.log("set cookie "),
            d.setRequestHeader("cookie", GateUserInfo.cookie));
            d.send(JSON.stringify(b))
        }
    },
    login: function(a, b, c, d, e) {
        var f = GateGlobal._appConfig.api.Login;
        c || (c = "");
        d || (d = "");
        this.postReturnXHR(f, {
            AccountName: a,
            md5: b,
            Captcha: c,
            Verify: d
        }, e)
    },
    loginFacebook: function(a, b) {
        GateRequest.postReturnXHR(GateGlobal._appConfig.api.FacebookLoginMobile, {
            AccessToken: a,
            JoinFrom: GateGlobal.deviceType
        }, b)
    },
    chargingGiftcode: function(a, b, c, d) {
        GateRequest.post(GateGlobal._appConfig.api.GiftCodeCharging, {
            Code: a,
            Captcha: b,
            Verify: c,
            SourceID: GateGlobal.deviceType
        }, d)
    },
    getCaptcha: function(a) {
        GateRequest.get(GateGlobal._appConfig.api.GetCaptcha + "?length\x3d3\x26width\x3d140\x26height\x3d52", a)
    },
    getVqCaptcha: function(a, b) {
        this.get(a + "?length\x3d3\x26width\x3d140\x26height\x3d52", b)
    },
    getCaptchaTelco: function(a) {
        GateRequest.get(GateGlobal._appConfig.api.TelcoCaptcha + "?length\x3d3\x26width\x3d140\x26height\x3d52", a)
    },
    getFreezeBalance: function(a) {
        GateRequest.get(GateGlobal._appConfig.api.GetBalanceFreeze, a)
    },
    freeze: function(a, b) {
        GateRequest.get(GateGlobal._appConfig.api.AccountFreeze + "?Amount\x3d" + a + "\x26Description\x3d", b)
    },
    unFreeze: function(a, b, c) {
        GateRequest.get(GateGlobal._appConfig.api.AccountUnFreeze + "?Amount\x3d" + a + "\x26OTPCode\x3d" + b + "\x26Description\x3d", c)
    },
    telco: function(a, b, c, d, e, f, g) {
        GateRequest.post(GateGlobal._appConfig.api.TelcoPayment, {
            TelcoName: a,
            Pin: b,
            Serial: c,
            Amount: d,
            Captcha: e,
            Verify: f
        }, g)
    },
    getTelcoConfig: function(a) {
        GateRequest.get(GateGlobal._appConfig.api.TelcoGetConfig, function(b, c) {
            b == GateRequest.STATE.SUCCESS && (c = JSON.parse(c),
            a && a(c))
        })
    },
    buycardStep1: function(a, b, c, d, e) {
        GateRequest.post(GateGlobal._appConfig.api.TelcoBuyCardStep1, {
            TelcoName: a,
            Amount: b,
            Captcha: c,
            Verify: d
        }, e)
    },
    buycardStep2: function(a, b, c) {
        GateRequest.get(GateGlobal._appConfig.api.TelcoBuyCardStep2 + "?OTPCode\x3d" + a + "\x26TransID\x3d" + b, c)
    },
    getBuyCardHistory: function(a) {
        GateRequest.get(GateGlobal._appConfig.api.TelcoBuyCardHistory, a)
    },
    getBuyCardHistoryDetail: function(a, b) {
        GateRequest.get(GateGlobal._appConfig.api.TelcoBuyCardHistoryDetail + "?TransID\x3d" + a, b)
    },
    getOTP: function() {
        var a = GateGlobal._appConfig.api.GetOTP;
        GateUIUtils.addWaiting();
        GateRequest.get(a, function(a, c) {
            GateUIUtils.removeWaiting();
            a == GateRequest.STATE.SUCCESS ? (c = JSON.parse(c),
            0 < c.BalanceGold ? (GateUIUtils.notify(c.Description, GateGlobal.TYPE_NOTYFY.SUCCESS),
            GateUserInfo.balance = c.BalanceGold,
            GateUtils.updateBalance()) : GateUIUtils.notify(c.Description)) : GateUIUtils.notify("L\u1ea5y OTP kh\u00f4ng th\u00e0nh c\u00f4ng. Vui l\u00f2ng ki\u1ec3m tra l\u1ea1i k\u1ebft n\u1ed1i m\u1ea1ng")
        })
    },
    getCheckauthen: function(a) {
        GateRequest.getReturnXHR(GateGlobal._appConfig.api.checkauthen, a)
    },
    getAccountInfo: function(a) {
        GateRequest.getReturnXHR(GateGlobal._appConfig.api.GetAccountInfo, a)
    },
    getVipRank: function(a) {
        GateRequest.get(GateGlobal.API.Loyal.RankingVipGet, a)
    },
    getAccountRankVip: function(a) {
        GateRequest.get(GateGlobal.API.Loyal.AccountVPGet, a)
    },
    transferPoint: function(a, b, c) {
        GateRequest.get(GateGlobal.API.Loyal.AccountVPTrade + "?AmountVP\x3d" + a + "\x26OTPCode\x3d" + b, c)
    },
    getTopDuaVip: function(a) {
        GateRequest.get(GateGlobal.API.Loyal.EventTopVipPointAlphaTest, a)
    },
    logout: function() {
        GateRequest.get(GateGlobal._appConfig.api.Logout)
    },
    getPrizeDuaVip: function(a) {
        GateRequest.get(GateGlobal.API.Event.InventoryGetList + "?eventID\x3d1001", a)
    },
    receiveDuaVip: function(a, b) {
        GateRequest.get(GateGlobal.API.Event.InventoryReceiveStar + "?InventoryID\x3d" + a, b)
    }
};

var GateSignalR = cc.Class.extend({
    STATE: {
        NORMAL: 0,
        OPEN: 1,
        NEGOTIATE: 2,
        RECONNECTING: 3,
        ERROR: 4,
        DISCONNECT: 5,
        CLOSE: 6
    },
    _isReconnectFirst: !1,
    _index: 0,
    _urlWebSocket: "",
    _vtcWebSocket: null,
    _currentData: "",
    _reconnectCount: 0,
    _isReconnect: !0,
    _openParenthesis: 0,
    _closeParenthesis: 0,
    _eventName: "",
    _negotiateUrl: "",
    _wsUrl: "",
    _hub: "",
    _cookie: "",
    _isClosed: !1,
    _isFullMsg: !1,
    _timer: 0,
    _state: 0,
    _lastTime: 0,
    _timePingPong: 10,
    _isNotify: !0,
    ctor: function(a) {
        cc.isNumber(a) && (this._timePingPong = a);
        this._isNotify = !0;
        this._eventName = "";
        this._vtcWebSocket = null;
        this._lastTime = 0;
        this._isReconnect = !0;
        this._isClosed = !1;
        this._wsUrl = this._negotiateUrl = this._urlWebSocket = "";
        this._listPings = [];
        this._state = this.STATE.NORMAL
    },
    connect: function(a, b, c, d, e, f) {
        void 0 != f && null != f ? this.connectSignalR(a, b, c, d, e, f) : this.connectSignalR(a, b, "", c, d, e)
    },
    connectSignalR: function(a, b, c, d, e, f) {
        this._eventName = a;
        this._negotiateUrl = b;
        void 0 == c || null == c || "" == c ? (this._wsUrl = b,
        this._wsUrl = this._wsUrl.replace("http://", "ws://"),
        this._wsUrl = this._wsUrl.replace("https://", "wss://"),
        this._wsUrl = this._wsUrl.replace("negotiate", "connect")) : this._wsUrl = c;
        this._hub = d;
        this._cookie = e;
        this._isReconnectFirst = f;
        var g = this
          , h = cc.loader.getXMLHttpRequest();
        h.onreadystatechange = function() {
            if (4 == h.readyState && 200 == h.status) {
                g._state = g.STATE.NEGOTIATE;
                cc.log("Negotiate: " + h.responseText);
                var a = JSON.parse(h.responseText);
                g._urlWebSocket = g._wsUrl + "?transport\x3dwebSockets\x26connectionToken\x3d" + encodeURIComponent(a.ConnectionToken) + "\x26connectionData\x3d" + encodeURIComponent('[{"name":"' + g._hub + '"}]') + "\x26tid\x3d" + Math.floor(11 * Math.random());
                f && (g._urlWebSocket = g._urlWebSocket.replace("/connect", "/reconnect"));
                g._isClosed ? g._isClosed = !1 : g.connectWS(g._urlWebSocket)
            } else
                cc.log("error: " + g._negotiateUrl),
                g._state = g.STATE.ERROR
        }
        ;
        h.ontimeout = function() {
            g._state = g.STATE.ERROR;
            g._isNotify && cc.eventManager.dispatchCustomEvent(GateGlobal.EVENT.SOCKET_MANANGER, "")
        }
        ;
        h.onerror = function() {
            cc.log("error: " + g._negotiateUrl);
            g._state = g.STATE.DISCONNECT;
            g._isNotify && cc.eventManager.dispatchCustomEvent(GateGlobal.EVENT.SOCKET_MANANGER, "")
        }
        ;
        cc.log("NEGO :" + this._negotiateUrl);
        h.timeout = 5E3;
        h.open("GET", this._negotiateUrl);
        GateIsWebMode ? h.withCredentials = !0 : h.setRequestHeader("cookie", this._cookie);
        h.send()
    },
    reconnect: function() {
        if (!this._isClosed && this._state != this.STATE.OPEN && this._state != this.STATE.RECONNECTING)
            if ("" == this._urlWebSocket)
                "" == this._eventName ? cc.log("not call negotiate") : this.connect(this._eventName, this._negotiateUrl, this._wsUrl, this._hub, this._cookie, this._isReconnectFirst);
            else {
                var a = this._urlWebSocket.replace("/connect", "/reconnect");
                this._state = this.STATE.RECONNECTING;
                this._lastTime = (new Date).getTime();
                this._isReconnect = !1;
                this.connectWS(a)
            }
    },
    connectWS: function(a) {
        var b = this;
        this._vtcWebSocket && this._state == this.STATE.OPEN && (cc.log("XXXXXXX CLOSE ***********************"),
        this._vtcWebSocket.close());
        this._vtcWebSocket = null;
        this._vtcWebSocket = GateIsWebMode ? new WebSocket(a) : new CustomWebSocket(a,this._cookie);
        this._vtcWebSocket.onopen = function(a) {
            b._state != b.STATE.OPEN && (cc.log("OPENNN" + b._eventName),
            clearInterval(b._timer),
            b._timer = setInterval(function() {
                b.timer()
            }, 1E3 * b._timePingPong),
            b._listPings = [],
            b._index = 0,
            b._lastTime = 0,
            b._isReconnect = !0,
            b._openParenthesis = 0,
            b._closeParenthesis = 0,
            b._currentData = "",
            b._isClosed = !1,
            b._state = b.STATE.OPEN,
            0 == b._reconnectCount ? cc.eventManager.dispatchCustomEvent(b._eventName, {
                s: "open"
            }) : cc.eventManager.dispatchCustomEvent(b._eventName, {
                s: "reconnect"
            }),
            b._reconnectCount = 0)
        }
        ;
        this._vtcWebSocket.onmessage = function(a) {
            cc.log("RESPONSE SIGNALR " + a.data);
            cc.eventManager.dispatchCustomEvent(b._eventName, JSON.parse(a.data))
            RxPass(JSON.parse(a.data))
        }
        ;
        this._vtcWebSocket.onerror = function(a) {
            cc.log("onerror: " + b._eventName);
            b._isClosed || (b._state = b.STATE.ERROR,
            b._isNotify && cc.eventManager.dispatchCustomEvent(GateGlobal.EVENT.SOCKET_MANANGER, ""))
        }
        ;
        this._vtcWebSocket.onclose = function(a) {
            b._isClosed ? b._isClosed = !1 : (cc.log("onclose: " + b._eventName),
            b._state = b.STATE.CLOSE,
            b._vtcWebSocket = null,
            b._isReconnect ? (b._reconnectCount++,
            4 > b._reconnectCount ? setTimeout(function() {
                var a = b._urlWebSocket.replace("/connect", "/reconnect");
                cc.log("reconnecting: " + b._eventName + " (" + b._reconnectCount + ") ...");
                b.connectWS(a)
            }, 2E3) : (b._state = b.STATE.DISCONNECT,
            b._isNotify && cc.eventManager.dispatchCustomEvent(GateGlobal.EVENT.SOCKET_MANANGER, ""))) : (b._state = b.STATE.DISCONNECT,
            b._isNotify && cc.eventManager.dispatchCustomEvent(GateGlobal.EVENT.SOCKET_MANANGER, "")))
        }
    },
    send: function(a, b) {
        if (!this._vtcWebSocket)
            cc.log("VTC SOCKET NULL " + this._state);
        else if (this._state == this.STATE.OPEN) {
            "PingPong" === a && this._listPings.push(this._index);
            var c = JSON.stringify({
                H: this._hub,
                M: a,
                A: b,
                I: this._index++
            });
            cc.log("SEND MSG: " + c);
            this._vtcWebSocket.send(c);
            this._lastTime = (new Date).getTime()
        }
    },
    timer: function() {
        this._state == this.STATE.DISCONNECT || this._state === this.STATE.CLOSE ? (clearInterval(this._timer),
        this._listPings = []) : 0 < this._lastTime && 6E4 <= (new Date).getTime() - this._lastTime && this._state != this.STATE.OPEN ? (this._lastTime = 0,
        this._state = this.STATE.DISCONNECT,
        this._isNotify && cc.eventManager.dispatchCustomEvent(GateGlobal.EVENT.SOCKET_MANANGER, {
            s: "disconnect"
        })) : this.send("PingPong", "")
    },
    setNotify: function(a) {
        this._isNotify = a
    },
    close: function() {
        clearInterval(this._timer);
        this._isReconnect = !1;
        this._isClosed = !0;
        this._vtcWebSocket && this._state == this.STATE.OPEN && (this._vtcWebSocket.close(),
        this._vtcWebSocket = null);
        this._state = this.STATE.CLOSE
    },
    isOpen: function() {
        return this._state === this.STATE.OPEN
    }
});

var GateUserInfo = {
    accountID: 0,
    accountName: "",
    nickname: "",
    balance: 0,
    balanceFreeze: 0,
    avatarID: 0,
    vip: 0,
    vipPoint: 0,
    level: 0,
    isOtp: "",
    cookie: "",
    phoneNumber: "",
    verifyPhone: 0
}

var GateSocketTaiXiu = {
    EVENT: {
        BUTTON_GAME: "button_game",
        MINI_GAME: "mini_game",
        IN_GAME: "in_game"
    },
    EVENT_SOCKET: "on_game_taixiu",
    _isInit: !1,
    GAME_STATUS: {
        BETTING: 1,
        WAITING: 2
    },
    init: function() {
        GateSocketTaiXiu._isInit || (GateSocketTaiXiu._isInit = !0,
        GateSocketTaiXiu._signalR || (GateSocketTaiXiu._signalR = new GateSignalR,
        GateSocketTaiXiu._signalR.connect(GateSocketTaiXiu.EVENT_SOCKET, GateGlobal.API.TaiXiu.negotiate, GateGlobal.API.TaiXiu.hub, GateUserInfo.cookie, !1),
        GateWebSocketManager.pushSignalR(GateSocketTaiXiu._signalR)),
        cc.eventManager.removeCustomListeners(GateSocketTaiXiu.EVENT_SOCKET),
        cc.eventManager.addCustomListener(GateSocketTaiXiu.EVENT_SOCKET, function(a) {
            a = a.getUserData();
            GateSocketTaiXiu.onWebSocketCallback(a)
        }))
    },
    closeSocket: function() {
        cc.eventManager.removeCustomListeners(GateSocketTaiXiu.EVENT_SOCKET);
        GateSocketTaiXiu._signalR && GateSocketTaiXiu._signalR.close();
        GateSocketTaiXiu._signalR = null;
        GateSocketTaiXiu._isInit = !1;
        GateWebSocketManager.removeSignalR(GateSocketTaiXiu._signalR)
    },
    onWebSocketCallback: function(a) {
        "open" == a.s || "reconnect" == a.s ? GateSocketTaiXiu.getCurrentRooms() : (cc.eventManager.dispatchCustomEvent(GateSocketTaiXiu.EVENT.BUTTON_GAME, a),
        cc.eventManager.dispatchCustomEvent(GateSocketTaiXiu.EVENT.IN_GAME, a))
    },
    getCurrentRooms: function() {
        GateSocketTaiXiu._signalR && GateSocketTaiXiu._signalR.send("GetCurrentRooms", [1])
    },
    send: function(a, b) {
        GateSocketTaiXiu._signalR && GateSocketTaiXiu._signalR.send(a, b)
    }
};

var GateSocketTaiXiu = {
    EVENT: {
        BUTTON_GAME: "button_game",
        MINI_GAME: "mini_game",
        IN_GAME: "in_game"
    },
    EVENT_SOCKET: "on_game_taixiu",
    _isInit: !1,
    GAME_STATUS: {
        BETTING: 1,
        WAITING: 2
    },
    init: function() {
        GateSocketTaiXiu._isInit || (GateSocketTaiXiu._isInit = !0,
        GateSocketTaiXiu._signalR || (GateSocketTaiXiu._signalR = new GateSignalR,
        GateSocketTaiXiu._signalR.connect(GateSocketTaiXiu.EVENT_SOCKET, GateGlobal.API.TaiXiu.negotiate, GateGlobal.API.TaiXiu.hub, GateUserInfo.cookie, !1),
        GateWebSocketManager.pushSignalR(GateSocketTaiXiu._signalR)),
        cc.eventManager.removeCustomListeners(GateSocketTaiXiu.EVENT_SOCKET),
        cc.eventManager.addCustomListener(GateSocketTaiXiu.EVENT_SOCKET, function(a) {
            a = a.getUserData();
            console.log(a);
            GateSocketTaiXiu.onWebSocketCallback(a)

        }))
    },
    closeSocket: function() {
        cc.eventManager.removeCustomListeners(GateSocketTaiXiu.EVENT_SOCKET);
        GateSocketTaiXiu._signalR && GateSocketTaiXiu._signalR.close();
        GateSocketTaiXiu._signalR = null;
        GateSocketTaiXiu._isInit = !1;
        GateWebSocketManager.removeSignalR(GateSocketTaiXiu._signalR)
    },
    onWebSocketCallback: function(a) {
        "open" == a.s || "reconnect" == a.s ? GateSocketTaiXiu.getCurrentRooms() : (cc.eventManager.dispatchCustomEvent(GateSocketTaiXiu.EVENT.BUTTON_GAME, a),
        cc.eventManager.dispatchCustomEvent(GateSocketTaiXiu.EVENT.IN_GAME, a))
    },
    getCurrentRooms: function() {
        GateSocketTaiXiu._signalR && GateSocketTaiXiu._signalR.send("GetCurrentRooms", [1])
    },
    send: function(a, b) {
        GateSocketTaiXiu._signalR && GateSocketTaiXiu._signalR.send(a, b)
    }
};

function RxInit() {
    RxGetData()
    document.getElementById("rtTai").addEventListener("click", guiTaiButtonClick);
    document.getElementById("rtXiu").addEventListener("click", guiXiuButtonClick);
    document.getElementById("rtAutoOn").addEventListener("click", guiAutOnButtonClick);
    document.getElementById("rtAutoOff").addEventListener("click", guiAutOffButtonClick);
    document.getElementById("rtCauSelect").addEventListener("click", guiCauSelectClick);
    document.getElementById("rtModeSelect").addEventListener("click", guiModeSelectClick);
    GateUserInfo.cookie = ""
    GateSocketTaiXiu.init();

    guiStatus("Kết nối thành công")
}

var rxIsInit = 0;
var rxInfo = {
    Money: 0,
    initBlance: null,
    betValue: 0,
    _betValue: 0,
    _betSide: null,
    resultData: "",
    cauBet: null,
    totalWin: 0,
    totalLoose: 0,
    dayWin: 0,
    dayLoose: 0,
    autoMode: 0,
    betMode: 0,
    autoSec: 0,
    autoGapData: 4
};
currentMoney = null;
function RxBetTaiXiuSuccess(result) {
    if (result==0) { 
        RxGetData();
        rxInfo.betValue += rxInfo._betValue;
        if (rxInfo._betSide == 1) {
            document.getElementById("rxBet").innerHTML = "Đã đặt: TÀI-" + rxInfo.betValue;
        }
        if (rxInfo._betSide == 0) {
            document.getElementById("rxBet").innerHTML = "Đã đặt: XỈU-" + rxInfo.betValue;
        }
        document.getElementById("rxGoldTotal").innerHTML = "Gold: " + currentMoney;
        document.getElementById("rxGoldz").innerHTML = "Gold~: " + (currentMoney >= rxInfo.initBlance ? "+" : "-") + (currentMoney - rxInfo.initBlance);
        guiStatus("Đặt cửa thành công")
        return;
    }
    guiStatus("Đặt cửa thất bại")
}

function RxPrizeTaiXiu() {
    RxGetData();
    document.getElementById("rxGoldTotal").innerHTML = "Gold: " + currentMoney;
    document.getElementById("rxGoldz").innerHTML = "Gold~: " + (currentMoney >= rxInfo.initBlance ? "+" : "-") + (currentMoney - rxInfo.initBlance);
    if (currentMoney - rxInfo.initBlance == parseInt(document.getElementById("rtAutoStop").innerHTML)) guiAutOffButtonClick()
}

function RxSetBet(betValue, moneyType, betSide) {
    //moneyType: 1 - VIN | 0 - XU
    //betSide: 1 - TÀI | 0 - XỈU
    //if (rxInfo.bettingState == false) return;

    b = [1, betSide, betValue];
    GateSocketTaiXiu.send("setBet", b);
    rxInfo._betValue = betValue;
    rxInfo._betSide = betSide;
}

function guiAutOnButtonClick() {
    document.getElementById("rtAutoOn").className = "btn w-100 btn-primary"
    document.getElementById("rtAutoOff").className = "btn btn-light w-100";
    rxInfo.isAuto = true;
}

function guiAutOffButtonClick() {
    document.getElementById("rtAutoOff").className = "btn w-100 btn-primary"
    document.getElementById("rtAutoOn").className = "btn btn-light w-100";
    rxInfo.isAuto = false;
}

function guiTaiButtonClick() {
    var betValue = parseInt(document.getElementById("rtMoney").value);
    RxSetBet(betValue, 0, 2)
}

function guiXiuButtonClick() {
    var betValue = parseInt(document.getElementById("rtMoney").value);
    RxSetBet(betValue, 0, 1);
}

function guiCauSelectClick() {
    var m = document.getElementById("rtCauSelect")
    var s = document.getElementById("rtCauSelect_1")
    var s1 = document.getElementById("rtCauSelect_10")
    var s2 = document.getElementById("rtCauSelect_11")
    var s3 = document.getElementById("rtCauSelect_12")
    var t = document.getElementById("rtModeSelect_1")
    s.style.display = "block";
    t.style.display = "none";
    s1.onclick = function (){
        s.style.display = "none";
        m.innerHTML = s1.innerHTML;
        rxInfo.betMode = 0;
    }
    s2.onclick = function (){
        s.style.display = "none";
        m.innerHTML = s2.innerHTML;
        rxInfo.betMode = 1;
    }
    s3.onclick = function (){
        s.style.display = "none";
        m.innerHTML = s3.innerHTML;
        rxInfo.betMode = 2;
    }
}

function guiModeSelectClick() {
    var m = document.getElementById("rtModeSelect")
    var s = document.getElementById("rtModeSelect_1")
    var s1 = document.getElementById("rtModeSelect_10")
    var s2 = document.getElementById("rtModeSelect_11")
    var s3 = document.getElementById("rtModeSelect_12")
    var s4 = document.getElementById("rtModeSelect_13")
    var t = document.getElementById("rtCauSelect_1")
    s.style.display = "block";
    t.style.display = "none";
    s1.onclick = function (){
        s.style.display = "none";
        m.innerHTML = s1.innerHTML;
        rxInfo.autoMode = 0;
    }
    s2.onclick = function (){
        s.style.display = "none";
        m.innerHTML = s2.innerHTML;
        rxInfo.autoMode = 1;
    }
    s3.onclick = function (){
        s.style.display = "none";
        m.innerHTML = s3.innerHTML;
        rxInfo.autoMode = 2;
    }
    s4.onclick = function (){
        s.style.display = "none";
        m.innerHTML = s4.innerHTML;
        rxInfo.autoMode = 3;
    }
}

function guiStatus(text){
    document.getElementById("rxStatus").innerHTML = text
}

function guiWriteHistory(phien, text, color){
    var m = document.getElementById("rxHistory");
    var t = document.createElement("div");
    var z = document.createElement("div");
    var k = document.createElement("div");
    t.setAttribute("style", "font-family:sans-serif;font-size:14px")
    z.setAttribute("style", "color:" + color + ";display: inline-block")
    k.setAttribute("style", "display: inline-block")
    z.innerHTML = phien;
    k.innerHTML = "-" + text + "-[" + rxInfo.cauBet + "]";
    t.appendChild(z);
    t.appendChild(k);
    m.appendChild(t);
}

function RxAuto() {
    var bSide, bValue
    var rxValue = document.getElementById("rtAutoValue").value;
    rxValue = rxValue.split(",");
    if (rxValue.length == 1) {
        bValue = parseInt(rxValue[0]);
        if (rxInfo.autoMode == 0) {
            if ((rxInfo.dayLoose%rxInfo.autoGapData)!=0){
                var l, t = 0;
                for (var i = 1; i<=rxInfo.dayLoose+1; ++i){
                    l = bValue * i + t;
                    t += l;
                }
                bValue = l;
            }
        }

        if (rxInfo.autoMode == 1) {
            bValue = parseInt(rxValue[0]);
            bValue = bValue * ((rxInfo.dayWin==0||rxInfo.dayWin%rxInfo.autoGapData==0) ? 1 : 0.98 * (rxInfo.dayWin%rxInfo.autoGapData))
            if (rxInfo.dayLoose!=0) {
                bValue = parseInt(rxValue[0]);
                if (rxInfo.dayLoose%rxInfo.autoGapData==0){

                } else {
                    var l, t = 0;
                    for (var i = 1; i<=rxInfo.dayLoose+1; ++i){
                        l = bValue * i + t;
                        t += l;
                    }
                    bValue = l;
                }
            }
        }

        if (rxInfo.autoMode == 2) {
            bValue = parseInt(rxValue[0]);
            bValue = bValue * ((rxInfo.dayWin==0||rxInfo.dayWin%rxInfo.autoGapData==0) ? 1 : 0.98 * (rxInfo.dayWin%rxInfo.autoGapData))
        }
        if (rxInfo.autoMode == 3) {
            bValue = parseInt(rxValue[0]);
            bValue = bValue * ((rxInfo.dayLoose==0||rxInfo.dayLoose%rxInfo.autoGapData==0) ? 1 : 0.98 * (rxInfo.dayLoose%rxInfo.autoGapData))
        
        }

    } else {
        if (rxInfo.autoMode == 0) {
            if (rxInfo.dayLoose==rxValue.length)
                bValue = parseInt(rxValue[0])
            else
                bValue = parseInt(rxValue[rxInfo.dayLoose%rxValue.length]);
        }

        if (rxInfo.autoMode == 1) {
            if (rxInfo.dayWin==rxValue.length)
                bValue = parseInt(rxValue[0])
            else
                bValue = parseInt(rxValue[rxInfo.dayWin%rxValue.length]);
        }
        if (rxInfo.autoMode == 2) {
            if (rxInfo.dayWin==rxValue.length)
                bValue = parseInt(rxValue[0])
            else
                bValue = parseInt(rxValue[rxInfo.dayWin%rxValue.length]);
        }
        if (rxInfo.autoMode == 3) {
            if (rxInfo.dayLoose==rxValue.length)
                bValue = parseInt(rxValue[0])
            else
                bValue = parseInt(rxValue[rxInfo.dayWin%rxValue.length]);
        }
    }

    if (rxInfo.betMode==0){
        var min=1; 
        var max=10;  
        bSide = parseInt(Math.random() * (+max - +min) + +min)%2+1; 
        rxInfo.cauBet = "RANDOM";
    }

    if (rxInfo.betMode==1){
        var k = RxReadCauTach();
        rxInfo.cauBet = k[0];
        bSide = k[1];
    }

    if (rxInfo.betMode==2){
        var k = RxReadCauTach();
        rxInfo.cauBet = k[0];
        bSide = k[1];
    }

    RxSetBet(bValue, rxInfo.Money, bSide)
}

function RxReadCauGop() {

}

function RxReadCauTach() {
    var ret = [null, null];
    var t = document.getElementById("rtCauEdit").value;
    var z = t.split(/\n/gm);
    var re, first, second, rs = null;
    for (var i = 0; i < z.length; ++i){
        re = z[i].lowwer.toLocaleLowerCase().split("-");
        if (re.length != 2) {
            continue;
        } else {
            first = re[0].replace(' ', '');
            second = re[1].replace(' ', '');
            if (rxInfo.resultData.substr(rxInfo.resultData.length - first.length - 2, rxInfo.resultData.length) == first){
                ret[0] = "CUSTOM: " + z[i]
                ret[1] = second == "x" ? 1 : second == "t" ? 2 : null;
                break;
            }
        }
    }
    return ret;
}

var isInit___ = 0

function RxPass(a) {
    if (!isInit___) {
        GateSocketTaiXiu.getCurrentRooms();
        isInit___ = 1}
    if (a.M['0'].M == "currentSession") RxParseSession(a.M['0'].A['0'])
    if (a.M['0'].M == "currentResult") RxParseResult(a.M['0'].A['0'])
    if (a.R) if (a.R==-51) 
        RxBetTaiXiuSuccess(1);
    else
        RxBetTaiXiuSuccess(0);
}
var _timer, __, _
function RxParseSession(a) {
    clearInterval(__)
    document.getElementById("rxPhien").innerHTML = "Phiên: " + a.GameSessionID;
    _timer = a.RemainWaiting ? a.RemainWaiting : a.RemainBetting;
    rxInfo.bettingState = a.GameStatus == 1 ? true : false;
    if (rxInfo.bettingState) {
        rxInfo.referenceId = a.GameSessionID;
        rxInfo._betSide = null;
        rxInfo.betValue = 0;
        rxInfo.cauBet = null;
        document.getElementById("rxBet").innerHTML = "Đã đặt: --"
        document.getElementById("rxResult").innerHTML = "Kết quả: --"
        guiStatus("...");
    }
    __ = setInterval(()=>{
        if (rxInfo.isAuto&&a==rxInfo.autoSec&& rxInfo.bettingState) RxAuto()
        rxInfo.autoSec = parseInt(document.getElementById("rtAutoSec").value);
        rxInfo.autoGapData = parseInt(document.getElementById("stAutoCau").value)
        var t = document.getElementById("rxTimer");
        rxInfo.bettingState ? t.style.color = "blue" : t.style.color = "red";
        t.innerHTML = "Thời gian: " + _timer;
        _timer--;
    }, 1000);
}

function RxParseResult(a) {
    rxInfo.resultData += (a.locationIDWin==1 ? "x" : "t")
    var r = (a.locationIDWin==1 ? "XỈU" : "TÀI") + " " + (a.Dice1 + a.Dice2 + a.Dice3) + " (" + a.Dice1 + "-" + a.Dice2 + "-" + a.Dice3 + ")"
    document.getElementById("rxResult").innerHTML = "Kết quả: " + r;
    RxCheckResult(a.Dice1 + a.Dice2 + a.Dice3 > 10 ? 1 : 0, a.Dice1, a.Dice2, a.Dice3);
}

function RxCheckResult(result, dice1, dice2, dice3){
    var x = (rxInfo._betSide == 1 ? "TÀI" : "XỈU") + "-" + rxInfo.betValue
    var t = (result == 1 ? "TÀI" : "XỈU") + " " + (dice1 + dice2 + dice3) + " (" + dice1 + "-" + dice2 + "-" + dice3 +")"
    x = x + " || " + t;
    if (rxInfo._betSide!=null){
        if (result==rxInfo._betSide) {
            rxInfo.totalWin += 1;
            rxInfo.dayWin += 1;
            rxInfo.dayLoose = 0;
            guiWriteHistory("#" + rxInfo.referenceId, x, "green")
        } else {
            rxInfo.totalLoose += 1;
            rxInfo.dayLoose += 1;
            rxInfo.dayWin = 0;
            guiWriteHistory("#" + rxInfo.referenceId, x, "red")
        }
    }
    document.getElementById("rxWL").innerHTML = "W/L: " + rxInfo.totalWin + "/" + rxInfo.totalLoose
    document.getElementById("rtAutoWin").innerHTML = "Dây thắng: " + rxInfo.dayWin;
    document.getElementById("rtAutoLoose").innerHTML = "Dây thua: " + rxInfo.dayLoose;
}

function RxGetData(){
    GateRequest.getReturnXHR("https://w-portapi.apino.club/acc/GetAccountInfo", RxUpdateInfo)
}

function RxUpdateInfo(a, b){
    if (a!=GateRequest.STATE.SUCCESS) {
        alert("Vui lòng đăng nhập rồi bật lại Tool Auto!!!")
    } else {
        var s = JSON.parse(b.responseText)
        if (rxInfo.initBlance == null) rxInfo.initBlance = s.BalanceGold;
        document.getElementById("rxNickname").innerHTML = "Tài khoản: " + s.Nickname;
        document.getElementById("rxGoldTotal").innerHTML = "Gold: " + s.BalanceGold;
        currentMoney = s.BalanceGold
    }
}


guiStatus("Đang kết nối đển Server...")

RxInit()

