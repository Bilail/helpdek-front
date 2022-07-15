import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table'


import { AppComponent } from './app.component';
import { IncidentComponent } from './incident-component/incident.component';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { SingleIncidentComponent } from './single-incident/single-incident.component';
import { ProfilComponent } from './profil/profil.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentTabComponent } from './incident-tab/incident-tab.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CardComponent } from './card/card.component';
import {NgChartsModule} from "ng2-charts";
import { MiniCardComponent } from './mini-card/mini-card.component';
import { AddIncidentFormComponent } from './forms/add-incident-form/add-incident-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnexionFormComponent } from './forms/connexion-form/connexion-form.component';
import {MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { UserListComponent } from './user-list/user-list.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { InscriptionFormComponent } from './forms/inscription-form/inscription-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProblemFormComponent } from './forms/add-problem-form/add-problem-form.component';
import {MatTabsModule} from "@angular/material/tabs";
import { AddSolutionFormComponent } from './forms/add-solution-form/add-solution-form.component';
import { DashbordUserComponent } from './dashbord-user/dashbord-user.component';
import { DashbordTechComponent } from './dashbord-tech/dashbord-tech.component';
import { UpdateIncidentFormComponent } from './forms/update-incident-form/update-incident-form.component';
import { AttribueIncidentFormComponent } from './forms/attribue-incident-form/attribue-incident-form.component';
import { RoleUpdateFormComponent } from './forms/role-update-form/role-update-form.component';
import { UpdateProfilFormComponent } from './forms/update-profil-form/update-profil-form.component';
import { ResetPswFormComponent } from './forms/reset-psw-form/reset-psw-form.component';


@NgModule({
  declarations: [
    AppComponent,
    IncidentComponent,
    IncidentListComponent,
    HeaderComponent,
    HomeComponent,
    SingleIncidentComponent,
    ProfilComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    IncidentTabComponent,
    NavigationComponent,
    CardComponent,
    MiniCardComponent,
    AddIncidentFormComponent,
    ConnexionFormComponent,
    UserListComponent,
    SingleUserComponent,
    InscriptionFormComponent,
    AddProblemFormComponent,
    AddSolutionFormComponent,
    DashbordUserComponent,
    DashbordTechComponent,
    UpdateIncidentFormComponent,
    AttribueIncidentFormComponent,
    RoleUpdateFormComponent,
    UpdateProfilFormComponent,
    ResetPswFormComponent,


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatTableModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        NgChartsModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        BrowserModule,
        HttpClientModule,
        MatTabsModule,
        MatSortModule,


    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
