import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TermComponent } from './components/term/term.component';
import { TeamComponent } from './components/team/team.component';
import { PlaceComponent } from './components/place/place.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AddTermComponent } from './components/add-term/add-term.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    TermComponent,
    TeamComponent,
    PlaceComponent,
    AddPlaceComponent,
    AddTeamComponent,
    AddTermComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
