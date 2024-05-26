<?php
header('Content-Type: application/json');

$filename = __DIR__ . '/dist/data/cargaisons.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Lire le contenu du fichier JSON et le renvoyer
    if (file_exists($filename)) {
        $json = file_get_contents($filename);
        echo $json;
    } else {
        echo json_encode([]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données JSON envoyées et les ajouter au fichier JSON
    $postData = file_get_contents('php://input');
    $newCargo = json_decode($postData, true);

    // Lire les cargaisons existantes
    if (file_exists($filename)) {
        $json = file_get_contents($filename);
        $cargos = json_decode($json, true);
    } else {
        $cargos = [];
    }

    // Ajouter la nouvelle cargaison
    $cargos[] = $newCargo;

    // Écrire les données mises à jour dans le fichier JSON
    file_put_contents($filename, json_encode($cargos, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success']);
} else {
    // Autres méthodes non autorisées
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
?>
