<?php
header('Content-Type: application/json');

$file = 'localizacoes.json';
if (!file_exists($file)) {
    echo json_encode([]);
    exit;
}

$locs = json_decode(file_get_contents($file), true);
echo json_encode(array_values($locs));
