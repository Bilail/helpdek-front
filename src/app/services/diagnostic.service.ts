import {Injectable} from "@angular/core";
import {Incident} from "../models/Incident";
import {Summary} from "../models/Summary";
import {Observable, of} from "rxjs";
import {Router} from "@angular/router";


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from "rxjs/operators";
import {FormGroup} from "@angular/forms";
import {Diagnostic} from "../models/Diagnostic";

@Injectable({
  providedIn: 'root'
})

export class DiagnosticService {

  private apiUrl = 'http://localhost:8080/api/diagnostic/';
  constructor(private router:Router, private HttpClient : HttpClient) {
  }

  getDiagnostic(id : number) : Observable<Diagnostic> {
    const d = this.HttpClient.get<Diagnostic>(this.apiUrl+id);
  if(d){
    return d;}
  else {
    throw new Error('Incident non trouvé')
    }
  }

  addProblem(id : number, problem : string){
    this.HttpClient.get(this.apiUrl+ "problem/" + id + "/" + problem).subscribe();

  }

  addSolution(id : number, solution : string){
    this.HttpClient.get(this.apiUrl+ "solution/" + id + "/" + solution).subscribe();

  }


}
