import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../models/Role";

@Component({
  selector: 'app-role-update-form',
  templateUrl: './role-update-form.component.html',
  styleUrls: ['./role-update-form.component.css']
})
export class RoleUpdateFormComponent implements OnInit {

  @Input()
  userId! : number
  roles! : Role[];
  isTech = false;
  isAdmin = false;
  isUser = false;

  constructor(private userService : UserService,
              private token: TokenStorageService,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUserRole(this.userId).subscribe(r => {
      this.roles = r;
      for(var role of this.roles){
        if(role.name == 'ROLE_ADMIN'){
          this.isAdmin = true;
        }
        if(role.name == 'ROLE_TECH'){
          this.isTech = true;
        }
        if(role.name == 'ROLE_USER'){
          this.isUser = true;
        }
      }
    })
  }

  form = this._formBuilder.group({
    role : [null, [Validators.required]]
  });

  submit(form: FormGroup){
    this.userService.addRole(this.userId,form.get('role')?.value);
  console.log(form.get('role')?.value)
    this.form.reset();
    window.location.reload();
  }

}
