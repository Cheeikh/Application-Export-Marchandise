// Import des classes
import {
  Aerienne,
  Maritime,
  Routiere,
  Alimentaire,
  Chimique,
  Fragile,
  Incassable,
} from "./classes";

let map: L.Map;

// Navigation bar functionality
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const leftContent = document.querySelector(".left-content");
  const rightContent = document.querySelector(".right-content");
  const page_cargaisons = document.querySelector(".page_cargaisons");

  navItems.forEach((navItem) => {
    navItem.addEventListener("click", (event: Event) => {
      event.preventDefault();
      const target = (
        navItem.querySelector("a") as HTMLAnchorElement
      ).getAttribute("data-target");

      navItems.forEach((item) => {
        item.classList.remove("active");
      });
      navItem.classList.add("active");

      // Gérer l'affichage de la section gauche
      if (target === "acceuil") {
        leftContent?.classList.remove("hide");
        rightContent?.classList.remove("hide");
        page_cargaisons?.classList.add("hide");
      } else {
        leftContent?.classList.add("hide");
        rightContent?.classList.add("hide");
        page_cargaisons?.classList.remove("hide");
      }
    });
  });
});

/* ------------------------------------------------------------------------------------------------------------------------------------------- */

// Variables globales
let cargaisons: (Aerienne | Maritime | Routiere)[] = [];
let cargaisonCounter = 0; // Pour générer des IDs uniques

// Initialisation de la carte Leaflet
document.addEventListener("DOMContentLoaded", () => {
  const modalBackground = document.getElementById("modal-background");
  const closeModalButton = document.getElementById("close-modal");
  const addProductModal = document.getElementById("add-product-modal");
  const imageContainers =
    document.querySelectorAll<HTMLDivElement>(".image-container");
  const typeCargaisonInput = document.getElementById(
    "type-cargaison"
  ) as HTMLInputElement;
  const waitingCargaisonsContainer = document.querySelector(
    ".weekly-schedule .calendar"
  );
  const mapElement = document.getElementById("map"); // Assurez-vous que 'map' est l'ID de votre élément de carte dans votre HTML

  imageContainers.forEach((container) => {
    container.addEventListener("click", () => {
      const cargaisonType = container.dataset.type;
      typeCargaisonInput.value = cargaisonType ?? "";
      modalBackground?.classList.remove("hide");
      console.log(cargaisonType);
    });
  });

  closeModalButton?.addEventListener("click", () => {
    modalBackground?.classList.add("hide");
    addProductModal?.classList.add("hide");
    resetMap();
  });

  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      modalBackground?.classList.add("hide");
      addProductModal?.classList.add("hide");
      resetMap();
    });
  });

  // Ajouter un écouteur d'événements pour le changement de la date de départ
  const departureDateInput = document.getElementById(
    "departure-date"
  ) as HTMLInputElement;
  departureDateInput.addEventListener("change", () => {
    const type = (document.getElementById("type-cargaison") as HTMLInputElement)
      .value;
    const distance = parseFloat(
      (document.getElementById("distance") as HTMLInputElement).value
    );
    const departureDateString = (
      document.getElementById("departure-date") as HTMLInputElement
    ).value;
    const departureDate = new Date(departureDateString);
    if (isNaN(departureDate.getTime())) {
      showMessageModal("Veuillez entrer une date de départ valide.", false);
      return;
    }
    const arrivalDateInput = document.getElementById(
      "arrival-date"
    ) as HTMLInputElement;
    const arrivalDate = calculateArrivalDate(type, distance, departureDate);
    arrivalDateInput.value = arrivalDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
  });

  const cargaisonForm = document.getElementById(
    "cargaison-form"
  ) as HTMLFormElement;
  
  cargaisonForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const typeCargaisonInput = document.getElementById(
      "type-cargaison"
    ) as HTMLInputElement;
    const type = typeCargaisonInput.value;
    const maxValue = parseFloat(
      (document.getElementById("max-value") as HTMLInputElement).value
    );
    const departureDateString = (
      document.getElementById("departure-date") as HTMLInputElement
    ).value;
    const startLocation = (
      document.getElementById("start-location") as HTMLInputElement
    ).value;
    const endLocation = (
      document.getElementById("end-location") as HTMLInputElement
    ).value;
    const distance = parseFloat(
      (document.getElementById("distance") as HTMLInputElement).value
    );
    let poidsMax = 0;
    let volumeMax = 0;
    const fillMethodSelect = document.getElementById(
      "fill-method"
    ) as HTMLSelectElement;
    const departureDate = new Date(departureDateString);
    if (isNaN(departureDate.getTime())) {
      showMessageModal("Veuillez entrer une date de départ valide.", false);
      return;
    }
    
    // Fonction pour mettre à jour les valeurs de poidsMax et volumeMax
    const updateMaxValues = () => {
      const selectedFillMethod = fillMethodSelect.value;
      if (selectedFillMethod === "poids") {
        poidsMax = maxValue;
        volumeMax = 1000000;
      } else if (selectedFillMethod === "volume") {
        volumeMax = maxValue;
        poidsMax = 1000000;
      }
    };
  
    // Appel initial pour mettre à jour les valeurs
    updateMaxValues();
  
    // Ajouter un écouteur d'événements pour détecter les changements dans la méthode de remplissage
    fillMethodSelect.addEventListener("change", updateMaxValues);
  
    const arrivalDate = calculateArrivalDate(type, distance, departureDate);
  
    let cargaison;
    switch (type) {
      case "Aerienne":
        cargaison = new Aerienne(
          `cargaison-${cargaisonCounter}`,
          poidsMax,
          volumeMax,
          departureDate,
          arrivalDate,
          startLocation,
          endLocation,
          distance
        );
        break;
      case "Routiere":
        cargaison = new Routiere(
          `cargaison-${cargaisonCounter}`,
          poidsMax,
          volumeMax,
          departureDate,
          arrivalDate,
          startLocation,
          endLocation,
          distance
        );
        break;
      case "Maritime":
        cargaison = new Maritime(
          `cargaison-${cargaisonCounter}`,
          poidsMax,
          volumeMax,
          departureDate,
          arrivalDate,
          startLocation,
          endLocation,
          distance
        );
        break;
      default:
        showMessageModal("Type de cargaison non reconnu.", false);
        return;
    }
  
    if (cargaison) {
      cargaisonCounter++;
      cargaisons.push(cargaison);
      const cargaisonData = {
        typeCargaison: type,
        id: cargaison.id,
        poidsMax: poidsMax,
        volumeMax: volumeMax,
        dateDepart: departureDate.toISOString(),
        dateArrivee: arrivalDate.toISOString(),
        startLocation: startLocation,
        endLocation: endLocation,
        distance: distance,
        // Autres données de la cargaison selon vos besoins
      };
      addNewCargaisonToServer(cargaisonData);
      addCargaisonToDOM(cargaison);
      modalBackground?.classList.add("hide");
      cargaisonForm.reset();
      updateCargaisonsDisplay();
      resetMap(); // Réinitialiser la carte
    }
  });
  

  function calculateArrivalDate(
    type: string,
    distance: number,
    departureDate: Date
  ): Date {
    const averageSpeeds: {
      [key: string]: number;
    } = {
      Aerienne: 800,
      Routiere: 80,
      Maritime: 30,
    };

    const averageSpeed = averageSpeeds[type];

    if (!averageSpeed) {
      throw new Error("Type de cargaison non pris en charge.");
    }

    const travelTimeInDays = distance / averageSpeed;
    const roundedTravelTime = Math.ceil(travelTimeInDays);

    const arrivalDate = new Date(departureDate);
    arrivalDate.setDate(arrivalDate.getDate() + roundedTravelTime);

    return arrivalDate;
  }
});

// Fonction pour ajouter une cargaison au DOM
function addCargaisonToDOM(cargaison: Aerienne | Maritime | Routiere) {
  const dayAndActivity = document.createElement("div");
  dayAndActivity.classList.add("day-and-activity");
  dayAndActivity.style.background = getRandomGradient();

  const day = document.createElement("div");
  day.classList.add("day");
  const currentDate = new Date();
  day.innerHTML = `<h1>${currentDate.getDate()}</h1><p>${currentDate.toLocaleDateString(
    "fr-FR",
    {
      weekday: "short",
    }
  )}</p>`;

  const activity = document.createElement("div");
  activity.classList.add("activity");
  activity.dataset.cargaisonId = `${cargaison.id}`;
  activity.innerHTML = `
  <h2>${cargaison.constructor.name}</h2>
  <p><strong>Poids actuel:</strong> ${cargaison.poids} kg</p>
  <p><strong>Date de départ:</strong> ${cargaison.dateDepart.toLocaleDateString()}</p>
  <p><strong>Date d'arrivée:</strong> ${cargaison.dateArrivee.toLocaleDateString()}</p>
  <p><strong>Nombre de produits:</strong> ${cargaison.produits.length}</p>
`;
  const addButton = document.createElement("button");
  addButton.classList.add("btn");
  addButton.innerText = "Ajouter un produit";
  addButton.addEventListener("click", () => {
    displayProductModal(cargaison);
  });

  const sendButton = document.createElement("button");
  sendButton.classList.add("btn");
  sendButton.innerText = "Envoyer";
  // Add event listener for sending the cargaison (to be implemented)

  dayAndActivity.appendChild(day);
  dayAndActivity.appendChild(activity);
  dayAndActivity.appendChild(addButton);
  dayAndActivity.appendChild(sendButton);

  const waitingCargaisonsContainer = document.querySelector(
    ".weekly-schedule .calendar"
  );
  waitingCargaisonsContainer?.appendChild(dayAndActivity);
}

// Fonction pour afficher le modal d'ajout de produit
function displayProductModal(cargaison: Aerienne | Maritime | Routiere) {
  const productNameInput = document.getElementById("product-name") as HTMLInputElement;
  const productDescriptionInput = document.getElementById("product-description") as HTMLInputElement;
  const productWeightInput = document.getElementById("product-weight") as HTMLInputElement;
  const productTypeInput = document.getElementById("product-type") as HTMLSelectElement;
  const productDestinationInput = document.getElementById("product-destination") as HTMLInputElement;
  const modalBackground = document.getElementById("modal-background");
  const addProductModal = document.getElementById("add-product-modal");

  addProductModal?.classList.remove("hide");

  const productForm = document.getElementById("productForm") as HTMLFormElement;

  productForm.onsubmit = (event: Event) => {
      event.preventDefault();

      const id = `produit-${cargaison.produits.length + 1}`;
      const name = productNameInput.value.trim();
      const description = productDescriptionInput.value.trim();
      const weight = parseFloat(productWeightInput.value);
      const type = productTypeInput.value;
      const destination = productDestinationInput.value;

      let product: Alimentaire | Chimique | Fragile | Incassable | undefined;

      switch (type) {
          case "Alimentaire":
              product = new Alimentaire(id, name, description, weight, destination);
              break;
          case "Chimique":
              const toxicite = parseFloat((document.getElementById("product-toxicite") as HTMLInputElement).value);
              const frais = parseFloat((document.getElementById("product-frais") as HTMLInputElement).value);
              product = new Chimique(id, name, description, weight, destination, toxicite, frais);
              break;
          case "Fragile":
              product = new Fragile(id, name, description, weight, destination);
              break;
          case "Incassable":
              product = new Incassable(id, name, description, weight, destination);
              break;
          default:
              showMessageModal("Type de produit non reconnu.", false);
              return;
      }

      if (!Number.isNaN(weight)) {
          if (cargaison.peutAjouterProduit(product)) {
              if (cargaison.addProduit(product)) {
                  updateCargaisonInfo(cargaison);
                  
                  if (cargaison.getVolumeRestant() <= 0) {
                      showMessageModal("Cargaison pleine. Impossible d'ajouter plus de produit.", false);
                  } else if (cargaison.poids + weight > cargaison.getPoidsMax()) {
                      showMessageModal("Poids du produit trop important. Impossible d'ajouter le produit.", false);
                  } else {
                      showMessageModal("Produit ajouté à la cargaison.", true);
                  }
                  
                  console.log("Produit ajouté à la cargaison:", product);
              } else {
                  showMessageModal("Le produit n'a pas pu être ajouté à la cargaison.", false);
              }
          } else {
              showMessageModal("Le produit n'est pas destiné à être ajouté à cette cargaison.", false);
          }
      } else {
          showMessageModal("Poids du produit invalide.", false);
      }

      productForm.reset();
      addProductModal?.classList.add("hide");
  };
}


// Mise à jour des informations de la cargaison dans le DOM
function updateCargaisonInfo(cargaison: Aerienne | Maritime | Routiere) {
  const activity = document.querySelector<HTMLDivElement>(
    `.activity[data-cargaison-id="${cargaison.id}"]`
  );

  if (activity) {
    activity.innerHTML = `
      <h2>${cargaison.constructor.name} - 
        <span>Poids actuel: ${cargaison.poids} kg - </span>
        <span>Date de départ: ${cargaison.dateDepart.toLocaleDateString()} - </span>
        <span>Date d'arrivée: ${cargaison.dateArrivee.toLocaleDateString()}</span>
      </h2>`;
  } else {
    console.error("La cargaison n'est pas définie.");
  }
}

// Mise à jour de l'affichage des cargaisons
function updateCargaisonsDisplay() {
  const waitingCargaisonsContainer = document.querySelector(
    ".weekly-schedule .calendar"
  );
  while (waitingCargaisonsContainer?.firstChild) {
    waitingCargaisonsContainer.removeChild(
      waitingCargaisonsContainer.firstChild
    );
  }

  cargaisons.forEach((cargaison) => {
    addCargaisonToDOM(cargaison);
  });
}

// Générer un gradient aléatoire
function getRandomGradient(): string {
  const r = Math.floor(Math.random() * (255 - 150) + 150);
  const g = Math.floor(Math.random() * (255 - 150) + 150);
  const b = Math.floor(Math.random() * (255 - 150) + 150);

  const r2 = Math.floor(Math.random() * (255 - 150) + 150);
  const g2 = Math.floor(Math.random() * (255 - 150) + 150);
  const b2 = Math.floor(Math.random() * (255 - 150) + 150);

  return `linear-gradient(45deg, rgb(${r},${g},${b}), rgb(${r2},${g2},${b2}))`;
}

// Fonction pour afficher le modal de message
function showMessageModal(message: string, isSuccess = true) {
  const messageModal = document.getElementById("message-modal");
  const messageText = document.getElementById("message-text");
  const modalMessage = document.getElementById("modal-message");

  if (messageText && modalMessage) {
    messageText.textContent = message;

    if (isSuccess) {
      modalMessage.classList.add("success");
      modalMessage.classList.remove("error");
    } else {
      modalMessage.classList.add("error");
      modalMessage.classList.remove("success");
    }

    messageModal?.classList.remove("hide");
    setTimeout(() => {
      messageModal?.classList.add("hide");
    }, 3000);
  }
}

// Fermer le modal de message lorsque l'icône de fermeture est cliquée
document.getElementById("close-message-modal")
  ?.addEventListener("click", () => {
    const messageModal = document.getElementById("message-modal");
    messageModal?.classList.add("hide");
  });

let startMarker: L.Marker | undefined;
let endMarker: L.Marker | undefined;
let startPoint: L.LatLng | null = null;
let endPoint: L.LatLng | null = null;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map
  map = L.map("map").setView([0, 0], 2);

  // Use a lighter tile layer to improve loading speed
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Event listener to handle map click
  map.on("click", function (e: L.LeafletMouseEvent) {
    if (!startPoint) {
      startPoint = e.latlng;
      startMarker = L.marker(startPoint, { draggable: true }).addTo(map);
      reverseGeocode(startPoint, "start-location");

      startMarker.on("dragend", function () {
        startPoint = startMarker!.getLatLng();
        reverseGeocode(startPoint, "start-location");
        if (endPoint) calculateDistance();
      });

      startMarker.on("click", () => {
        map.removeLayer(startMarker!);
        startPoint = null;
        (document.getElementById("start-location") as HTMLInputElement).value =
          "";
        (document.getElementById("distance") as HTMLInputElement).value = "";
      });
    } else if (!endPoint) {
      endPoint = e.latlng;
      endMarker = L.marker(endPoint, { draggable: true }).addTo(map);
      reverseGeocode(endPoint, "end-location");
      calculateDistance();

      endMarker.on("dragend", function () {
        endPoint = endMarker!.getLatLng();
        reverseGeocode(endPoint, "end-location");
        calculateDistance();
      });

      endMarker.on("click", () => {
        map.removeLayer(endMarker!);
        endPoint = null;
        (document.getElementById("end-location") as HTMLInputElement).value =
          "";
        (document.getElementById("distance") as HTMLInputElement).value = "";
      });
    }
  });

  function reverseGeocode(latlng: L.LatLng, elementId: string) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.address) {
          (document.getElementById(elementId) as HTMLInputElement).value =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.country ||
            "";
        } else {
          (document.getElementById(elementId) as HTMLInputElement).value = "";
          console.error("Address not found for the provided coordinates.");
        }
      })
      .catch((error) => {
        console.error("Error fetching address data:", error);
        (document.getElementById(elementId) as HTMLInputElement).value = "";
      });
  }

  function calculateDistance() {
    if (startPoint && endPoint) {
      const distance = map.distance(startPoint, endPoint) / 1000; // Convert to km
      (document.getElementById("distance") as HTMLInputElement).value =
        distance.toFixed(2);
    }
  }

  
});
function resetMap() {
  if (startMarker) map.removeLayer(startMarker);
  if (endMarker) map.removeLayer(endMarker);
  startPoint = null;
  endPoint = null;
  (document.getElementById("start-location") as HTMLInputElement).value = "";
  (document.getElementById("end-location") as HTMLInputElement).value = "";
  (document.getElementById("distance") as HTMLInputElement).value = "";
}

// Créer une instance de cargaison à partir des données récupérées du serveur


// Récupérer les cargaisons existantes depuis le serveur
function fetchExistingCargaisons() {
  fetch("http://localhost/projetCargaison/dist/dataHandler.php")
    .then((response) => response.json())
    .then((data) => {
      // Traiter les données récupérées et les afficher dans l'interface utilisateur
      data.forEach((cargaisonData) => {
        const cargaison = createCargaisonFromData(cargaisonData);
        cargaisons.push(cargaison);
        addCargaisonToDOM(cargaison);
      });
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des cargaisons existantes:", error)
    );
}


function createCargaisonFromData(cargaisonData: any): Aerienne | Maritime | Routiere {
  const {
    typeCargaison,
    id,
    poidsMax,
    volumeMax,
    dateDepart,
    dateArrivee,
    startLocation,
    endLocation,
    distance,
    produits,
  } = cargaisonData;

  switch (typeCargaison) {
    case "Aerienne":
      return new Aerienne(
        id,
        poidsMax,
        volumeMax,
        new Date(dateDepart),
        new Date(dateArrivee),
        startLocation,
        endLocation,
        distance,
        produits.map((product: any) => createProductFromData(product))
      );
    case "Maritime":
      return new Maritime(
        id,
        poidsMax,
        volumeMax,
        new Date(dateDepart),
        new Date(dateArrivee),
        startLocation,
        endLocation,
        distance,
        produits.map((product: any) => createProductFromData(product))
      );
    case "Routiere":
      return new Routiere(
        id,
        poidsMax,
        volumeMax,
        new Date(dateDepart),
        new Date(dateArrivee),
        startLocation,
        endLocation,
        distance,
        produits.map((product: any) => createProductFromData(product))
      );
    default:
      throw new Error("Type de cargaison non pris en charge.");
  }
}
function addNewCargaisonToServer(cargaisonData: any) {
  fetch("http://localhost/projetCargaison/dist/dataHandler.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cargaisonData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Traiter la réponse du serveur après l'ajout de la cargaison
      // Mettre à jour l'interface utilisateur si nécessaire
      const cargaison = createCargaisonFromData(data);
      cargaisons.push(cargaison);
      addCargaisonToDOM(cargaison);
      showMessageModal("Nouvelle cargaison ajoutée avec succès.", true);
    })
    .catch((error) =>
      console.error("Erreur lors de l'ajout de la nouvelle cargaison:", error)
    );
}
document.addEventListener("DOMContentLoaded", fetchExistingCargaisons);
