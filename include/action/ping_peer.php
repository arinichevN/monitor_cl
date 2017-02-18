<?php


class ping_peer {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
       \udp\init($p['address'], $p['port']);
       \acp\sendPackBroadcast(ACP_CMD_APP_PING);
        return \acp\getBufParseStateData();
    }

}
