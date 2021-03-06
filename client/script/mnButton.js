function MnButton(descr, mu, channel_id, peer,show_name,delay_send_usec) {
    this.container = cd();
    this.done = false;
    this.tmr1 = {tmr: null};
    this.valueE = cd();
    this.muE = cd();
    this.descrE = cd();

    this.valueE.innerHTML = '&empty;';
    this.muE.innerHTML = mu;
    this.descrE.innerHTML = descr;
    this.show_name = show_name;
    this.delay_send_usec=delay_send_usec;
    this.channel_id=channel_id;
    this.peer=peer;
    this.tmr = null;
    this.RETRY = 7;
	this.ACTION =
		{
			GET_VALUE: 1
		};
    this.uf_count = 0;//number of bad updates
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
    this.update = function (d) {
		var value=null;
		var state=null;
		if (typeof d[0] !== 'undefined') {
		   value = parseFloat(d[0].value);
		   state = parseInt(d[0].state);
		 }
        if (value !== null && state) {
            this.valueE.innerHTML = value.toFixed(1);
            this.uf_count = 0;
            clr(this.container, 'mn_dis');
            this.blink('mn_updated');
        } else {
            if (this.uf_count > this.RETRY) {
                this.valueE.innerHTML = '&empty;';
                cla(this.container, 'mn_dis');
            } else {
                this.uf_count++;
            }
            this.blink('mn_updatedf');
        }
        var self = this;
        this.tmr1.tmr = window.setTimeout(function () {
            self.unmark();
        }, 300);
    };
    this.sendRequest = function () {
        var data = [
            {
                action: ['get_value'],
                param: {address: this.peer.address, port: this.peer.port, item: [this.channel_id]}
            }
        ];
        sendTo(this, data, this.ACTION.GET_VALUE, 'json_udp_acp');
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
			case this.ACTION.GET_VALUE:
				this.update(d);
				break;
			default:
				console.log("confirm: unknown action: ", action);
				break;
         }
	};
	this.abort = function (action, m, n) {
		switch (action) {
			case this.ACTION.GET_VALUE:
				this.update(null);
				break;
			default:
				console.log("abort: unknown action: ", action);
				break;
		}
	};
    a(this.container, [this.valueE, this.muE, this.descrE]);
    cla(this.valueE, ["mn_value"]);
    cla(this.muE, ["mn_mu"]);
    cla(this.descrE, ["mn_descr"]);
     if (!this.show_name) {
         cla(this.descrE, "hdn");
    }
    cla(this.container, ["mn_block", "select_none", "mn_dis"]);
}
