<?php

class get_value {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['address'], $p['port'], 3);
        $id= \acp\requestSendI1List(ACP_CMD_GET_FTS, $p['item']);
        $data = \acp\getFTS($id);
        \sock\suspend();
        return $data;
    }

}
