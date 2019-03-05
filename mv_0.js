//Import library
// var vm = require("vm");
// var fs = require("fs");

// var _load = function(path, context) {
//     var data = fs.readFileSync(path);
//     vm.runInThisContext(data, path);
// }
// _load("./cocos2d-js-v3.13-lite.js")
//

//SR Base
function Jacob__Codec__Base64__decode(a) {
    var b = [], c, d, e, f, g, h = 0;
    for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); h < a.length; )
        c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(h++)),
        d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(h++)),
        f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(h++)),
        g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(h++)),
        c = c << 2 | d >> 4,
        d = (d & 15) << 4 | f >> 2,
        e = (f & 3) << 6 | g,
        b.push(String.fromCharCode(c)),
        64 != f && b.push(String.fromCharCode(d)),
        64 != g && b.push(String.fromCharCode(e));
    return b = b.join("")
}

var InPacket = cc.Class.extend({
    ctor: function() {},
    init: function(a) {
        this._pos = 0;
        this._data = a;
        this._length = a.length;
        this._controllerId = this.parseByte();
        this._cmdId = this.getShort();
        this._error = this.parseByte()
    },
    getCmdId: function() {
        return this._cmdId
    },
    getControllerId: function() {
        return this._controllerId
    },
    getError: function() {
        return this._error
    },
    parseByte: function() {
        cc.assert(this._pos < this._length, "IndexOutOfBoundsException");
        return this._data[this._pos++]
    },
    getByte: function() {
        return this.parseByte()
    },
    getBool: function() {
        cc.assert(this._pos < this._length, "IndexOutOfBoundsException");
        return 0 < this._data[this._pos++]
    },
    getBytes: function(a) {
        cc.assert(this._pos + a <= this._length, "IndexOutOfBoundsException");
        for (var b = [], c = 0; c < a; c++)
            b.push(this.parseByte());
        return b
    },
    getShort: function() {
        cc.assert(this._pos + 2 <= this._length, "IndexOutOfBoundsException");
        if (this._pos + 2 > this._length)
            return 0;
        var a = (this.parseByte() << 8) + (this.parseByte() & 255);
        return 32767 < a ? a - 65536 : a
    },
    getUnsignedShort: function() {
        cc.assert(this._pos + 2 <= this._length, "getUnsignedShort: IndexOutOfBoundsException");
        var a = (this.parseByte() & 255) << 8
          , b = (this.parseByte() & 255) << 0;
        return a + b
    },
    getInt: function() {
        cc.assert(this._pos + 4 <= this._length, "getInt: IndexOutOfBoundsException");
        return ((this.parseByte() & 255) << 24) + ((this.parseByte() & 255) << 16) + ((this.parseByte() & 255) << 8) + ((this.parseByte() & 255) << 0)
    },
    byteArrayToLong: function(a) {
        var b = !0
          , c = 0;
        255 == a[0] && (b = !1);
        if (b)
            for (b = 0; 8 > b; b++)
                c = 256 * c + a[b];
        else {
            for (b = c = 1; 7 >= b; b++)
                c = 256 * c - a[b];
            c = -c
        }
        return c
    },
    getLong: function() {
        cc.assert(this._pos + 8 <= this._length, "getLong: IndexOutOfBoundsException");
        for (var a = [], b = 0; 8 > b; b++)
            a[b] = this.parseByte();
        return this.byteArrayToLong(a)
    },
    getDouble: function() {
        cc.assert(this._pos + 8 <= this._length, "getLong: IndexOutOfBoundsException");
        for (var a = new ArrayBuffer(8), b = new Uint8Array(a), c = 7; 0 <= c; c--)
            b[7 - c] = this.parseByte();
        return (new DataView(a)).getFloat64(0)
    },
    getCharArray: function() {
        var a = this.getUnsignedShort();
        return this.getBytes(a)
    },
    getString: function() {
        for (var a = this.getCharArray(), b = new Uint8Array(a.length), c = 0; c < a.length; c++)
            b[c] = parseInt(a[c], 10);
        a = String.fromCharCode.apply(null, b);
        return decodeURIComponent(escape(a))
    },
    clean: function() {}
})
  , CmdReceivedCommon = InPacket.extend({
    ctor: function(a) {
        this._super();
        this.init(a);
        this.readData()
    },
    readData: function() {}
});
var INDEX_SIZE_PACKET = 1
  , OutPacket = cc.Class.extend({
    ctor: function() {
        this._controllerId = 1;
        this._cmdId = 0;
        this.reset()
    },
    setCmdId: function(a) {
        this._cmdId = a
    },
    setControllerId: function(a) {
        this._controllerId = a
    },
    initData: function(a) {
        this._data = [a];
        this._capacity = a
    },
    reset: function() {
        this._length = this._pos = 0;
        this._isPackedHeader = !1
    },
    packHeader: function() {
        if (!this._isPackedHeader) {
            this._isPackedHeader = !0;
            var a = PacketHeaderAnalyze.genHeader(!1, !1);
            this.putByte(a);
            this.putUnsignedShort(this._length);
            this.putByte(this._controllerId);
            this.putShort(this._cmdId)
        }
    },
    putByte: function(a) {
        this._data[this._pos++] = a;
        this._length = this._pos;
        return this
    },
    putByteArray: function(a) {
        this.putShort(a.length);
        this.putBytes(a);
        return this
    },
    putBytes: function(a) {
        for (var b = 0; b < a.length; b++)
            this.putByte(a[b]);
        return this
    },
    putShort: function(a) {
        this.putByte(a >> 8 & 255);
        this.putByte(a >> 0 & 255);
        return this
    },
    putUnsignedShort: function(a) {
        this.putByte(a >> 8);
        this.putByte(a >> 0);
        return this
    },
    putInt: function(a) {
        this.putByte(a >> 24 & 255);
        this.putByte(a >> 16 & 255);
        this.putByte(a >> 8 & 255);
        this.putByte(a >> 0 & 255);
        return this
    },
    putLong: function(a) {
        0 > a && cc.log("hahaha");
        for (var b = [], c = 0; 8 > c; c++)
            b[c] = a & 255,
            a = Math.floor(a / 256);
        for (a = 7; 0 <= a; a--)
            this.putByte(b[a])
    },
    putDouble: function(a) {
        this.putByte(a >> 24 & 255);
        this.putByte(a >> 16 & 255);
        this.putByte(a >> 8 & 255);
        this.putByte(a >> 0 & 255);
        this.putByte(a >> 24 & 255);
        this.putByte(a >> 16 & 255);
        this.putByte(a >> 8 & 255);
        this.putByte(a >> 0 & 255);
        return this
    },
    putString: function(a) {
        this.putByteArray(this._stringConvertToByteArray(a));
        return this
    },
    updateUnsignedShortAtPos: function(a, b) {
        this._data[b] = a >> 8;
        this._data[b + 1] = a >> 0
    },
    updateSize: function() {
        this.updateUnsignedShortAtPos(this._length - 3, INDEX_SIZE_PACKET)
    },
    getData: function() {
        return this._data.slice(0, this._length)
    },
    _stringConvertToByteArray: function(a) {
        if (null == a)
            return null;
        for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++)
            b[c] = a.charCodeAt(c);
        return b
    },
    clean: function() {}
})
  , CmdSendCommon = OutPacket.extend({
    ctor: function(a, b) {
        this._super();
        this.initData(100);
        this.setControllerId(1);
        isNaN(a) || (this.setCmdId(a),
        this.packHeader(),
        "undefined" === b && this.updateSize())
    }
});

//Socket Base
(function() {
    var a = a || window.WebSocket || window.MozWebSocket;
    WebsocketClient = cc.Class.extend({
        ctor: function() {
            this.ws = this.listener = null;
            this.data = [];
            this.event = -1;
            this.state = WEBSOCKET_NOT_CONNECTED
        },
        connect: function(b, c, d, e) {
            this._host = b;
            this._port = c;
            this.ws = new a("ws" + (d ? "s" : "") + "://" + b + ":" + c + "/websocket");
            this.state = WEBSOCKET_CONNECTING;
            this.listener = e;
            this.ws.binaryType = "arraybuffer";
            this.ws.onopen = this.onSocketConnect.bind(this);
            this.ws.onclose = this.onSocketClose.bind(this);
            this.ws.onmessage = this.onSocketData.bind(this);
            this.ws.onerror = this.onSocketError.bind(this)
        },
        closeSocket: function() {
           if (this.state == WEBSOCKET_CONNECTED) this.ws.close()
        },
        onSocketConnect: function() {
            this.state = WEBSOCKET_CONNECTED;
            this.listener && this.listener.onFinishConnect && (this.listener.target = this,
            this.listener.onFinishConnect.call(this.listener, !0))
        },
        onSocketClose: function() {
            this.state = WEBSOCKET_NOT_CONNECTED;
            this.listener && this.listener.onDisconnected && (this.listener.target = this,
            this.listener.onDisconnected.call(this.listener))
        },
        onSocketData: function(a) {
            a = new Uint8Array(a.data);
            this.listener && this.listener.onReceived && this.listener.onReceived.call(this.listener, 0, a)
        },
        onSocketError: function() {
            this.state = WEBSOCKET_NOT_CONNECTED;
            this.listener && this.listener.onFinishConnect && (this.listener.target = this,
            this.listener.onFinishConnect.call(this.listener, !1))
        },
        setPreventSpam: function(a) {
            void 0 == a && (a = !0);
            this._preventSpam = a
        },
        send: function(a, c) {
            if (this._preventSpam) {
                if (this.state != WEBSOCKET_CONNECTED)
                    return !1;
                var d = (new Date).getTime();
                return !this["time" + a._cmdId] || 1E3 < d - this["time" + a._cmdId] ? (this["time" + a._cmdId] = d,
                c && c(),
                this._send(a),
                !0) : !1
            }
            this._send(a);
            return !0
        },
        _send: function(a) {
            for (var c = new Int8Array(a._length), d = 0; d < a._length; d++)
                c[d] = a._data[d];
            this.ws.send(c.buffer)
        }
    });
    WEBSOCKET_NOT_CONNECTED = 0;
    WEBSOCKET_CONNECTING = 1;
    WEBSOCKET_CONNECTED = 2
}
)();

var BIT_IS_BINARY_INDEX = 7
  , BIT_IS_ENCRYPT_INDEX = 6
  , BIT_IS_COMPRESS_INDEX = 5
  , BIT_IS_BLUE_BOXED_INDEX = 4
  , BIT_IS_BIG_SIZE_INDEX = 3
  , BYTE_PACKET_SIZE_INDEX = 1
  , BIG_HEADER_SIZE = 5
  , NORMAL_HEADER_SIZE = 3
  , PacketHeaderAnalyze = {
    getDataSize: function(a) {
        return this.isBigSize(a) ? this.getIntAt(a, BYTE_PACKET_SIZE_INDEX) : this.getUnsignedShortAt(a, BYTE_PACKET_SIZE_INDEX)
    },
    getCmdIdFromData: function(a) {
        return this.getShortAt(a, 1)
    },
    isBigSize: function(a) {
        return this.getBit(a[0], BIT_IS_BIG_SIZE_INDEX)
    },
    isCompress: function(a) {
        return this.getBit(a[0], BIT_IS_COMPRESS_INDEX)
    },
    getValidSize: function(a) {
        var b = 0
          , c = 0;
        if (this.isBigSize(a)) {
            if (length < BIG_HEADER_SIZE)
                return -1;
            b = this.getIntAt(a, BYTE_PACKET_SIZE_INDEX);
            c = BIG_HEADER_SIZE
        } else {
            if (length < NORMAL_HEADER_SIZE)
                return -1;
            b = this.getUnsignedShortAt(a, BYTE_PACKET_SIZE_INDEX);
            c = NORMAL_HEADER_SIZE
        }
        return b + c
    },
    getBit: function(a, b) {
        return 0 != (a & 1 << b)
    },
    genHeader: function(a, b) {
        var c;
        c = this.setBit(0, 7, !0);
        c = this.setBit(c, 6, !1);
        c = this.setBit(c, 5, b);
        c = this.setBit(c, 4, !0);
        return c = this.setBit(c, 3, a)
    },
    setBit: function(a, b, c) {
        return c ? a | 1 << b : a & ~(1 << b)
    },
    getIntAt: function(a, b) {
        return ((a[b] & 255) << 24) + ((a[b + 1] & 255) << 16) + ((a[b + 2] & 255) << 8) + ((a[b + 3] & 255) << 0)
    },
    getUnsignedShortAt: function(a, b) {
        return ((a[b] & 255) << 8) + ((a[b + 1] & 255) << 0)
    },
    getShortAt: function(a, b) {
        return (a[b] << 8) + (a[b + 1] & 255)
    }
};

//TX Base
var taixiuWebSocketCmd = {
    LOGIN: 1,
    MN_UPDATE_USER_INFO: 2003,
    MN_POP: 37,
    SUBCRIBLE_CHAT: 18001,
    UNSUBCRIBLE_CHAT: 18002,
    SEND_CHAT: 18E3,
    MN_CHANGE_ROOM: 2002,
    MN_SUBSCRIBE: 2E3,
    MN_UNSUBSCRIBE: 2001,
    UPDATE_TIME_TAI_XIU: 2124,
    UPDATE_TAI_XIU_PER_SECOND: 2112,
    TAI_XIU_INFO: 2111,
    UPDATE_RESULT_DICES: 2113,
    UPDATE_PRIZE_TAI_XIU: 2114,
    BET_TAI_XIU: 2110,
    START_NEW_GAME_TAI_XIU: 2115,
    LICH_SU_PHIEN_TAI_XIU: 2116,
    TX_TAN_LOC: 2118,
    TX_RUT_LOC: 2119,
    UPDATE_QUY_LOC: 2120,
    START_NEW_ROUND_RUT_LOC: 2121,
    UPDATE_LUOT_RUT_LOC: 2122,
    ENABLE_RUT_LOC: 2123,
    LOG_CHAT: 18003
};
var CLIENT_STATE = {
    NOT_CONNECTED: 0,
    CONNECTING: 1,
    CONNECTED: 2
}

BaseListener = cc.Class.extend({
    ctor: function(a, b) {
        this.ws = a;
        this.isLogged = !1;
        this.cmdDefine = b;
        this._loggedCallbacks = [];
        this.gameWsState = CLIENT_STATE.NOT_CONNECTED
    },
    setLoggedCallback: function(a) {
        this._loggedCallbacks = [a]
    },
    addLoggedCallback: function(a, b, c) {
        this._loggedCallbacks.push(a)
    },
    onFinishConnect: function(a) {
        a ? (this.gameWsState = CLIENT_STATE.CONNECTED,
        this.login()) : (this.gameWsState = CLIENT_STATE.NOT_CONNECTED,
        this.connectError())
    },
    login: function() {
        var a = new CmdSendLogin;
        a.putData(mv_info.nickname, mv_info.accessToken);
        this.ws.send(a)
    },
    connectError: function() {},
    onDisconnected: function() {
        this.t = !1
    },
    handleLogin: function() {
        this._loggedCallbacks.forEach(function(a, b) {
            "function" === typeof a && a()
        })
    },
    onReceived: function(a, b) {
        var c = new InPacket;
        c.init(b);
        c = c.getCmdId();
        switch (c) {
        case this.cmdDefine.LOGIN:
            this.isLogged = !0;
            this.handleLogin(b, c);
            break;
        default:
            this.handleData(b, c)
        }
    }
});
var CmdSendLogin = CmdSendCommon.extend({
    ctor: function() {
        this._super(1, !0)
    },
    putData: function(a, b) {
        this.packHeader();
        this.putString(a);
        this.putString(b);
        this.updateSize()
    }
});
BaseSocket = WebsocketClient.extend({
    ctor: function() {
        this._super()
    },
    connectSocket: function(a, b, c) {}
});

TaixiuSocket = BaseSocket.extend({
    ctor: function() {
        this._super();
        this.setPreventSpam(!0)
    },
    connectSocket: function(a) {
        if (this.state == WEBSOCKET_CONNECTED && this.listener.isLogged)
            "function" === typeof a && a();
        else if (this.state == WEBSOCKET_NOT_CONNECTED) {
            var b = new TaixiuListener(this,taixiuWebSocketCmd);
            a && b.setLoggedCallback(a);
            a = mv_config.taixiu;
            var c = a.ip
              , d = a.port
              , e = !1;
            a.ssl && (e = a.ssl);
            this.connect(c, d, e, b)
        } else
            this.listener.addLoggedCallback(a)
    }
});
TaixiuSocket.CmdSendBetTaiXiu = CmdSendCommon.extend({
    ctor: function(a, b) {
        this._super();
        this.setCmdId(taixiuWebSocketCmd.BET_TAI_XIU)
    },
    putBetTaiXiu: function(a, b, c, d, e, f) {
        this.packHeader();
        this.putInt(a);
        this.putLong(b);
        this.putLong(c);
        this.putShort(d);
        this.putShort(e);
        this.putShort(f);
        this.updateSize()
    }
});
TaixiuSocket.CmdSendLichSuTaiXiu = CmdSendCommon.extend({
    ctor: function() {
        this._super();
        this.setCmdId(taixiuWebSocketCmd.LICH_SU_PHIEN_TAI_XIU)
    },
    putLichSuTaiXiu: function() {
        this.packHeader();
        this.updateSize()
    }
});
TaixiuSocket.CmdSendScribe = CmdSendCommon.extend({
    ctor: function() {
        this._super();
        this.setCmdId(taixiuWebSocketCmd.MN_SUBSCRIBE)
    },
    putSubScribe: function(a, b) {
        this.packHeader();
        this.putShort(a);
        this.putShort(b);
        this.updateSize()
    }
});
TaixiuSocket.CmdSendUnscribe = CmdSendCommon.extend({
    ctor: function() {
        this._super();
        this.setCmdId(taixiuWebSocketCmd.MN_UNSUBSCRIBE)
    },
    putUnsubScribe: function(a, b) {
        this.packHeader();
        this.putShort(a);
        this.putShort(b);
        this.updateSize()
    }
});
TaixiuSocket.CmdSendChangeRoom = CmdSendCommon.extend({
    ctor: function() {
        this._super();
        this.setCmdId(taixiuWebSocketCmd.MN_CHANGE_ROOM)
    },
    putChangeRoom: function(a, b, c) {
        this.packHeader();
        this.putShort(a);
        this.putShort(b);
        this.putShort(c);
        this.updateSize()
    }
});
TaixiuSocket.CmdUpdateMoney = CmdReceivedCommon.extend({
    readData: function() {
        this.currentMoney = this.getLong();
        this.moneyType = this.getShort()
    }
});
TaixiuSocket.CmdBetTaiXiu = CmdReceivedCommon.extend({
    readData: function() {
        this.result = this.getError();
        this.currentMoney = this.getLong()
    }
});
TaixiuSocket.CmdLichSuTaiXiu = CmdReceivedCommon.extend({
    readData: function() {
        this.data = this.getString()
    }
});
TaixiuSocket.CmdTaiXiuInfo = CmdReceivedCommon.extend({
    readData: function() {
        this.gameId = this.getShort();
        this.moneyType = this.getShort();
        this.referenceId = this.getLong();
        this.remainTime = this.getShort();
        this.bettingState = this.getBool();
        this.potTai = this.getLong();
        this.potXiu = this.getLong();
        this.betTai = this.getLong();
        this.betXiu = this.getLong();
        this.dice1 = this.getShort();
        this.dice2 = this.getShort();
        this.dice3 = this.getShort();
        this.remainTimeRutLoc = this.getShort()
    }
});
TaixiuSocket.CmdUpdateTaiXiu = CmdReceivedCommon.extend({
    readData: function() {
        this.remainTime = this.getShort();
        this.bettingState = this.getBool();
        this.potTai = this.getLong();
        this.potXiu = this.getLong();
        this.numBetTai = this.getShort();
        this.numBetXiu = this.getShort()
    }
});
TaixiuSocket.CmdUpdateResultDices = CmdReceivedCommon.extend({
    readData: function() {
        this.result = this.getShort();
        this.dice1 = this.getShort();
        this.dice2 = this.getShort();
        this.dice3 = this.getShort()
    }
});
TaixiuSocket.CmdUpdatePrizeTaiXiu = CmdReceivedCommon.extend({
    readData: function() {
        this.moneyType = this.getShort();
        this.totalMoney = this.getLong();
        this.currentMoney = this.getLong()
    }
});
TaixiuSocket.CmdStartNewGameTaiXiu = CmdReceivedCommon.extend({
    readData: function() {
        this.referenceId = this.getLong();
        this.remainTimeRutLoc = this.getShort()
    }
});
TaixiuSocket.CmdTXUpdateTimeTaiXiu = CmdReceivedCommon.extend({
    readData: function() {
        this.remainTime = this.getByte();
        this.bettingState = this.getBool()
    }
});

TaixiuListener = BaseListener.extend({
    onDisconnected: function() {},
    handleData: function(a, b) {
        var c = taixiuWebSocketCmd
          , d = null
        //   , e = gI.taiXiu
        //   , f = gI.magicDoor;
        cc.log("cmdId \x3d " + b + "----------------------------------------" + new Date);
        switch (b) {
            case c.UPDATE_TIME_TAI_XIU:
            d = new TaixiuSocket.CmdTXUpdateTimeTaiXiu(a);
            if (rxIsInit!=1) RxSubScribe();
            RxUpdateTime(d.remainTime, d.bettingState);
            //console.log("UPDATE_TIME_TAI_XIU:", d.remainTime, "-", d.bettingState);
            break;
        case c.UPDATE_TAI_XIU_PER_SECOND:
            d = new TaixiuSocket.CmdUpdateTaiXiu(a);
            //e.responseUpdateTaiXiu(d.remainTime, d.bettingState, d.potTai, d.potXiu, d.numBetTai, d.numBetXiu);
            //console.log("UPDATE_TAI_XIU_PER_SECOND:", d.remainTime, "-", d.bettingState, "POT TAI:", d.potTai, "POT XIU:", d.potXiu, "numBetTai:", d.numBetTai, "numBetXiu:", d.numBetXiu);
            break;
        case c.TAI_XIU_INFO:
            d = new TaixiuSocket.CmdTaiXiuInfo(a);
            RxInfo(d.gameId, d.moneyType, d.referenceId, d.remainTime, d.bettingState, d.potTai, d.potXiu, d.betTai, d.betXiu, d.dice1, d.dice2, d.dice3, d.remainTimeRutLoc);
            //console.log("TAI_XIU_INFO:", "gameId-", d.gameId, "moneyType-", d.moneyType, "referenceId-", d.referenceId, "remainTime-", d.remainTime, "bettingState-", d.bettingState, "potTai-", d.potTai, "potXiu-", d.potXiu, "betTai-", d.betTai, "betXiu-", d.betXiu, "Dice1-", d.dice1, "Dice2-", d.dice2, "Dice3-", d.dice3);
            break;
        case c.UPDATE_RESULT_DICES:
            d = new TaixiuSocket.CmdUpdateResultDices(a);
            RxResultDices(d.result, d.dice1, d.dice2, d.dice3);
            //console.log("UPDATE_RESULT_DICES:", "Result-", d.result, "Dice1-", d.dice1, "Dice2-", d.dice2, "Dice3-", d.dice3);

            break;
        case c.UPDATE_PRIZE_TAI_XIU:
            d = new TaixiuSocket.CmdUpdatePrizeTaiXiu(a);
            //e && e.responsePrizeTaiXiu(d.moneyType, d.totalMoney, d.currentMoney);
            break;
        case c.BET_TAI_XIU:
            d = new TaixiuSocket.CmdBetTaiXiu(a);
            //e && e.responseBetTaiXiuSuccess(d.result, d.currentMoney);
            break;
        case c.START_NEW_GAME_TAI_XIU:
            d = new TaixiuSocket.CmdStartNewGameTaiXiu(a);
            RxInfo(0, 0, d.referenceId, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            //console.log("START_NEW_GAME_TAI_XIU:", "referenceId-", d.referenceId)
            break;
        case c.LICH_SU_PHIEN_TAI_XIU:
            d = new TaixiuSocket.CmdLichSuTaiXiu(a);
            //e.responseLichSuPhien(d.data);
            break;
        }
        null != d && d.clean()
    }
});

if (undefined != localStorage){
    if (undefined != localStorage.current_game_config){
        mv_config = JSON.parse(localStorage.current_game_config);
    }
    if (undefined != localStorage.current_game_config){
        var mv_info_tmp = JSON.parse(localStorage.current_user_info_login);
        var se = JSON.parse(Jacob__Codec__Base64__decode(mv_info_tmp.sessionKey))
        mv_info = {
            accessToken: mv_info_tmp.accessToken,
            nickname: se.nickname,
            vinTotal: se.vinTotal,
            xuTotal: se.xuTotal
        }
        RxSetAccountInfo(mv_info);
    }
}
// };

var rxIsInit = 0;

function RxSubScribe(){
    var c = new TaixiuSocket.CmdSendScribe;
    c.putSubScribe(2, 1);
    rxTaiXiu.send(c);
    c.clean();
    rxIsInit = 1
}

function RxSetAccountInfo(a) {
    document.getElementById("rxNickname").innerHTML = "Tài khoản: " + a.nickname;
    document.getElementById("rxGoldTotal").innerHTML = "Gold: " + a.vinTotal;
}

function RxUpdateTime(a, b) {
    var t = document.getElementById("rxTimer");
    b ? t.style.color = "blue" : t.style.color = "red";
    t.innerHTML = "Thời gian: " + a;
}

function RxInfo(gameId, moneyType, referenceId, remainTime, bettingState, potTai, potXiu, betTai, betXiu, dice1, dice2, dice3, remainTimeRutLoc) {
    document.getElementById("rxPhien").innerHTML = "Phiên: " + referenceId;
    if (!bettingState) RxResultDices((dice1 + dice2 + dice3) < 11 ? 0 : 1, dice1, dice2, dice3)
}

function RxResultDices(result, dice1, dice2, dice3){
    var r = (result==0 ? "XỈU" : "TÀI") + " " + (dice1 + dice2 + dice3) + " (" + dice1 + "-" + dice2 + "-" + dice3 + ")"
    document.getElementById("rxResult").innerHTML = "Kết quả: " + r;
}

var rxTaiXiu = new TaixiuSocket;

rxTaiXiu.connectSocket();
