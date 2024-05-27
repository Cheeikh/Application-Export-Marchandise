<?php
header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];
$filename = "/var/www/html/projetCargaison/dist/data/cargaisons.json";

function getCargaisons() {
    global $filename;
    if (file_exists($filename)) {
        $data = file_get_contents($filename);
        echo $data;
    } else {
        echo json_encode([]);
    }
}

function addCargaison($newCargaison) {
    global $filename;

    if (!file_exists($filename)) {
        if (!touch($filename)) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to create the file"]);
            exit;
        }
    }

    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        exit;
    }

    $data = file_get_contents($filename);
    $cargaisons = json_decode($data, true) ?? [];

    $cargaisons[] = $newCargaison;

    if (file_put_contents($filename, json_encode($cargaisons)) === false) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data"]);
        exit;
    }

    echo json_encode($newCargaison);
}

function updateCargaison($id, $updatedCargaison) {
    global $filename;

    if (!file_exists($filename)) {
        http_response_code(404);
        echo json_encode(["error" => "File not found"]);
        exit;
    }

    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        exit;
    }

    $data = file_get_contents($filename);
    $cargaisons = json_decode($data, true) ?? [];

    $cargaisonFound = false;
    foreach ($cargaisons as &$cargaison) {
        if ($cargaison['id'] === $id) {
            $cargaison = array_merge($cargaison, $updatedCargaison);
            $cargaisonFound = true;
            break;
        }
    }

    if (!$cargaisonFound) {
        http_response_code(404);
        echo json_encode(["error" => "Cargaison not found"]);
        exit;
    }

    if (file_put_contents($filename, json_encode($cargaisons)) === false) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data"]);
        exit;
    }

    echo json_encode($updatedCargaison);
}

if ($method === 'GET') {
    getCargaisons();
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (is_null($input)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON"]);
        exit;
    }

    $input['id'] = uniqid();
    addCargaison($input);
} elseif ($method === 'PUT') {
    parse_str($_SERVER['QUERY_STRING'], $query);
    $id = $query['id'] ?? null;

    if (is_null($id)) {
        http_response_code(400);
        echo json_encode(["error" => "Missing cargaison ID"]);
        exit;
    }

    $input = json_decode(file_get_contents('php://input'), true);

    if (is_null($input)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON"]);
        exit;
    }

    updateCargaison($id, $input);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
