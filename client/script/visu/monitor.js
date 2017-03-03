function Monitor() {
    this.type = VISU_TYPE.MAIN;
    this.container = {};
//    this.data = [
//        {name: 'старт1_темп', peer_id: 3, remote_id: 1, place: 1, mu: "&deg;C"},
//        {name: 'старт2_темп', peer_id: 3, remote_id: 2, place: 1, mu: "&deg;C"},
//        {name: 'столп1_темп', peer_id: 3, remote_id: 3, place: 1, mu: "&deg;C"},
//        {name: 'столп2_темп', peer_id: 3, remote_id: 4, place: 1, mu: "&deg;C"},
//        {name: 'разведение_темп', peer_id: 3, remote_id: 5, place: 1, mu: "&deg;C"},
//        {name: 'зимовка_темп', peer_id: 3, remote_id: 6, place: 1, mu: "&deg;C"},
//        {name: 'морозилка1_темп', peer_id: 1, remote_id: 1, place: 3, mu: "&deg;C"},
//        {name: 'морозилка2_темп', peer_id: 1, remote_id: 2, place: 3, mu: "&deg;C"},
//        {name: 'морозилка3_темп', peer_id: 1, remote_id: 3, place: 3, mu: "&deg;C"},
//        {name: 'морозилка4_темп', peer_id: 1, remote_id: 4, place: 3, mu: "&deg;C"},
//        {name: 'морозилка5_темп', peer_id: 1, remote_id: 5, place: 3, mu: "&deg;C"},
//        {name: 'морозилка6_темп', peer_id: 0, remote_id: 7, place: 3, mu: "&deg;C"},
//        {name: 'морозилка7_темп', peer_id: 0, remote_id: 8, place: 3, mu: "&deg;C"},
//        {name: 'старт1_влаж', peer_id: 2, remote_id: 2, place: 2, mu: "%"},
//        {name: 'старт2_влаж', peer_id: 2, remote_id: 4, place: 2, mu: "%"},
//        {name: 'столп1_влаж', peer_id: 2, remote_id: 6, place: 2, mu: "%"},
//        {name: 'столп2_влаж', peer_id: 2, remote_id: 8, place: 2, mu: "%"},
//        {name: 'разведение_влаж', peer_ind: 2, remote_id: 10, place: 2, mu: "%"},
//        {name: 'зимовка_влаж', peer_ind: 2, remote_id: 331, place: 2, mu: "%"}
//    ];
// this.peer = [
//        {name: 'gwu22_1', address: '192.168.0.101', port: 49162},
//        {name: 'gwu18_1', address: '192.168.0.101', port: 49161},
//        {name: 'gwu22_2', address: '192.168.0.102', port: 49162},
//        {name: 'gwu18_2', address: '192.168.0.102', port: 49161}
//    ];


    this.data = [
        {name: 'старт1_темп', peer_id: 'модуль 2', remote_id: 1, place: 1, mu: "&deg;C"},
        {name: 'старт2_темп', peer_id: 'модуль 2', remote_id: 3, place: 1, mu: "&deg;C"},
        {name: 'столп1_темп', peer_id: 'модуль 2', remote_id: 5, place: 1, mu: "&deg;C"},
        {name: 'столп2_темп', peer_id: 'модуль 2', remote_id: 7, place: 1, mu: "&deg;C"},
        {name: 'холодильник_темп', peer_id: 'модуль 2', remote_id: 11, place: 1, mu: "&deg;C"},
        {name: 'разведение_темп', peer_id: 'модуль 2', remote_id: 9, place: 1, mu: "&deg;C"},
        {name: 'старт1_влаж', peer_id: 'модуль 2', remote_id: 2, place: 2, mu: "%"},
        {name: 'старт2_влаж', peer_id: 'модуль 2', remote_id: 4, place: 2, mu: "%"},
        {name: 'столп1_влаж', peer_id: 'модуль 2', remote_id: 6, place: 2, mu: "%"},
        {name: 'столп2_влаж', peer_id: 'модуль 2', remote_id: 8, place: 2, mu: "%"},
        {name: 'разведение_влаж', peer_id: 'модуль 2', remote_id: 10, place: 2, mu: "%"},
        {name: 'холодильник_влаж', peer_id: 'модуль 2', remote_id: 12, place: 2, mu: "%"},
        {name: 'морозильник1_темп', peer_id: 'модуль 1', remote_id: 1, place: 3, mu: "&deg;C"},
        {name: 'морозильник2_темп', peer_id: 'модуль 1', remote_id: 2, place: 3, mu: "&deg;C"},
        {name: 'морозильник3_темп', peer_id: 'модуль 1', remote_id: 3, place: 3, mu: "&deg;C"},
        {name: 'морозильник4_темп', peer_id: 'модуль 1', remote_id: 4, place: 3, mu: "&deg;C"},
        {name: 'морозильник5_темп', peer_id: 'модуль 1', remote_id: 5, place: 3, mu: "&deg;C"},
        {name: 'морозильник6_темп', peer_id: 'модуль 1', remote_id: 6, place: 3, mu: "&deg;C"}
    ];
    this.peer = [
        {id: 'модуль 1', address: '192.168.0.101', port: 49161},
         {id: 'модуль 2', address: '192.168.0.102', port: 49162}
    ];
    this.sendData = [];//prepared for send data from this.data and this.peer
    this.tmr1 = {tmr: null};
    this.ACTION =
            {
                GET_VALUE: 1,
                PING_PEER: 2
            };
    this.curr_peer = null;
    this.curr_item = null;
    this.initialized = false;
    this.update = true; //editor will make it false
    this.visible = false;

    this.peerE = null;
    this.dataE = null;

    this.init = function () {
        try {
            this.container = cvis();
            this.peerE = cd();
            this.dataE = cd();
            a(this.container, [this.peerE, this.dataE]);
            cla([this.peerE, this.dataE], ["monitor_cont1"]);
            cla(this.peerE, 'monitor_pcont');
            this.makeSendData();
            console.log(this.sendData.length, this.data.length);
            this.initialized = true;
        } catch (e) {
            alert(e.message);
        }
    };
    this.getName = function () {
        return trans.get(401);
    };
    this.updateStr = function () {
        try {

        } catch (e) {
            alert("monitor updateStr: " + e.message);
        }
    };
    this.sendPingPeer = function (peer) {
        var data = [
            {
                action: ['ping_peer'],
                param: {address: peer.address, port: peer.port}
            }
        ];
        sendTo(this, data, this.ACTION.PING_PEER, 'json_udp_acp');
    };
    this.sendGetValue = function (address, port, remote_id) {
        var data = [
            {
                action: ['get_value'],
                param: {address: address, port: port, item: [remote_id]}
            }
        ];
        sendTo(this, data, this.ACTION.GET_VALUE, 'json_udp_acp');
    };

    this.updateCurrMainB = function (v, s) {
        try {
            this.curr_item.elem.update(v, s);
        } catch (e) {
            alert("monitor: updateCurrMainB: " + e.message);
        }
    };
    this.updateCurrPeer = function (v) {
        try {
            this.curr_peer.elem.update(v);
        } catch (e) {
            alert("monitor: updateCurrPeer: " + e.message);
        }
    };
    this.getPeerById = function (id) {
        try {
            for (var i = 0; i < this.peer.length; i++) {
                if (this.peer[i].id === id) {
                    return this.peer[i];
                }
            }
            return null;
        } catch (e) {
            alert("monitor: getPeerById: " + e.message);
        }
    };
    this.updatePeerItems = function (value, state) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].peer.id === this.curr_peer.id) {
                this.data[i].elem.update(value, state);
            }
        }
    };
    this.delaySend = function () {
        try {
            if (this.visible) {
                var self = this;
                this.tmr1.tmr = window.setTimeout(function () {
                    self.sendNextItem();
                }, 5000);
            }
        } catch (e) {
            alert("monitor: delaySend: " + e.message);
        }
    };
    this.sendNextItem = function () {
        try {
            for (var i = 0; i < this.sendData.length; i++) {
                if (!this.sendData[i].sent) {
                    this.sendData[i].sent = true;
                    if (this.sendData[i].peer.active) {
                        this.curr_peer = this.sendData[i].peer;
                        this.curr_item = this.sendData[i];
                        this.sendGetValue(this.curr_peer.address, this.curr_peer.port, this.sendData[i].remote_id);
                        return;
                    }
                }
            }
            for (var i = 0; i < this.peer.length; i++) {
                if (!this.peer[i].active && !this.peer[i].sent) {
                    this.peer[i].sent = true;
                    this.curr_peer = this.peer[i];
                    this.sendPingPeer(this.peer[i]);
                    return;
                }
            }

            for (var i = 0; i < this.peer.length; i++) {
                this.peer[i].sent = false;
            }
            for (var i = 0; i < this.sendData.length; i++) {
                this.sendData[i].sent = false;
            }
            if (this.sendData.length) {
                this.delaySend();
            }
        } catch (e) {
            alert("monitor: sendNextItem: " + e.message);
        }
    };
    this.redrawMainB = function () {
        try {
            clearCont(this.dataE);
            var c1 = cd();
            var c2 = cd();
            var c3 = cd();
            for (var i = 0; i < this.data.length; i++) {
                var elem = new MnButton(this.data[i].name, this.data[i].mu);
                this.data[i].elem = elem;
                switch (this.data[i].place) {
                    case 1:
                        a(c1, elem);
                        break;
                    case 2:
                        a(c2, elem);
                        break;
                    case 3:
                        a(c3, elem);
                        break;
                    default:

                        break;
                }
            }
            a(this.dataE, [c1, c2, c3]);
            cla([c1, c2, c3], 'monitor_group');
        } catch (e) {
            alert("monitor: redrawMainB: " + e.message);
        }
    };
    this.redrawPeer = function () {
        try {
            clearCont(this.peerE);
            for (var i = 0; i < this.peer.length; i++) {
                var elem = new PeerButton(this.peer[i].id);
                this.peer[i].elem = elem;
                a(this.peerE, elem);
            }
        } catch (e) {
            alert("monitor: redrawPeer: " + e.message);
        }
    };
    this.makeSendData = function () {
        try {
            for (var i = 0; i < this.peer.length; i++) {
                this.peer[i].sent = false;
                this.peer[i].active = false;
                this.peer[i].elem = null;
            }
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].sent = false;
                this.data[i].elem = null;
                this.data[i].peer = this.getPeerById(this.data[i].peer_id);
            }
            cleara(this.sendData);
            if (this.peer.length <= 0) {
                return;
            }
            var pa = [];
            for (var i = 0; i < this.peer.length; i++) {
                pa.push({item: this.peer[i], done: false});
            }
            var ia = [];
            for (var i = 0; i < this.data.length; i++) {
                ia.push({item: this.data[i], done: false});
            }
            var np = null;
            var done = null;
            while (1) {
                if (this.sendData.length === this.data.length) {
                    return;
                }
                np = null;
                //select next peer
                for (var i = 0; i < pa.length; i++) {
                    if (!pa[i].done) {
                        pa[i].done = true;
                        np = pa[i];
                        break;
                    }
                }
                //rewind peer array
                if (np === null && pa.length) {
                    for (var i = 0; i < pa.length; i++) {
                        pa[i].done = false;
                    }
                    pa[0].done = true;
                    np = pa[0];
                }

                done = false;
                for (var i = 0; i < ia.length; i++) {
                    if (!ia[i].done && ia[i].item.peer.id === np.item.id) {
                        ia[i].done = true;
                        this.sendData.push(ia[i].item);
                        done = true;
                        break;
                    }
                }
            }
        } catch (e) {
            alert("monitor: makeSendData: " + e.message);
        }


    };
    this.confirm = function (action, d, n) {
        try {
            switch (action) {
                case this.ACTION.GET_VALUE:
                    if (typeof d[0] !== 'undefined') {
                        this.updateCurrMainB(parseFloat(d[0].value), parseInt(d[0].state));
                    }
                    this.sendNextItem();
                    break;
                case this.ACTION.PING_PEER:
                    switch (d) {
                        case ACP.RESP.APP_BUSY:
                            this.curr_peer.active = true;
                            break;
                        case ACP.RESP.APP_IDLE:
                            this.curr_peer.active = false;
                            this.updatePeerItems(null, null);
                            break;
                        default:
                            this.curr_peer.active = false;
                            this.updatePeerItems(null, null);
                            break;
                    }
                    this.updateCurrPeer(d);
                    this.sendNextItem();
                    break;
                default:
                    console.log("confirm: unknown action: ", action);
                    break;
            }

        } catch (e) {
            alert("monitor: confirm: " + e.message);
        }
    };
    this.abort = function (action, m, n) {
        try {
            switch (action) {
                case this.ACTION.GET_VALUE:
                    this.curr_peer.active = false;
                    this.updateCurrMainB(null);
                    this.sendNextItem();
                    break;
                case this.ACTION.PING_PEER:
                    this.curr_peer.active = false;
                    this.updateCurrPeer(null);
                    this.updatePeerItems(null, null);
                    this.sendNextItem();
                    break;
                default:
                    console.log("abort: unknown action: ", action);
                    break;
            }
        } catch (e) {
            alert("monitor: abort: " + e.message);
        }
    };
    this.show = function () {
        try {
            document.title = trans.get(401);
            clr(this.container, "hdn");
            this.redrawPeer();
            this.redrawMainB();
            this.sendNextItem();
            this.visible = true;

        } catch (e) {
            alert("monitor: show: " + e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, "hdn");
            clearTmr(this.tmr1);
            this.visible = false;
        } catch (e) {
            alert("monitor: hide: " + e.message);
        }
    };

}
var vmonitor = new Monitor();
visu.push(vmonitor);
