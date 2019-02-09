function Monitor() {
    this.type = VISU_TYPE.MAIN;
    this.container = {};
    this.data = [
        //{name: '1', peer_id: 'gwu18', remote_id: 1, mu: "&deg;C", group_id: 1},
        //{name: '1', peer_id: 'gwu18', remote_id: 2, mu: "&deg;C", group_id: 1},
        //{name: '1', peer_id: 'gwu18', remote_id: 3, mu: "&deg;C", group_id: 1},
        //{name: '1', peer_id: 'gwu18', remote_id: 4, mu: "&deg;C", group_id: 1},
        //{name: '1', peer_id: 'gwu18', remote_id: 5, mu: "&deg;C", group_id: 1},
        //{name: '1', peer_id: 'gwu22', remote_id: 1, mu: "&deg;C", group_id: 2},
        //{name: '1', peer_id: 'gwu22', remote_id: 2, mu: "&deg;C", group_id: 2},
        //{name: '1', peer_id: 'gwu22', remote_id: 3, mu: "&deg;C", group_id: 2},
        //{name: '1', peer_id: 'gwu22', remote_id: 4, mu: "&deg;C", group_id: 2},
        //{name: '1', peer_id: 'gwu22', remote_id: 5, mu: "&deg;C", group_id: 2},
        //{name: '1', peer_id: 'gwu22', remote_id: 6, mu: "&deg;C", group_id: 2},
        //{name: '3', peer_id: 'gwu66', remote_id: 1, mu: "&deg;C", group_id: 3},
        //{name: '3', peer_id: 'gwu66', remote_id: 2, mu: "&deg;C", group_id: 3},
{name: '4', peer_id: 'obj', remote_id: 1, mu: "&deg;C", group_id: 4},
{name: '4', peer_id: 'obj', remote_id: 2, mu: "&deg;C", group_id: 4},
{name: '4', peer_id: 'obj', remote_id: 3, mu: "&deg;C", group_id: 4},
{name: '4', peer_id: 'obj', remote_id: 4, mu: "&deg;C", group_id: 4},
        //{name: '5', peer_id: 'swf', remote_id: 1, mu: "&deg;C", group_id: 5},
//{name: '5', peer_id: 'swf', remote_id: 2, mu: "&deg;C", group_id: 5},
//{name: '5', peer_id: 'swf', remote_id: 3, mu: "&deg;C", group_id: 5},
//{name: '5', peer_id: 'swf', remote_id: 4, mu: "&deg;C", group_id: 5},

//{name: '6', peer_id: 'swr', remote_id: 1, mu: "&deg;C", group_id: 6},
//{name: '6', peer_id: 'swr', remote_id: 2, mu: "&deg;C", group_id: 6},
//{name: '7', peer_id: 'gwu5566_1', remote_id: 2, mu: "&deg;C", group_id: 7},

//{name: '7', peer_id: 'gwu5566_1', remote_id: 1, mu: "&deg;C", group_id: 7},
//{name: '7', peer_id: 'gwu5566_1', remote_id: 2, mu: "&deg;C", group_id: 7},
//{name: '7', peer_id: 'gwu5566_1', remote_id: 3, mu: "&deg;C", group_id: 7},
//{name: '7', peer_id: 'gwu5566_1', remote_id: 4, mu: "&deg;C", group_id: 7},
//{name: '7', peer_id: 'gwu5566_1', remote_id: 5, mu: "&deg;C", group_id: 7},
//{name: '7', peer_id: 'gwu5566_1', remote_id: 6, mu: "&deg;C", group_id: 7},

   //     {name: '2', peer_id: 'gwu22_2', remote_id: 2, mu: "&deg;C", group_id: 2},
 //{name: '2', peer_id: 'gwu22_2', remote_id: 3, mu: "&deg;C", group_id: 2},
//{name: '2', peer_id: 'gwu22_2', remote_id: 4, mu: "&deg;C", group_id: 2},
//{name: '2', peer_id: 'gwu22_2', remote_id: 5, mu: "&deg;C", group_id: 2},
//{name: '2', peer_id: 'gwu22_2', remote_id: 6, mu: "&deg;C", group_id: 2},
    ];
    this.peer = [
      //  {id: 'gwu5566_1', address: '192.168.0.102', port: 49162, timeout: 2, name: "модуль102"},
        {id: 'gwu5566_1', address: '127.0.0.1', port: 49162, timeout: 2, name: "модуль102"},
         //{id: 'gwu66_1', address: '192.168.0.110', port: 49162, timeout: 2, name: "модуль2 (max6675)"},
         //{id: 'gwu18', address: '127.0.0.1', port: 49162, timeout: 2, name: "gwu18"},
        //{id: 'gwu22', address: '127.0.0.1', port: 49162, timeout: 2, name: "gwu22"},
        //{id: 'gwu66', address: '127.0.0.1', port: 49166, timeout: 2, name: "gwu66"},
        {id: 'obj', address: '127.0.0.1', port: 49178, timeout: 2, name: "obj"},
        //{id: 'swr', address: '127.0.0.1', port: 49183, timeout: 2, name: "swr"},
 //{id: 'swf', address: '127.0.0.1', port: 49182, timeout: 2, name: "swf"}
    ];
    this.group = [
        //{id: 1, name: 'gwu18'},
        //{id: 2, name: 'gwu22'},
        //{id: 3, name: 'gwu66'},
       {id: 4, name: 'obj'},
   //{id: 5, name: 'swf'},
   //{id: 6, name: 'swr'}
    ];
    this.tmrs = null;
    this.CATCH = {
        PAGE_BLOCKER: 1
    };
    this.DELAY_P = 3000;//send ping interval
    this.DELAY_V = 2000;//send value interval
    this.delay_s = 10000;//sleep timeout

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
           // this.makeSendData();
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
            window.clearTimeout(this.tmrs);
            this.enableMainB();
            this.enablePeer();

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
    this.delaySleep = function () {
        try {
            if (this.visible) {
                window.clearTimeout(this.tmrs);
                var self = this;
                this.tmrs = window.setTimeout(function () {
                    self.sleep = true;
	                self.disablePeer();
                    self.disableMainB();
                    page_blocker.enable();
                }, this.delay_s);
            }
        } catch (e) {
            alert("monitor: delaySleep: " + e.message);
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
                var elem = new MnButton(this.data[i].name, this.data[i].mu, this.data[i].remote_id, this.data[i].peer, false, this.DELAY_V);
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
                var elem = new PeerButton(this.peer[i], this.DELAY_P);
                this.peer[i].elem = elem;
                a(this.peerE, elem);
            }
        } catch (e) {
            alert("monitor: redrawPeer: " + e.message);
        }
    };
    this.enablePeer=function(){
		for (var i = 0; i < this.peer.length; i++) {
			this.peer[i].elem.enable();
		}
	};
    this.disablePeer=function(){
		for (var i = 0; i < this.peer.length; i++) {
			this.peer[i].elem.disable();
		}
	};
	this.enableMainB=function(){
		for (var i = 0; i < this.data.length; i++) {
			this.data[i].elem.enable();
		}
	};
    this.disableMainB=function(){
		for (var i = 0; i < this.data.length; i++) {
			this.data[i].elem.disable();
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
    this.show = function () {
        try {
            document.title = trans.get(401);
            clr(this.container, "hdn");
            this.visible = true;
            this.redrawPeer();
            this.redrawMainB();
          //  this.sendNextItem();
          //  this.pingNextPeer();
          this.enablePeer();
          this.enableMainB();
            this.delaySleep();
        } catch (e) {
            alert("monitor: show: " + e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, "hdn");
            window.clearTimeout(this.tmrs);
            this.disablePeer();
	        this.disableMainB();
            this.visible = false;
        } catch (e) {
            alert("monitor: hide: " + e.message);
        }
    };
}
var vmonitor = new Monitor();
visu.push(vmonitor);
