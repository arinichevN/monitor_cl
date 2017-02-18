function MnButton(descr, mu) {
    this.container = cd();
    this.done = false;
    this.tmr1 = {tmr: null};
    this.valueE = cd();
    this.muE = cd();
    this.descrE = cd();

    this.valueE.innerHTML = '&empty;';
    this.muE.innerHTML = mu;
    this.descrE.innerHTML = descr;

    this.updateStr = function () {

    };
    this.unmark = function () {
        clr(this.container, 'mn_updated');
    };
    this.update = function (value, state) {
        if (value !== null && state) {
            this.valueE.innerHTML = value.toFixed(1);
            clr(this.container, 'mn_dis');
        } else {
            this.valueE.innerHTML = '&empty;';
            cla(this.container, 'mn_dis');
        }
        cla(this.container, 'mn_updated');
        var self = this;
        this.tmr1.tmr = window.setTimeout(function () {
            self.unmark();
        }, 300);
    };
    a(this.container, [this.valueE, this.muE, this.descrE]);
    cla(this.valueE, ["mn_value"]);
    cla(this.muE, ["mn_mu"]);
    cla(this.descrE, ["mn_descr"]);
    cla(this.container, ["mn_block", "select_none", "mn_dis"]);
}