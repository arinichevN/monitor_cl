function PeerButton(descr) {
    this.container = cd();
    this.id=descr;

    this.descrE = cd();
    this.workE = c("img");
    s(this.workE, "src", "client/image/work_un.png");

    this.workE.innerHTML = '&empty;';
    this.descrE.innerHTML = descr;

    this.updateStr = function () {

    };
    this.update = function (state) {
        switch (state) {
            case ACP.RESP.APP_BUSY:
                s(this.workE, "src", "client/image/work_yes.png");
                break;
            case ACP.RESP.APP_IDLE:
                s(this.workE, "src", "client/image/work_no.png");
                break;
            default:
                s(this.workE, "src", "client/image/work_un.png");
                break;
        }
    };
    a(this.container, [ this.descrE,this.workE]);
    cla(this.workE, ["peer_work"]);
    cla(this.descrE, ["peer_descr"]);
   // cla([this.workE, this.descrE], ["pr_d"]);
    cla(this.container, ["peer_block", "select_none"]);

}