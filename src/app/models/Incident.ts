export class Incident {
  id! : number
  titre! : string;
  description! : string;
  createur! : number;
  createur_nom! : string;
  creation! : Date;
  lastModif! : Date;
  status! : string;
  categorie! : string;
  en_charge! : number;



  constructor(title: string, description: string, creator: number, categorie : string) {
    this.titre = title;
    this.description = description;
    this.createur = creator;
    //this.date_of_creation = new Date();
    this.lastModif = new Date();
    this.status = "En attente";
    this.categorie = categorie
  }



}
