<?php
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'];
$password = $input['password'];

// Vous pouvez remplacer cette partie par une vérification dans une base de données
$users = json_decode(file_get_contents('/var/www/html/projetCargaison/dist/data/users.json'), true);

$success = false;

foreach ($users as $user) {
  if ($user['email'] === $email && $user['password'] === $password) {
    $success = true;
    break;
  }
}

echo json_encode(['success' => $success]);
?>
