import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-psw-noverif-form',
  templateUrl: './reset-psw-noverif-form.component.html',
  styleUrls: ['./reset-psw-noverif-form.component.css']
})
export class ResetPswNoverifFormComponent implements OnInit {

  constructor(private userService : UserService,
              private _formBuilder: FormBuilder) { }

  @Input()
  userId! : number

  form = this._formBuilder.group({
    password : [null, [Validators.required]]

  });

  ngOnInit(): void {
  }

  public submit(){
    this.userService.updatePassword(this.userId, this.form.get('password')?.value)
    window.location.reload();
  }

}
