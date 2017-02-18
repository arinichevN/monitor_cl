<?php

class get_value {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \udp\init($p['address'], $p['port']);
        \acp\sendPackI1(ACP_CMD_GET_FTS, $p['item']);
        return \acp\getFTS();
    }

}
