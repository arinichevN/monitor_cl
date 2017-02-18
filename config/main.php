<?php

function f_getConfig() {
    return [
        'name' => 'monitor_cl',
        'db' => [
            'use' => 'p',
            'conninfo' => 'host=localhost port=5432 user=postgres password=654321 dbname=control'
        ],
        'acp' => [
            'use' => '1',
        ],
        'udp' => [
            'use' => '1',
        ],
        'session' => [
            'use' => '4',
        ],
        'check' => [
            'use' => [1],
        ]
    ];
}
