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
  res: string
  login: Login[];
  regGM(login, email, password, name, system, system2, system3, experience){
    return this.http.post("https://g19.labagh.pl/php/register_master", { login, email, password, name, system, system2, system3, experience })
    .pipe(map((res)=> {
      return res;
    }),
    catchError(this.handleProfileError));
  }

  regBG(login, email, password, name, system, system2, system3, experience){
    return this.http.post("https://g19.labagh.pl/php/register_player.php", { login, email, password, name, system, system2, system3, experience })
    .pipe(map((res)=> {
      return res;
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
      this.login = res['data'];
      localStorage.setItem('user', JSON.stringify(login));
      localStorage.setItem('type', res['data'])
      return this.login;
    }),
    catchError(this.handleLoginError));
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('type')
  }

  handleLoginError(error: HttpErrorResponse){
      return throwError('Nieprawidłowa nazwa użytkownika lub hasło!')
  }
}
