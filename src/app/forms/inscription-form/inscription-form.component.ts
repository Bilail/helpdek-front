import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  form: any = {};

  /*hide = true;
  login = this._formBuilder.group({
    email : [Validators.required, Validators.email]
  });*/

  constructor(private _formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    /*this.login = this._formBuilder.group({
      email : [null, [Validators.required, Validators.email]],
      mdp : [null,[Validators.required]],
      nom : [null,[Validators.required]],
      prenom : [null,[Validators.required]],
      bureau : [null,[Validators.required]],
      tel : [null,[Validators.required]],
      username : [null,[Validators.required]],
    })*/
  }

  connect(login : FormGroup){
    console.log("connecter")
    alert('Succes'+JSON.stringify(login.value,null,4));

  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
        (data: any) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
        (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
