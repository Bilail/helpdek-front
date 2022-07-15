import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncidentService} from "../../services/incident.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";
import {Incident} from "../../models/Incident";
import {UserService} from "../../services/user.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../../models/User";

@Component({
  selector: 'app-update-profil-form',
  templateUrl: './update-profil-form.component.html',
  styleUrls: ['./update-profil-form.component.css']
})
export class UpdateProfilFormComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
              private userService : UserService,
              private HttpClient : HttpClient,
              private router:Router,
              private route : ActivatedRoute,
              private token: TokenStorageService
  ) {
  }

  form = this._formBuilder.group({
    bureau : [null, [Validators.required]],
    telephone : [null, [Validators.required]],
    mail : [null,[Validators.required]],

  });

  @Input()
  public userId! : number;
  user! : User;

  private apiUrl = 'http://localhost:8080/api/user/';

  ngOnInit(): void {

    this.userService.getUserbyId(this.userId).subscribe(data =>{

      this.user = data;


      this.form = this._formBuilder.group({
        bureau : [this.user.id, [Validators.required]],
        telephone : [this.user.tel, [Validators.required]],
        mail : [this.user.mail,[Validators.required]],
      })

    })


  }
  create(form: FormGroup){
    alert('Succes'+JSON.stringify(form.value,null,4));
    this.HttpClient.get(this.apiUrl+"update/"+
      this.userId
      +"/"+ form.get('bureau')?.value
      +"/"+ form.get('mail')?.value
      +"/"+ form.get('mail')?.value).subscribe(   )


    this.form.reset();
    //this.router.navigateByUrl(`incident/${this.incident.id}`);
    console.log("creer")


  }

}
