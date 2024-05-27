<section class="content flex flex-1 p-4">
        <div class="left-content grid grid-rows-2 bg-f6f7fb m-15 p-20 rounded-15">
          <div class="activities mb-8">
            <h1 class="text-2xl font-bold mb-4">Ajouter une cargaison</h1>
            <div class="activity-container grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="image-container img-one relative cursor-pointer" data-type="Aerienne">
                <img
                  src="https://cdn.futura-sciences.com/sources/images/elysian.jpg"
                  alt="Aerienne"
                  class="w-full h-full object-cover rounded-lg"
                />
                <div class="overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <h3 class="text-white text-lg font-bold">Aerienne</h3>
                </div>
              </div>

              <div class="image-container img-two relative cursor-pointer" data-type="Terrestre">
                <img
                  src="https://afrimag.net/wp-content/uploads/2020/03/Transport-routier-3-scaled.jpg"
                  alt="Terrestre"
                  class="w-full h-full object-cover rounded-lg"
                />
                <div class="overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <h3 class="text-white text-lg font-bold">Terrestre</h3>
                </div>
              </div>

              <div class="image-container img-three relative cursor-pointer" data-type="Maritime">
                <img
                  src="https://www.easyhaul.com/blog/wp-content/uploads/2022/12/Main-image-maritime-ports.png"
                  alt="Maritime"
                  class="w-full h-full object-cover rounded-lg"
                />
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
            <h1 class="text-2xl font-bold mb-4">Cargaisons Terminées</h1>
            <div class="card-container space-y-4">
              <!-- Les cargaisons terminées s'ajoute ici -->
              <div class="card bg-white p-4 rounded-lg shadow-md">
                <div class="card-user-info mb-4">
                  <h2 class="text-lg font-bold">Nom de la cargaison</h2>
                </div>
                <img
                  class="card-img w-full h-40 object-cover mb-4 rounded-lg"
                  src="https://www.easyhaul.com/blog/wp-content/uploads/2022/12/Main-image-maritime-ports.png"
                  alt="Cargaison envoyée"
                />
                <p class="text-gray-600">Cargaison envoyée</p>
              </div>
              <div class="card bg-white p-4 rounded-lg shadow-md">
                <div class="card-user-info mb-4">
                  <h2 class="text-lg font-bold">Nom de la cargaison</h2>
                </div>
                <img
                  class="card-img w-full h-40 object-cover mb-4 rounded-lg"
                  src="https://afrimag.net/wp-content/uploads/2020/03/Transport-routier-3-scaled.jpg"
                  alt="Cargaison envoyée"
                />
                <p class="text-gray-600">Cargaison envoyée</p>
              </div>
            </div>
          </div>
        </div>


<!-- Contenue page cargaisons -->
<div class="containArg">
<div class="max-w-2xl mx-auto hide page_cargaisons">
  <!-- Champ de recherche -->
  <input
    type="text"
    id="searchInput"
    class="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
    placeholder="Rechercher une cargaison..."
  />

  <!-- Tableau des cargaisons -->
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
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
        
        <!-- Ajoutez d'autres en-têtes de colonne au besoin -->
      </tr>
    </thead>
    <tbody id="cargaisonTableBody" class="bg-white divide-y divide-gray-200">
      <!-- Les lignes des cargaisons seront ajoutées ici dynamiquement -->
    </tbody>
  </table>
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
        <input
          type="text"
          id="type-cargaison"
          name="type-cargaison"
          readonly
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
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
        <input
          type="number"
          id="max-value"
          name="max-value"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        /> 
      </div>
      <div class="mb-4">
        <label for="departure-date" class="block text-sm font-medium text-gray-700">Date de Départ</label>
        <input
          type="date"
          id="departure-date"
          name="departure-date"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="arrival-date" class="block text-sm font-medium text-gray-700">Date d'Arrivée (estimée)</label>
        <input
          type="date"
          id="arrival-date"
          name="arrival-date"
          readonly
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
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
        <form id="product-form">
          <label for="product-name" class="block text-sm font-medium text-gray-700">Nom du produit:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

          <label for="product-description" class="block text-sm font-medium text-gray-700 mt-4">Description:</label>
          <textarea
            id="product-description"
            name="product-description"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
          <br />

          <label for="product-weight" class="block text-sm font-medium text-gray-700 mt-4">Poids (kg):</label>
          <input
            type="number"
            id="product-weight"
            name="product-weight"
            min="0"
            step="0.01"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

          <label for="product-type" class="block text-sm font-medium text-gray-700 mt-4">Type de produit:</label>
          <select
            id="product-type"
            name="product-type"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="Alimentaire">Alimentaire</option>
            <option value="Chimique">Chimique</option>
            <option value="Fragile">Fragile</option>
            <option value="Incassable">Incassable</option>
            <option value="Materiel">Materiel</option>
          </select>

          <button type="submit" class="btn bg-blue-600 mt-4 text-white px-4 py-2 rounded-md">Ajouter</button>
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


<!-- Contenue page cargaisons -->
<!-- This is an example component -->
<div class="max-w-2xl mx-auto hide">

	<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
		<div class="p-4">
			<label for="table-search" class="sr-only">Search</label>
			<div class="relative mt-1">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"></path>
					</svg>
				</div>
				<input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
        </div>
			</div>
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="p-4">
							<div class="flex items-center">
								<input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
								<label for="checkbox-all-search" class="sr-only">checkbox</label>
							</div>
						</th>
						<th scope="col" class="px-6 py-3">
							Product name
						</th>
						<th scope="col" class="px-6 py-3">
							Color
						</th>
						<th scope="col" class="px-6 py-3">
							Category
						</th>
						<th scope="col" class="px-6 py-3">
							Price
						</th>
						<th scope="col" class="px-6 py-3">
							<span class="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td class="w-4 p-4">
							<div class="flex items-center">
								<input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
								<label for="checkbox-table-search-1" class="sr-only">checkbox</label>
							</div>
						</td>
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
							Apple MacBook Pro 17"
						</th>
						<td class="px-6 py-4">
							Sliver
						</td>
						<td class="px-6 py-4">
							Laptop
						</td>
						<td class="px-6 py-4">
							$2999
						</td>
						<td class="px-6 py-4 text-right">
							<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
						</td>
					</tr>
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td class="w-4 p-4">
							<div class="flex items-center">
								<input id="checkbox-table-search-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
								<label for="checkbox-table-search-2" class="sr-only">checkbox</label>
							</div>
						</td>
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
							Microsoft Surface Pro
						</th>
						<td class="px-6 py-4">
							White
						</td>
						<td class="px-6 py-4">
							Laptop PC
						</td>
						<td class="px-6 py-4">
							$1999
						</td>
						<td class="px-6 py-4 text-right">
							<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
						</td>
					</tr>
					<tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td class="w-4 p-4">
							<div class="flex items-center">
								<input id="checkbox-table-search-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
								<label for="checkbox-table-search-3" class="sr-only">checkbox</label>
							</div>
						</td>
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
							Magic Mouse 2
						</th>
						<td class="px-6 py-4">
							Black
						</td>
						<td class="px-6 py-4">
							Accessories
						</td>
						<td class="px-6 py-4">
							$99
						</td>
						<td class="px-6 py-4 text-right">
							<a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
	</div>

  </body>