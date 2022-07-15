import { Component, OnInit } from '@angular/core';
import {Incident} from "../models/Incident";
import {IncidentService} from "../services/incident.service";

@Component({
  selector: 'app-incident-tab',
  templateUrl: './incident-tab.component.html',
  styleUrls: ['./incident-tab.component.css']
})
export class IncidentTabComponent implements OnInit {
  incidentTab! :  Incident[]
  displayedColumns: string[] = ['Id', 'Titre', 'Createur', 'Actions'];

  constructor(private incidentService : IncidentService) { }

  ngOnInit()  {
    this.incidentTab = this.incidentService.getAllIncident();
  }

}
