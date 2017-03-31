function MnButton(descr, mu, show_name) {
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
    this.RETRY = 7;
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
    this.update = function (value, state) {
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
    a(this.container, [this.valueE, this.muE, this.descrE]);
    cla(this.valueE, ["mn_value"]);
    cla(this.muE, ["mn_mu"]);
    cla(this.descrE, ["mn_descr"]);
     if (!this.show_name) {
         cla(this.descrE, "hdn");
    }
    cla(this.container, ["mn_block", "select_none", "mn_dis"]);
}