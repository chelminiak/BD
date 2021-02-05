import { AddTeamComponent } from './components/add-team/add-team.component';
import { TermComponent } from './components/term/term.component';
import { TeamComponent } from './components/team/team.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceComponent } from './components/place/place.component';
import { AddTermComponent } from './components/add-term/add-term.component';
import { AddPlaceComponent } from './components/add-place/add-place.component';


const routes: Routes = [
  {
    path: 'rejestracja',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'druzyny',
    component: TeamComponent
  },
  {
    path: 'terminy',
    component: TermComponent
  },
  {
    path: 'miejsca',
    component: PlaceComponent
  },
  {
    path: 'dodaj_druzyne',
    component: AddTeamComponent
  },
  {
    path: 'dodaj_termin',
    component: AddTermComponent
  },
  {
    path: 'dodaj_miejsce',
    component: AddPlaceComponent
  },
  { 
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
