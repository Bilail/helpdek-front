import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {IncidentListComponent} from "./incident-list/incident-list.component";
import {HomeComponent} from "./home/home.component";
import {SingleIncidentComponent} from "./single-incident/single-incident.component";
import {ProfilComponent} from "./profil/profil.component";
import {DASH} from "@angular/cdk/keycodes";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {IncidentTabComponent} from "./incident-tab/incident-tab.component";
import {UserListComponent} from "./user-list/user-list.component";
import {SingleUserComponent} from "./single-user/single-user.component";
import {ConnexionFormComponent} from "./forms/connexion-form/connexion-form.component";
import {InscriptionFormComponent} from "./forms/inscription-form/inscription-form.component";
import {DashbordUserComponent} from "./dashbord-user/dashbord-user.component";
import {DashbordTechComponent} from "./dashbord-tech/dashbord-tech.component";
import {UpdateProfilFormComponent} from "./forms/update-profil-form/update-profil-form.component";

const routes : Routes = [
  {path : 'incidentlist', component: IncidentListComponent},
  {path : 'Home', component : HomeComponent},
  {path : '', component : HomeComponent},
  {path : 'incident/:id', component : SingleIncidentComponent},
  {path : 'Profil', component : ProfilComponent },
  {path : 'Dashboard', component : DashboardComponent},
  {path : 'Incidents', component : IncidentListComponent},
  {path : 'tab' , component : IncidentTabComponent},
  {path : 'Utilisateurs', component : UserListComponent},
  {path : 'user/:id', component : SingleUserComponent},
  {path : 'connexion', component : ConnexionFormComponent },
  {path : 'inscription', component : InscriptionFormComponent},
  {path : "DashboardUser", component : DashbordUserComponent},
  {path : "DashboardTech", component : DashbordTechComponent},
  {path : "Useruptade", component : UpdateProfilFormComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
  RouterModule
    ]
})
export class AppRoutingModule {}
