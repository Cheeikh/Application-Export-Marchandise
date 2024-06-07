// Import des classes
import { Aerienne, Maritime, Routiere, Alimentaire, Chimique, Fragile, Incassable, Client, Destinataire, } from "./classes.js";
import { FormValidator } from "./FormValidator.js";
// Import du SDK EmailJS
let map;
// Navigation bar functionality
document.addEventListener("DOMContentLoaded", () => {
    const formValidator = new FormValidator();
    formValidator.init();
    const navItems = document.querySelectorAll(".nav-item");
    const leftContent = document.querySelector(".left-content");
    const rightContent = document.querySelector(".right-content");
    const page_cargaisons = document.querySelector(".page_cargaisons");
    const page_produits = document.querySelector(".page_produits");
    const page_archive = document.querySelector(".page_archive");
    navItems.forEach((navItem) => {
        navItem.addEventListener("click", (event) => {
            event.preventDefault();
            let target = navItem.querySelector("a").getAttribute("data-target");
            navItems.forEach((item) => {
                item.classList.remove("active");
            });
            navItem.classList.add("active");
            // Gérer l'affichage de la section gauche
            if (target === "acceuil") {
                leftContent.classList.remove("hide");
                rightContent.classList.remove("hide");
                page_produits.classList.add("hide");
                page_cargaisons.classList.add("hide");
                page_archive.classList.add("hide");
            }
            else if (target === "cargaisons") {
                leftContent.classList.add("hide");
                rightContent.classList.add("hide");
                page_produits.classList.add("hide");
                page_cargaisons.classList.remove("hide");
                page_archive.classList.add("hide");
            }
            else if (target === "produits") {
                leftContent.classList.add("hide");
                rightContent.classList.add("hide");
                page_cargaisons.classList.add("hide");
                page_produits.classList.remove("hide");
                page_archive.classList.add("hide");
            }
            else if (target === "archive") {
                leftContent.classList.add("hide");
                rightContent.classList.add("hide");
                page_cargaisons.classList.add("hide");
                page_produits.classList.add("hide");
                page_archive.classList.remove("hide");
            }
            else {
                leftContent.classList.add("hide");
                rightContent.classList.add("hide");
                page_cargaisons.classList.add("hide");
                page_produits.classList.add("hide");
            }
        });
    });
});
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
// Variables globales
let cargaisons = [];
let products = [];
let cargaisonCounter = 0; // Pour générer des IDs uniques
let productCounter = 0; // Pour générer des IDs uniques
// Initialisation de la carte Leaflet
document.addEventListener("DOMContentLoaded", () => {
    const modalBackground = document.getElementById("modal-background");
    const closeModalButton = document.getElementById("close-modal");
    const addProductModal = document.getElementById("add-product-modal");
    const imageContainers = document.querySelectorAll(".image-container");
    const typeCargaisonInput = document.getElementById("type-cargaison");
    const waitingCargaisonsContainer = document.querySelector(".weekly-schedule .calendar");
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
    const departureDateInput = document.getElementById("departure-date");
    departureDateInput.addEventListener("change", () => {
        const type = document.getElementById("type-cargaison")
            .value;
        const distance = parseFloat(document.getElementById("distance").value);
        const departureDateString = document.getElementById("departure-date").value;
        const departureDate = new Date(departureDateString);
        if (isNaN(departureDate.getTime())) {
            showMessageModal("Veuillez entrer une date de départ valide.", false);
            return;
        }
        const arrivalDateInput = document.getElementById("arrival-date");
        const arrivalDate = calculateArrivalDate(type, distance, departureDate);
        arrivalDateInput.value = arrivalDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
    });
    const cargaisonForm = document.getElementById("cargaison-form");
    cargaisonForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const typeCargaisonInput = document.getElementById("type-cargaison");
        const type = typeCargaisonInput.value;
        const maxValue = parseFloat(document.getElementById("max-value").value);
        const departureDateString = document.getElementById("departure-date").value;
        const startLocation = document.getElementById("start-location").value;
        const endLocation = document.getElementById("end-location").value;
        const distance = parseFloat(document.getElementById("distance").value);
        let poidsMax = 0;
        let volumeMax = 0;
        const fillMethodSelect = document.getElementById("fill-method");
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
            }
            else if (selectedFillMethod === "volume") {
                volumeMax = maxValue;
                poidsMax = 1000000;
            }
        };
        // Appel initial pour mettre à jour les valeurs
        updateMaxValues();
        // Ajouter un écouteur d'événements pour détecter les changements dans la méthode de remplissage
        fillMethodSelect.addEventListener("change", updateMaxValues);
        const arrivalDate = calculateArrivalDate(type, distance, departureDate);
        const CargaisonID = Math.floor(10000000 + Math.random() * 90000000).toString();
        let cargaison;
        let statut = "En attente";
        let etat = "ouverte";
        let produits = [];
        switch (type) {
            case "Aerienne":
                cargaison = new Aerienne(CargaisonID, poidsMax, volumeMax, departureDate, arrivalDate, startLocation, endLocation, distance, statut, etat, produits);
                break;
            case "Routiere":
                cargaison = new Routiere(CargaisonID, poidsMax, volumeMax, departureDate, arrivalDate, startLocation, endLocation, distance, statut, etat, produits);
                break;
            case "Maritime":
                cargaison = new Maritime(CargaisonID, poidsMax, volumeMax, departureDate, arrivalDate, startLocation, endLocation, distance, statut, etat, produits);
                break;
            default:
                showMessageModal("Type de cargaison non reconnu.", false);
                return;
        }
        if (cargaison) {
            cargaisonCounter++;
            /*   cargaisons.push(cargaison); */
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
                statut: statut,
                etat: etat,
                produits: produits,
            };
            addNewCargaisonToServer(cargaisonData);
            addCargaisonToDOM(cargaison);
            modalBackground?.classList.add("hide");
            cargaisonForm.reset();
            updateCargaisonsDisplay();
        }
    });
    function calculateArrivalDate(type, distance, departureDate) {
        const averageSpeeds = {
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
function addCargaisonToDOM(cargaison) {
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
    day.innerHTML = `<h1>${currentDate.getDate()}</h1><p>${currentDate.toLocaleDateString("fr-FR", {
        weekday: "short",
    })}</p>`;
    const nonArchivedProducts = cargaison.produits.filter(product => product.statut !== "Archivé");
    const activity = document.createElement("div");
    activity.classList.add("activity");
    activity.dataset.cargaisonId = `${cargaison.id}`;
    activity.innerHTML = `
  <h2>${cargaison.constructor.name}</h2>
  <p><strong>Poids actuel:</strong> ${cargaison.poids} kg</p>
  <p><strong>Date de départ:</strong> ${cargaison.dateDepart.toLocaleDateString()}</p>
  <p><strong>Date d'arrivée:</strong> ${cargaison.dateArrivee.toLocaleDateString()}</p>
  <p><strong>Nombre de produits:</strong> ${nonArchivedProducts.length}</p>
  <p><strong>Statut:</strong> ${cargaison.statut}</p>
  <p><strong>Etat:</strong> ${cargaison.etat}</p>
`;
    const sendButton = document.createElement("button");
    sendButton.classList.add("btn");
    sendButton.innerText = "Envoyer";
    sendButton.addEventListener("click", () => {
        if (cargaison.produits.length === 0) {
            showMessageModal("Erreur : La cargaison ne contient aucun produit.", false);
        }
        else if (cargaison.etat !== "fermée") {
            showMessageModal("Erreur : La cargaison n'est pas fermée.", true);
        }
        else {
            updateCargaisonStatus(cargaison.id, "En cours", "cargaison");
            showMessageModal("Cargaison envoyée.", true);
        }
    });
    dayAndActivity.appendChild(day);
    dayAndActivity.appendChild(activity);
    // Créez le bouton "Ajouter un produit" seulement si l'état est "ouverte"
    if (cargaison.etat === "ouverte") {
        const addButton = document.createElement("button");
        addButton.classList.add("btn");
        addButton.innerText = "Ajouter un produit";
        addButton.addEventListener("click", () => {
            displayProductModal(cargaison);
        });
        dayAndActivity.appendChild(addButton);
    }
    dayAndActivity.appendChild(sendButton);
    const waitingCargaisonsContainer = document.querySelector(".weekly-schedule .calendar");
    waitingCargaisonsContainer?.appendChild(dayAndActivity);
}
// Fonction pour afficher le modal d'ajout de produit
function displayProductModal(cargaison) {
    const productNameInput = document.getElementById("product-name");
    const productDescriptionInput = document.getElementById("product-description");
    const productWeightInput = document.getElementById("product-weight");
    const productTypeInput = document.getElementById("product-type");
    const productDestinationInput = document.getElementById("product-destination");
    const clientNameInput = document.getElementById("client-name");
    const clientFirstNameInput = document.getElementById("client-lastname");
    const clientAddressInput = document.getElementById("client-address");
    const clientPhoneInput = document.getElementById("client-phone");
    const clientEmailInput = document.getElementById("client-email");
    const recipientNameInput = document.getElementById("recipient-name");
    const recipientFirstNameInput = document.getElementById("recipient-lastname");
    const recipientAddressInput = document.getElementById("recipient-address");
    const recipientPhoneInput = document.getElementById("recipient-phone");
    const recipientEmailInput = document.getElementById("recipient-email");
    const modalBackground = document.getElementById("modal-background");
    const addProductModal = document.getElementById("add-product-modal");
    addProductModal?.classList.remove("hide");
    const submitButton = document.getElementById("add-cargaison-btn");
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        const name = productNameInput.value.trim();
        const description = productDescriptionInput.value.trim();
        const weight = parseFloat(productWeightInput.value);
        const type = productTypeInput.value;
        const destination = productDestinationInput.value;
        const productStatut = "En attente";
        const client = new Client(clientNameInput.value.trim(), clientFirstNameInput.value.trim(), clientAddressInput.value.trim(), clientPhoneInput.value.trim(), clientEmailInput.value.trim());
        const destinataire = new Destinataire(recipientNameInput.value.trim(), recipientFirstNameInput.value.trim(), recipientAddressInput.value.trim(), recipientPhoneInput.value.trim(), recipientEmailInput.value.trim());
        let product;
        const productID = Math.floor(10000000 + Math.random() * 90000000).toString();
        let fraisProduit = 0;
        switch (type) {
            case "Alimentaire":
                product = new Alimentaire(productID, name, description, weight, destination, client, destinataire, type, productStatut, fraisProduit);
                break;
            case "Chimique":
                const toxicite = parseFloat(document.getElementById("product-toxicite")
                    .value);
                const frais = parseFloat(document.getElementById("product-frais").value);
                product = new Chimique(productID, name, description, weight, destination, toxicite, fraisProduit, client, destinataire, type, productStatut);
                break;
            case "Fragile":
                product = new Fragile(productID, name, description, weight, destination, client, destinataire, type, productStatut, fraisProduit);
                break;
            case "Incassable":
                product = new Incassable(productID, name, description, weight, destination, client, destinataire, type, productStatut, fraisProduit);
                break;
            default:
                showMessageModal("Type de produit non reconnu.", false);
                return;
        }
        fraisProduit = product.calculerFrais(cargaison.distance, cargaison.constructor.name);
        if (fraisProduit < 10000) {
            fraisProduit = 10000;
        }
        product.frais = fraisProduit;
        function sendProductConfirmationEmail(clientEmail, destinataireEmail, productID, clientName, recipientName, destinationCity, departureDate, arrivalDate, frais) {
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            const formattedDepartureDate = new Date(departureDate).toLocaleDateString("fr-FR", options);
            const formattedArrivalDate = new Date(arrivalDate).toLocaleDateString("fr-FR", options);
            const clientMessage = `Bonjour ${clientName},
    Nous vous informons que votre colis avec le code ${productID} a été envoyé à ${recipientName} à ${destinationCity} le ${formattedDepartureDate} et devrait arriver le ${formattedArrivalDate}.
    Le frais du colis est de ${frais} Franc CFA.
    Cordialement,
    GP du Monde`;
            const recipientMessage = `Bonjour ${recipientName},
    Nous vous informons que vous avez reçu un colis avec le code ${productID} de la part de ${clientName}. 
    Il sera livré à ${destinationCity} vers ${formattedDepartureDate} et devrait arriver ${formattedArrivalDate}.
    Le frais du colis est de ${frais} Franc CFA.
    Cordialement,
    GP du Monde`;
            fetch("http://localhost/projetCargaison/dist/sendEmail.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clientEmail,
                    destinataireEmail,
                    clientMessage,
                    recipientMessage,
                }),
            })
                .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur du réseau lors de l'envoi des e-mails");
                }
                return response.json();
            })
                .then((data) => {
                console.log("E-mails envoyés avec succès:", data);
            })
                .catch((error) => {
                console.error("Erreur lors de l'envoi des e-mails:", error);
            });
        }
        if (!Number.isNaN(weight)) {
            if (cargaison.peutAjouterProduit(product)) {
                if (cargaison.addProduit(product)) {
                    const produitData = {
                        id: product.id,
                        nom: name,
                        description: description,
                        poids: weight,
                        destination: destination,
                        client: client,
                        destinataire: destinataire,
                        type: type,
                        statut: productStatut,
                        frais: fraisProduit,
                    };
                    addProduitToCargaisonOnServer(cargaison.id, produitData);
                    // Appel de la fonction pour envoyer un e-mail de confirmation
                    sendProductConfirmationEmail(client.email, destinataire.email, product.id, client.prenom, destinataire.prenom, cargaison.endLocation, cargaison.dateDepart, cargaison.dateArrivee, product.frais);
                    if (cargaison.getVolumeRestant() <= 0) {
                        showMessageModal("Cargaison pleine. Impossible d'ajouter plus de produit.", false);
                    }
                    else if (cargaison.poids + weight > cargaison.getPoidsMax()) {
                        showMessageModal("Poids du produit trop important. Impossible d'ajouter le produit.", false);
                    }
                    else {
                        showMessageModal(`Produit ajouté à la cargaison. Frais : ${fraisProduit} Franc CFA`, true);
                        location.reload();
                    }
                    console.log("Produit ajouté à la cargaison:", product);
                }
                else {
                    showMessageModal("Le produit n'a pas pu être ajouté à la cargaison.", false);
                }
            }
            else {
                showMessageModal("Le produit n'est pas destiné à être ajouté à cette cargaison.", false);
            }
        }
        else {
            showMessageModal("Données de produit invalide.", false);
        }
        addProductModal?.classList.add("hide");
    });
}
// Mise à jour de l'affichage des cargaisons
function updateCargaisonsDisplay() {
    const waitingCargaisonsContainer = document.querySelector(".weekly-schedule .calendar");
    while (waitingCargaisonsContainer?.firstChild) {
        waitingCargaisonsContainer.removeChild(waitingCargaisonsContainer.firstChild);
    }
    cargaisons.forEach((cargaison) => {
        addCargaisonToDOM(cargaison);
    });
}
// Générer un gradient aléatoire
function getRandomGradient() {
    const r = Math.floor(Math.random() * (255 - 150) + 150);
    const g = Math.floor(Math.random() * (255 - 150) + 150);
    const b = Math.floor(Math.random() * (255 - 150) + 150);
    const r2 = Math.floor(Math.random() * (255 - 150) + 150);
    const g2 = Math.floor(Math.random() * (255 - 150) + 150);
    const b2 = Math.floor(Math.random() * (255 - 150) + 150);
    return `linear-gradient(45deg, rgb(${r},${g},${b}), rgb(${r2},${g2},${b2}))`;
}
// Fonction pour afficher le modal de message
function showMessageModal(message, isSuccess = true) {
    const messageModal = document.getElementById("message-modal");
    const messageText = document.getElementById("message-text");
    const modalMessage = document.getElementById("modal-message");
    if (messageText && modalMessage) {
        messageText.textContent = message;
        if (isSuccess) {
            modalMessage.classList.add("success");
            modalMessage.classList.remove("error");
        }
        else {
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
let startMarker;
let endMarker;
let startPoint = null;
let endPoint = null;
let routeLine;
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map
    const map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // Event listener to handle map click
    map.on("click", function (e) {
        if (!startPoint) {
            startPoint = e.latlng;
            startMarker = L.marker(startPoint, { draggable: true }).addTo(map);
            reverseGeocode(startPoint, "start-location");
            startMarker.on("dragend", function () {
                startPoint = startMarker.getLatLng();
                reverseGeocode(startPoint, "start-location");
                if (endPoint) {
                    calculateDistance();
                    getRouteWithLandCheck(startPoint, endPoint);
                }
            });
            startMarker.on("click", () => {
                map.removeLayer(startMarker);
                startPoint = null;
                resetRoute();
                document.getElementById("start-location").value =
                    "";
                document.getElementById("distance").value = "";
            });
        }
        else if (!endPoint) {
            endPoint = e.latlng;
            endMarker = L.marker(endPoint, { draggable: true }).addTo(map);
            reverseGeocode(endPoint, "end-location");
            calculateDistance();
            getRouteWithLandCheck(startPoint, endPoint);
            endMarker.on("dragend", function () {
                endPoint = endMarker.getLatLng();
                reverseGeocode(endPoint, "end-location");
                calculateDistance();
                getRouteWithLandCheck(startPoint, endPoint);
            });
            endMarker.on("click", () => {
                map.removeLayer(endMarker);
                endPoint = null;
                resetRoute();
                document.getElementById("end-location").value =
                    "";
                document.getElementById("distance").value = "";
            });
        }
    });
    function reverseGeocode(latlng, elementId) {
        const url = ` https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`;
        fetch(url)
            .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            return response.json();
        })
            .then((data) => {
            const element = document.getElementById(elementId);
            if (data.address) {
                element.value =
                    data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.country ||
                        "";
            }
            else {
                element.value = "";
                console.error("Address not found for the provided coordinates.");
            }
        })
            .catch((error) => {
            console.error("Error fetching address data:", error);
            const element = document.getElementById(elementId);
            element.value = "";
        });
    }
    function calculateDistance() {
        if (startPoint && endPoint) {
            const distance = map.distance(startPoint, endPoint) / 1000; // Convert to km
            document.getElementById("distance").value =
                distance.toFixed(2);
        }
    }
    function getRouteWithLandCheck(start, end) {
        checkIfOnLand(start, (isStartOnLand) => {
            if (isStartOnLand) {
                checkIfOnLand(end, (isEndOnLand) => {
                    if (isEndOnLand) {
                        // Both points are on land, draw route directly
                        getRoute([start, end]);
                    }
                    else {
                        // End point is not on land, find nearest land point and then draw route
                        findNearestLandPoint(end, (nearestLandPoint) => {
                            getRoute([start, nearestLandPoint, end]);
                        });
                    }
                });
            }
            else {
                // Start point is not on land, find nearest land point
                findNearestLandPoint(start, (nearestLandPoint) => {
                    checkIfOnLand(end, (isEndOnLand) => {
                        if (isEndOnLand) {
                            getRoute([nearestLandPoint, end]);
                        }
                        else {
                            findNearestLandPoint(end, (nearestLandPoint2) => {
                                getRoute([nearestLandPoint, nearestLandPoint2, end]);
                            });
                        }
                    });
                });
            }
        });
    }
    function getRoute(points) {
        const coordinates = points.map((p) => `${p.lng},${p.lat}`).join(";");
        const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
            const route = data.routes[0].geometry;
            if (routeLine) {
                map.removeLayer(routeLine);
            }
            routeLine = L.geoJSON(route, { style: { color: "blue" } }).addTo(map);
        })
            .catch((error) => {
            console.error("Error fetching routing data:", error);
        });
    }
    function checkIfOnLand(latlng, callback) {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`)
            .then((response) => response.json())
            .then((data) => {
            const isOnLand = data.address &&
                (data.address.city ||
                    data.address.town ||
                    data.address.village ||
                    data.address.country);
            callback(isOnLand);
        })
            .catch((error) => {
            console.error("Error checking land status:", error);
            callback(false);
        });
    }
    function findNearestLandPoint(latlng, callback) {
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
            points.forEach((point) => {
                checkIfOnLand(point, (isOnLand) => {
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
    document.getElementById("reset-button").addEventListener("click", resetMap);
    function resetMap() {
        if (startMarker)
            map.removeLayer(startMarker);
        if (endMarker)
            map.removeLayer(endMarker);
        resetRoute();
        startPoint = null;
        endPoint = null;
        document.getElementById("start-location").value = "";
        document.getElementById("end-location").value = "";
        document.getElementById("distance").value = "";
    }
});
function createCargaisonFromData(cargaisonData) {
    const typeCargaison = cargaisonData.typeCargaison;
    const id = cargaisonData.id;
    const poidsMax = cargaisonData.poidsMax;
    const volumeMax = cargaisonData.volumeMax;
    const dateDepart = cargaisonData.dateDepart;
    const dateArrivee = cargaisonData.dateArrivee;
    const startLocation = cargaisonData.startLocation;
    const endLocation = cargaisonData.endLocation;
    const distance = cargaisonData.distance;
    const statut = cargaisonData.statut;
    const etat = cargaisonData.etat;
    const produits = cargaisonData.produits;
    switch (typeCargaison) {
        case "Aerienne":
            return new Aerienne(id, poidsMax, volumeMax, new Date(dateDepart), new Date(dateArrivee), startLocation, endLocation, distance, statut, etat, produits // Ajout des produits
            );
        case "Maritime":
            return new Maritime(id, poidsMax, volumeMax, new Date(dateDepart), new Date(dateArrivee), startLocation, endLocation, distance, statut, etat, produits // Ajout des produits
            );
        case "Routiere":
            return new Routiere(id, poidsMax, volumeMax, new Date(dateDepart), new Date(dateArrivee), startLocation, endLocation, distance, statut, etat, produits // Ajout des produits
            );
    }
}
function addNewCargaisonToServer(cargaisonData) {
    fetch("http://localhost/projetCargaison/dist/dataHandler.php?operationType=addCargaison", {
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
        .catch((error) => console.error("Erreur lors de l'ajout de la nouvelle cargaison:", error));
}
function addProduitToCargaisonOnServer(cargaisonId, produitData) {
    fetch(`http://localhost/projetCargaison/dist/dataHandler.php?operationType=addProduitToCargaison&addProduitToCargaison=${cargaisonId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(produitData),
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur du réseau lors de l'ajout du produit");
        }
        return response.json();
    })
        .then((data) => {
        const cargaison = cargaisons.find((carg) => carg.id === cargaisonId);
        if (cargaison) {
            cargaison.produits.push(data); // Ajouter le nouveau produit à la cargaison
            updateCargaisonsDisplay();
        }
        showMessageModal("Produit ajouté avec succès à la cargaison.", true);
    })
        .catch((error) => {
        console.error("Erreur lors de l'ajout du produit à la cargaison:", error);
        showMessageModal("Erreur lors de l'ajout du produit à la cargaison.", false);
    });
}
function deleteProduitFromCargaisonOnServer(cargaisonId, produitId) {
    fetch(`http://localhost/projetCargaison/dist/dataHandler.php?deleteProduitFromCargaison=${cargaisonId}&produitId=${produitId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur du réseau lors de la suppression du produit");
        }
        return response.json();
    })
        .then((data) => {
        const cargaisonIndex = cargaisons.findIndex((carg) => carg.id === cargaisonId);
        if (cargaisonIndex !== -1) {
            const cargaison = cargaisons[cargaisonIndex];
            const produitIndex = cargaison.produits.findIndex((produit) => produit.id === produitId);
            if (produitIndex !== -1) {
                console.log("En train de supprimer le produit", cargaison.produits);
                cargaison.produits.splice(produitIndex, 1);
                console.log(cargaison.produits);
                // Mettre à jour le tableau cargaisons avec la cargaison modifiée
                cargaisons[cargaisonIndex] = cargaison;
                displayProductsInTable(cargaisons);
                // Mettre à jour l'affichage
                updateCargaisonsDisplay();
                showMessageModal("Produit supprimé avec succès de la cargaison.", true);
            }
        }
    })
        .catch((error) => console.error("Erreur lors de la suppression du produit de la cargaison:", error));
}
function updateCargaisonOnServer(cargaisonId, updatedCargaisonData) {
    fetch(`http://localhost/projetCargaison/dist/dataHandler.php?id=${cargaisonId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCargaisonData),
    })
        .then((response) => {
        console.log("Réponse du serveur :", response); // Ajout du log pour afficher la réponse du serveur
        if (!response.ok) {
            throw new Error("Erreur du réseau lors de la mise à jour de la cargaison");
        }
        return response.json();
    })
        .then((data) => {
        console.log("Données du serveur :", data);
        const updatedCargaison = createCargaisonFromData(data);
        const index = cargaisons.findIndex((c) => c.id === cargaisonId);
        if (index !== -1) {
            cargaisons[index] = updatedCargaison;
            updateCargaisonsDisplay();
        }
    })
        .catch((error) => {
        console.error("Erreur lors de la mise à jour de la cargaison :", error);
    });
}
const searchInput = document.getElementById("searchInput");
const searchId = document.getElementById("searchId");
const searchType = document.getElementById("searchType");
const searchStartLocation = document.getElementById("searchStartLocation");
const searchEndLocation = document.getElementById("searchEndLocation");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const currentPageSpan = document.getElementById("currentPage");
const itemsPerPageSelect = document.getElementById("itemsPerPage");
let itemsPerPage = parseInt(itemsPerPageSelect.value);
// Écouteur d'événement pour le changement du nombre d'éléments par page
itemsPerPageSelect.addEventListener("change", function () {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1; // Réinitialiser à la première page lorsque le nombre d'éléments par page change
    displayFilteredCargaisons();
});
// Initialiser la pagination
let currentPage = 1;
let filteredCargaisons = cargaisons;
function paginate(array, page, itemsPerPage) {
    return array.slice((page - 1) * itemsPerPage, page * itemsPerPage);
}
searchInput.addEventListener("input", applyFilters);
searchId.addEventListener("input", applyFilters);
searchType.addEventListener("input", applyFilters);
searchStartLocation.addEventListener("input", applyFilters);
searchEndLocation.addEventListener("input", applyFilters);
function applyFilters() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const idTerm = searchId.value.trim().toLowerCase();
    const typeTerm = searchType.value.trim().toLowerCase();
    const startLocationTerm = searchStartLocation.value.trim().toLowerCase();
    const endLocationTerm = searchEndLocation.value.trim().toLowerCase();
    if (searchTerm === "" &&
        idTerm === "" &&
        typeTerm === "" &&
        startLocationTerm === "" &&
        endLocationTerm === "") {
        // Aucun filtre appliqué, afficher toutes les cargaisons
        filteredCargaisons = cargaisons;
    }
    else {
        filteredCargaisons = cargaisons.filter((cargaison) => {
            const matchesSearchTerm = searchTerm === "" ||
                cargaison.id.toLowerCase().includes(searchTerm) ||
                cargaison.startLocation.toLowerCase().includes(searchTerm) ||
                cargaison.endLocation.toLowerCase().includes(searchTerm) ||
                cargaison.constructor.name.toLowerCase().includes(searchTerm);
            const matchesIdTerm = idTerm === "" || cargaison.id.toLowerCase().includes(idTerm);
            const matchesTypeTerm = typeTerm === "" ||
                cargaison.constructor.name.toLowerCase().includes(typeTerm);
            const matchesStartLocationTerm = startLocationTerm === "" ||
                cargaison.startLocation.toLowerCase().includes(startLocationTerm);
            const matchesEndLocationTerm = endLocationTerm === "" ||
                cargaison.endLocation.toLowerCase().includes(endLocationTerm);
            return (matchesSearchTerm &&
                matchesIdTerm &&
                matchesTypeTerm &&
                matchesStartLocationTerm &&
                matchesEndLocationTerm);
        });
    }
    currentPage = 1; // Reset to the first page after filtering
    displayFilteredCargaisons();
}
function displayFilteredCargaisons() {
    const paginatedCargaisons = paginate(filteredCargaisons, currentPage, itemsPerPage);
    const tableBody = document.getElementById("cargaisonTableBody");
    tableBody.innerHTML = "";
    paginatedCargaisons.forEach((cargaison) => {
        if (cargaison.statut !== "Archivé") {
            const row = document.createElement("tr");
            row.classList.add("bg-white");
            // Vérifier si la cargaison est en attente
            const isEnAttente = cargaison.statut === "En attente";
            // Vérifier si la cargaison est ouverte
            const isOuverte = cargaison.etat === "ouverte";
            // Style du bouton en fonction de l'état de la cargaison
            const buttonStyle = isOuverte
                ? "background-color: red; border-radius: 10px; color: white; height: 30px; width: 100px;"
                : "background-color: green; border-radius: 10px; color: white; height: 30px; width: 100px;";
            // Si la cargaison est en attente, afficher le bouton toggle-btn, sinon le cacher
            const toggleBtnHtml = isEnAttente
                ? `<button class="toggle-btn" data-id="${cargaison.id}" style="${buttonStyle}">${isOuverte ? "Fermer" : "Ouvrir"}</button>`
                : "";
            row.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.id}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.constructor.name}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(cargaison.dateDepart).toLocaleDateString()}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(cargaison.dateArrivee).toLocaleDateString()}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.startLocation}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.endLocation}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.distance}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.statut}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${cargaison.etat}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${toggleBtnHtml}</td>
        `;
            row.addEventListener("click", (event) => {
                // Vérifier si le clic est double
                if (event.detail === 2) {
                    showDateModal(cargaison);
                }
                else {
                    showCargaisonDetails(cargaison);
                }
            });
            tableBody.appendChild(row);
        }
    });
    updatePaginationButtons();
    attachToggleEventListeners();
}
function showDateModal(cargaison) {
    const dateModal = document.getElementById("date-modal");
    const newDepartDateInput = document.getElementById("new-depart-date");
    const newArriveDateInput = document.getElementById("new-arrive-date");
    const saveDatesButton = document.getElementById("save-dates");
    dateModal.classList.remove("hide");
    newDepartDateInput.value = new Date(cargaison.dateDepart).toISOString().split('T')[0];
    newArriveDateInput.value = new Date(cargaison.dateArrivee).toISOString().split('T')[0];
    newDepartDateInput.addEventListener("input", () => {
        const newDepartDate = new Date(newDepartDateInput.value);
        const newArriveDate = calculateArrivalDate(cargaison.constructor.name, cargaison.distance, newDepartDate);
        newArriveDateInput.value = newArriveDate.toISOString().split('T')[0];
    });
    saveDatesButton.onclick = () => {
        const newDepartDate = newDepartDateInput.value;
        const newArriveDate = newArriveDateInput.value;
        // Update cargaison dates in the local array
        cargaison.dateDepart = new Date(newDepartDate).toISOString();
        cargaison.dateArrivee = new Date(newArriveDate).toISOString();
        // Save updated cargaison to server
        updateCargaisonOnServer(cargaison.id, {
            dateDepart: cargaison.dateDepart,
            dateArrivee: cargaison.dateArrivee
        });
        // Calculate days of delay
        const oldDepartDate = new Date(cargaison.dateDepart);
        const newDepartDateObj = new Date(newDepartDate);
        const daysOfDelay = Math.ceil((newDepartDateObj - oldDepartDate) / (1000 * 60 * 60 * 24));
        // Send email notification
        sendEmailNotification(cargaison.produits, daysOfDelay);
        // Refresh the table
        displayFilteredCargaisons();
        // Close the modal
        dateModal.classList.add("hide");
    };
}
function calculateArrivalDate(type, distance, departureDate) {
    const averageSpeeds = {
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
async function sendEmailNotification(cargaison, daysOfDelay) {
    const url = 'http://localhost/projetCargaison/sendEmail.php'; // L'URL de votre script PHP
    for (const product of cargaison) {
        const clientEmail = product.clientEmail;
        const destinataireEmail = product.destinataireEmail;
        const clientMessage = `Bonjour,
        Votre colis (ID: ${product.id}) a été livré avec un retard de ${daysOfDelay} jours.
        Cordialement,
        Votre Service de Livraison.`;
        const recipientMessage = `Bonjour,
        Vous avez reçu un colis (ID: ${product.id}) avec un retard de ${daysOfDelay} jours.
        Cordialement,
        Votre Service de Livraison.`;
        const payload = {
            clientEmail,
            destinataireEmail,
            clientMessage,
            recipientMessage,
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientEmail,
                    destinataireEmail,
                    clientMessage,
                    recipientMessage,
                }),
            });
            if (!response.ok) {
                throw new Error('Erreur du réseau lors de l\'envoi des e-mails');
            }
            const data = await response.json();
            console.log('E-mails envoyés avec succès:', data);
        }
        catch (error) {
            console.error('Erreur lors de l\'envoi des e-mails:', error);
        }
    }
}
document.getElementById("close-date-modal").onclick = () => {
    document.getElementById("date-modal").classList.add("hide");
};
function showCargaisonDetails(cargaison) {
    const modal = document.getElementById("message-modal");
    const messageText = document.getElementById("message-text");
    // Crée le HTML pour la liste des produits
    const produitsHTML = cargaison.produits.map(produit => `
      <li class="flex justify-between border-b border-gray-200 py-2">
        <span class="font-semibold">${produit.nom}</span>
        <span class="text-gray-500">${produit.poids} KG</span>
      </li>
    `).join("");
    messageText.innerHTML = `
      <div class="bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4 text-center">Détails de la Cargaison</h2>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-gray-700"><span class="font-semibold">ID:</span> ${cargaison.id}</p>
            <p class="text-gray-700"><span class="font-semibold">Type:</span> ${cargaison.constructor.name}</p>
            <p class="text-gray-700"><span class="font-semibold">Date de départ:</span> ${new Date(cargaison.dateDepart).toLocaleDateString()}</p>
            <p class="text-gray-700"><span class="font-semibold">Date d'arrivée:</span> ${new Date(cargaison.dateArrivee).toLocaleDateString()}</p>
          </div>
          <div>
            <p class="text-gray-700"><span class="font-semibold">Lieu de départ:</span> ${cargaison.startLocation}</p>
            <p class="text-gray-700"><span class="font-semibold">Lieu d'arrivée:</span> ${cargaison.endLocation}</p>
            <p class="text-gray-700"><span class="font-semibold">Distance:</span> ${cargaison.distance} km</p>
            <p class="text-gray-700"><span class="font-semibold">Statut:</span> ${cargaison.statut}</p>
            <p class="text-gray-700"><span class="font-semibold">État:</span> ${cargaison.etat}</p>
          </div>
        </div>
        <h3 class="text-xl font-bold mb-2">Produits dans la cargaison</h3>
        <ul class="divide-y divide-gray-200">
          ${produitsHTML}
        </ul>
        <div class="mt-4 flex flex-col space-y-2">
          <button id="mark-carg-lost" class="bg-red-500 text-white px-4 py-2 rounded">Marquer comme Perdue</button>
          <button id="mark-carg-found" class="bg-yellow-500 text-white px-4 py-2 rounded">Marquer comme Trouvée</button>
          <button id="mark-carg-arrived" class="bg-blue-500 text-white px-4 py-2 rounded">Marquer comme Arrivée</button>
          <button id="mark-carg-archived" class="bg-red-500 text-white px-4 py-2 rounded">Marquer comme Archiver</button>
        </div>
      </div>
    `;
    // Définir une fonction pour attacher les gestionnaires d'événements aux boutons
    function attachCargaisonEventListeners(cargaison) {
        const statusButtons = {
            "mark-carg-lost": "Perdue",
            "mark-carg-found": "Trouvé",
            "mark-carg-arrived": "Arrivé",
            "mark-carg-archived": "Archivé"
        };
        Object.entries(statusButtons).forEach(([buttonId, status]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener("click", () => updateCargaisonStatus(cargaison.id, status, "cargaison"));
            }
        });
    }
    // Définir une fonction pour masquer les boutons en fonction du statut de la cargaison
    function hideCargaisonButtonsBasedOnStatus(cargaison) {
        const statusButtons = {
            "mark-carg-lost": ["Perdue", "Récupéré", "Archivé", "En attente"],
            "mark-carg-found": ["Trouvé", "Archivé", "En cours", "En attente", "Récupéré"],
            "mark-carg-recovered": ["Récupéré", "Perdue", "En cours", "En attente"],
            "mark-carg-archived": ["Archivé", "Trouvé", "En cours", "En attente"],
            "mark-carg-arrived": ["Arrivé", "Perdue", "Archivé", "En attente"]
        };
        Object.entries(statusButtons).forEach(([buttonId, statuses]) => {
            const button = document.getElementById(buttonId);
            if (button && statuses.includes(cargaison.statut)) {
                button.style.display = "none";
            }
        });
    }
    // Attacher les gestionnaires d'événements
    attachCargaisonEventListeners(cargaison);
    // Masquer les boutons en fonction du statut
    hideCargaisonButtonsBasedOnStatus(cargaison);
    modal.classList.remove("hide");
}
function updateCargaisonStatus(cargaisonId, newStatus, operationType) {
    fetch(`http://localhost/projetCargaison/dist/dataHandler.php?operationType=${operationType}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: cargaisonId,
            status: newStatus,
        }),
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du statut de la cargaison");
        }
        return response.json();
    })
        .then((data) => {
        let updatedCargaison;
        // Mettre à jour le tableau local cargaisons
        cargaisons.forEach((cargaison) => {
            if (cargaison.id === cargaisonId) {
                cargaison.statut = newStatus;
                updatedCargaison = cargaison;
            }
        });
        if (updatedCargaison) {
            // Envoyer les e-mails pour chaque produit de la cargaison
            updatedCargaison.produits.forEach((produit) => {
                sendStatusUpdateEmail(updatedCargaison, produit, newStatus);
            });
        }
        // Mettre à jour l'affichage du tableau
        displayFilteredCargaisons();
        updateCargaisonsDisplay();
        // Afficher le message de succès
        showMessageModal(`Statut de la cargaison mis à jour en ${newStatus}.`, true);
        /*     location.reload(
              setTimeout(() => {
                
              }, timeout);
            ); */
    })
        .catch((error) => {
        console.error("Erreur lors de la mise à jour du statut de la cargaison:", error);
        showMessageModal("Erreur lors de la mise à jour du statut de la cargaison.", false);
    });
}
document.getElementById("close-message-modal").addEventListener("click", () => {
    const modal = document.getElementById("message-modal");
    modal.classList.add("hide");
});
// Ajoutez le code pour fermer le modal lorsque l'utilisateur clique en dehors de celui-ci
window.addEventListener("click", (event) => {
    const modal = document.getElementById("message-modal");
    if (event.target === modal) {
        modal.classList.add("hide");
    }
});
function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredCargaisons.length / itemsPerPage);
    currentPageSpan.textContent = `Page ${currentPage}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
}
function attachToggleEventListeners() {
    const toggleButtons = document.querySelectorAll(".toggle-btn");
    toggleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const cargaisonId = button.dataset.id;
            toggleCargaisonState(cargaisonId);
        });
    });
}
prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayFilteredCargaisons();
    }
});
nextPageButton.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredCargaisons.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayFilteredCargaisons();
    }
});
function toggleCargaisonState(cargaisonId) {
    const cargaison = getCargaisonById(cargaisonId);
    if (cargaison) {
        cargaison.etat = cargaison.etat === "ouverte" ? "fermée" : "ouverte";
        updateCargaisonOnServer(cargaisonId, { etat: cargaison.etat });
        displayFilteredCargaisons();
        updateCargaisonsDisplay();
        displayProductsInTable(cargaisons);
    }
}
fetch("http://localhost/projetCargaison/dist/dataHandler.php", {
    method: "GET", // Assurez-vous que la méthode est correcte
})
    .then((response) => {
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des cargaisons");
    }
    return response.json();
})
    .then((data) => {
    data.cargaisons.forEach((cargaisonData) => {
        const cargaison = createCargaisonFromData(cargaisonData);
        cargaisons.push(cargaison);
        displayArchivedCargaisonsOrProducts(cargaisons, "Archivé");
        // Appeler la fonction pour afficher les produits dans le tableau
        displayProductsInTable(cargaisons);
        addCargaisonToDOM(cargaison);
        displayCargaisonsEnCours(cargaisons);
        // Extraire les produits des cargaisons et les insérer dans le tableau "products"
    });
    displayFilteredCargaisons();
})
    .catch((error) => console.error(error.message));
// Écouter l'événement de soumission du formulaire de recherche
document.getElementById("searchProductButton")?.addEventListener("click", (event) => {
    console.log("Formulaire envoyé");
    event.preventDefault(); // Empêcher le formulaire de se soumettre
    // Récupérer la valeur du code de produit saisi dans le champ de recherche
    const productId = document.getElementById("default-search").value.trim();
    // Rechercher le produit correspondant dans votre liste de cargaisons
    const product = findProductById(productId);
    if (product) {
        // Afficher les détails du produit en utilisant le modèle fourni
        displayProductDetails(product);
    }
    else {
        // Afficher un message d'erreur si aucun produit correspondant n'est trouvé
        showMessageModal("Aucun produit trouvé pour ce code", false);
    }
});
// Fonction pour rechercher un produit par son ID dans le tableau de cargaisons
function findProductById(productId) {
    for (const cargaison of cargaisons) {
        for (const product of cargaison.produits) {
            if (product.id === productId) {
                return product;
            }
        }
    }
    return null; // Retourner null si aucun produit correspondant n'est trouvé
}
// Fonction pour afficher les détails du produit avec le modèle fourni
function displayProductDetails(product) {
    // Récupérer l'élément DOM pour la zone de produit
    const zoneProduit = document.querySelector(".zoneProduit");
    // Remplir les détails du produit dans le modèle fourni
    zoneProduit.innerHTML = `
    <div class="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
      <div class="relative">
        <img class="w-full" src="${product.imageUrl}" alt="Product Image">
        <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">${product.statut}</div>
      </div>
      <div class="p-4">
        <h3 class="text-lg font-medium mb-2">${product.nom}</h3>
        <p class="text-gray-600 text-sm mb-4">${product.description}</p>
        <div class="flex items-center justify-between">
          <span class="font-bold text-lg">${product.prix}</span>
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">${product.arriveDans}</button>
        </div>
      </div>
    </div>
  `;
    // Afficher la zone de produit
    zoneProduit.classList.remove("hide");
}
// Fonction pour masquer la zone de produit
function hideProductDetails() {
    // Récupérer l'élément DOM pour la zone de produit
    const zoneProduit = document.querySelector(".zoneProduit");
    // Masquer la zone de produit
    zoneProduit.classList.add("hide");
}
function getCargaisonById(id) {
    return cargaisons.find((cargaison) => cargaison.id === id);
}
// c bon
// Fonction pour afficher les produits de chaque cargaison dans le tableau
function applyFiltersA(cargaisons) {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const searchIdProd = document.getElementById("searchIdProd").value.toLowerCase();
    const searchIdCargaison = document.getElementById("searchIdCargaison").value.toLowerCase();
    const searchCargaisonType = document.getElementById("searchCargaisonType").value.toLowerCase();
    const searchStatut = document.getElementById("searchStatut").value.toLowerCase();
    return cargaisons.flatMap((cargaison) => cargaison.produits.filter((product) => {
        return ((!searchInput ||
            product.id.toString().toLowerCase().includes(searchInput) ||
            cargaison.id.toString().toLowerCase().includes(searchInput) ||
            product.nom.toLowerCase().includes(searchInput) ||
            product.description.toLowerCase().includes(searchInput) ||
            cargaison.constructor.name.toLowerCase().includes(searchInput) ||
            product.statut.toLowerCase().includes(searchInput) ||
            product.client.prenom.toLowerCase().includes(searchInput) ||
            product.client.nom.toLowerCase().includes(searchInput)) &&
            (!searchIdProd || product.id.toString().toLowerCase().includes(searchIdProd)) &&
            (!searchIdCargaison || cargaison.id.toString().toLowerCase().includes(searchIdCargaison)) &&
            (!searchCargaisonType || cargaison.constructor.name.toLowerCase().includes(searchCargaisonType)) &&
            (!searchStatut || product.statut.toLowerCase().includes(searchStatut)));
    }));
}
function displayProductsInTable(cargaisons) {
    const produitsTableBody = document.getElementById("produitsTableBody");
    // Effacer le contenu actuel du tbody
    produitsTableBody.innerHTML = "";
    // Appliquer les filtres
    const filteredProducts = applyFiltersA(cargaisons);
    // Afficher les produits filtrés
    filteredProducts.forEach((product) => {
        const cargaison = cargaisons.find((c) => c.produits.some((p) => p.id === product.id));
        if (cargaison && product.statut !== "Archivé") {
            const row = document.createElement("tr");
            row.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "cursor-pointer");
            const deleteIconId = `delete-${cargaison.id}-${product.id}`;
            const deleteIconHtml = cargaison.etat === "fermée" || cargaison.statut !== "En attente"
                ? ""
                : `<i id="${deleteIconId}" class="fa-solid fa-trash" style="color: #c70d00; cursor: pointer;"></i>`;
            row.innerHTML = `
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          ${product.id}
        </th>
        <td class="px-6 py-4">
          ${cargaison.id}
        </td>
        <td class="px-6 py-4">
          ${product.nom}
        </td>
        <td class="px-6 py-4">
          ${product.description}
        </td>
        <td class="px-6 py-4">
          ${product.poids}
        </td>
        <td class="px-6 py-4">
          ${new Date(cargaison.dateDepart).toLocaleDateString("fr-FR")}
        </td>
        <td class="px-6 py-4">
          ${new Date(cargaison.dateArrivee).toLocaleDateString("fr-FR")}
        </td>
        <td class="px-6 py-4">
          ${cargaison.constructor.name}
        </td>
        <td class="px-6 py-4">
          ${product.statut}
        </td>
        <td class="px-6 py-4">
          ${product.frais} FCFA
        </td>
        <td class="px-6 py-4">
          ${deleteIconHtml}
        </td>
      `;
            row.addEventListener("click", () => {
                showProductDetails(product);
            });
            produitsTableBody.appendChild(row);
            if (cargaison.etat !== "fermée" && cargaison.statut === "En attente") {
                const deleteIcon = document.getElementById(deleteIconId);
                deleteIcon.addEventListener("click", (event) => {
                    event.stopPropagation(); // Prevent row click event
                    removeProduct(cargaison.id, product.id);
                });
            }
        }
    });
}
// Add event listeners for filter inputs
document.getElementById("searchInput").addEventListener("input", () => displayProductsInTable(cargaisons));
document.getElementById("searchIdProd").addEventListener("input", () => displayProductsInTable(cargaisons));
document.getElementById("searchIdCargaison").addEventListener("input", () => displayProductsInTable(cargaisons));
document.getElementById("searchCargaisonType").addEventListener("input", () => displayProductsInTable(cargaisons));
document.getElementById("searchStatut").addEventListener("input", () => displayProductsInTable(cargaisons));
// Initial call to display products
displayProductsInTable(cargaisons);
function showProductDetails(product) {
    const modal = document.getElementById("message-modal");
    const messageText = document.getElementById("message-text");
    messageText.innerHTML = `
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Détails du Produit</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p><span class="font-semibold">ID:</span> ${product.id}</p>
          <p><span class="font-semibold">Nom:</span> ${product.nom}</p>
          <p><span class="font-semibold">Description:</span> ${product.description}</p>
          <p><span class="font-semibold">Poids:</span> ${product.poids}</p>
          <p><span class="font-semibold">Statut:</span> ${product.statut}</p>
          <p><span class="font-semibold">Frais:</span> ${product.frais} FCFA</p>
        </div>
        <div>
          <p><span class="font-semibold">Nom du client:</span> ${product.client.prenom} ${product.client.nom}</p>
          <p><span class="font-semibold">Adresse du client:</span> ${product.client.adresse}</p>
          <p><span class="font-semibold">email:</span> ${product.client.email}</p>
          <p><span class="font-semibold">Numéro de téléphone:</span> ${product.client.numeroTelephone}</p>
        </div>
      </div>
      <div class="mt-4 flex flex-col space-y-2">
        <button id="mark-lost" class="bg-red-500 text-white px-4 py-2 rounded">Marquer comme Perdue</button>
        <button id="mark-found" class="bg-yellow-500 text-white px-4 py-2 rounded">Marquer comme Trouvé</button>
        <button id="mark-recovered" class="bg-green-500 text-white px-4 py-2 rounded">Marquer comme Récupéré</button>
        <button id="mark-archived" class="bg-red-500 text-white px-4 py-2 rounded">Marquer comme Archiver</button>
      </div>
    </div>
  `;
    // Définir une fonction pour attacher les gestionnaires d'événements aux boutons
    function attachEventListeners(product) {
        const statusButtons = {
            "mark-lost": "Perdue",
            "mark-found": "Trouvé",
            "mark-recovered": "Récupéré",
            "mark-archived": "Archivé"
        };
        Object.entries(statusButtons).forEach(([buttonId, status]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener("click", () => updateProductStatus(product.id, status, "produit"));
            }
        });
    }
    // Définir une fonction pour masquer les boutons en fonction du statut du produit
    function hideButtonsBasedOnStatus(product) {
        const statusButtons = {
            "mark-lost": ["Perdue", "Récupéré", "Archivé"],
            "mark-found": ["Trouvé", "Archivé", "En cours", "En attente", "Récupéré"],
            "mark-recovered": ["Récupéré", "Perdue", "En cours", "En attente"],
            "mark-archived": ["Archivé", "Trouvé", "En cours", "En attente"]
        };
        Object.entries(statusButtons).forEach(([buttonId, statuses]) => {
            const button = document.getElementById(buttonId);
            if (button && statuses.includes(product.statut)) {
                button.style.display = "none";
            }
        });
    }
    // Attacher les gestionnaires d'événements
    attachEventListeners(product);
    // Masquer les boutons en fonction du statut
    hideButtonsBasedOnStatus(product);
    modal.classList.remove("hide");
}
function updateProductStatus(productId, newStatus, operationType) {
    fetch(`http://localhost/projetCargaison/dist/dataHandler.php?operationType=${operationType}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: productId,
            status: newStatus,
        }),
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour du statut du produit");
        }
        return response.json();
    })
        .then((data) => {
        // Trouver la cargaison contenant le produit mis à jour
        let updatedProduct;
        let updatedCargaison;
        cargaisons.forEach((cargaison) => {
            cargaison.produits.forEach((produit) => {
                if (produit.id === productId) {
                    produit.statut = newStatus;
                    updatedProduct = produit;
                    updatedCargaison = cargaison;
                }
            });
        });
        if (updatedProduct && updatedCargaison) {
            // Envoyer les e-mails en fonction du nouveau statut
            sendStatusUpdateEmail(updatedCargaison, updatedProduct, newStatus);
        }
        // Mettre à jour l'affichage du tableau
        displayProductsInTable(cargaisons);
        // Afficher le message de succès
        showMessageModal(`Statut du produit mis à jour en ${newStatus}.`, true);
    })
        .catch((error) => {
        console.error("Erreur lors de la mise à jour du statut du produit:", error);
        showMessageModal("Erreur lors de la mise à jour du statut du produit.", false);
    });
}
function sendStatusUpdateEmail(cargaison, product, newStatus) {
    const clientEmail = product.client.email;
    const destinataireEmail = product.destinataire.email;
    const productID = product.id;
    const clientName = product.client.nom;
    const recipientName = product.destinataire.nom;
    const destinationCity = cargaison.endLocation;
    const departureDate = cargaison.dateDepart;
    const arrivalDate = cargaison.dateArrivee;
    const frais = product.frais;
    const statusMessages = {
        "Perdue": {
            clientMessage: `Bonjour ${clientName},\n\nNous vous informons que votre colis avec le code ${productID} a été déclaré perdu.\n\nCordialement,\nGP du Monde`,
            recipientMessage: `Bonjour ${recipientName},\n\nNous vous informons que votre colis avec le code ${productID} a été déclaré perdu.\n\nCordialement,\nGP du Monde`
        },
        "Trouvé": {
            clientMessage: `Bonjour ${clientName},\n\nNous vous informons que votre colis avec le code ${productID} a été retrouvé.\n\nCordialement,\nGP du Monde`,
            recipientMessage: `Bonjour ${recipientName},\n\nNous vous informons que votre colis avec le code ${productID} a été retrouvé.\n\nCordialement,\nGP du Monde`
        },
        "Récupéré": {
            clientMessage: `Bonjour ${clientName},\n\nNous vous informons que votre colis avec le code ${productID} a été récupéré.\n\nCordialement,\nGP du Monde`,
            recipientMessage: `Bonjour ${recipientName},\n\nNous vous informons que votre colis avec le code ${productID} a été récupéré.\n\nCordialement,\nGP du Monde`
        },
        "Archivé": {
            clientMessage: `Bonjour ${clientName},\n\nNous vous informons que votre colis avec le code ${productID} a été archivé.\n\nCordialement,\nGP du Monde`,
            recipientMessage: `Bonjour ${recipientName},\n\nNous vous informons que votre colis avec le code ${productID} a été archivé.\n\nCordialement,\nGP du Monde`
        }
    };
    const { clientMessage, recipientMessage } = statusMessages[newStatus];
    fetch("http://localhost/projetCargaison/dist/sendEmail.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientEmail,
            destinataireEmail,
            clientMessage,
            recipientMessage,
        }),
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur du réseau lors de l'envoi des e-mails");
        }
        return response.json();
    })
        .then((data) => {
        console.log("E-mails envoyés avec succès:", data);
    })
        .catch((error) => {
        console.error("Erreur lors de l'envoi des e-mails:", error);
    });
}
// Fonction pour supprimer un produit
function removeProduct(cargaisonId, produitId) {
    const modal = document.getElementById("message-modal");
    const modalMessage = document.getElementById("message-text");
    const closeBtn = document.getElementById("close-message-modal");
    modalMessage.textContent = "Êtes-vous sûr de vouloir retirer ce produit ?";
    modal.classList.remove("hide");
    closeBtn.addEventListener("click", () => {
        modal.classList.add("hide");
    });
    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Confirmer";
    confirmBtn.classList.add("confirm-btn", "mr-2");
    confirmBtn.addEventListener("click", () => {
        deleteProduitFromCargaisonOnServer(cargaisonId, produitId);
        modal.classList.add("hide");
    });
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Annuler";
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.addEventListener("click", () => {
        modal.classList.add("hide");
    });
    modalMessage.appendChild(confirmBtn);
    modalMessage.appendChild(cancelBtn);
}
// Appeler la fonction pour afficher les produits dans le tableau
displayProductsInTable(cargaisons);
function displayArchivedCargaisonsOrProducts(cargaisons, status) {
    const tableBody = document.getElementById("archivesTableBody");
    tableBody.innerHTML = ""; // Clear existing rows
    cargaisons.forEach((cargaison) => {
        if (cargaison.statut === status) {
            const row = createTableRow(cargaison);
            tableBody.appendChild(row);
        }
        cargaison.produits.forEach((produit) => {
            if (produit.statut === status) {
                const row = createTableRow(produit);
                tableBody.appendChild(row);
            }
        });
    });
}
function createTableRow(item) {
    const row = document.createElement("tr");
    row.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700");
    row.innerHTML = `
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <!-- Possibly add an image or icon here -->
      </th>
      <td class="px-6 py-4">${item.id || ''}</td>
      <td class="px-6 py-4">${item.nom || ''}</td>
      <td class="px-6 py-4">${item.description || ''}</td>
      <td class="px-6 py-4">${item.poids || ''}</td>
      <td class="px-6 py-4">${item.statut || ''}</td>
      <td class="px-6 py-4">${item.frais || ''}</td>
      <td class="px-6 py-4">
        <i class="fa-solid fa-trash-can-arrow-up" style="color: #63E6BE;" onclick="restoreItem('${item.id}', '${item.type}')"></i>
      </td>
    `;
    return row;
}
function restoreItem(itemId, itemType) {
    // Function to handle restoring the item
    console.log(`Restore item with ID: ${itemId} and Type: ${itemType}`);
    // Add the logic to restore the item here
}
// Display all archived items
displayArchivedCargaisonsOrProducts(cargaisons, "Archivé");
function displayCargaisonsEnCours(cargaisons) {
    const container = document.querySelector(".card-container");
    container.innerHTML = ""; // Clear previous content
    const enCoursCargaisons = cargaisons.filter(cargaison => cargaison.statut === "En cours");
    enCoursCargaisons.forEach(cargaison => {
        const nombreDeJours = Math.ceil((new Date(cargaison.dateArrivee).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        const cardHTML = `
            <div class="card bg-white p-4 rounded-lg shadow-md">
                <div class="card-user-info mb-4">
                    <h2 class="text-lg font-bold">Id de la cargaison: ${cargaison.id}</h2>
                </div>
                <img class="card-img w-full h-40 object-cover mb-4 rounded-lg" src="https://www.easyhaul.com/blog/wp-content/uploads/2022/12/Main-image-maritime-ports.png" alt="Cargaison envoyée" />
                <p class="text-gray-600">Arrive dans ${nombreDeJours} jour${nombreDeJours > 1 ? 's' : ''}</p>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}
//# sourceMappingURL=test.js.map