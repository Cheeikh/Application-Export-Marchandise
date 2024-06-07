<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Partie cliente
/* contenue de la page du client */

// Partie connexion
/* contenu de la page du connexion */

// Partie gestionnaire
require_once 'src/Vue/partial/header.html.php';
require_once "./src/Vue/dashboard.html.php";
require_once 'src/Vue/partial/footer.html.php';
?>
