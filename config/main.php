<?php

function f_getConfig() {
    return [
        'name' => 'monitor_cl',
        'acp' => [
            'use' => '1',
        ],
        'sock' => [
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
