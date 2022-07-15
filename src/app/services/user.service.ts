import {Injectable} from "@angular/core";
import {Incident} from "../models/Incident";
import {Summary} from "../models/Summary";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../models/User";


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormGroup} from "@angular/forms";
import {Role} from "../models/Role";
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private router:Router,
              private HttpClient : HttpClient) {
  }


  private apiUrl = 'http://localhost:8080/api/user/';


  getAllUser(){
    return this.HttpClient.get<User[]>(this.apiUrl+"alluser");
  }

  getAllTech(){
    return this.HttpClient.get<User[]>(this.apiUrl+"alltech");
  }

  getUserbyId(id : number): Observable<User> {
    const user = this.HttpClient.get<User>(this.apiUrl+id);
    if (user) {
      return user }
    else {
      throw new Error('Utilisateurs non trouvé')
    }
  }



  viewUser(id: number) {
    this.router.navigateByUrl(`user/${id}`)
  }

  getUserRole(id : number){
    return this.HttpClient.get<Role[]>(this.apiUrl+"get/role/"+id);
  }

  addRole(id: number, role : string){
    this.HttpClient.get(this.apiUrl+"role/"+id+"/"+role).subscribe();
  }


  /*public create_user(f : FormGroup){

    let nom = f.get('nom')?.value;
    let prenom = f.get('prenom')?.value;
    let bureau = f.get('bureau')?.value;
    let mail = f.get('mail')?.value;
    let pswd = f.get('password')?.value;
    let tel = f.get('telephone')?.value;


    let u = new User(nom, prenom, bureau, mail, pswd , tel)
    this.HttpClient.post<User>(this.apiUrl+"adduser",u);
  }

  public login(mail : string, psw : string) : User{
    let user! : User;
      this.HttpClient.get<User>(this.apiUrl+"login/"+mail+"/"+psw).subscribe(data =>{
      user = data;
    });

    if (user) {
      sessionStorage.setItem('userId', String(user.id));
      return user }
    else {
      throw new Error('Identifiant Incorrect')
    }
  }*/






}
