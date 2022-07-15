import {Component, OnInit, ViewChild} from '@angular/core';
import {AccessService} from "../services/access.service";
import {Summary} from "../models/Summary";
import {Observable} from "rxjs";
import {Incident} from "../models/Incident";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {IncidentService} from "../services/incident.service";
import {TokenStorageService} from "../services/token-storage.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord-user.component.html',
  styleUrls: ['./dashbord-user.component.css']
})
export class DashbordUserComponent implements OnInit {

  isLoggedIn = false;

  constructor(private breakpointObserver: BreakpointObserver,
              private incidentService : IncidentService,
              private accesService : AccessService,
              private token: TokenStorageService) { }


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

  userId! : number;
  incidentTab! :  Incident[]

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

  displayedColumns: string[] = ['id', 'titre', 'createur','status', 'actions'];

  ngOnInit(): void {

    this.isLoggedIn = !!this.token.getToken();

           this.incidentService.getStatistiqueByCreator(this.token.getUser().id).subscribe({
          next:summaryData => {
            this.miniCardData = summaryData;
            this.userId = this.token.getUser().id;
          }
        });

        this.incidentService.getIncidentByCreator(this.token.getUser().id).subscribe(it =>{
           this.incidentTab = it;
        })

    this.incidentService.getIncidentByStatusAndCreator("En attente",this.userId).subscribe(att => {
      this.en_attente = att;
      this.dataSource_att = new MatTableDataSource<Incident>(this.en_attente)
      setTimeout(() => {
        this.dataSource_att.paginator = this.paginator_att;
      })

    });
    this.incidentService.getIncidentByStatusAndCreator("En cours",this.userId).subscribe(cours => {
      this.en_cours = cours;
      this.dataSource_cours = new MatTableDataSource<Incident>(this.en_cours)
      setTimeout(() => {
        this.dataSource_cours.paginator = this.paginator_cours;
      })
    });
    this.incidentService.getIncidentByStatusAndCreator("Terminé",this.userId).subscribe(term => {
      this.termine = term;
      this.dataSource_term = new MatTableDataSource<Incident>(this.termine)
      setTimeout(() => {
        this.dataSource_term.paginator = this.paginator_term;
      })
    });
    this.incidentService.getIncidentByStatusAndCreator("Validé",this.userId).subscribe(vald => {
      this.valide = vald;
      this.dataSource_vald = new MatTableDataSource<Incident>(this.valide)
      setTimeout(() => {
        this.dataSource_vald.paginator = this.paginator_vald;
      })
    })

  }

  ViewIncident(id : number) {
    this.incidentService.viewIncident(id);
  }

}
