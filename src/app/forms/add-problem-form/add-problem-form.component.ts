import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {DiagnosticService} from "../../services/diagnostic.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Diagnostic} from "../../models/Diagnostic";
import {ActivatedRoute} from "@angular/router";
import {Incident} from "../../models/Incident";
import {IncidentService} from "../../services/incident.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-problem-form',
  templateUrl: './add-problem-form.component.html',
  styleUrls: ['./add-problem-form.component.css']
})
export class AddProblemFormComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
              private diagnosticService : DiagnosticService,
              private HttpClient : HttpClient,
              private route : ActivatedRoute,
              public dialog: MatDialog,
              private incidentService : IncidentService) { }

  d! : Diagnostic;
  incident! : Incident;

  @Input()
  public incidentId! : number;

  form = this._formBuilder.group({
    problem : [null, [Validators.required]]

  });

  ngOnInit(): void {
    //const incidentId = +this.route.snapshot.params['id'];
    console.log("icident id ", this.incidentId),
    this.diagnosticService.getDiagnostic(this.incidentId).subscribe(data => {
      this.d = data;
      this.incidentId = data.id
      console.log(this.d.problem)

      this.form = this._formBuilder.group({
        problem : [this.d.problem, [Validators.required]]
      });

      this.incidentService.getIdIncident(this.incidentId).subscribe(i => {
        this.incident = i
      });
    })
  }



  create(form: FormGroup){

    this.diagnosticService.addProblem(this.incidentId, form.get('problem')?.value)


    this.form.reset()
    this.dialog.closeAll();

  }

}
