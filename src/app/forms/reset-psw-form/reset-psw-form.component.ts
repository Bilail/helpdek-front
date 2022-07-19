import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-reset-psw-form',
  templateUrl: './reset-psw-form.component.html',
  styleUrls: ['./reset-psw-form.component.css']
})
export class ResetPswFormComponent implements OnInit {


  ngOnInit(): void {
  }
  firstFormGroup = this._formBuilder.group({
    username: ['', Validators.required],
    mail: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
  });
  isLinear = true;

  constructor( private userService : UserService,
               private _formBuilder: FormBuilder,
               private location: Location) {}

  public submit(){
    this.userService.paswordforgot(this.firstFormGroup.get('username')?.value, this.firstFormGroup.get('mail')?.value,this.secondFormGroup.get('password')?.value )
  }

  retour() {
    this.location.back();
  }

}
