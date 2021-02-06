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

  constructor(private planService: PlanService, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('type') == '"master"' || sessionStorage.getItem('type') == '"player"'){
      if(sessionStorage.getItem('type') == '"master"'){
        this.master = true
      } else if(sessionStorage.getItem('type') == '"player"'){
        this.planService.getPlayer(sessionStorage.getItem('user')).subscribe(
          (res: Player) => {
            this.prof = res
          }
        )
        this.player = true
      }
      this.getTerms()
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

  chooseTerm(){
    
  }

}
