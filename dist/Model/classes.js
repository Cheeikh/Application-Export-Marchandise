// Constants
const reglesCargaison = {
    Aerienne: ["Materiel", "Alimentaire", "Incassable", "Fragile"],
    Maritime: ["Materiel", "Chimique", "Alimentaire", "Incassable"],
    Routiere: ["Materiel", "Alimentaire", "Incassable", "Fragile"],
};
// Interface pour les produits calculables
// Classes pour les frais fixes
class FraisFixesAerienne {
    calculerFrais(kilometres, typeCargaison) {
        return 0; // Pas de frais fixes supplémentaires pour l'aérien
    }
}
class FraisFixesMaritime {
    calculerFrais(kilometres, typeCargaison) {
        return 5000; // Frais de chargement fixe pour Maritime
    }
}
class FraisFixesRoutiere {
    calculerFrais(kilometres, typeCargaison) {
        return 0; // Pas de frais fixes supplémentaires pour Routiere
    }
}
// Classe Client et Destinataire
class Person {
    nom;
    prenom;
    adresse;
    numeroTelephone;
    email;
    constructor(nom, prenom, adresse, numeroTelephone, email) {
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.numeroTelephone = numeroTelephone;
        this.email = email;
    }
}
export class Client extends Person {
}
export class Destinataire extends Person {
}
// Classe Produit
export class Produit {
    _id;
    _nom;
    _description;
    _poids;
    _destination;
    _client;
    _destinataire;
    type;
    statut;
    frais;
    constructor(id, nom, description, poids, destination, client, destinataire, type, statut, frais) {
        this._id = id;
        this._nom = nom;
        this._description = description;
        this._poids = poids;
        this._destination = destination;
        this._client = client;
        this._destinataire = destinataire;
        this.type = this.constructor.name;
        this.statut = statut;
        this.frais = frais;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get nom() {
        return this._nom;
    }
    set nom(value) {
        this._nom = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get poids() {
        return this._poids;
    }
    set poids(value) {
        this._poids = value;
    }
    get destination() {
        return this._destination;
    }
    set destination(value) {
        this._destination = value;
    }
    get client() {
        return this._client;
    }
    set client(value) {
        this._client = value;
    }
    get destinataire() {
        return this._destinataire;
    }
    set destinataire(value) {
        this._destinataire = value;
    }
    info() {
        console.log(`ID: ${this._id}`);
        console.log(`Nom: ${this._nom}`);
        console.log(`Description: ${this._description}`);
        console.log(`Poids: ${this._poids} kg`);
        console.log(`Destination: ${this._destination}`);
        console.log(`Client: ${this._client.nom} ${this._client.prenom}`);
        console.log(`Destinataire: ${this._destinataire.nom} ${this._destinataire.prenom}`);
    }
    ajouterProduit(cargaison) {
        if (cargaison.peutAjouterProduit(this)) {
            cargaison.addProduit(this);
        }
    }
}
// Classe Materiel
export class Materiel extends Produit {
    constructor(id, nom, description, poids, destination, client, destinataire, type, statut, frais) {
        super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
    }
    calculerFrais(kilometres, typeCargaison) {
        switch (typeCargaison) {
            case "Routiere":
                return 200 * this.poids * kilometres;
            case "Maritime":
                return 400 * this.poids * kilometres;
            case "Aerienne":
                return 1000 * this.poids * kilometres;
            default:
                return 0;
        }
    }
}
// Classe Fragile
export class Fragile extends Materiel {
    constructor(id, nom, description, poids, destination, client, destinataire, type, statut, frais) {
        super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
    }
}
// Classe Incassable
export class Incassable extends Materiel {
    constructor(id, nom, description, poids, destination, client, destinataire, type, statut, frais) {
        super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
    }
}
// Classe Alimentaire
export class Alimentaire extends Produit {
    constructor(id, nom, description, poids, destination, client, destinataire, type, statut, frais) {
        super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
    }
    calculerFrais(kilometres, typeCargaison) {
        switch (typeCargaison) {
            case "Routiere":
                return 100 * this.poids * kilometres;
            case "Maritime":
                return 90 * this.poids * kilometres;
            case "Aerienne":
                return 300 * this.poids * kilometres;
            default:
                return 0;
        }
    }
}
// Classe Chimique
export class Chimique extends Produit {
    _toxicite;
    frais;
    constructor(id, nom, description, poids, destination, toxicite, frais, client, destinataire, type, statut) {
        super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
        this._toxicite = toxicite;
        this.frais = frais;
    }
    get toxicite() {
        return this._toxicite;
    }
    calculerFrais(kilometres, typeCargaison) {
        if (typeCargaison === "Maritime") {
            // Ajoutons également les frais d'entretien de la cargaison pour les produits chimiques
            return (500 * this.toxicite + 10000) * this.poids * kilometres;
        }
        else {
            return 0; // Les produits chimiques ne sont transportés que par voie maritime
        }
    }
}
// Classe abstraite de Cargaison
export class Cargaison {
    _id;
    _poidsMax;
    _volumeMax;
    _produits = [];
    _poids;
    _dateDepart;
    _dateArrivee;
    _startLocation;
    _endLocation;
    _distance;
    _statut;
    _etat;
    constructor(id, poidsMax, volumeMax, dateDepart, dateArrivee, startLocation, endLocation, distance, statut, etat, produits = []) {
        this._id = id;
        this._poidsMax = poidsMax;
        this._volumeMax = volumeMax;
        this._poids = 0;
        this._dateDepart = dateDepart;
        this._dateArrivee = dateArrivee;
        this._startLocation = startLocation;
        this._endLocation = endLocation;
        this._distance = distance;
        this._statut = statut;
        this._etat = etat;
        this._produits = produits;
    }
    get id() {
        return this._id;
    }
    get poids() {
        return this._produits.reduce((acc, produit) => acc + produit.poids, 0);
    }
    get volume() {
        return this._produits.length;
    }
    get dateDepart() {
        return this._dateDepart;
    }
    get dateArrivee() {
        return this._dateArrivee;
    }
    set dateDepart(date) {
        this._dateDepart = date;
    }
    set dateArrivee(date) {
        this._dateArrivee = date;
    }
    get startLocation() {
        return this._startLocation;
    }
    get endLocation() {
        return this._endLocation;
    }
    get distance() {
        return this._distance;
    }
    get statut() {
        return this._statut;
    }
    set statut(newStatut) {
        this._statut = newStatut;
    }
    get etat() {
        return this._etat;
    }
    set etat(newEtat) {
        this._etat = newEtat;
    }
    // Méthode pour obtenir le poids restant
    getPoidsRestant() {
        return this._poidsMax - this.poids;
    }
    // Méthode pour obtenir le volume restant
    getVolumeRestant() {
        return this._volumeMax - this._produits.length;
    }
    // Méthode pour obtenir le poids maximum de la cargaison
    getPoidsMax() {
        return this._poidsMax;
    }
    addProduit(produit) {
        if (!this.peutAjouterProduit(produit)) {
            return;
        }
        if (this.poids + produit.poids <= this._poidsMax &&
            this.volume + 1 <= this._volumeMax) {
            this._produits.push(produit);
            console.log(`Produit "${produit.nom}" ajouté à la cargaison.`);
            console.log(`Montant total de la cargaison: ${this.sommeTotale(1)}`);
            return 1;
        }
        else {
            console.log("Cargaison pleine. Impossible d'ajouter le produit.");
        }
    }
    peutAjouterProduit(produit) {
        if (this._produits.length >= this._volumeMax) {
            console.log("Cargaison pleine. Impossible d'ajouter le produit.");
            return false;
        }
        const typesPermis = reglesCargaison[this.constructor.name];
        if (typesPermis && typesPermis.includes(produit.constructor.name)) {
            if (produit instanceof Fragile && this instanceof Maritime) {
                console.log("Les produits fragiles ne peuvent pas être ajoutés à une cargaison maritime.");
                return false;
            }
            return true;
        }
        console.log("Le produit n'est pas destiné à être ajouté à cette cargaison.");
        return false;
    }
    removeProduit(produit) {
        const index = this._produits.indexOf(produit);
        if (index === -1) {
            throw new Error("Produit non trouvé dans la cargaison.");
        }
        this._produits.splice(index, 1);
    }
    nbProduit() {
        return this._produits.length;
    }
    sommeTotale(kilometres) {
        return this._produits.reduce((total, produit) => {
            if (produit instanceof Materiel ||
                produit instanceof Alimentaire ||
                produit instanceof Chimique) {
                return total + produit.calculerFrais(kilometres, this.constructor.name);
            }
            return total;
        }, 0);
    }
    get produits() {
        return this._produits;
    }
    set produits(produits) {
        this._produits = produits;
    }
}
// Sous-classes de Cargaison
export class Aerienne extends Cargaison {
    constructor(id, poidsMax, volumeMax, dateDepart, dateArrivee, startLocation, endLocation, distance, statut, etat, produits = []) {
        super(id, poidsMax, volumeMax, dateDepart, dateArrivee, startLocation, endLocation, distance, statut, etat, produits);
    }
}
export class Maritime extends Cargaison {
    constructor(id, poidsMax, volumeMax, dateDepart, dateArrivee, startLocation, endLocation, distance, statut, etat, produits = []) {
        super(id, poidsMax, volumeMax, dateDepart, dateArrivee, startLocation, endLocation, distance, statut, etat, produits);
    }
}
export class Routiere extends Cargaison {
    constructor(id, poidsMax, volumeMax, dateDepart, dateArrivee, startLocation, endLocation, distance, statut, etat, produits = []) {
        super(id, poidsMax, volumeMax, dateDepart, dateArrivee, startLocation, endLocation, distance, statut, etat, produits);
    }
}
//# sourceMappingURL=classes.js.map