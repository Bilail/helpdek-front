import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncidentService} from "../../services/incident.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-attribue-incident-form',
  templateUrl: './attribue-incident-form.component.html',
  styleUrls: ['./attribue-incident-form.component.css']
})
export class AttribueIncidentFormComponent implements OnInit {

  @Input()
  public incidentId! : number;

  techs! : User[];


  constructor(private _formBuilder: FormBuilder,
              private userService : UserService,
              public dialog: MatDialog,
              private incidentService : IncidentService) { }

  form = this._formBuilder.group({
    tech : [null, [Validators.required]]
  });

  ngOnInit(): void {
    this.userService.getAllTech().subscribe(data => {
      this.techs = data;
      console.log(data)
    })
  }

  submit(form: FormGroup){
    this.incidentService.prendre_en_charge(form.get('tech')?.value, this.incidentId)
    this.form.reset()
    this.dialog.closeAll();
  }

}
