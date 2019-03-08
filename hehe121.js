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
            RxPrizeTaiXiu(d.moneyType, d.totalMoney, d.currentMoney);
            console.log("UPDATE_PRIZE_TAI_XIU:", "moneyType -", d.moneyType, "totalMoney -", d.totalMoney, "currentMoney -", d.currentMoney);
            break;
        case c.BET_TAI_XIU:
            d = new TaixiuSocket.CmdBetTaiXiu(a);
            RxBetTaiXiuSuccess(d.result, d.currentMoney);
            console.log("BET_TAI_XIU:", "result -", d.result, "currentMoney -", d.currentMoney);
            break;
        case c.START_NEW_GAME_TAI_XIU:
            d = new TaixiuSocket.CmdStartNewGameTaiXiu(a);
            RxNewGame(d.referenceId);
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
// };

var rxIsInit = 0;
var _zi = 0
var rxAutoRandom = [], rxindex = 0
var rxInfo = {
    Money: 1,
    initBlance: 0,
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
    autoGapData: 4,
    gopIndex: 0
};

RxInitRandom()

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


function RxSubScribe(){
    var c = new TaixiuSocket.CmdSendScribe;
    c.putSubScribe(2, 1);
    rxTaiXiu.send(c);
    c.clean();
    rxIsInit = 1;

    document.getElementById("rtTai").addEventListener("click", guiTaiButtonClick);
    document.getElementById("rtXiu").addEventListener("click", guiXiuButtonClick);
    document.getElementById("rtAuto").addEventListener("click", RxInitRandom);
    document.getElementById("rtAutoOn").addEventListener("click", guiAutOnButtonClick);
    document.getElementById("rtAutoOff").addEventListener("click", guiAutOffButtonClick);
    document.getElementById("rtCauSelect").addEventListener("click", guiCauSelectClick);
    document.getElementById("rtModeSelect").addEventListener("click", guiModeSelectClick);

    guiStatus("Kết nối thành công")
}

function RxSetAccountInfo(a) {
    rxInfo.initBlance = rxInfo.Money == 1 ? a.vinTotal : a.xuTotal
    document.getElementById("rxNickname").innerHTML = "Tài khoản: " + a.nickname;
    document.getElementById("rxGoldTotal").innerHTML = "Gold: " + rxInfo.initBlance;
}

function RxUpdateTime(a, b) {
    if (rxInfo.isAuto&&a==rxInfo.autoSec) RxAuto()
    rxInfo.remainTime = a;
    rxInfo.bettingState = b;
    rxInfo.autoSec = parseInt(document.getElementById("rtAutoSec").value);
    rxInfo.autoGapData = parseInt(document.getElementById("stAutoCau").value)
    var t = document.getElementById("rxTimer");
    b ? t.style.color = "blue" : t.style.color = "red";
    t.innerHTML = "Thời gian: " + a;
}

function RxInfo(gameId, moneyType, referenceId, remainTime, bettingState, potTai, potXiu, betTai, betXiu, dice1, dice2, dice3, remainTimeRutLoc) {
    rxInfo.referenceId = referenceId;
    document.getElementById("rxPhien").innerHTML = "Phiên: " + referenceId;
    if (bettingState === false) RxResultDices((dice1 + dice2 + dice3) < 11 ? 0 : 1, dice1, dice2, dice3)
}

function RxResultDices(result, dice1, dice2, dice3) {
    rxInfo.resultData += (result==0 ? "x" : "t")
    var r = (result==0 ? "XỈU" : "TÀI") + " " + (dice1 + dice2 + dice3) + " (" + dice1 + "-" + dice2 + "-" + dice3 + ")"
    document.getElementById("rxResult").innerHTML = "Kết quả: " + r;
    RxCheckResult(result, dice1, dice2, dice3);
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

function RxBetTaiXiuSuccess(result, currentMoney) {
    if (result==0) {
        rxInfo.betValue += rxInfo._betValue;
        if (rxInfo._betSide == 1) {
            document.getElementById("rxBet").innerHTML = "Đã đặt: TÀI-" + rxInfo.betValue;
        }
        if (rxInfo._betSide == 0) {
            document.getElementById("rxBet").innerHTML = "Đã đặt: XỈU-" + rxInfo.betValue;
        }
        document.getElementById("rxGoldTotal").innerHTML = "Gold: " + currentMoney;
        document.getElementById("rxGoldz").innerHTML = "Gold~: " + (currentMoney >= rxInfo.initBlance ? "+" : "") + (currentMoney - rxInfo.initBlance);
        guiStatus("Đặt cửa thành công")
        return;
    }
    guiStatus("Đặt cửa thất bại")
}

function RxPrizeTaiXiu(moneyType, totalMoney, currentMoney) {
    document.getElementById("rxGoldTotal").innerHTML = "Gold: " + currentMoney;
    document.getElementById("rxGoldz").innerHTML = "Gold~: " + (currentMoney >= rxInfo.initBlance ? "+" : "") + (currentMoney - rxInfo.initBlance);
    var z = parseInt(document.getElementById("rtAutoStop").innerHTML)
    if (z<0) {
        if (currentMoney - rxInfo.initBlance <=  z) guiAutOffButtonClick()
    } else if (z>0) {
        if (currentMoney - rxInfo.initBlance >=  z) guiAutOffButtonClick()
    }
    
}

function RxNewGame(referenceId){
    rxInfo.referenceId = referenceId;
    rxInfo._betSide = null;
    rxInfo.betValue = 0;
    rxInfo.cauBet = null;
    document.getElementById("rxPhien").innerHTML = "Phiên: " + referenceId;
    document.getElementById("rxBet").innerHTML = "Đã đặt: --"
    document.getElementById("rxResult").innerHTML = "Kết quả: --"
    guiStatus("...")
}

function RxSetBet(betValue, moneyType, betSide) {
    //moneyType: 1 - VIN | 0 - XU
    //betSide: 1 - TÀI | 0 - XỈU
    betValue = parseInt(betValue)
    if (rxInfo.bettingState !== true) return;
    var a = new TaixiuSocket.CmdSendBetTaiXiu;
    a.putBetTaiXiu(1, rxInfo.referenceId, betValue, moneyType, betSide, rxInfo.remainTime);
    rxTaiXiu.send(a);
    a.clean();
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
    RxSetBet(betValue, rxInfo.Money, 1)
}

function guiXiuButtonClick() {
    var betValue = parseInt(document.getElementById("rtMoney").value);
    RxSetBet(betValue, rxInfo.Money, 0);
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
			if (rxInfo.dayLoose>0) {
				_zi +=1;
				if (_zi>rxValue.length) _zi=0;
				bValue = parseInt(rxValue[_zi]);
			} else {
				if (rxInfo.dayWin%2==1)
					bValue = parseInt(rxValue[_zi]) * 2
				else {
					bValue = parseInt(rxValue[0]);
					_zi = 0;
					}
			}
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
        bSide = rxAutoRandom[rxindex]; 
        rxInfo.cauBet = "RANDOM";
        rxindex++;
    }

    if (rxInfo.betMode==1){
        var k = RxReadCauGop();
        rxInfo.cauBet = k[0];
        bSide = k[1];
    }

    if (rxInfo.betMode==2){
        var k = RxReadCauTach();
        rxInfo.cauBet = k[0];
        bSide = k[1];
    }

    if (bSide!=null) RxSetBet(bValue, rxInfo.Money, bSide)
}

function RxInitRandom(){
    if (rxInfo.betMode==0){
        console.log("RX_INIT_RANDOM")
        rxindex = 0;
        var min=1; 
        var max=20;  
        for (var i = 0; i <= 9999; ++i){
            rxAutoRandom[i] = parseInt(Math.random() * (+max - +min) + +min)%2; 
        }
    }

    if (rxInfo.betMode==1){
        console.log("RX_INIT_GOP")
        rxInfo.gopIndex = 0;
    }
}

function RxReadCauGop() {
    var ret = [null, null];
    var t = document.getElementById("rtCauEdit").value;
    var z = t.replace(' ', '');
    z = z.split('');
    ret[0] = "GOP: " + rxInfo.gopIndex;
    ret[1] = z[rxInfo.gopIndex] == "x" ? 0 : z[rxInfo.gopIndex] == "t" ? 1 : null;
    rxInfo.gopIndex++
    return ret;
}

function RxReadCauTach() {
    var ret = [null, null];
    var t = document.getElementById("rtCauEdit").value;
    var z = t.split(/\n/gm);
    var re, first, second, rs = null;
    for (var i = 0; i < z.length; ++i){
        re = z[i].toLocaleLowerCase().split("-");
        if (re.length != 2) {
            continue;
        } else {
            first = re[0].replace(' ', '');
            second = re[1].replace(' ', '');
            if (rxInfo.resultData.substr(rxInfo.resultData.length - first.length, rxInfo.resultData.length) == first){
                ret[0] = "CUSTOM: " + z[i]
                ret[1] = second == "x" ? 0 : second == "t" ? 1 : null;
                break;
            }
        }
    }
    return ret;
}

guiStatus("Đang kết nối đển Server...")

var rxTaiXiu = new TaixiuSocket;

rxTaiXiu.connectSocket();
