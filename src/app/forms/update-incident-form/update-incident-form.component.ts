import {Component, Input, OnInit} from '@angular/core';
import {Incident} from "../../models/Incident";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncidentService} from "../../services/incident.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-incident-form',
  templateUrl: './update-incident-form.component.html',
  styleUrls: ['./update-incident-form.component.css']
})
export class UpdateIncidentFormComponent implements OnInit {

  private apiUrl = 'http://localhost:8080/api/incident/';

  incident! : Incident;

  constructor(private _formBuilder: FormBuilder,
              private incidentService : IncidentService,
              private HttpClient : HttpClient,
              private router:Router,
              private route : ActivatedRoute,
              private token: TokenStorageService
  ) {
  }

  form = this._formBuilder.group({
    id : [null, [Validators.required]],
    titre : [null, [Validators.required]],
    description : [null,[Validators.required]],
    createur : [null,[Validators.required]],
    categorie : [null,[Validators.required]],
    status : [null,[Validators.required]]

  });

  @Input()
  public incidentId! : number;


  ngOnInit(): void {

    this.incidentService.getIdIncident(this.incidentId,).subscribe(data =>{

      this.incident = data;


      this.form = this._formBuilder.group({
        id : [this.incident.id, [Validators.required]],
        titre : [this.incident.titre, [Validators.required]],
        description : [this.incident.description,[Validators.required]],
        createur : [this.incident.createur,[Validators.required]],
        categorie : [this.incident.categorie,[Validators.required]],
        status : [this.incident.status,[Validators.required]],
        date_of_creation : [new Date(),[Validators.required]]
      })

    })


  }
  create(form: FormGroup){
    alert('Succes'+JSON.stringify(form.value,null,4));
    this.HttpClient.post<Incident>(this.apiUrl+"addincident", form.value).subscribe(data =>
      this.incident = data

    )

    this.form.reset();
    this.router.navigateByUrl(`incident/${this.incident.id}`);
    console.log("creer")


  }


}
