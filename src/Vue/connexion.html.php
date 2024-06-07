<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulaire de connexion</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="font-[sans-serif] text-[#333] bg-gray-700 flex items-center justify-center md:h-screen p-4">
  <div class="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl rounded-md p-6">
    <div class="grid md:grid-cols-2 items-center gap-8">
      <div class="max-md:order-1">
        <img src="../../public/assets/logo.png" class="lg:w-11/12 w-full object-cover" alt="login-image" />
      </div>
      <form id="loginForm" class="max-w-md w-full mx-auto">
        <div class="mb-12">
          <h3 class="text-4xl font-extrabold text-purple-600">Se Connecter</h3>
        </div>
        <div>
          <div class="relative flex items-center">
            <input name="email" type="email" id="usernameEmail" class="w-full text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none" placeholder="Entrer votre email"  />
          </div>
        </div>
        <div class="mt-8">
          <div class="relative flex items-center">
            <input name="password" type="password" id="usernamePassword" class="w-full text-sm border-b border-gray-300 focus:border-purple-600 px-2 py-3 outline-none" placeholder="Entrer votre mot de passe"  />
          </div>
        </div>
        <div class="flex items-center justify-between gap-2 mt-6">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-3 block text-white">Se souvenir de moi</label>
          </div>
          <div>
            <a href="javascript:void(0);" class="text-purple-600 text-sm hover:underline">Mot de passe oublié</a>
          </div>
        </div>
        <div class="mt-12">
          <button type="submit" id="connectButton" class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none">Se Connecter</button>
          <p class="text-white text-center mt-8">Je n'ai pas de compte <a href="" class="text-purple-600 font-semibold hover:underline ml-1 whitespace-nowrap">Se Connecter en tant que client</a></p>
        </div>
        <div id="errorMessage" class="error-message mt-4 hidden"></div>
      </form>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
      event.preventDefault(); // Empêche la soumission du formulaire

      const email = document.getElementById('usernameEmail').value;
      const password = document.getElementById('usernamePassword').value;
      const errorMessage = document.getElementById('errorMessage');

      try {
        const response = await axios.post('http://localhost/projetCargaison/dist/verifyUser.php', {
          email: email,
          password: password
        });

        if (response.data.success) {
          window.location.href = '/projetCargaison/index.php';
        } else {
          errorMessage.textContent = 'Email ou mot de passe incorrect';
          errorMessage.classList.remove('hidden');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        errorMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        errorMessage.classList.remove('hidden');
      }
    });
  </script>
  <script type="module" src="../../dist/Model/test.js"></script>
  <style>
    .error-message {
      background-color: red;
      color: white;
      text-align: center;
      padding: 10px;
      border-radius: 10px;
    }
  </style>
</body>
</html>
