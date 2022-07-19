import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Incident} from "../models/Incident";
import {IncidentService} from "../services/incident.service";
import {UpdateIncidentFormComponent} from "../forms/update-incident-form/update-incident-form.component";
import {MatDialog} from "@angular/material/dialog";
import {RoleUpdateFormComponent} from "../forms/role-update-form/role-update-form.component";
import {TokenStorageService} from "../services/token-storage.service";
import {Role} from "../models/Role";
import {Location} from "@angular/common";
import {ResetPswNoverifFormComponent} from "../forms/reset-psw-noverif-form/reset-psw-noverif-form.component";

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  user! : User;
  incidentTab! :  Incident[];
  incidentTabcree! : Incident[];
  showAdminBoard = false;
  showAdmin = false;
  showTech = false;
  showUser= false;

  displayedColumns: string[] = ['Id', 'Titre', 'Createur','Status', 'Actions'];

  constructor(private userService : UserService,
              private route : ActivatedRoute,
              private incidentService : IncidentService,
              public dialog: MatDialog,
              private token: TokenStorageService,
              private location: Location
              ) { }

  roles! : Role[];
  private roles_token! : string[];
  isLoggedIn = false;
  username! : string;

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles_token = user.roles;
      this.showAdminBoard = this.roles_token.includes('ROLE_ADMIN');
      this.username = this.token.getUser().username;
    }


    const userId = +this.route.snapshot.params['id'];



    this.userService.getUserbyId(userId).subscribe(data =>{
      this.user = data;
      console.log("id",this.user.id)


      this.incidentService.getIncidentsByEncharge(this.user.id).subscribe(tab => {
        this.incidentTab = tab;

      });

      this.incidentService.getIncidentByCreator(this.user.id).subscribe(cree => {
        this.incidentTabcree = cree;
      })

      this.userService.getUserRole(userId).subscribe(r => {
        this.roles = r;
        for(var role of this.roles){
          if(role.name == 'ROLE_ADMIN'){
            this.showAdmin = true;
          }
          if(role.name == 'ROLE_TECH'){
            this.showTech = true;
          }
          if(role.name == 'ROLE_USER'){
            this.showUser = true;
          }
        }
      })

    });


  }

  ViewIncident(id : number) {
    this.incidentService.viewIncident(id);
  }

  openRole(): void {
    const dialogRef = this.dialog.open(RoleUpdateFormComponent, {
      width: '500px',

    });

    dialogRef.componentInstance.userId = this.user.id;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  openPassword(): void {
    const dialogRef = this.dialog.open(ResetPswNoverifFormComponent, {
      width: '500px',

    });

    dialogRef.componentInstance.userId = this.user.id;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  retour() {
    this.location.back();
  }

}
