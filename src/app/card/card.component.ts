import { Component, OnInit, Input } from '@angular/core';
import {Incident} from "../models/Incident";
import {ResetPswNoverifFormComponent} from "../forms/reset-psw-noverif-form/reset-psw-noverif-form.component";
import {MatDialog} from "@angular/material/dialog";
import {IncidentTabComponent} from "../incident-tab/incident-tab.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title! : string;
  @Input() data! : Incident[];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openTab(): void {
    const dialogRef = this.dialog.open(IncidentTabComponent, {
      width: '1000px',

    });

    dialogRef.componentInstance.data = this.data;


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
