import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Incident} from "../models/Incident";
import {IncidentService} from "../services/incident.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {Diagnostic} from "../models/Diagnostic";
import {DiagnosticService} from "../services/diagnostic.service";
import {AddIncidentFormComponent} from "../forms/add-incident-form/add-incident-form.component";
import {MatDialog} from "@angular/material/dialog";
import {AddProblemFormComponent} from "../forms/add-problem-form/add-problem-form.component";
import {MatTabsModule} from '@angular/material/tabs';
import {AddSolutionFormComponent} from "../forms/add-solution-form/add-solution-form.component";
import {TokenStorageService} from "../services/token-storage.service";
import {UpdateIncidentFormComponent} from "../forms/update-incident-form/update-incident-form.component";
import {AttribueIncidentFormComponent} from "../forms/attribue-incident-form/attribue-incident-form.component";
import { Location } from '@angular/common';
import {ConfirmationDeleteFormComponent} from "../forms/confirmation-delete-form/confirmation-delete-form.component";

@Component({
  selector: 'app-single-incident',
  templateUrl: './single-incident.component.html',
  styleUrls: ['./single-incident.component.css']
})
export class SingleIncidentComponent implements OnInit {
  buttonText! : string
  buttonIcon! : string


  incident! : Incident;
  diagnostic! : Diagnostic;
  creat! : User;
  charge! : User;
  isLoggedIn = false;
  showAdminBoard = false;
  showTechBoard = false;
  attribue = false;
  enAttente = false;
  enCours = false;
  termine = false;
  valide = false;
  private roles! : string[];
  showButtonStatus = true;


    constructor(private incidentService : IncidentService,
              private route : ActivatedRoute,
                private userService : UserService,
                private diagnosticService : DiagnosticService,
                public dialog: MatDialog,
                private token: TokenStorageService,
                private router:Router,
                private location: Location) { }

  prendre(){
    if(//this.buttonText = "Prendre en Charge"
      this.incident.status == "En attente" ) {
      if (this.incident.en_charge == null){
        this.incidentService.prendre_en_charge(this.token.getUser().id, this.incident.id);
    }
    else {
      this.incidentService.commencer(this.incident.id);

    }
      window.location.reload();
      }

    else if (//this.buttonText = "Terminer"
      this.incident.status == "En cours" ){
      this.incidentService.terminer(this.incident.id)
      window.location.reload();
      }
    else {
      this.incidentService.valider(this.incident.id)
      window.location.reload();
      }
    }

    relancer(){
      this.incidentService.relancer(this.incident.id);
      window.location.reload();
    }

    refusSolution(){
      this.incidentService.refusSolution(this.incident.id);
      window.location.reload();
    }


  ngOnInit(): void {

    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showTechBoard = this.roles.includes('ROLE_TECH');
    }



    const incidentId = +this.route.snapshot.params['id'];
    this.incidentService.getIdIncident(incidentId).subscribe(data =>{
      this.incident = data;
      this.enAttente = (this.incident.status == "En attente")
      this.enCours = (this.incident.status == "En cours")
      this.termine = (this.incident.status == "Terminé")
      this.valide = (this.incident.status == "Validé")

      console.log("createur",this.incident.createur )

      if(this.incident.en_charge == null){
        this.attribue = true;
      }

      if (this.incident.status == "En attente"){
        if(this.incident.en_charge == null) {
          this.buttonIcon = "pan_tool"
          this.buttonText = "Prendre en charge"
        }
        else {
          this.buttonIcon = "play_arrow"
          this.buttonText = "Commencer"
        }
      }
      /*else if  (this.incident.status == "En cours"){
        this.buttonText = "Terminer"
      }*/
      else if (this.incident.status == "Terminé"){
        if(this.roles.includes('ROLE_ADMIN')){
        this.showButtonStatus = true;
        this.buttonIcon = "thumb_up"
        this.buttonText = "Valider la solution"}
        else {
          this.showButtonStatus = false;
        }
      }
      else {
        this.showButtonStatus = false;
      }


      this.userService.getUserbyId(this.incident.createur).subscribe(u =>{
        this.creat = u;

      });

      this.userService.getUserbyId(this.incident.en_charge).subscribe(c =>{
        this.charge = c;

      });

      this.diagnosticService.getDiagnostic(this.incident.id).subscribe(d => {
        this.diagnostic = d;
      })
    });

    console.log("incident",this.incident)

  }

  openAddProblem(): void {
    const dialogRef = this.dialog.open(AddProblemFormComponent, {
      width: '500px',

    });

    dialogRef.componentInstance.incidentId = this.incident.id;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openAddSolution(): void {
    const dialogRef = this.dialog.open(AddSolutionFormComponent, {
      width: '500px',

    });

    dialogRef.componentInstance.incidentId = this.incident.id;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');



    });
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(UpdateIncidentFormComponent, {
      width: '500px',

    });

    dialogRef.componentInstance.incidentId = this.incident.id;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  openAttribue() {
    const dialogRef = this.dialog.open(AttribueIncidentFormComponent, {
      width: '500px',

    });

    dialogRef.componentInstance.incidentId = this.incident.id;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  retour() {
    this.location.back();
  }

  openDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteFormComponent, {
      width: '500px',

    });

    dialogRef.componentInstance.incidentId = this.incident.id;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


}
