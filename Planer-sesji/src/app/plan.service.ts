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
  player: Player;
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
    catchError(this.handleGetPlaceError))
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
    catchError(this.handleGetTermError));
  }

  getPlayerTerms(login){
    return this.http.post("https://g19.labagh.pl/php/get_termin_p.php", { login })
    .pipe(map((data) => {
      this.terms = data['data']
      return this.terms;    
    }),
    catchError(this.handlePlayerGetTermError));
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

  getPossibleTerms(login){
    return this.http.post("https://g19.labagh.pl/php/searcher_termin.php", { login })
    .pipe(map((data) => {
      this.terms = data['data']
      return this.terms;    
    }),
    catchError(this.handleSearchError));
  }

  selectTerm(id, id_drużyna){
    return this.http.post("https://g19.labagh.pl/php/add_to_term.php", { id, id_drużyna })
    .pipe(map((data)=> {
      return data
    }),
    catchError(this.handleTermError))
  }

  getTeams(login){
    return this.http.post("https://g19.labagh.pl/php/get_team.php", { login })
    .pipe(map((data) => {
      this.teams = data['data']
      return this.teams;    
    }),
    catchError(this.handleGetTeamError))
  }

  getPlayerTeams(login){
    return this.http.post("https://g19.labagh.pl/php/get_team_p.php", { login })
    .pipe(map((data) => {
      this.teams = data['data']
      return this.teams;    
    }),
    catchError(this.handlePlayerGetTeamError));
  }

  getPossibleTeams(login){
    return this.http.post("https://g19.labagh.pl/php/searcher.php", { login })
    .pipe(map((data) => {
      this.teams = data['data']
      return this.teams;    
    }),
    catchError(this.handleSearchError));
  }

  joinTeam(login, id){
    return this.http.post("https://g19.labagh.pl/php/add_to_team.php", { login, id })
    .pipe(map((data)=> {
      return data
    }),
    catchError(this.handleJoinError))
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

  handleGetPlaceError(error: HttpErrorResponse){
    if(error.status == 404){
      return throwError('Nie znaleziono miejsc, stworzonych przez ciebie')
    } else if (error.status == 430) {
      return throwError('Wystąpił błąd. Proszę spróbować później')
    } else{
      return throwError('Nie znaleziono wpisów, skojarzonych z twoim loginem')
    }
  }

  handleGetTeamError(error: HttpErrorResponse){
    if(error.status == 404){
      return throwError('Nie znaleziono drużyn, stworzonych przez ciebie')
    } else if (error.status == 430) {
      return throwError('Wystąpił błąd. Proszę spróbować później')
    } else{
      return throwError('Nie znaleziono wpisów, skojarzonych z twoim loginem')
    }
  }

  handleGetTermError(error: HttpErrorResponse){
    if(error.status == 404){
      return throwError('Nie znaleziono terminów, stworzonych przez ciebie')
    } else if (error.status == 430) {
      return throwError('Wystąpił błąd. Proszę spróbować później')
    } else{
      return throwError('Nie znaleziono wpisów, skojarzonych z twoim loginem')
    }
  }

  handlePlayerGetTeamError(error:HttpErrorResponse){
    if(error.status == 420){
      return throwError('Wygląda na to, że nie należysz jeszcze do żadnej drużyn. Śmiało, znajdź jakąś poniżej')
    }
  }

  handlePlayerGetTermError(error:HttpErrorResponse){
    if(error.status == 420){
      return throwError('Wygląda na to, że twoja drużyna nie zapisała się na żaden termin. Sprawdź czy mistrzowie twoich drużyn nie dodali jakiegoś nowego')
    }
  }

  handleSearchError(error: HttpErrorResponse){
    return throwError('Nie znaleziono wpisów, które mogłyby cię zainteresować')
  }

  handleJoinError(error: HttpErrorResponse){
    return throwError('Nie udało się dołączyć do wybranego zespołu. Proszę spróbować później')
  }

  handleTermError(error: HttpErrorResponse){
    return throwError('Nie udało się zarezerwować wybranego terminu')
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

  getPlayer(login){
    return this.http.post("https://g19.labagh.pl/php/get_profile.php", { login })
    .pipe(map((data) => {
      this.player = data['data']
      return this.player;    
    }),
    catchError(this.handleGetProfileError));
  }

  getMaster(login){
    return this.http.post("https://g19.labagh.pl/php/get_profile.php", { login })
    .pipe(map((data) => {
      this.master = data['data']
      return this.master;    
    }),
    catchError(this.handleGetProfileError));
  }

  updateProfile(login, experience, system, system2, system3, name, email, city, money=0, min=0){
    return this.http.post("https://g19.labagh.pl/php/update_profile.php", {login, experience, system, system2, system3, name, email, city, money, min})
    .pipe(map((data)=>{
      return data
    }),
    catchError(this.handleUpdateError));
  }

  deleteProfile(login){
    return this.http.post("https://g19.labagh.pl/php/del_profile.php", {login})
    .pipe(map((data)=>{
      return data
    }),
    catchError(this.handleDeleteError));
  }

  handleGetProfileError(error: HttpErrorResponse){
      return throwError('Nie znaleziono podanego loginu w bazie!')
  }

  handleUpdateError(error: HttpErrorResponse){
    if(error.status==420){
      return throwError('Wszystkie nowe wartości nie mogą być takie same, jak poprzednie!')
    }else{
      return throwError('Nie udało się zaktualizować twojego profilu')
    }
  }

  handleDeleteError(error: HttpErrorResponse){
    if(error.status==450){
      return throwError('Przed usunięciem profilu, pomóż nam utrzymać porządek na portalu i usuń wszystkie swoje miejsca, terminy i drużyny')
    } else{
      return throwError('Nie udało się usunąć profilu')
    }
  }
}
