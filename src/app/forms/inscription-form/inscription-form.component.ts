import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";


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
  directions = ["Bureau d'ordre", "Direction informatique"]
  //filteredDirection! : Observable<string[]>;
  /*hide = true;
  login = this._formBuilder.group({
    email : [Validators.required, Validators.email]
  });*/
  direction = new FormControl('');

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
    })
    this.filteredDirection = this.direction.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );*/
  }
  /*private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.directions.filter(option => option.toLowerCase().includes(filterValue));
  }*/


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
