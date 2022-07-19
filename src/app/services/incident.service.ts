import {Injectable} from "@angular/core";
import {Incident} from "../models/Incident";
import {Summary} from "../models/Summary";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from "rxjs/operators";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class IncidentService {


  private apiUrl = 'http://localhost:8080/api/incident/';

  incidentTab : Incident[] = [

  ];


  getAllIncident() : Incident[] {
    return this.incidentTab;
  }

  getIdIncident(id : number) : Observable<Incident> {
    const incident = this.HttpClient.get<Incident>(this.apiUrl+id);
    if (incident) {
      return incident }
    else {
      throw new Error('Incident non trouvé')
    }
  }

  getIncidentsbyStatus(status : string) : Observable<Incident[]>{
    return this.HttpClient.get<Incident[]>(this.apiUrl+"status/"+status);

  }

  getIncidentsByEncharge(id : number){
    return this.HttpClient.get<Incident[]>(this.apiUrl+"encharge/"+id);
  }

  getStatIncidentsbyStatus(status : string) : Observable<number>{
    return this.HttpClient.get<number>(this.apiUrl+"stat/"+status);

  }

  getStatIncidentsbyStatusByCreator(status : string, id : number) : Observable<number>{
    return this.HttpClient.get<number>(this.apiUrl+"stat/"+status+"/"+id);

  }

  getStatIncidentsbyStatusByEncharge(status : string, id : number) : Observable<number>{
    return this.HttpClient.get<number>(this.apiUrl+"stat/"+status+"/encharge/"+id);

  }


  nb_att! : number;
  nb_cours! : number;
  nb_termine! : number;
  nb_valide! : number;
    getStatistique() :Observable<Summary[]> {

      this.getStatIncidentsbyStatus("En attente").subscribe(data => {this.nb_att = data;})
      this.getStatIncidentsbyStatus("En cours").subscribe(data => {this.nb_cours = data; })
      this.getStatIncidentsbyStatus("Terminé").subscribe(data => {this.nb_termine = data; })
      this.getStatIncidentsbyStatus("Validé").subscribe(data => {this.nb_valide = data; })

      return of([
                  { title: "Ticket en Attente", value: this.nb_att, color: "warn",icon1: "payments" },
                  { title: "Ticket en cours", value: this.nb_cours,  color: "amber",icon1: "payments"},
                  { title: "Ticket Terminé", value: this.nb_termine, color: "blue", icon1: "payments"},
                  { title: "Ticket Validé", value: this.nb_valide,  color: "success",icon1: "payments" }
                ]);
    }

  viewIncident(id : number){
    this.router.navigateByUrl(`incident/${id}`)
  }


  constructor(private router:Router, private HttpClient : HttpClient) {
  }


  public findAll() {
    return this.HttpClient.get<Incident[]>(this.apiUrl+"toutincident");
  }


  public create_incident(f : FormGroup){
    console.log("créer un incident");

    let titre = f.get('titre')?.value;
    let createur = f.get('createur')?.value;
    let categorie = f.get('categorie')?.value;
    let description = f.get('description')?.value;

    let i  = new Incident(titre, description, createur, categorie);
    console.log(i);

    this.HttpClient.post<Incident>(this.apiUrl+"addincident",i);


  }

  public prendre_en_charge(id_user : number, id_incid : number){
    this.HttpClient.get(this.apiUrl+ "priseencharge/" + id_incid+ "/" +id_user).subscribe();
  }

  public terminer(id_incid : number){
    this.HttpClient.get(this.apiUrl+"termine/"+id_incid).subscribe();
  }

  public valider(id_incid : number){
    this.HttpClient.get(this.apiUrl+"valide/"+id_incid).subscribe();
  }

  nb_att_creat! : number;
  nb_cours_creat! : number;
  nb_termine_creat! : number;
  nb_valide_creat! : number;

  getStatistiqueByCreator(id : number) :Observable<Summary[]> {

    this.getStatIncidentsbyStatusByCreator("En attente", id).subscribe(data => {this.nb_att_creat = data;})
    this.getStatIncidentsbyStatusByCreator("En cours", id).subscribe(data => {this.nb_cours_creat = data; })
    this.getStatIncidentsbyStatusByCreator("Terminé", id).subscribe(data => {this.nb_termine_creat = data; })
    this.getStatIncidentsbyStatusByCreator("Validé", id).subscribe(data => {this.nb_valide_creat = data; })

    return of([
      { title: "Ticket en Attente", value: this.nb_att_creat, color: "warn",icon: "payments" },
      { title: "Ticket en cours", value: this.nb_cours_creat,  color: "amber",icon: "payments"},
      { title: "Ticket Terminé", value: this.nb_termine_creat, color: "blue", icon: "payments"},
      { title: "Ticket Validé", value: this.nb_valide_creat,  color: "success",icon: "payments" }
    ]);
  }


  getIncidentByCreator(id : number){
    return this.HttpClient.get<Incident[]>(this.apiUrl+"createur/"+id)
  }

  getIncidentByStatusAndCreator(status : string, id : number){
    return this.HttpClient.get<Incident[]>(this.apiUrl+"get"+"/"+status+"/"+id)
  }

  getIncidentByStatusAndEncharge(status : string, id : number){
    return this.HttpClient.get<Incident[]>(this.apiUrl+"get"+"/"+status+"/encharge/"+id)
  }

  nb_att_encharge! : number;
  nb_cours_encharge! : number;
  nb_termine_encharge! : number;
  nb_valide_encharge! : number;
  getStatistiqueByEncharge(id : number) :Observable<Summary[]> {

    this.getStatIncidentsbyStatus("En attente").subscribe(data => {this.nb_att_encharge = data;})
    this.getStatIncidentsbyStatusByEncharge("En cours", id).subscribe(data => {this.nb_cours_encharge = data; })
    this.getStatIncidentsbyStatusByEncharge("Terminé", id).subscribe(data => {this.nb_termine_encharge = data; })
    this.getStatIncidentsbyStatusByEncharge("Validé", id).subscribe(data => {this.nb_valide_encharge = data; })

    return of([
      { title: "Ticket en Attente", value: this.nb_att_encharge, color: "warn",icon: "payments" },
      { title: "Ticket en cours", value: this.nb_cours_encharge,  color: "amber",icon: "payments"},
      { title: "Ticket Terminé", value: this.nb_termine_encharge, color: "blue", icon: "payments"},
      { title: "Ticket Validé", value: this.nb_valide_encharge,  color: "success",icon: "payments" }
    ]);
  }

  getIncidentNonAttribue() {
    return this.HttpClient.get<Incident[]>(this.apiUrl+"nonattribue");
  }

  deleteIncident(id : number){
    this.HttpClient.get(this.apiUrl+"delete/"+id).subscribe();
    console.log("delete",id)
  }

  commencer(id : number){
    this.HttpClient.get(this.apiUrl+"commencer/"+id).subscribe();
  }

  relancer(id : number){

    this.HttpClient.get(this.apiUrl+"relancer/"+id).subscribe();
  }

  refusSolution(id : number){
    this.HttpClient.get(this.apiUrl+"refussolution/"+id).subscribe();
  }
}


