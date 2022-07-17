import {Component, Input, OnInit} from '@angular/core';
import {IncidentService} from "../../services/incident.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmation-delete-form',
  templateUrl: './confirmation-delete-form.component.html',
  styleUrls: ['./confirmation-delete-form.component.css']
})
export class ConfirmationDeleteFormComponent implements OnInit {

  @Input()
  public incidentId! : number;

  constructor(private incidentService : IncidentService,
              private router:Router) { }

  ngOnInit(): void {
  }

  delete(){
    this.incidentService.deleteIncident(this.incidentId);
    window.location.replace(`DashboardUser`);
   this.router.navigateByUrl(`DashboardUser`);
  //  window.location.reload();
  }

}
