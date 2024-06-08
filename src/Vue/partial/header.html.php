<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      rel="stylesheet"
      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    
    <title>Gestion de Cargaisons</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link href="./dist/CSS/output.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
   
  </head>
  <body class="font-nunito flex items-center justify-center min-h-screen bg-no-repeat bg-cover overflow-hidden">
    <video autoplay muted loop id="myVideo">
      <source src="./public/assets/seaport.mp4" type="video/mp4" />
    </video>
    <main class="grid">
    <nav class="main-menu overflow-hidden bg-purple-700 pt-10 rounded-l-lg font-roboto">
    <div class="logo_contain h-18 w-61 bg-cover bg-no-repeat bg-center mx-auto">
    </div>
    <ul>
        <li class="nav-item active relative mb-4">
            <b></b>
            <b></b>
            <a href="#" data-target="acceuil" class="flex items-center space-x-2 text-gray-400 hover:text-white">
                <i class="fa fa-house nav-icon"></i>
                <span class="nav-text">Acceuil</span>
            </a>
        </li>
        <li class="nav-item relative mb-4">
            <b></b>
            <b></b>
            <a href="#" data-target="cargaisons" class="flex items-center space-x-2 text-gray-400 hover:text-white">
                <i class="fa-solid fa-box nav-icon"></i>
                <span class="nav-text">Cargaisons</span>
            </a>
        </li>
        <li class="nav-item relative mb-4">
            <b></b>
            <b></b>
            <a href="#" data-target="produits" class="flex items-center space-x-2 text-gray-400 hover:text-white">
                <i class="fa-solid fa-cart-plus nav-icon"></i>
                <span class="nav-text">Produits</span>
            </a>
        </li>
        <li class="nav-item relative mb-4">
            <b></b>
            <b></b>
            <a href="#" data-target="archive" class="flex items-center space-x-2 text-gray-400 hover:text-white">
                <i class="fa-solid fa-folder-open nav-icon"></i>
                <span class="nav-text">Archives</span>
            </a>
        </li>
        <li class="nav-item relative mb-4">
            <b></b>
            <b></b>
            <a href="#" data-target="parametres" class="flex items-center space-x-2 text-gray-400 hover:text-white">
                <i class="fa fa-sliders nav-icon"></i>
                <span class="nav-text">Paramètres</span>
            </a>
        </li>
        <li class="nav-item relative mb-4">
            <b></b>
            <b></b>
            <a href="#" id="logout" class="flex items-center space-x-2 text-gray-400 hover:text-white">
                <i class="fa-solid fa-sign-out-alt nav-icon"></i>
                <span class="nav-text">Se déconnecter</span>
            </a>
        </li>
        
    </ul>
</nav>
