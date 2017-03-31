<?php


class ping_peer {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
       \sock\init($p['address'], $p['port'],3);
       \acp\sendPackBroadcast(ACP_CMD_APP_PING);
        $data= \acp\getBufParseStateData();
        \sock\suspend();
        return $data;
    }

}
