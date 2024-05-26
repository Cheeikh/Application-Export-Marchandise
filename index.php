<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/* // Inclusion des fichiers nécessaires
require_once 'config/helpers.php';
require_once 'config/bootstrap.php';
require_once 'config/fileLoad.php'; */

// Définition des routes
$route = [
    '/' => 'dashboard',    
];

// Récupération de l'URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
/* 
// Inclusion du modèle correspondant uniquement si ce n'est pas la page de connexion
if ($uri !== '/') {
    $modelPath = "models/$uri.model.php";
    if (file_exists($modelPath)) {
        require_once $modelPath;
    }
}
 */
/* // Redirection vers la page de connexion si la route n'existe pas
if (!array_key_exists($uri, $route)) {
    header('Location: /');
    exit;
} */

// Inclusion de l'en-tête
require_once 'src/Vue/partial/header.html.php';

// Inclusion de la vue correspondante si la route existe
/* if (array_key_exists($uri, $route)) { */
    require_once "./src/Vue/dashboard.html.php";
/* } */

// Inclusion du pied de page
require_once 'src/Vue/partial/footer.html.php';
?>
