<section class="content flex flex-1 p-4">
  <div class="left-content grid grid-rows-2 bg-f6f7fb m-15 p-20 rounded-15">
    <div class="activities mb-8">
      <h1 class="text-2xl font-bold mb-4">Ajouter une cargaison</h1>
      <div class="activity-container grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="image-container img-one relative cursor-pointer" data-type="Aerienne">
          <img src="https://cdn.futura-sciences.com/sources/images/elysian.jpg" alt="Aerienne" class="w-full h-full object-cover rounded-lg" />
          <div class="overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <h3 class="text-white text-lg font-bold">Aerienne</h3>
          </div>
        </div>

        <div class="image-container img-two relative cursor-pointer" data-type="Terrestre">
          <img src="https://afrimag.net/wp-content/uploads/2020/03/Transport-routier-3-scaled.jpg" alt="Terrestre" class="w-full h-full object-cover rounded-lg" />
          <div class="overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <h3 class="text-white text-lg font-bold">Terrestre</h3>
          </div>
        </div>

        <div class="image-container img-three relative cursor-pointer" data-type="Maritime">
          <img src="https://www.easyhaul.com/blog/wp-content/uploads/2022/12/Main-image-maritime-ports.png" alt="Maritime" class="w-full h-full object-cover rounded-lg" />
          <div class="overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <h3 class="text-white text-lg font-bold">Maritime</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="left-bottom">
      <div class="weekly-schedule">
        <h1 class="text-2xl font-bold mb-4">Cargaison en Attente</h1>
        <!-- Les cargaisons crées s'ajoute ici -->
        <div class="calendar"></div>
      </div>
    </div>
  </div>

  <div class="right-content">
    <div class="user-info flex items-center mb-8">
      <div class="icon-container flex space-x-4 mr-4">
        <i class="fa fa-bell nav-icon text-xl"></i>
        <i class="fa fa-message nav-icon text-xl"></i>
      </div>
      <h4 class="text-lg font-bold">Cheikh Seydil Mokhtar Mbacke</h4>
      <img src="./public/assets/pp.png" alt="user" class="ml-4 w-12 h-12 rounded-full" />
    </div>

    <div class="friends-activity">
      <h1 class="text-2xl font-bold mb-4">Cargaisons En Cours</h1>
      <div class="card-container space-y-4">
        <!-- Les cargaisons terminées s'ajoute ici -->
        <div class="card bg-white p-4 rounded-lg shadow-md">
          <div class="card-user-info mb-4">
            <h2 class="text-lg font-bold"> Id de la cargaison</h2>
          </div>
          <img class="card-img w-full h-40 object-cover mb-4 rounded-lg" src="https://www.easyhaul.com/blog/wp-content/uploads/2022/12/Main-image-maritime-ports.png" alt="Cargaison envoyée" />
          <p class="text-gray-600">Arrive dans {Nombre de jours}</p>
        </div>
      </div>
    </div>
  </div>


  <!-- Contenue page cargaisons -->
  <div class="containArg ">
    <div class="  page_cargaisons hide">
      <div class="" style="padding: 10px;margin-bottom: 3%;font-size: 2vw;width: fit-content;border-radius: 5px;">
        Liste des cargaisons
      </div>
      <!-- Champ de recherche general -->
      <input type="text" id="searchInput" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher une cargaison..." />

      <!-- Les champs de recherche selectif ici -->
      <div class="flex">
        <div class="mb-3 ml-2.5">
          <label for="searchId" class="block text-sm font-medium text-gray-700">Rechercher par ID</label>
          <input type="text" id="searchId" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher par ID..." />
        </div>
        <div class="mb-3 ml-2.5">
          <label for="searchType" class="block text-sm font-medium text-gray-700">Rechercher par Type</label>
          <input type="text" id="searchType" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher par type..." />
        </div>
        <div class="mb-3 ml-2.5">
          <label for="searchStartLocation" class="block text-sm font-medium text-gray-700">Rechercher par Ville de départ</label>
          <input type="text" id="searchStartLocation" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher par lieu de départ..." />
        </div>
        <div class="mb-3 ml-2.5">
          <label for="searchEndLocation" class="block text-sm font-medium text-gray-700">Rechercher par Ville d'arrivée</label>
          <input type="text" id="searchEndLocation" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher par lieu d'arrivée..." />
        </div>

        <div id="pagination" class="flex justify-center mt-4 mb-3 ml-2.5">
          <button id="prevPage" class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Précédent</button>
          <span id="currentPage" class="px-4 py-2 bg-white-200 rounded-md" style="background-color: white;">Page 1</span>
          <button id="nextPage" class="px-4 py-2 bg-blue-500 text-white rounded-md ml-2">Suivant</button>
          <label for="itemsPerPage">Éléments</label>
          <div class="mb-3 ml-2.5">
            <select id="itemsPerPage">
              <option value="5" selected>5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Ajoutez d'autres champs de recherche sélectifs ici -->

      <!-- Tableau des cargaisons -->
      <div class="overflow-scroll tab-carg">
        <table class="min-w-full  divide-y divide-gray-200 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 bg-blue-50 dark:text-gray-400">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de départ
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'arrivée
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ville de départ
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ville d'arrivée
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance (en KM)
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Etat
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>

              <!-- Ajoutez d'autres en-têtes de colonne au besoin -->
            </tr>
          </thead>
          <tbody id="cargaisonTableBody" class="bg-white divide-y divide-gray-200">
            <!-- Les lignes des cargaisons seront ajoutées ici dynamiquement -->
          </tbody>
        </table>
      </div>
      <!-- Pagination -->

    </div>
    <div class="  page_produits hide">
      <div class="" style="padding: 10px;margin-bottom: 3%;font-size: 2vw;width: fit-content;border-radius: 5px;">
        Liste des produits
      </div>


      <!-- Champ de recherche general -->
      <input type="text" id="searchInput" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher une cargaison..." />

      <!-- Les champs de recherche selectif ici -->
      <div class="flex">
        <div class="mb-3 ml-2.5">
          <label for="searchIdProd" class="block text-sm font-medium text-gray-700">Rechercher par ID du produit</label>
          <input type="text" id="searchIdProd" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher par ID..." />
        </div>
        <div class="mb-3 ml-2.5">
          <label for="searchIdCargaison" class="block text-sm font-medium text-gray-700">Rechercher Id de la cargaison</label>
          <input type="text" id="searchIdCargaison" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher par type..." />
        </div>
        <div class="mb-3 ml-2.5">
          <label for="searchCargaisonType" class="block text-sm font-medium text-gray-700">Rechercher type de la cargaison</label>
          <input type="text" id="searchCargaisonType" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher par lieu de départ..." />
        </div>
        <div class="mb-3 ml-2.5">
          <label for="searchStatut" class="block text-sm font-medium text-gray-700">Rechercher par le statut</label>
          <input type="text" id="searchStatut" class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Rechercher par lieu d'arrivée..." />
        </div>

        <div id="pagination" class="flex justify-center mt-4 mb-3 ml-2.5">
          <button id="prevPage" class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Précédent</button>
          <span id="currentPage" class="px-4 py-2 bg-white-200 rounded-md" style="background-color: white;">Page 1</span>
          <button id="nextPage" class="px-4 py-2 bg-blue-500 text-white rounded-md ml-2">Suivant</button>
          <label for="itemsPerPage">Éléments</label>
          <div class="mb-3 ml-2.5">
            <select id="itemsPerPage">
              <option value="5" selected>5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>



      <div class="relative overflow-scroll tab-prod">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 bg-blue-50 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Id Produit
              </th>
              <th scope="col" class="px-6 py-3">
                Id Cargaison
              </th>
              <th scope="col" class="px-6 py-3">
                Nom
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Poids
              </th>
              <th scope="col" class="px-6 py-3">
                Date de depart
              </th>
              <th scope="col" class="px-6 py-3">
                Date d'arrivée
              </th>
              <th scope="col" class="px-6 py-3">
                Type de Cargaison
              </th>
              <th scope="col" class="px-6 py-3">
                Statut
              </th>
              <th scope="col" class="px-6 py-3">
                Frais
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody id="produitsTableBody">
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              </th>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
                <i class="fa-solid fa-trash" style="color: #c70d00;"></i>
              </td>
            </tr>


          </tbody>
        </table>
      </div>

    </div>

    <div class="  page_archive hide">
      <div class="" style="background-color: white;padding: 10px;margin-bottom: 3%;font-size: 2vw;width: fit-content;border-radius: 5px;">
        Archives
      </div>




      <div class="relative overflow-scroll tab-arch">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 bg-blue-50 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
       
              </th>
              <th scope="col" class="px-6 py-3">
                Id
              </th>
              <th scope="col" class="px-6 py-3">
                Nom
              </th>
              <th scope="col" class="px-6 py-3">
                Description
              </th>
              <th scope="col" class="px-6 py-3">
                Poids
              </th>
             
              <th scope="col" class="px-6 py-3">
                Statut
              </th>
              <th scope="col" class="px-6 py-3">
                Frais
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody id="archivesTableBody">
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              </th>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              </td>
              <td class="px-6 py-4">
              <i class="fa-solid fa-trash-can-arrow-up" style="color: #63E6BE;"></i>              
            </td>
            </tr>


          </tbody>
        </table>
      </div>

    </div>

  </div>




  </div>
  </div>

  <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
  </div>

</section>
</main>

<!-- Modal ajouter des cargaisons -->
<div class="fill hide" id="modal-background">
  <div id="modal-add" class="modal-content">
    <div class="close" id="close-modal">
      <i class="fa-solid fa-xmark"></i>
    </div>
    <form id="cargaison-form">
      <h2 class="text-2xl font-bold mb-4">Ajouter une Cargaison</h2>
      <div class="mb-4">
        <label for="type-cargaison" class="block text-sm font-medium text-gray-700">Type de Cargaison</label>
        <input type="text" id="type-cargaison" name="type-cargaison" readonly class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Méthode de Remplissage</label>
        <div class="mt-1">
          <select id="fill-method" name="fill-method" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            <option value="poids">Par Poids Maximum (kg)</option>
            <option value="volume">Par Volume Maximum (nombre de produits)</option>
          </select>
        </div>
      </div>
      <div class="mb-4" id="max-value-container">
        <label for="max-value" class="block text-sm font-medium text-gray-700" id="max-value-label">Valeur Maximale</label>
        <input type="number" id="max-value" name="max-value" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="departure-date" class="block text-sm font-medium text-gray-700">Date de Départ</label>
        <input type="date" id="departure-date" name="departure-date" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="arrival-date" class="block text-sm font-medium text-gray-700">Date d'Arrivée (estimée)</label>
        <input type="date" id="arrival-date" name="arrival-date" readonly class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label for="map" class="block text-sm font-medium text-gray-700">Sélectionnez les Points de Départ et d'Arrivée sur la Carte</label>
        <div id="map" class="w-full h-96"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="start-location" class="block text-gray-700">Ville de départ</label>
          <input type="text" id="start-location" name="date_depart" class="input input-bordered w-full mt-2" readonly>
        </div>
        <div>
          <label for="end-location" class="block text-gray-700">Ville d'arrivée</label>
          <input type="text" id="end-location" name="date_arrivee" class="input input-bordered w-full mt-2" readonly>
        </div>
        <div>
          <label for="distance" class="block text-gray-700">Distance (km)</label>
          <input type="text" id="distance" name="distance" class="input input-bordered w-full mt-2" readonly>
        </div>
      </div>
      <div class="flex justify-end">
        <button type="button" class="close-modal mr-2 px-4 py-2 bg-gray-300 rounded-md">Annuler</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Ajouter</button>
      </div>
    </form>
  </div>
</div>






<!-- Modal ajouter des produits -->
<div class="fill hide fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" id="add-product-modal">
  <div id="modal-add" class="modal-content bg-white p-8 rounded-lg shadow-lg relative">
    <div class="close absolute top-4 right-4 cursor-pointer close-modal" id="close-modal">
      <i class="fa-solid fa-xmark text-xl"></i>
    </div>
    <h2 class="text-2xl font-bold mb-4">Ajouter un produit</h2>
    <form id="product-form flex">

      <div>
        <label for="product-name" class="block text-sm font-medium text-gray-700">Nom du produit:</label>
        <input type="text" id="product-name" name="product-name" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="product-description" class="block text-sm font-medium text-gray-700 mt-4">Description:</label>
        <textarea id="product-description" name="product-description" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>

        <label for="product-weight" class="block text-sm font-medium text-gray-700 mt-4">Poids (kg):</label>
        <input type="number" id="product-weight" name="product-weight" min="0" step="0.01" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="product-destination" class="block text-sm font-medium text-gray-700 mt-4">Destination:</label>
        <input type="text" id="product-destination" name="product-destination" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="product-type" class="block text-sm font-medium text-gray-700 mt-4">Type de produit:</label>
        <select id="product-type" name="product-type" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="Alimentaire">Alimentaire</option>
          <option value="Chimique">Chimique</option>
          <option value="Fragile">Fragile</option>
          <option value="Incassable">Incassable</option>
        </select>

        <label for="client-name" class="block text-sm font-medium text-gray-700 mt-4">Nom du client:</label>
        <input type="text" id="client-name" name="client-name" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="client-lastname" class="block text-sm font-medium text-gray-700 mt-4">Prénom du client:</label>
        <input type="text" id="client-lastname" name="client-lastname" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="client-address" class="block text-sm font-medium text-gray-700 mt-4">Adresse du client:</label>
        <input type="text" id="client-address" name="client-address" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="client-phone" class="block text-sm font-medium text-gray-700 mt-4">Numéro de téléphone du client:</label>
        <input type="tel" id="client-phone" name="client-phone" pattern="[0-9]{10}" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="client-email" class="block text-sm font-medium text-gray-700 mt-4">Email du client:</label>
        <input type="email" id="client-email" name="client-email" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

      </div>
      <div>

        <label for="recipient-name" class="block text-sm font-medium text-gray-700 mt-4">Nom du destinataire:</label>
        <input type="text" id="recipient-name" name="recipient-name" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="recipient-lastname" class="block text-sm font-medium text-gray-700 mt-4">Prénom du destinataire:</label>
        <input type="text" id="recipient-lastname" name="recipient-lastname" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="recipient-address" class="block text-sm font-medium text-gray-700 mt-4">Adresse du destinataire:</label>
        <input type="text" id="recipient-address" name="recipient-address" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="recipient-phone" class="block text-sm font-medium text-gray-700 mt-4">Numéro de télephone du destinataire:</label>
        <input type="text" id="recipient-phone" name="recipient-phone" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <label for="recipient-email" class="block text-sm font-medium text-gray-700 mt-4">email du destinataire:</label>
        <input type="text" id="recipient-email" name="recipient-email" class="mt-1 block w-96 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />

        <button type="submit" id="add-cargaison-btn" class="btn bg-blue-600 mt-4 text-white px-4 py-2 rounded-md">Ajouter</button>
      </div>
    </form>


  </div>
</div>


<!-- Modal pour les messages -->
<div class="fill hide fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" id="message-modal">
  <div id="modal-message" class="modal-content bg-white p-8 rounded-lg shadow-lg relative">
    <div class="close absolute top-4 right-4 cursor-pointer close-modal" id="close-message-modal">
      <i class="fa-solid fa-xmark text-xl"></i>
    </div>
    <p id="message-text" class="text-lg"></p>
  </div>
</div>


<!-- Modal pour modifier les dates -->
<div class="fill hide fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" id="date-modal">
  <div class="modal-content bg-white p-8 rounded-lg shadow-lg relative">
    <div class="close absolute top-4 right-4 cursor-pointer" id="close-date-modal">
      <i class="fa-solid fa-xmark text-xl"></i>
    </div>
    <h2 class="text-lg mb-4">Modifier les dates</h2>
    <label for="new-depart-date" class="block mb-2">Nouvelle date de départ :</label>
    <input type="date" id="new-depart-date" class="block w-full mb-4 p-2 border border-gray-300 rounded" />
    <label for="new-arrive-date" class="block mb-2">Nouvelle date d'arrivée :</label>
    <input type="date" id="new-arrive-date" class="block w-full mb-4 p-2 border border-gray-300 rounded" readonly />
    <button id="save-dates" class="bg-blue-500 text-white px-4 py-2 rounded">Enregistrer</button>
  </div>
</div>


<div class="fill hide fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" id="PageClient">
<div class="bg-gray-700 p-4 min-h-screen w-screen">
        <div aria-hidden="true" class="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-20">
            <div class="blur-[106px] h-56 bg-gradient-to-br  to-purple-400 from-blue-700"></div>
            <div class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400  to-indigo-600"></div>
        </div>
        <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
            <div class="md:w-2/3 lg:w-1/2 mt-12 text-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-secondary">
                    <path fill-rule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clip-rule="evenodd"></path>
                </svg>
                <h2 class="my-8 text-2xl font-bold text-white md:text-4xl">GP DU MONDE</h2>
                <p class="text-gray-300">Votre Service de Gestion de colis.</p>
            </div>
            <div class="mt-16 grid divide-x divide-y  divide-gray-700 overflow-hidden  rounded-3xl border text-gray-600 border-gray-700 sm:grid-cols-2 lg:grid-cols-4  lg:divide-y-0 xl:grid-cols-4">
                <div class="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl  hover:shadow-gray-600/10">
                    <div class="relative space-y-8 py-12 p-8">
                        <img src="https://www.svgrepo.com/show/164986/logo.svg" loading="lazy" width="200" height="200" class="w-12 h-12 rounded-full" style="color:transparent">
                        <div class="space-y-2">
                            <h5 class="text-xl font-semibold text-white transition group-hover:text-secondary">Xyz.com</h5>
                            <p class="text-gray-300">Platform to convert Domains into Content websites.</p>
                        </div>
                    </div>
                </div>
                <div class="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                    <div class="relative space-y-8 py-12 p-8">
                        <img src="https://www.svgrepo.com/show/120853/logo.svg" loading="lazy" width="200" height="200" class="w-12 h-12 rounded-full" style="color:transparent">
                        <div class="space-y-2">
                            <h5 class="text-xl font-semibold text-white transition group-hover:text-secondary">ABC.com</h5>
                            <p class="text-gray-300">Platform to create dynamic widgets for websites.</p>
                        </div>
                    </div>
                </div>
                <div class="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                    <div class="relative space-y-8 py-12 p-8">
                        <img src="https://www.svgrepo.com/show/120852/logo.svg" loading="lazy" width="200" height="200" class="w-12 h-12 rounded-full" style="color:transparent">
                        <div class="space-y-2">
                            <h5 class="text-xl font-semibold text-white transition group-hover:text-secondary">ASD.com</h5>
                            <p class="text-gray-300">API SaaS Platform that provides API Suit to help you ship fast.</p>
                        </div>
                    </div>
                </div>
                <div class="group relative bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                    <div class="relative space-y-8 py-12 p-8">
                        <img src="https://www.svgrepo.com/show/120850/logo.svg" loading="lazy" width="200" height="200" class="w-12 h-12 rounded-full" style="color:transparent">
                        <div class="space-y-2">
                            <h5 class="text-xl font-semibold text-white transition group-hover:text-secondary">TMK.co</h5>
                            <p class="text-gray-300">Chrome Extension that lets you add ChatGPT on any website</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="searchZone">
       
        <div class="tittle">
            Rechercher Votre Colis
        </div>
        <form class="max-w-md w-full relative" id="searchProductForm">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Entrer le code de votre colis" />
                <button type="submit" id="searchProductButton" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>
   <!-- Zone de produit -->
<div class="zoneProduit hide">
  <div class="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg relative">
    <div class="relative">
    <div class="close absolute top-4 left-4 w-8 cursor-pointer" id="close-product-modal">
      <i class="fa-solid fa-xmark text-xl"></i>
    </div>
      <img class="w-full" src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product Image">
      <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium" id="product-status">Statut du colis</div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-medium mb-2" id="product-name">Nom du Produit</h3>
      <p class="text-gray-600 text-sm mb-4" id="product-description">Description du produit</p>
      <div class="flex items-center justify-between">
        <span class="font-bold text-lg" id="product-price">Prix du produit</span>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" id="product-arrival">Arrive dans X jours</button>
      </div>
    </div>
  </div>
</div>
    </div>
</div>
</body>