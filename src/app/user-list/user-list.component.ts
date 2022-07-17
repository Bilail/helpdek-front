import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../models/User";
import {UserService} from "../services/user.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'Nom', 'Prenom', 'Actions'];
  userlist! : User[]

  constructor(private userService : UserService,
              private _liveAnnouncer: LiveAnnouncer,
              private token: TokenStorageService) { }

  isLoggedIn = false;
  showAdminBoard = false;
  private roles! : string[];

  ngOnInit(): void {

    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }

    this.userService.getAllUser().subscribe(data => {
      this.userlist = data;

    })
  }

  ViewUser(id : number) {
    this.userService.viewUser(id);
  }


}
