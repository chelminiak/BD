import { Profile, Login } from './classes';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { 
  }
  profile: Profile[];
  login: Login[];
  regGM(profile: Profile): Observable<Profile[]>{
    return this.http.post("https://g19.labagh.pl/php/register_master.php", { data: profile })
    .pipe(map((res)=> {
      this.profile = res['data'];
      return this.profile;
    }),
    catchError(this.handleProfileError));
  }

  regBG(profile: Profile): Observable<Profile[]>{
    return this.http.post("https://g19.labagh.pl/php/register_player.php", { data: profile })
    .pipe(map((res)=> {
      this.profile = res['data'];
      return this.profile;
    }),
    catchError(this.handleProfileError));
  }
  
  handleProfileError(error: HttpErrorResponse){
    if(error.status==422){
      return throwError('Błąd rejestracji. Proszę spróbować później')
    }
  }

  log(login: Login){
    return this.http.post("https://g19.labagh.pl/php/logon.php", { data: login })
    .pipe(map((res) => {
      this.login = res['data'];
      return this.login;
    }),
    catchError(this.handleLoginError));
  }

  handleLoginError(error: HttpErrorResponse){
      return throwError('Nieprawidłowa nazwa użytkownika lub hasło!')
  }
}
