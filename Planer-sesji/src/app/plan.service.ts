import { Place, Term, Team, Master, Player } from './classes';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  places: Place[];
  place: Place;
  terms: Term[];
  teams: Team[];
  team: Team;
  players: Player[];
  master: Master;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { 
  }
  regGM(login, email, password, name, system, system2, system3, experience, city){
    return this.http.post("https://g19.labagh.pl/php/register_master.php", { login, email, password, name, system, system2, system3, experience, city }, {responseType: 'text'})
    .pipe(map((res) => {
      return res
    }),
    catchError(this.handleProfileError));
  }

  regBG(login, email, password, name, system, system2, system3, experience, city){
    return this.http.post("https://g19.labagh.pl/php/register_player.php", { login, email, password, name, system, system2, system3, experience, city}, {responseType: 'text'})
    .pipe(map((res) => {
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
    catchError(this.handleGetError))
  }

  delPlace(login, id){
    return this.http.post("https://g19.labagh.pl/php/del_place.php", { login, id })
    .pipe(map((data)=> {
      return data
    }),
    catchError(this.handleDelError))
  }

  addPlace(login, address, city, max_people, kitchen, type, floor, elevator){
    return this.http.post("https://g19.labagh.pl/php/add_place.php", { login, address, city, max_people, kitchen, type, floor, elevator }, {responseType: 'text'})
    .pipe(map((data) => {
      return data
    }),
    catchError(this.handleAddError)
    )
  }

  getTerms(login){
    return this.http.post("https://g19.labagh.pl/php/get_termin.php", { login })
    .pipe(map((data) => {
      this.terms = data['data']
      return this.terms;    
    }),
    catchError(this.handleGetError));
  }

  delTerm(login, id){
    return this.http.post("https://g19.labagh.pl/php/del_termin.php", { login, id })
    .pipe(map((data)=> {
      return data
    }),
    catchError(this.handleDelError))
  }

  addTerm(login, id, system, start, stop){
    return this.http.post("https://g19.labagh.pl/php/add_termin.php", { login, id, system, start, stop }, {responseType: 'text'})
    .pipe(map((data) => {
      return data
    }),
    catchError(this.handleAddError)
    )
  }

  getTeams(login){
    return this.http.post("https://g19.labagh.pl/php/get_team.php", { login })
    .pipe(map((data) => {
      this.teams = data['data']
      return this.teams;    
    }),
    catchError(this.handleGetError));
  }

  delTeam(login, id){
    return this.http.post("https://g19.labagh.pl/php/del_team.php", { login, id })
    .pipe(map((data)=> {
      return data
    }),
    catchError(this.handleDelError))
  }

  addTeam(login, max_people, system, num_sessions, name){
    return this.http.post("https://g19.labagh.pl/php/add_team.php", { login, max_people, system, num_sessions, name }, {responseType: 'text'})
    .pipe(map((data) => {
      return data
    }),
    catchError(this.handleAddError)
    )
  }

  resolveMaster(id){
    return this.http.post("https://g19.labagh.pl/php/resolver_m.php", { id })
    .pipe(map((data) => {
      this.master = data['data'][0]
      return this.master;    
    }),
    catchError(this.handleResolverError))
  }

  resolveTeam(id){
    return this.http.post("https://g19.labagh.pl/php/resolver_team.php", { id })
    .pipe(map((data) => {
      this.team = data['data']
      return this.team;    
    }),
    catchError(this.handleResolverError))
  }

  resolvePlace(id){
    return this.http.post("https://g19.labagh.pl/php/resolver_l.php", { id })
    .pipe(map((data) => {
      this.place = data['data'][0]
      return this.place;    
    }),
    catchError(this.handleResolverError))
  }

  resolvePlayers(id){
    return this.http.post("https://g19.labagh.pl/php/resolver_pt.php", { id })
    .pipe(map((data) => {
      this.players = data['data']
      return this.players;    
    }),
    catchError(this.handleResolverError))
  }

  handleGetError(error: HttpErrorResponse){
    if(error.status == 404){
      return throwError('Nie znaleziono miejsc, stworzonych przez ciebie')
    } else if (error.status == 430) {
      return throwError('Wystąpił błąd. Proszę spróbować później')
    } else{
      return throwError('Nie znaleziono wpisów, skojarzonych z twoim loginem')
    }
  }

  handleDelError(error: HttpErrorResponse){
    if(error.status == 430){
      return throwError('Nie znaleziono loginu w bazie!')
    } else if(error.status == 423 || error.status == 422){
      return throwError('Nie udało się usunąć wskazanego wpisu')
    } else if(error.status == 450){
      return throwError('Przed usunięciem miejsca usuń wszystkie terminy, skojarzone z wybranem miejscem')
    }
  }

  handleAddError(error: HttpErrorResponse){
    if(error.status == 422){
      return throwError('Wystąpił błąd. Proszę spróbować później')
    }else{}
  }

  handleResolverError(error: HttpErrorResponse){
    return throwError("Nie znaleziono odpowiedniego rekordu w bazie!")
  }
}
