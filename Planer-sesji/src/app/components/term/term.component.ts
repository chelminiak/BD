import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Term, Master, Team, Place, Player } from './../../classes';
import { PlanService } from 'src/app/plan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {

  error='';
  terms: Term[];
  possible: Term[];
  team = true;
  player = false;
  master = false;
  prof: Player;
  search_error: string
  team1: Team;
  team2: Team;
  team3: Team;
  team4: Team;
  teams: Team[]
  t: Team;
  i: Term;
  search = this.formBuilder.group({
    team:[null, [Validators.required]]
  })

  constructor(private planService: PlanService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(sessionStorage.getItem('type') == '"master"' || sessionStorage.getItem('type') == '"player"'){
      if(sessionStorage.getItem('type') == '"master"'){
        this.master = true
      } else if(sessionStorage.getItem('type') == '"player"'){
        this.planService.getPlayer(sessionStorage.getItem('user')).subscribe(
          (res: Player) => {
            this.prof = res
            if(this.prof.id_druzyna){
              this.planService.resolveTeam(this.prof.id_druzyna).subscribe(
                (res: Team) => {
                  this.team1 = res
                },
                (err) => {}
              )
            }
            if(this.prof.id_druzyna2){
              this.planService.resolveTeam(this.prof.id_druzyna2).subscribe(
                (res: Team) => {
                  this.team2 = res
                },
                (err) => {}
              )
            }
            if(this.prof.id_druzyna3){
              this.planService.resolveTeam(this.prof.id_druzyna3).subscribe(
                (res: Team) => {
                  this.team3 = res
                },
                (err) => {}
              )
            }
            if(this.prof.id_druzyna4){
              this.planService.resolveTeam(this.prof.id_druzyna4).subscribe(
                (res: Team) => {
                  this.team4 = res
                },
                (err) => {}
              )
            }
            this.teams = [this.team1, this.team2, this.team3, this.team4]
          }
        )
        
        this.player = true
      }
      this.getTerms()
      this.searchTerms()
    } else{
      this.router.navigate(['/login'])
    }
  }

  getTerms(){
    this.error = '';
    if(this.master){
      this.planService.getTerms(sessionStorage.getItem('user')).subscribe(
        (res: Term[]) => {
          this.terms = res
          for (let item of this.terms){
            this.planService.resolveMaster(item.id_mistrzowie).subscribe(
              (res: Master) => {
                item.mistrz = res
              }
            )
            this.planService.resolvePlace(item.id_lokalizacja).subscribe(
              (res: Place) => {
                item.lokalizacja = res
              }
            )
            if(item.id_druzyna){
              this.planService.resolveTeam(item.id_lokalizacja).subscribe(
                (res: Team) => {
                  item.druzyna = res
                }
              ),
              (err) => {
                this.team = false
              }
              this.planService.resolvePlayers(item.id_druzyna).subscribe(
                (res: Player[]) => {
                  item.gracze = res
                }
              ),
              (err) => {}
            }
          }
        },
        (err) => {
          this.error = err
        }
      )
    } else if (this.player){
      this.planService.getPlayerTerms(sessionStorage.getItem('user')).subscribe(
        (res: Term[]) => {
          this.terms = res
          for (let item of this.terms){
            this.planService.resolveMaster(item.id_mistrzowie).subscribe(
              (res: Master) => {
                item.mistrz = res
              }
            )
            this.planService.resolvePlace(item.id_lokalizacja).subscribe(
              (res: Place) => {
                item.lokalizacja = res
              }
            )
            if(item.id_druzyna){
              this.planService.resolveTeam(item.id_lokalizacja).subscribe(
                (res: Team) => {
                  item.druzyna = res
                }
              ),
              (err) => {
                this.team = false
              }
              this.planService.resolvePlayers(item.id_druzyna).subscribe(
                (res: Player[]) => {
                  item.gracze = res
                }
              ),
              (err) => {}
            }
          }
        },
        (err) => {
          this.error = err
        }
      )
    }
  }

  delTerm(id){
    this.planService.delTerm(sessionStorage.getItem('user'), id).subscribe(
      (res) => {
        window.location.reload()
      },
      (err) => {
        this.error = err
      }
    )
  }

  addTerm(){
    this.router.navigate(['/dodaj_termin'])
  }

  searchTerms(){
    this.planService.getPossibleTerms(sessionStorage.getItem('user')).subscribe(
      (res: Term[]) => {
        this.possible = res
      },
      (err) => {
        this.search_error = err
      }
    )
  }

  chooseTerm(term){
    this.t = this.search.get('team').value
    this.i = term
    if(this.t.id_mistrzowie == this.i.id_mistrzowie){
      this.planService.selectTerm(this.i.id, this.t.id).subscribe(
        res => {
          window.location.reload()
        },
        err => {
          this.search_error = err
        }
      )
    } else{
      this.search_error = 'Wybrana przez ciebie drużyna nie moża zapisać się na wskazany termin'
    }
  }

}
