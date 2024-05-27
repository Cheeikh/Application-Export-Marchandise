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
  });

  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      modalBackground?.classList.add("hide");
      addProductModal?.classList.add("hide");
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
    let statut = "En attente";
    let etat = "ouverte";
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
          distance,
          statut,
          etat
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
          distance,
          statut,
          etat
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
          distance,
          statut,
          etat
        );
        break;
      default:
        showMessageModal("Type de cargaison non reconnu.", false);
        return;
    }
  
    if (cargaison) {
      cargaisonCounter++;
/*       cargaisons.push(cargaison);
 */      const cargaisonData = {
        typeCargaison: type,
        id: cargaison.id,
        poidsMax: poidsMax,
        volumeMax: volumeMax,
        dateDepart: departureDate.toISOString(),
        dateArrivee: arrivalDate.toISOString(),
        startLocation: startLocation,
        endLocation: endLocation,
        distance: distance,
        statut: statut,
        etat: etat
        // Autres données de la cargaison selon vos besoins
      };
      addNewCargaisonToServer(cargaisonData);
      addCargaisonToDOM(cargaison);
      modalBackground?.classList.add("hide");
      cargaisonForm.reset();
      updateCargaisonsDisplay();
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
  // Vérifiez si le statut est différent de "En attente"
  if (cargaison.statut !== "En attente") {
    return; // Ne pas ajouter cette cargaison au DOM
  }

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
  <p><strong>Statut:</strong> ${cargaison.statut}</p>
  <p><strong>Etat:</strong> ${cargaison.etat}</p>
`;








  const sendButton = document.createElement("button");
  sendButton.classList.add("btn");
  sendButton.innerText = "Envoyer";
  // Add event listener for sending the cargaison (to be implemented)

  dayAndActivity.appendChild(day);
  dayAndActivity.appendChild(activity);
  // Créez le bouton "Ajouter un produit" seulement si l'état est "ouverte"
if (cargaison.etat === 'ouverte') {
  const addButton = document.createElement("button");
  addButton.classList.add("btn");
  addButton.innerText = "Ajouter un produit";
  addButton.addEventListener("click", () => {
    displayProductModal(cargaison);
  });
  dayAndActivity.appendChild(addButton);
}
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
let routeLine: L.Polyline | undefined;

document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map
  const map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
        if (endPoint) {
          calculateDistance();
          getRouteWithLandCheck(startPoint, endPoint);
        }
      });

      startMarker.on("click", () => {
        map.removeLayer(startMarker!);
        startPoint = null;
        resetRoute();
        (document.getElementById("start-location") as HTMLInputElement).value = "";
        (document.getElementById("distance") as HTMLInputElement).value = "";
      });
    } else if (!endPoint) {
      endPoint = e.latlng;
      endMarker = L.marker(endPoint, { draggable: true }).addTo(map);
      reverseGeocode(endPoint, "end-location");
      calculateDistance();
      getRouteWithLandCheck(startPoint, endPoint);

      endMarker.on("dragend", function () {
        endPoint = endMarker!.getLatLng();
        reverseGeocode(endPoint, "end-location");
        calculateDistance();
        getRouteWithLandCheck(startPoint, endPoint);
      });

      endMarker.on("click", () => {
        map.removeLayer(endMarker!);
        endPoint = null;
        resetRoute();
        (document.getElementById("end-location") as HTMLInputElement).value = "";
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
      (document.getElementById("distance") as HTMLInputElement).value = distance.toFixed(2);
    }
  }

  function getRouteWithLandCheck(start: L.LatLng, end: L.LatLng) {
    checkIfOnLand(start, isStartOnLand => {
      if (isStartOnLand) {
        checkIfOnLand(end, isEndOnLand => {
          if (isEndOnLand) {
            // Both points are on land, draw route directly
            getRoute([start, end]);
          } else {
            // End point is not on land, find nearest land point and then draw route
            findNearestLandPoint(end, nearestLandPoint => {
              getRoute([start, nearestLandPoint, end]);
            });
          }
        });
      } else {
        // Start point is not on land, find nearest land point
        findNearestLandPoint(start, nearestLandPoint => {
          checkIfOnLand(end, isEndOnLand => {
            if (isEndOnLand) {
              getRoute([nearestLandPoint, end]);
            } else {
              findNearestLandPoint(end, nearestLandPoint2 => {
                getRoute([nearestLandPoint, nearestLandPoint2, end]);
              });
            }
          });
        });
      }
    });
  }

  function getRoute(points: L.LatLng[]) {
    const coordinates = points.map(p => `${p.lng},${p.lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const route = data.routes[0].geometry;
        if (routeLine) {
          map.removeLayer(routeLine);
        }
        routeLine = L.geoJSON(route, { style: { color: 'blue' } }).addTo(map);
      })
      .catch(error => {
        console.error("Error fetching routing data:", error);
      });
  }

  function checkIfOnLand(latlng: L.LatLng, callback: (isOnLand: boolean) => void) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`
    )
      .then(response => response.json())
      .then(data => {
        const isOnLand = data.address && (data.address.city || data.address.town || data.address.village || data.address.country);
        callback(isOnLand);
      })
      .catch(error => {
        console.error("Error checking land status:", error);
        callback(false);
      });
  }

  function findNearestLandPoint(latlng: L.LatLng, callback: (nearestLandPoint: L.LatLng) => void) {
    // This is a simple heuristic; in a real application, you might want to use a more sophisticated approach.
    let searchRadius = 0.1; // initial search radius in degrees
    const searchStep = 0.1; // step to increase search radius

    const searchLand = () => {
      const points = [
        L.latLng(latlng.lat + searchRadius, latlng.lng),
        L.latLng(latlng.lat - searchRadius, latlng.lng),
        L.latLng(latlng.lat, latlng.lng + searchRadius),
        L.latLng(latlng.lat, latlng.lng - searchRadius),
      ];

      let foundLand = false;
      points.forEach(point => {
        checkIfOnLand(point, isOnLand => {
          if (isOnLand && !foundLand) {
            foundLand = true;
            callback(point);
          }
        });
      });

      if (!foundLand) {
        searchRadius += searchStep;
        setTimeout(searchLand, 500); // retry after a delay
      }
    };

    searchLand();
  }

  function resetRoute() {
    if (routeLine) {
      map.removeLayer(routeLine);
    }
  }

  (document.getElementById('reset-button') as HTMLButtonElement).addEventListener('click', resetMap);

  function resetMap() {
    if (startMarker) map.removeLayer(startMarker);
    if (endMarker) map.removeLayer(endMarker);
    resetRoute();
    startPoint = null;
    endPoint = null;
    (document.getElementById("start-location") as HTMLInputElement).value = "";
    (document.getElementById("end-location") as HTMLInputElement).value = "";
    (document.getElementById("distance") as HTMLInputElement).value = "";
  }
});







function createCargaisonFromData(cargaisonData) {
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
    statut,
    etat
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
        statut,
        etat
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
        statut,
        etat
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
        statut,
        etat
      );
    default:
      throw new Error("Type de cargaison non pris en charge.");
  }
}

function addNewCargaisonToServer(cargaisonData) {
  fetch("http://localhost/projetCargaison/dist/dataHandler.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cargaisonData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur du réseau lors de l'ajout de la cargaison");
      }
      return response.json();
    })
    .then((data) => {
      const cargaison = createCargaisonFromData(data);
      cargaisons.push(cargaison);
      addCargaisonToDOM(cargaison);
      showMessageModal("Nouvelle cargaison ajoutée avec succès.", true);
    })
    .catch((error) =>
      console.error("Erreur lors de l'ajout de la nouvelle cargaison:", error)
    );
}
function updateCargaisonOnServer(cargaisonId, updatedCargaisonData) {
  fetch(`http://localhost/projetCargaison/dist/dataHandler.php?id=${cargaisonId}`, {
    method: "PUT", // Utilisez "PATCH" si vous ne souhaitez mettre à jour que certaines propriétés
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCargaisonData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur du réseau lors de la mise à jour de la cargaison");
      }
      return response.json();
    })
    .then((data) => {
      const updatedCargaison = createCargaisonFromData(data);
      // Mettez à jour la cargaison dans le tableau local
      const index = cargaisons.findIndex(c => c.id === cargaisonId);
      if (index !== -1) {
        cargaisons[index] = updatedCargaison;
        // Mettez à jour l'affichage de la cargaison dans le DOM
        updateCargaisonsDisplay();
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de la cargaison:", error);
    });
}



function filterCargaisons(searchTerm) {
  return cargaisons.filter((cargaison) => {
    return (
      cargaison.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cargaison.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cargaison.endLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cargaison.constructor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
}

function displayAllCargaisons() {
  const tableBody = document.getElementById("cargaisonTableBody");
  tableBody.innerHTML = "";

  cargaisons.forEach((cargaison) => {
    const row = document.createElement("tr");
    row.classList.add("bg-white");

    const isOuverte = cargaison.etat === 'ouverte';
    const buttonStyle = isOuverte
      ? 'background-color: red; border-radius: 10px; color: white;'
      : 'background-color: green; border-radius: 10px; color: white;';

    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.id}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.constructor.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.dateDepart.toLocaleDateString()}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.dateArrivee.toLocaleDateString()}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.startLocation}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.endLocation}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.distance}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.statut}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.etat}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button class="toggle-btn" data-id="${cargaison.id}" style="${buttonStyle}">${isOuverte ? 'Fermer' : 'Ouvrir'}</button></td>
    `;
    tableBody.appendChild(row);
  });

  const toggleButtons = document.querySelectorAll('.toggle-btn');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const cargaisonId = button.dataset.id;
      toggleCargaisonState(cargaisonId);
    });
  });
}

function displayFilteredCargaisons(filteredCargaisons) {
  const tableBody = document.getElementById("cargaisonTableBody");
  tableBody.innerHTML = "";

  filteredCargaisons.forEach((cargaison) => {
    const row = document.createElement("tr");
    row.classList.add("bg-white");

    const isOuverte = cargaison.etat === 'ouverte';
    const buttonStyle = isOuverte
      ? 'background-color: red; border-radius: 10px; color: white;height: 30px; width: 100px;'
      : 'background-color: green; border-radius: 10px; color: white;height: 30px; width: 100px;';

    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.id}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.constructor.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.dateDepart.toLocaleDateString()}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.dateArrivee.toLocaleDateString()}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.startLocation}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.endLocation}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.distance}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.statut}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.etat}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><button class="toggle-btn" data-id="${cargaison.id}" style="${buttonStyle}">${isOuverte ? 'Fermer' : 'Ouvrir'}</button></td>
    `;
    tableBody.appendChild(row);
  });

  const toggleButtons = document.querySelectorAll('.toggle-btn');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const cargaisonId = button.dataset.id;
      toggleCargaisonState(cargaisonId);
    });
  });
}

function toggleCargaisonState(cargaisonId: string) {
  const cargaison = getCargaisonById(cargaisonId);
  console.log(cargaison);
  if (cargaison) {
    // Changez l'état de la cargaison localement
    cargaison.etat = cargaison.etat === 'ouverte' ? 'fermée' : 'ouverte';
    updateCargaisonsDisplay();

    // Mettez à jour l'état de la cargaison sur le serveur
    updateCargaisonOnServer(cargaisonId, { etat: cargaison.etat });

    // Mettez à jour l'affichage des cargaisons
    displayAllCargaisons();
  }
}



function getCargaisonById(id: string): Aerienne | Maritime | Routiere | undefined {
  return cargaisons.find(cargaison => cargaison.id === id);
}



document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost/projetCargaison/dist/dataHandler.php")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((cargaisonData) => {
        const cargaison = createCargaisonFromData(cargaisonData);
        cargaisons.push(cargaison);
        addCargaisonToDOM(cargaison);
      });
      displayAllCargaisons();
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des cargaisons:", error)
    );

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim();
    const filteredCargaisons = filterCargaisons(searchTerm);
    displayFilteredCargaisons(filteredCargaisons);
  });
});
