import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-connexion-form',
  templateUrl: './connexion-form.component.html',
  styleUrls: ['./connexion-form.component.css']
})
export class ConnexionFormComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private _formBuilder: FormBuilder,
              private service : UserService,
              private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  goToInscription() {

  }



  /*
    hide = true;
    login = this._formBuilder.group({
      email : [Validators.required, Validators.email]
    });

    email = new FormControl('', [Validators.required, Validators.email]);
    mdp = new FormControl('', [Validators.required]);

    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'Champs requis';
      }
      if (this.mdp.hasError('required')) {
        return 'Champs requis';
      }

      return this.email.hasError('email') ? 'Not a valid email' : '';
    }*/



  /*ngOnInit(): void {
    this.login = this._formBuilder.group({
      email : [null, [Validators.required, Validators.email]],
      mdp : [null,[Validators.required]]
    })
  }

connect(login : FormGroup){
    console.log("connecter")
  alert('Succes'+JSON.stringify(login.value,null,4));
    this.service.login(login.get('email')?.value, login.get('mdp')?.value,)

}

*/


}
