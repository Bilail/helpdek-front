import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {DiagnosticService} from "../../services/diagnostic.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Diagnostic} from "../../models/Diagnostic";
import {ActivatedRoute} from "@angular/router";
import {IncidentService} from "../../services/incident.service";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-add-solution-form',
  templateUrl: './add-solution-form.component.html',
  styleUrls: ['./add-solution-form.component.css']
})
export class AddSolutionFormComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
             private diagnosticService : DiagnosticService,
             private HttpClient : HttpClient,
             private route : ActivatedRoute,
              public dialog: MatDialog,
              private incidentService : IncidentService) { }



  d! : Diagnostic;

  @Input()
  public incidentId! : number;

  form = this._formBuilder.group({
    solution : [null, [Validators.required]]

  });

  ngOnInit(): void {
    //const incidentId = +this.route.snapshot.params['id'];
    console.log("icident id ", this.incidentId),
      this.diagnosticService.getDiagnostic(this.incidentId).subscribe(data => {
        this.d = data;
        this.incidentId = data.id
        console.log(this.d.solution)

        this.form = this._formBuilder.group({
          solution : [this.d.solution, [Validators.required]]
        });
      })

  }



  create(form: FormGroup){

    this.diagnosticService.addSolution(this.incidentId, form.get('solution')?.value)

    this.incidentService.terminer(this.incidentId );
    this.form.reset()
    this.dialog.closeAll();
  }

}
