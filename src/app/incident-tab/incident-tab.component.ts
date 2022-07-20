import {Component, Input, OnInit} from '@angular/core';
import {Incident} from "../models/Incident";
import {IncidentService} from "../services/incident.service";

@Component({
  selector: 'app-incident-tab',
  templateUrl: './incident-tab.component.html',
  styleUrls: ['./incident-tab.component.css']
})
export class IncidentTabComponent implements OnInit {

  @Input()
  data! :  Incident[]

  displayedColumns: string[] = ['Id', 'Titre', 'Createur','Catégorie','Création', 'Actions'];

  constructor(private incidentService : IncidentService) { }

  ngOnInit()  {

  }

  ViewIncident(id : number) {
    this.incidentService.viewIncident(id);
  }

}
