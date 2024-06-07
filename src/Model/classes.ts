// Constants
const reglesCargaison: { [key: string]: string[] } = {
  Aerienne: ["Materiel", "Alimentaire", "Incassable", "Fragile"],
  Maritime: ["Materiel", "Chimique", "Alimentaire", "Incassable"],
  Routiere: ["Materiel", "Alimentaire", "Incassable", "Fragile"],
};

// Interface pour les produits calculables


// Classes pour les frais fixes
class FraisFixesAerienne  {
  calculerFrais(kilometres: number, typeCargaison: string): number {
    return 0; // Pas de frais fixes supplémentaires pour l'aérien
  }
}

class FraisFixesMaritime  {
  calculerFrais(kilometres: number, typeCargaison: string): number {
    return 5000; // Frais de chargement fixe pour Maritime
  }
}

class FraisFixesRoutiere  {
  calculerFrais(kilometres: number, typeCargaison: string): number {
    return 0; // Pas de frais fixes supplémentaires pour Routiere
  }
}

interface Calculable {
  calculerFrais(kilometres: number, typeCargaison: string): number;
}

// Classe Client et Destinataire
class Person {
  constructor(
    public nom: string,
    public prenom: string,
    public adresse: string,
    public numeroTelephone: string,
    public email: string
  ) {}
}

export class Client extends Person {}

export class Destinataire extends Person {}

// Classe Produit
export class Produit {
  private _id: string;
  private _nom: string;
  private _description: string;
  private _poids: number;
  private _destination: string;
  private _client: Client;
  private _destinataire: Destinataire;
  public type: string;
  public statut: string;
  public frais: number;

  constructor(id: string, nom: string, description: string, poids: number, destination: string, client: Client, destinataire: Destinataire, type: string, statut: string, frais: number) {
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

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get poids(): number {
    return this._poids;
  }

  set poids(value: number) {
    this._poids = value;
  }

  get destination(): string {
    return this._destination;
  }

  set destination(value: string) {
    this._destination = value;
  }

  get client(): Client {
    return this._client;
  }

  set client(value: Client) {
    this._client = value;
  }

  get destinataire(): Destinataire {
    return this._destinataire;
  }

  set destinataire(value: Destinataire) {
    this._destinataire = value;
  }

  info(): void {
    console.log(`ID: ${this._id}`);
    console.log(`Nom: ${this._nom}`);
    console.log(`Description: ${this._description}`);
    console.log(`Poids: ${this._poids} kg`);
    console.log(`Destination: ${this._destination}`);
    console.log(`Client: ${this._client.nom} ${this._client.prenom}`);
    console.log(`Destinataire: ${this._destinataire.nom} ${this._destinataire.prenom}`);
  }

  ajouterProduit(cargaison: Cargaison): void {
    if (cargaison.peutAjouterProduit(this)) {
      cargaison.addProduit(this);
    }
  }
}

// Classe Materiel
export class Materiel extends Produit  {
  constructor(
    id: string,
    nom: string,
    description: string,
    poids: number,
    destination: string,
    client: Client,
    destinataire: Destinataire,
    type: string,
    statut: string,
    frais: number
  ) {
    super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
  }

  calculerFrais(kilometres: number, typeCargaison: string): number {
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
  constructor(
    id: string,
    nom: string,
    description: string,
    poids: number,
    destination: string,
    client: Client,
    destinataire: Destinataire,
    type: string,
    statut: string,
    frais: number
  ) {
    super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
  }
}

// Classe Incassable
export class Incassable extends Materiel {
  constructor(
    id: string,
    nom: string,
    description: string,
    poids: number,
    destination: string,
    client: Client,
    destinataire: Destinataire,
    type: string,
    statut: string,
    frais: number
  ) {
    super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
  }
}

// Classe Alimentaire
export class Alimentaire extends Produit  {
  constructor(
    id: string,
    nom: string,
    description: string,
    poids: number,
    destination: string,
    client: Client,
    destinataire: Destinataire,
    type: string,
    statut: string,
    frais: number
  ) {
    super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
  }

  calculerFrais(kilometres: number, typeCargaison: string): number {
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
export class Chimique extends Produit  {
  private _toxicite: number;
  frais: number;

  constructor(
    id: string,
    nom: string,
    description: string,
    poids: number,
    destination: string,
    toxicite: number,
    frais: number,
    client: Client,
    destinataire: Destinataire,
    type: string,
    statut: string,
  ) {
    super(id, nom, description, poids, destination, client, destinataire, type, statut, frais);
    this._toxicite = toxicite;
    this.frais = frais;
  }

  get toxicite(): number {
    return this._toxicite;
  }

  calculerFrais(kilometres: number, typeCargaison: string): number {
    if (typeCargaison === "Maritime") {
      // Ajoutons également les frais d'entretien de la cargaison pour les produits chimiques
      return (500 * this.toxicite + 10000) * this.poids * kilometres;
    } else {
      return 0; // Les produits chimiques ne sont transportés que par voie maritime
    }
  }
}


// Classe abstraite de Cargaison
export abstract class Cargaison {
  protected _id: string;
  protected _poidsMax: number;
  protected _volumeMax: number;
   _produits: Produit[] = [];
  protected _poids: number;
  protected _dateDepart: Date;
  protected _dateArrivee: Date;
  protected _startLocation: string;
  protected _endLocation: string;
  protected _distance: number;
  protected _statut: string;
  protected _etat: string;

  constructor(
    id: string,
    poidsMax: number,
    volumeMax: number,
    dateDepart: Date,
    dateArrivee: Date,
    startLocation: string,
    endLocation: string,
    distance: number,
    statut: string,
    etat: string,
    produits: Produit[] = []
  ) {
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

  get id(): string {
    return this._id;
  }

  get poids(): number {
    return this._produits.reduce((acc, produit) => acc + produit.poids, 0);
  }

  get volume(): number {
    return this._produits.length;
  }

  get dateDepart(): Date {
    return this._dateDepart;
  }

  get dateArrivee(): Date {
    return this._dateArrivee;
  }

  set dateDepart(date: Date) {
    this._dateDepart = date;
  }

  set dateArrivee(date: Date) {
    this._dateArrivee = date;
  }

  get startLocation(): string {
    return this._startLocation;
  }

  get endLocation(): string {
    return this._endLocation;
  }

  get distance(): number {
    return this._distance;
  }

  get statut(): string {
    return this._statut;
  }

  set statut(newStatut: string) {
    this._statut = newStatut;
  }

  get etat(): string {
    return this._etat;
  }
  set etat(newEtat: string) {
    this._etat = newEtat;
  }

  // Méthode pour obtenir le poids restant
  getPoidsRestant(): number {
    return this._poidsMax - this.poids;
  }

  // Méthode pour obtenir le volume restant
  getVolumeRestant(): number {
    return this._volumeMax - this._produits.length;
  }

  // Méthode pour obtenir le poids maximum de la cargaison
  getPoidsMax(): number {
    return this._poidsMax;
  }

  addProduit(produit: Produit): void | number {
    if (!this.peutAjouterProduit(produit)) {
      return;
    }
    if (
      this.poids + produit.poids <= this._poidsMax &&
      this.volume + 1 <= this._volumeMax
    ) {
      this._produits.push(produit);
      console.log(`Produit "${produit.nom}" ajouté à la cargaison.`);
      console.log(`Montant total de la cargaison: ${this.sommeTotale(1)}`);
      return 1;
    } else {
      console.log("Cargaison pleine. Impossible d'ajouter le produit.");
    }
  }

  peutAjouterProduit(produit: Produit): boolean {
    if (this._produits.length >= this._volumeMax) {
      console.log("Cargaison pleine. Impossible d'ajouter le produit.");
      return false;
    }
    const typesPermis = reglesCargaison[this.constructor.name];
    if (typesPermis && typesPermis.includes(produit.constructor.name)) {
      if (produit instanceof Fragile && this instanceof Maritime) {
        console.log(
          "Les produits fragiles ne peuvent pas être ajoutés à une cargaison maritime."
        );
        return false;
      }
      return true;
    }
    console.log(
      "Le produit n'est pas destiné à être ajouté à cette cargaison."
    );
    return false;
  }

  removeProduit(produit: Produit): void {
    const index = this._produits.indexOf(produit);
    if (index === -1) {
      throw new Error("Produit non trouvé dans la cargaison.");
    }
    this._produits.splice(index, 1);
  }

  nbProduit(): number {
    return this._produits.length;
  }

  sommeTotale(kilometres: number): number {
    return this._produits.reduce((total, produit) => {
      if (
        produit instanceof Materiel ||
        produit instanceof Alimentaire ||
        produit instanceof Chimique
      ) {
        return total + produit.calculerFrais(kilometres, this.constructor.name);
      }
      return total;
    }, 0);
  }

  get produits(): Produit[] {
    return this._produits;
  }
  set produits(produits: Produit[]) {
    this._produits = produits;
  }
}

// Sous-classes de Cargaison
export class Aerienne extends Cargaison {
  constructor(
    id: string,
    poidsMax: number,
    volumeMax: number,
    dateDepart: Date,
    dateArrivee: Date,
    startLocation: string,
    endLocation: string,
    distance: number,
    statut: string,
    etat: string,
    produits: Produit[] = []
  ) {
    super(
      id,
      poidsMax,
      volumeMax,
      dateDepart,
      dateArrivee,
      startLocation,
      endLocation,
      distance,
      statut,
      etat,
      produits
    );
  }
}

export class Maritime extends Cargaison {
  constructor(
    id: string,
    poidsMax: number,
    volumeMax: number,
    dateDepart: Date,
    dateArrivee: Date,
    startLocation: string,
    endLocation: string,
    distance: number,
    statut: string,
    etat: string,
    produits: Produit[] = []
  ) {
    super(
      id,
      poidsMax,
      volumeMax,
      dateDepart,
      dateArrivee,
      startLocation,
      endLocation,
      distance,
      statut,
      etat,
      produits
    );
  }
}

export class Routiere extends Cargaison {
  constructor(
    id: string,
    poidsMax: number,
    volumeMax: number,
    dateDepart: Date,
    dateArrivee: Date,
    startLocation: string,
    endLocation: string,
    distance: number,
    statut: string,
    etat: string,
    produits: Produit[] = []
  ) {
    super(
      id,
      poidsMax,
      volumeMax,
      dateDepart,
      dateArrivee,
      startLocation,
      endLocation,
      distance,
      statut,
      etat,
      produits
    );
  }
}
