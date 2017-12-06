function Monitor() {
    this.type = VISU_TYPE.MAIN;
    this.container = {};
    this.data = [
        {name: '1', peer_id: 'gwu18', remote_id: 1, mu: "&deg;C", group_id: 1},
        {name: '1', peer_id: 'gwu18', remote_id: 2, mu: "&deg;C", group_id: 1},
        {name: '1', peer_id: 'gwu18', remote_id: 3, mu: "&deg;C", group_id: 1},
        {name: '1', peer_id: 'gwu18', remote_id: 4, mu: "&deg;C", group_id: 1},
        {name: '1', peer_id: 'gwu18', remote_id: 5, mu: "&deg;C", group_id: 1},
        {name: '1', peer_id: 'gwu22', remote_id: 1, mu: "&deg;C", group_id: 2},
        {name: '1', peer_id: 'gwu22', remote_id: 2, mu: "&deg;C", group_id: 2},
        {name: '1', peer_id: 'gwu22', remote_id: 3, mu: "&deg;C", group_id: 2},
        {name: '1', peer_id: 'gwu22', remote_id: 4, mu: "&deg;C", group_id: 2},
        {name: '1', peer_id: 'gwu22', remote_id: 5, mu: "&deg;C", group_id: 2},
        {name: '1', peer_id: 'gwu22', remote_id: 6, mu: "&deg;C", group_id: 2},
        {name: '3', peer_id: 'gwu66', remote_id: 1, mu: "&deg;C", group_id: 3},
        {name: '3', peer_id: 'gwu66', remote_id: 2, mu: "&deg;C", group_id: 3},
   //     {name: '2', peer_id: 'gwu22_2', remote_id: 2, mu: "&deg;C", group_id: 2},
 //{name: '2', peer_id: 'gwu22_2', remote_id: 3, mu: "&deg;C", group_id: 2},
//{name: '2', peer_id: 'gwu22_2', remote_id: 4, mu: "&deg;C", group_id: 2},
//{name: '2', peer_id: 'gwu22_2', remote_id: 5, mu: "&deg;C", group_id: 2},
//{name: '2', peer_id: 'gwu22_2', remote_id: 6, mu: "&deg;C", group_id: 2},
    ];
    this.peer = [
       // {id: 'gwu55_1', address: '192.168.0.102', port: 49166, timeout: 2, name: "модуль1 (max31855)"},
         //{id: 'gwu66_1', address: '192.168.0.110', port: 49162, timeout: 2, name: "модуль1 (max6675)"},
         {id: 'gwu18', address: '127.0.0.1', port: 49161, timeout: 2, name: "gwu18"},
        {id: 'gwu22', address: '127.0.0.1', port: 49162, timeout: 2, name: "gwu22"},
        {id: 'gwu66', address: '127.0.0.1', port: 49166, timeout: 2, name: "gwu66"}
    ];
    this.group = [
        {id: 1, name: 'gwu18'},
        {id: 2, name: 'gwu22'},
        {id: 3, name: 'gwu66'},
//        {id: 4, name: 'столп 2'},
//        {id: 5, name: 'разведение'},
//        {id: 6, name: 'холодильник'},
//        // {id: 7, name: 'морозильники_температура'},
//        {id: 8, name: 'ларь 1'},
//        {id: 9, name: 'ларь 2'},
//        {id: 10, name: 'ларь 3'},
//        {id: 11, name: 'ларь 4'},
//        {id: 12, name: 'ларь 5'},
//        {id: 13, name: 'ларь 6'}
    ];
    this.sendData = [];//prepared for send data from this.data and this.peer
    this.tmr1 = {tmr: null};
    this.tmr2 = {tmr: null};
    this.tmr3 = {tmr: null};
    this.ACTION =
            {
                GET_VALUE: 1,
                PING_PEER: 2
            };
    this.CATCH = {
        PAGE_BLOCKER: 1
    };
    this.curr_peer = null;
    this.curr_ppeer = null;
    this.curr_item = null;
    this.DELAY_P = 3000;
    this.DELAY_V = 2000;
    this.DELAY_PL = 10000;
    this.DELAY_VL = 50000;
    this.delay_p = this.DELAY_P;//send ping interval
    this.delay_v = this.DELAY_V;//send value interval
    this.DELAY_FACTOR = 20000;
    this.delay_s = 60000;//sleep timeout

    this.sleep = false;
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
            this.makeData();
            this.makeSendData();
            this.initialized = true;
            var self = this;
            this.container.onmousemove = function () {
                self.wakeUp();
            };
            page_blocker.prep(1, 1, this, this.CATCH.PAGE_BLOCKER);
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
    this.catchEdit = function (d, kind, apply) {
        try {
            switch (kind) {
                case this.CATCH.PAGE_BLOCKER:
                    this.wakeUp();
                    break;
            }
        } catch (e) {
            alert("control: catchEdit: " + e.message);
        }
    };
    this.wakeUp = function () {
        this.delaySleep();
        if (this.sleep) {
            this.sleep = false;
            this.delay_v = this.DELAY_V;
            this.delay_p = this.DELAY_P;
            clearTmr(this.tmr1);
            clearTmr(this.tmr2);
            clearTmr(this.tmr3);
            this.sendNextItem();
            this.pingNextPeer();

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
    this.sendGetValue = function (peer, remote_id) {
        var data = [
            {
                action: ['get_value'],
                param: {address: peer.address, port: peer.port, item: [remote_id]}
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
            this.curr_ppeer.elem.update(v);
        } catch (e) {
            alert("monitor: updateCurrPeer: " + e.message);
        }
    };
    this.getGroupById = function (id) {
        try {
            for (var i = 0; i < this.group.length; i++) {
                if (this.group[i].id === id) {
                    return this.group[i];
                }
            }
            return null;
        } catch (e) {
            alert("monitor: getGroupById: " + e.message);
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
            if (this.data[i].peer.id === this.curr_ppeer.id) {
                this.data[i].elem.update(value, state);
            }
        }
    };
    this.delaySleep = function () {
        try {
            if (this.visible) {
                clearTmr(this.tmr3);
                var self = this;
                this.tmr3.tmr = window.setTimeout(function () {
                    self.sleep = true;
                    self.delay_v = self.DELAY_V * self.DELAY_FACTOR;
                    self.delay_p = self.DELAY_P * self.DELAY_FACTOR;console.log(self.delay_v);
                    page_blocker.enable();
                }, this.delay_s);
            }
        } catch (e) {
            alert("monitor: delaySleep: " + e.message);
        }
    };
    this.delaySend = function () {
        try {
            if (this.visible) {
                var self = this;
                this.tmr1.tmr = window.setTimeout(function () {
                    self.sendNextItem();
                }, this.delay_v);
            }
        } catch (e) {
            alert("monitor: delaySend: " + e.message);
        }
    };
    this.delaySendP = function () {
        try {
            if (this.visible) {
                var self = this;
                this.tmr2.tmr = window.setTimeout(function () {
                    self.sendPingPeer(self.curr_ppeer);
                }, this.delay_p);
            }
        } catch (e) {
            alert("control: delaySend: " + e.message);
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
                        this.sendGetValue(this.curr_peer, this.sendData[i].remote_id);
                        return;
                    } else {
                        this.curr_peer = this.sendData[i].peer;
                        this.curr_item = this.sendData[i];
                        this.updateCurrMainB(null, null);
                    }
                }
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
    this.pingNextPeer = function () {
        if (this.peer.length <= 0) {
            return;
        }
        var dowait = 0;
        if (this.curr_peer_ind < this.peer.length - 1) {
            this.curr_peer_ind++;
        } else {
            this.curr_peer_ind = 0;
            dowait = 1;
        }
        this.curr_ppeer = this.peer[this.curr_peer_ind];
        if (this.curr_ppeer === null) {
            return;
        }
        if (dowait) {
            this.delaySendP();
        } else {
            this.sendPingPeer(this.curr_ppeer);
        }
    };
    this.redrawMainB = function () {
        try {
            clearCont(this.dataE);
            for (var i = 0; i < this.group.length; i++) {
                this.group[i].elem = new GroupElem(this.group[i].name);
                a(this.dataE, this.group[i].elem);
            }
            for (var i = 0; i < this.data.length; i++) {
                var elem = new MnButton(this.data[i].name, this.data[i].mu, false);
                this.data[i].elem = elem;
                var group = this.getGroupById(this.data[i].group_id);
                a(group.elem.content, this.data[i].elem);
            }
        } catch (e) {
            alert("monitor: redrawMainB: " + e.message);
        }
    };
    this.redrawPeer = function () {
        try {
            clearCont(this.peerE);
            for (var i = 0; i < this.peer.length; i++) {
                var elem = new PeerButton(this.peer[i].id, this.peer[i].name);
                this.peer[i].elem = elem;
                a(this.peerE, elem);
            }
        } catch (e) {
            alert("monitor: redrawPeer: " + e.message);
        }
    };
    this.makeData = function () {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i].peer = this.getPeerById(this.data[i].peer_id);
            this.data[i].active = false;
            this.data[i].elem = null;
        }
        for (var i = 0; i < this.group.length; i++) {
            this.group[i].elem = null;
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

                for (var i = 0; i < ia.length; i++) {
                    if (!ia[i].done && ia[i].item.peer.id === np.item.id) {
                        ia[i].done = true;
                        this.sendData.push(ia[i].item);
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
                            this.curr_ppeer.active = true;
                            break;
                        case ACP.RESP.APP_IDLE:
                            this.curr_ppeer.active = false;
                            this.updatePeerItems(null, null);
                            break;
                        default:
                            this.curr_ppeer.active = false;
                            this.updatePeerItems(null, null);
                            break;
                    }
                    this.updateCurrPeer(d);
                    this.pingNextPeer();
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
                    this.curr_ppeer.active = false;
                    this.updateCurrPeer(null);
                    this.pingNextPeer();
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
            this.visible = true;
            this.redrawPeer();
            this.redrawMainB();
            this.sendNextItem();
            this.pingNextPeer();
            this.delaySleep();
        } catch (e) {
            alert("monitor: show: " + e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, "hdn");
            clearTmr(this.tmr1);
            clearTmr(this.tmr2);
            clearTmr(this.tmr3);
            this.visible = false;
        } catch (e) {
            alert("monitor: hide: " + e.message);
        }
    };
}
var vmonitor = new Monitor();
visu.push(vmonitor);
