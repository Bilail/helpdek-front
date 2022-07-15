import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {IncidentService} from "../services/incident.service";
import {Summary} from "../models/Summary";
import {Incident} from "../models/Incident";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AccessService} from "../services/access.service";
import {TokenStorageService} from "../services/token-storage.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  miniCardData! : Summary[];
  en_attente! :Incident[];
  en_cours! : Incident[];
  termine! : Incident[];
  valide! : Incident[];

  dataSource_att! : MatTableDataSource<Incident>;
  dataSource_cours! : MatTableDataSource<Incident>;
  dataSource_term! : MatTableDataSource<Incident>;
  dataSource_vald! : MatTableDataSource<Incident>;

  @ViewChild('paginator_att') paginator_att! : MatPaginator;
  @ViewChild('paginator_cours') paginator_cours! : MatPaginator;
  @ViewChild('paginator_term') paginator_term! : MatPaginator;
  @ViewChild('paginator_vald') paginator_vald! : MatPaginator;




  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private incidentService : IncidentService,
              private accesService : AccessService,
              private token: TokenStorageService) { }




  nb_att! : number;

  isLoggedIn = false;
  showAdminBoard = false;
  private roles! : string[];


  displayedColumns: string[] = ['Id', 'Titre', 'Createur','Status', 'Actions'];




  ngOnInit() {

    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }

    if (this.showAdminBoard) {
      this.incidentService.getStatIncidentsbyStatus("En attente").subscribe(data => {
        this.nb_att = data;
        console.log(this.nb_att, data)
      })

      this.incidentService.getStatistique().subscribe({
        next: summaryData => {
          this.miniCardData = summaryData;
        }
      });

      this.incidentService.getIncidentsbyStatus("En attente").subscribe(att => {
        this.en_attente = att;
        this.dataSource_att = new MatTableDataSource<Incident>(this.en_attente)
        setTimeout(() => {
          this.dataSource_att.paginator = this.paginator_att;
          })

      });
      this.incidentService.getIncidentsbyStatus("En cours").subscribe(cours => {
        this.en_cours = cours;
        this.dataSource_cours = new MatTableDataSource<Incident>(this.en_cours)
        setTimeout(() => {
          this.dataSource_cours.paginator = this.paginator_cours;
        })
      });
      this.incidentService.getIncidentsbyStatus("Terminé").subscribe(term => {
        this.termine = term;
        this.dataSource_term = new MatTableDataSource<Incident>(this.termine)
        setTimeout(() => {
          this.dataSource_term.paginator = this.paginator_term;
        })
      });
      this.incidentService.getIncidentsbyStatus("Validé").subscribe(vald => {
        this.valide = vald;
        this.dataSource_vald = new MatTableDataSource<Incident>(this.valide)
        setTimeout(() => {
          this.dataSource_vald.paginator = this.paginator_vald;
        })
      });




    }

  }

  ViewIncident(id : number) {
    this.incidentService.viewIncident(id);
  }


}
