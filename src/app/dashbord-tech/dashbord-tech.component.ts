import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {IncidentService} from "../services/incident.service";
import {AccessService} from "../services/access.service";
import {TokenStorageService} from "../services/token-storage.service";
import {Summary} from "../models/Summary";
import {Observable} from "rxjs";
import {Incident} from "../models/Incident";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-dashbord-tech',
  templateUrl: './dashbord-tech.component.html',
  styleUrls: ['./dashbord-tech.component.css']
})
export class DashbordTechComponent implements OnInit {


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
              private token: TokenStorageService,
              private _liveAnnouncer: LiveAnnouncer) { }

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


  nb_att! : number;

  isLoggedIn = false;
  showTechBoard = false;
  showAdminBoard = false;
  private roles! : string[];
  userId! : number;

  incidentTabNonAttribue! :  Incident[]
  dataSource! : MatTableDataSource<Incident>;


  displayedColumns: string[] = ['id', 'titre', 'createur','status', 'actions'];




  ngOnInit() {

    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.userId = this.token.getUser().id;

      this.showTechBoard = this.roles.includes('ROLE_TECH');
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN')
    }

    if (this.showTechBoard || this.showAdminBoard) {
      this.incidentService.getStatIncidentsbyStatus("En attente").subscribe(data => {
        this.nb_att = data;
        console.log(this.nb_att, data)
      })

      this.incidentService.getStatistiqueByEncharge(this.userId).subscribe({
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
      this.incidentService.getIncidentByStatusAndEncharge("En cours",this.userId).subscribe(cours => {
        this.en_cours = cours;
        this.dataSource_cours = new MatTableDataSource<Incident>(this.en_cours)
        setTimeout(() => {
          this.dataSource_cours.paginator = this.paginator_cours;
        })
      });
      this.incidentService.getIncidentByStatusAndEncharge("Terminé",this.userId).subscribe(term => {
        this.termine = term;
        this.dataSource_term = new MatTableDataSource<Incident>(this.termine)
        setTimeout(() => {
          this.dataSource_term.paginator = this.paginator_term;
        })
      });
      this.incidentService.getIncidentByStatusAndEncharge("Validé",this.userId).subscribe(vald => {
        this.valide = vald;
        this.dataSource_vald = new MatTableDataSource<Incident>(this.valide)
        setTimeout(() => {
          this.dataSource_vald.paginator = this.paginator_vald;
        })
      });


      this.incidentService.getIncidentNonAttribue().subscribe(data =>{
        this.incidentTabNonAttribue = data;

        this.dataSource = new MatTableDataSource(this.incidentTabNonAttribue)
        this.dataSource.sort = this.sort;
      })

    }

  }

  @ViewChild(MatSort ,{static: false}) sort! : MatSort;



  ngAfterViewInit() {

  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  ViewIncident(id : number) {
    this.incidentService.viewIncident(id);
  }


}
