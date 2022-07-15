import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AddIncidentFormComponent} from "../forms/add-incident-form/add-incident-form.component";
import {MatDialog} from "@angular/material/dialog";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog,
              private tokenStorageService: TokenStorageService) {}


  openDialog(): void {
    const dialogRef = this.dialog.open(AddIncidentFormComponent, {
      width: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  private roles!: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showTechBoard = false;
  username!: string;

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showTechBoard = this.roles.includes('ROLE_TECH');
      this.username = user.username;
      console.log("role", this.roles)
    }
  }


}
