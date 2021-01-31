import { Place, Term } from './classes';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  places: Place[];
  terms: Term[];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
    return this.http.post("https://g19.labagh.pl/php/get_place.php", { login })
    .pipe(map((data) => {
      this.places = data['data']
      return this.places
    }),
    catchError(this.handleGetError));
  }

  getTerms(login){
    return this.http.post("https://g19.labagh.pl/php/get_termin.php", { login })
    .pipe(map((res) => {
      console.log(res)
      console.log(JSON.stringify(res));
      return this.terms;    
    }),
    catchError(this.handleGetError));
  }

  handleGetError(error: HttpErrorResponse){
    if(error.status == 404){
      return throwError('Nie znaleziono miejsc, stworzonych przez ciebie')
    } else{
      return throwError('Wystąpił błąd. Proszę spróbować później')
    }
  }
}
