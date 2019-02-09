function PeerButton(peer,delay_send_usec) {
    this.container = cd();
    this.peer=peer;
    this.delay_send_usec=delay_send_usec;

    this.descrE = cd();
    this.workE = c("img");
    s(this.workE, "src", "client/image/work_un.png");

    this.workE.innerHTML = '&empty;';
    this.descrE.innerHTML = this.peer.name;
    this.container.title=peer.address+":"+peer.port;
    this.tmr = null;
    this.state=null;
    this.active=false;
    this.ACTION =
            {
                PING_PEER: 1
            };
    this.updateStr = function () {

    };
    this.blink = function (style) {
        cla(this.container, style);
        var self = this;
        var tmr = window.setTimeout(function () {
            self.unmark(style);
        }, 300);
    };
    this.unmark = function (style) {
        clr(this.container, style);
    };
    this.update = function (state) {
        switch (state) {
            case ACP.RESP.APP_BUSY:
                s(this.workE, "src", "client/image/work_yes.png");
                this.state=1;
                break;
            case ACP.RESP.APP_IDLE:
                s(this.workE, "src", "client/image/work_no.png");
                this.state=0;
                break;
            default:
                s(this.workE, "src", "client/image/work_un.png");
                this.state=null;
                break;
        }
        this.blink('peer_updated');
    };
	this.sendRequest = function () {
        var data = [
            {
                action: ['ping_peer'],
                param: {address: this.peer.address, port: this.peer.port}
            }
        ];
        sendTo(this, data, this.ACTION.PING_PEER, 'json_udp_acp');
    };
	this.startSendingRequest = function () {
		var self = this;
		this.tmr = window.setInterval(function () {
			self.sendRequest();
		}, this.delay_send_usec);
    };
    this.enable=function(){
		this.active=true;
		this.startSendingRequest();
	};
	this.disable=function(){
		this.active=false;
		window.clearInterval(this.tmr);
	};
    this.confirm = function (action, d, dt_diff) {
		switch (action) {
			case this.ACTION.PING_PEER:
				this.update(d);
				break;
			default:
				console.log("confirm: unknown action: ", action);
				break;
         }
	};
	this.abort = function (action, m, n) {
		switch (action) {
			case this.ACTION.PING_PEER:
				this.update(null);
				break;
			default:
				console.log("abort: unknown action: ", action);
				break;
		}
	};
    a(this.container, [this.descrE, this.workE]);
    cla(this.workE, ["peer_work"]);
    cla(this.descrE, ["peer_descr"]);
    // cla([this.workE, this.descrE], ["pr_d"]);
    cla(this.container, ["peer_block", "select_none"]);

}
