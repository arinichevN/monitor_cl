<?php

$af = function($p) {
	\sock\init($p['address'], $p['port'], 3);
	$id = \acp\requestSendCmd(ACP_CMD_APP_PING);
	$data = \acp\getBufParseStateData($id);
	\sock\suspend();
	return $data;
};
