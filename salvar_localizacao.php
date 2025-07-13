<?php
// Recebe JSON do POST
$data = json_decode(file_get_contents('php://input'), true);
if (!$data || !isset($data['motorista_id'], $data['latitude'], $data['longitude'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

$id = intval($data['motorista_id']);
$lat = floatval($data['latitude']);
$lng = floatval($data['longitude']);

// Salve os dados em banco de dados, arquivo, etc
// Exemplo com arquivo JSON simples (não recomendado para produção)

$file = 'localizacoes.json';
$locs = [];
if (file_exists($file)) {
    $locs = json_decode(file_get_contents($file), true) ?: [];
}

// Atualiza a localização do motorista no array (por id)
$locs[$id] = ['motorista_id' => $id, 'latitude' => $lat, 'longitude' => $lng];

// Salva novamente
file_put_contents($file, json_encode($locs));

echo json_encode(['success' => true]);
