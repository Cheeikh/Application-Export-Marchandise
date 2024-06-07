<?php
header("Content-Type: application/json");
$method = $_SERVER['REQUEST_METHOD'];
$filename = "/var/www/html/projetCargaison/dist/data/data.json";

// Activer l'enregistrement des erreurs PHP
ini_set('log_errors', 1);
ini_set('error_log', '/var/log/php_errors.log');

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

    error_log("Attempting to add a new cargaison");

    if (!file_exists($filename)) {
        if (!touch($filename)) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to create the file"]);
            error_log("Failed to create the file: $filename");
            exit;
        }
    }

    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        error_log("File is not writable: $filename");
        exit;
    }

    $data = file_get_contents($filename);
    $jsonData = json_decode($data, true);

    if (is_null($jsonData) || !isset($jsonData['cargaisons'])) {
        $jsonData = ["cargaisons" => []];
    }

    $jsonData['cargaisons'][] = $newCargaison;

    if (file_put_contents($filename, json_encode($jsonData, JSON_PRETTY_PRINT)) === false) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data"]);
        error_log("Failed to save data to the file: $filename");
        exit;
    }

    echo json_encode($newCargaison);
    error_log("Cargaison added successfully");
}

function updateCargaison($id, $updatedCargaison) {
    global $filename;

    error_log("Attempting to update cargaison with ID: $id");

    if (!file_exists($filename)) {
        http_response_code(404);
        echo json_encode(["error" => "File not found"]);
        error_log("File not found: $filename");
        exit;
    }

    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        error_log("File is not writable: $filename");
        exit;
    }

    $data = file_get_contents($filename);
    $cargaisons = json_decode($data, true) ?? [];

    $cargaisonFound = false;
    foreach ($cargaisons['cargaisons'] as &$cargaison) {
        if ($cargaison['id'] === $id) {
            $cargaison = array_merge($cargaison, $updatedCargaison);
            $cargaisonFound = true;
            break;
        }
    }

    if (!$cargaisonFound) {
        http_response_code(404);
        echo json_encode(["error" => "Cargaison not found"]);
        error_log("Cargaison not found with ID: $id");
        exit;
    }

    if (file_put_contents($filename, json_encode($cargaisons)) === false) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data"]);
        error_log("Failed to save data to the file: $filename");
        exit;
    }

    echo json_encode($updatedCargaison);
    error_log("Cargaison updated successfully with ID: $id");
}

function addProduitToCargaison($cargaisonId, $newProduit) {
    global $filename;

    error_log("Attempting to add a new produit to cargaison with ID: $cargaisonId");

    if (!file_exists($filename)) {
        http_response_code(404);
        echo json_encode(["error" => "File not found"]);
        error_log("File not found: $filename");
        exit;
    }

    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        error_log("File is not writable: $filename");
        exit;
    }

    $data = file_get_contents($filename);
    $cargaisons = json_decode($data, true) ?? [];

    $cargaisonFound = false;
    foreach ($cargaisons['cargaisons'] as &$cargaison) {
        if ($cargaison['id'] === $cargaisonId) {
            $cargaison['produits'][] = $newProduit;
            if (file_put_contents($filename, json_encode($cargaisons)) === false) {
                http_response_code(500);
                echo json_encode(["error" => "Failed to save data"]);
                error_log("Failed to save data to the file: $filename");
                exit;
            }
            echo json_encode($newProduit);
            error_log("Produit added successfully to cargaison with ID: $cargaisonId");
            return;
        }
    }

    http_response_code(404);
    echo json_encode(["error" => "Cargaison not found"]);
    error_log("Cargaison not found with ID: $cargaisonId");
}

function updateProduitInCargaison($cargaisonId, $produitId, $updatedProduit) {
    global $filename;

    error_log("Attempting to update produit with ID: $produitId in cargaison with ID: $cargaisonId");

    if (!file_exists($filename)) {
        http_response_code(404);
        echo json_encode(["error" => "File not found"]);
        error_log("File not found: $filename");
        exit;
    }

    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        error_log("File is not writable: $filename");
        exit;
    }

    $data = file_get_contents($filename);
    $cargaisons = json_decode($data, true) ?? [];

    $cargaisonFound = false;
    foreach ($cargaisons['cargaisons'] as &$cargaison) {
        if ($cargaison['id'] === $cargaisonId) {
            foreach ($cargaison['produits'] as &$produit) {
                if ($produit['id'] === $produitId) {
                    $produit = array_merge($produit, $updatedProduit);
                    if (file_put_contents($filename, json_encode($cargaisons)) === false) {
                        http_response_code(500);
                        echo json_encode(["error" => "Failed to save data"]);
                        error_log("Failed to save data to the file: $filename");
                        exit;
                    }
                    echo json_encode($updatedProduit);
                    error_log("Produit updated successfully in cargaison with ID: $cargaisonId");
                    return;
                }
            }
            http_response_code(404);
            echo json_encode(["error" => "Produit not found"]);
            error_log("Produit not found with ID: $produitId in cargaison with ID: $cargaisonId");
            return;
        }
    }

    http_response_code(404);
    echo json_encode(["error" => "Cargaison not found"]);
    error_log("Cargaison not found with ID: $cargaisonId");
}

function deleteProduitFromCargaison($cargaisonId, $produitId) {
    global $filename;

    error_log("Attempting to delete produit with ID: $produitId from cargaison with ID: $cargaisonId");

    if (!file_exists($filename)) {
        http_response_code(404);
        echo json_encode(["error" => "File not found"]);
        error_log("File not found: $filename");
        exit;
    }

    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        error_log("File is not writable: $filename");
        exit;
    }

    $data = file_get_contents($filename);
    $cargaisons = json_decode($data, true) ?? [];

    $cargaisonFound = false;
    foreach ($cargaisons['cargaisons'] as &$cargaison) {
        if ($cargaison['id'] === $cargaisonId) {
            $produitIndex = array_search($produitId, array_column($cargaison['produits'], 'id'));
            if ($produitIndex !== false) {
                array_splice($cargaison['produits'], $produitIndex, 1);
                if (file_put_contents($filename, json_encode($cargaisons)) === false) {
                    http_response_code(500);
                    echo json_encode(["error" => "Failed to save data"]);
                    error_log("Failed to save data to the file: $filename");
                    exit;
                }
                echo json_encode(["success" => "Produit deleted successfully"]);
                error_log("Produit deleted successfully from cargaison with ID: $cargaisonId");
                return;
            }
            http_response_code(404);
            echo json_encode(["error" => "Produit not found"]);
            error_log("Produit not found with ID: $produitId in cargaison with ID: $cargaisonId");
            return;
        }
    }

    http_response_code(404);
    echo json_encode(["error" => "Cargaison not found"]);
    error_log("Cargaison not found with ID: $cargaisonId");
}
function updateProduitStatus($productId, $newStatus) {
    global $filename;

    error_log("Attempting to update status of product with ID: $productId");

    if (!file_exists($filename)) {
        http_response_code(404);
        echo json_encode(["error" => "File not found"]);
        error_log("File not found: $filename");
        exit;
    }

    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        error_log("File is not writable: $filename");
        exit;
    }

    $data = file_get_contents($filename);
    $cargaisons = json_decode($data, true) ?? [];

    foreach ($cargaisons['cargaisons'] as &$cargaison) {
        foreach ($cargaison['produits'] as &$produit) {
            if ($produit['id'] === $productId) {
                $produit['statut'] = $newStatus;
                if (file_put_contents($filename, json_encode($cargaisons)) === false) {
                    http_response_code(500);
                    echo json_encode(["error" => "Failed to save data"]);
                    error_log("Failed to save data to the file: $filename");
                    exit;
                }
                echo json_encode(["success" => "Product status updated successfully"]);
                error_log("Product status updated successfully for product with ID: $productId");
                return;
            }
        }
    }

    http_response_code(404);
    echo json_encode(["error" => "Product not found"]);
    error_log("Product not found with ID: $productId");
}

function updateCargaisonStatus($cargaisonId, $newStatus) {
    global $filename;

    error_log("Attempting to update cargaison status with ID: $cargaisonId");

    if (!file_exists($filename)) {
        http_response_code(404);
        echo json_encode(["error" => "File not found"]);
        error_log("File not found: $filename");
        exit;
    }

    if (!is_writable($filename)) {
        http_response_code(500);
        echo json_encode(["error" => "File is not writable"]);
        error_log("File is not writable: $filename");
        exit;
    }

    $data = file_get_contents($filename);
    $cargaisons = json_decode($data, true) ?? [];

    $cargaisonFound = false;
    foreach ($cargaisons['cargaisons'] as &$cargaison) {
        if ($cargaison['id'] === $cargaisonId) {
            $cargaison['statut'] = $newStatus;

            // Mettre à jour le statut de tous les produits dans la cargaison
            foreach ($cargaison['produits'] as &$produit) {
                $produit['statut'] = $newStatus;
            }

            $cargaisonFound = true;
            break;
        }
    }

    if (!$cargaisonFound) {
        http_response_code(404);
        echo json_encode(["error" => "Cargaison not found"]);
        error_log("Cargaison not found with ID: $cargaisonId");
        exit;
    }

    if (file_put_contents($filename, json_encode($cargaisons)) === false) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save data"]);
        error_log("Failed to save data to the file: $filename");
        exit;
    }

    echo json_encode(["success" => "Cargaison status updated successfully"]);
    error_log("Cargaison status updated successfully with ID: $cargaisonId");
}



try {
    if ($method === 'GET') {
        getCargaisons();
    }elseif ($method === 'POST') {
        $postData = json_decode(file_get_contents('php://input'), true);

        $input = json_decode(file_get_contents('php://input'), true);
    
        if (is_null($input)) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid JSON"]);
            error_log("Invalid JSON input");
            exit;
        }
    
        if (isset($_GET['operationType'])) {
            $operationType = $_GET['operationType'];
    
            if ($operationType === 'cargaison') {
                if (isset($input['id']) && isset($input['status'])) {
                    $productId = $input['id'];
                    $newStatus = $input['status'];
                    updateCargaisonStatus($productId, $newStatus);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing product ID or status"]);
                    error_log("Missing product ID or status in request");
                    exit;
                }
            } elseif ($operationType === 'produit') {
                if (isset($input['id']) && isset($input['status'])) {
                    $productId = $input['id'];
                    $newStatus = $input['status'];
                    updateProduitStatus($productId, $newStatus);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing product ID or status"]);
                    error_log("Missing product ID or status in request");
                    exit;
                }
            } elseif ($operationType === 'addProduitToCargaison') {
                $cargaisonId = $_GET['addProduitToCargaison'];
    
                if (isset($input['nom']) && isset($input['description']) && isset($input['poids']) && isset($input['client'])) {
                    $newProduit = [
                        'id' => $input['id'],  // Generate a unique ID for the new product
                        'nom' => $input['nom'],
                        'description' => $input['description'],
                        'poids' => $input['poids'],
                        'client' => $input['client'],
                        'destinataire' => $input['destinataire'],
                        'frais' => isset($input['frais']) ? $input['frais'] : 0,  // Default to 0 if not provided
                        'statut' => isset($input['statut']) ? $input['statut'] : 'En attente'  // Default to 'En attente' if not provided
                    ];
    
                    addProduitToCargaison($cargaisonId, $newProduit);
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing product details"]);
                    error_log("Missing product details in request");
                    exit;
                }
            } elseif ($operationType === 'addCargaison' && isset($postData)) {
                addCargaison($postData);
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Invalid operation type"]);
                error_log("Invalid operation type in request");
                exit;
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Missing operation type"]);
            error_log("Missing operation type in request");
            exit;
        }
    }
    
    
    
     elseif ($method === 'PUT') {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $id = $query['id'] ?? null;

        if (is_null($id)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing cargaison ID"]);
            error_log("Missing cargaison ID in request");
            exit;
        }

        $input = json_decode(file_get_contents('php://input'), true);

        if (is_null($input)) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid JSON"]);
            error_log("Invalid JSON input");
            exit;
        }

        if (isset($query['produitId'])) {
            $produitId = $query['produitId'];
            updateProduitInCargaison($id, $produitId, $input);
        } else {
            updateCargaison($id, $input);
        }
    } elseif ($method === 'DELETE') {
        parse_str($_SERVER['QUERY_STRING'], $query);
        $cargaisonId = $query['deleteProduitFromCargaison'] ?? null;
        $produitId = $query['produitId'] ?? null;

        if (is_null($cargaisonId) || is_null($produitId)) {
            http_response_code(400);
            echo json_encode(["error" => "Missing cargaison ID or produit ID"]);
            error_log("Missing cargaison ID or produit ID in request");
            exit;
        }

        deleteProduitFromCargaison($cargaisonId, $produitId);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
        error_log("Method not allowed: $method");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Internal Server Error", "message" => $e->getMessage()]);
    error_log("Exception caught: " . $e->getMessage());
}
?>
