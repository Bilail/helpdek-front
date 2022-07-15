import { Component, OnInit } from '@angular/core';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {IncidentService} from "../../services/incident.service";
import {Incident} from "../../models/Incident";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-add-incident-form',
  templateUrl: './add-incident-form.component.html',
  styleUrls: ['./add-incident-form.component.css']
})
export class AddIncidentFormComponent implements OnInit {

  private apiUrl = 'http://localhost:8080/api/incident/';

  incident! : Incident;

  constructor(private _formBuilder: FormBuilder,
              private incidentService : IncidentService,
              private HttpClient : HttpClient,
              private router:Router,
              private token: TokenStorageService
              ) {
  }

  form = this._formBuilder.group({
    titre : [null, [Validators.required]]
  });


  ngOnInit(): void {
    this.form = this._formBuilder.group({
      titre : [null, [Validators.required]],
      description : [null,[Validators.required]],
      createur : [this.token.getUser().id,[Validators.required]],
      categorie : [null,[Validators.required]],
      status : ["En attente",[Validators.required]],
      date_of_creation : [new Date(),[Validators.required]]
    })
  }
  create(form: FormGroup){
    this.HttpClient.post<Incident>(this.apiUrl+"addincident", form.value).subscribe(data =>
    this.incident = data

    )

    this.form.reset();
    window.location.reload();
    console.log("creer")


  }

}
