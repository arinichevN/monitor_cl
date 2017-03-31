<?php

class get_value {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port'],3);
        \acp\sendPackI1(ACP_CMD_GET_FTS, $p['item']);
        $data= \acp\getFTS();
        \sock\suspend();
        return $data;
    }

}
