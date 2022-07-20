import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {AddSolutionFormComponent} from "../forms/add-solution-form/add-solution-form.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdateProfilFormComponent} from "../forms/update-profil-form/update-profil-form.component";
import {ResetPswNoverifFormComponent} from "../forms/reset-psw-noverif-form/reset-psw-noverif-form.component";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  currentUser: any;
  user! : User;
  isLoggedIn = false;
  password! : string;


  constructor(private userService : UserService,private token: TokenStorageService, public dialog: MatDialog,) { }

  ngOnInit() {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
    //this.password = this.token.getUser().getPassword();
    if(this.isLoggedIn) {
      this.userService.getUserbyId(this.currentUser.id).subscribe(data => {
        this.user = data;


      });
    }
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(UpdateProfilFormComponent, {
      width: '500px',

    });

    dialogRef.componentInstance.userId = this.user.id;

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();


    });
  }

  openPasswordUpdate(): void {
    const dialogRef = this.dialog.open(UpdateProfilFormComponent, {
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

}
