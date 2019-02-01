<?php

$af = function($p) {
	\sock\init($p['address'], $p['port'], 3);
	$id= \acp\requestSendI1List(ACP_CMD_GET_FTS, $p['item']);
	$data = \acp\getFTS($id);
	\sock\suspend();
	return $data;
};
