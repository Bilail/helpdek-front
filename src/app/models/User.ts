export class User {
  id: number;
  nom!: string;
  prenom!: string;
  bureau!: string;
  mail!: string;
  tel! : string;
  role!: string

  constructor(id : number, nom: string, prenom: string, bureau: string, tel : string,  mail: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.bureau = bureau;
    this.mail = mail;

    this.tel = tel;
  }
}
