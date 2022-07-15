import { Component, OnInit, Inject } from '@angular/core';
import {AddIncidentFormComponent} from "../forms/add-incident-form/add-incident-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddIncidentFormComponent, {
      width: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}



