import { Component, OnInit, Input } from '@angular/core';
import { Incident } from '../models/Incident'
import {IncidentService} from "../services/incident.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-incident-component',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  buttonText! : string


  @Input() incident! : Incident;

  constructor(private incidentService : IncidentService,
              private router:Router) { }

  onClickStatus(){


    if(this.buttonText === 'Prendre'){
      this.buttonText = 'Annuler';

    }
    else{
      this.buttonText = 'Prendre';
    }
  }


  ngOnInit(): void {
    this.buttonText  = 'Prendre'
  }

  onViewIncident() {
    console.log('ouvrir');
    this.router.navigateByUrl(`incident/${this.incident.id}`)
  }
}
