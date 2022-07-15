import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Incident} from "../models/Incident";
import {IncidentService} from "../services/incident.service";
import {Observable, Subscription} from "rxjs";
import {UserService} from "../services/user.service";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit , AfterViewInit {

  incidentTab! :  Incident[]
  dataSource! : MatTableDataSource<Incident>;

  displayedColumns: string[] = ['id', 'titre', 'createur','status', 'Actions'];

  constructor(private incidentService : IncidentService,
              private userService : UserService,
              private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit()  {
    this.incidentService.findAll().subscribe(data => {
      /*let c : string;
      data.forEach(e => this.userService.getUserbyId(e.id).subscribe( i => {
        c = i.nom;
        e.createur = c;
      }))*/
      this.incidentTab = data;

      this.dataSource = new MatTableDataSource(this.incidentTab)
      this.dataSource.sort = this.sort;
    });

  }

  ViewIncident(id : number) {
    this.incidentService.viewIncident(id);
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


}
