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

    // Create the file if it doesn't exist
    if (!file_exists($filename)) {
        if (!touch($filename)) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to create the file"]);
            exit;
        }
    }

    // Check if the file is writable
    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        exit;
    }

    $data = file_get_contents($filename);
    $cargaisons = json_decode($data, true) ?? [];

    // Add the new cargaison to the array
    $cargaisons[] = $newCargaison;

    // Save the updated array back to the file
    if (file_put_contents($filename, json_encode($cargaisons)) === false) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data"]);
        exit;
    }

    // Return the newly added cargaison as response
    echo json_encode($newCargaison);
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

    // Add a unique ID to the new cargaison
    $input['id'] = uniqid();

    addCargaison($input);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}
?>
