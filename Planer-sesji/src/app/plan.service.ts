import { Place, Term } from './classes';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  places: Place[];
  terms: Term[];

  constructor(private http: HttpClient) { 
  }
  regGM(login, email, password, name, system, system2, system3, experience){
    return this.http.post("https://g19.labagh.pl/php/register_master.php", { login, email, password, name, system, system2, system3, experience }, {responseType: 'text'})
    .pipe(map((res) => {
      console.log(res)
      return res
    }),
    catchError(this.handleProfileError));
  }

  regBG(login, email, password, name, system, system2, system3, experience){
    return this.http.post("https://g19.labagh.pl/php/register_player.php", { login, email, password, name, system, system2, system3, experience }, {responseType: 'text'})
    .pipe(map((res) => {
      console.log(res)
      return res
    }),
    catchError(this.handleProfileError));
  }
  
  handleProfileError(error: HttpErrorResponse){
    if(error.status==422){
      return throwError('Błąd rejestracji. Proszę spróbować później')
    }
  }

  log(login, password){
    return this.http.post("https://g19.labagh.pl/php/logon.php", { login, password })
    .pipe(map((res) => {
      sessionStorage.setItem('user', login);
      sessionStorage.setItem('type', JSON.stringify(res))
      return JSON.stringify(res)
    }),
    catchError(this.handleLoginError));
  }

  logout(){
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('type')
    window.location.reload()
  }

  handleLoginError(error: HttpErrorResponse){
      return throwError('Nieprawidłowa nazwa użytkownika lub hasło!')
  }

  getPlaces(login){
    return this.http.post("https://g19.labagh.pl/php/get_place.php", login)
    .pipe(map((res: Place[]) => {
      console.log(res);
      this.places = res;
      return this.places;    
    }),
    catchError(this.handleGetError));
  }

  getTerms(login){
    return this.http.post("https://g19.labagh.pl/php/get_termin.php", login)
    .pipe(map((res: Term[]) => {
      console.log(res);
      this.terms = res;
      return this.terms;    
    }),
    catchError(this.handleGetError));
  }

  handleGetError(error: HttpErrorResponse){
    return throwError('Wystąpił błąd. Proszę spróbować później')
  }
}
