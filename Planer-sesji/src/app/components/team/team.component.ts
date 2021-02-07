import { Router } from '@angular/router';
import { Team, Master, Player } from './../../classes';
import { PlanService } from 'src/app/plan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  error = ''
  teams: Team[]
  possible: Team[]
  player = false;
  master = false;
  prof: Player;
  search = true;
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
            if(this.prof.id_druzyna && this.prof.id_druzyna2 && this.prof.id_druzyna3 && this.prof.id_druzyna4){
              this.search = false
            }
            console.log(this.search)
          },
          (err) => {}
        )
        this.player = true
      }
      this.getTeams()
    } else{
      this.router.navigate(['/login'])
    }
  }

  getTeams(){
    this.error = ''
    this.search_error = ''
    if(this.master){
      this.planService.getTeams(sessionStorage.getItem('user')).subscribe(
        (res: Team[]) => {
          this.teams = res
          for (let item of this.teams){
            this.planService.resolveMaster(item.id_mistrzowie).subscribe(
              (res: Master) => {
                item.mistrz = res
              }
            )
          }
        },
        (err) => {
          this.error = err
        }
      )
    } else if(this.player){
      this.planService.getPlayerTeams(sessionStorage.getItem('user')).subscribe(
        (res: Team[]) => {
          this.teams = res
          for (let item of this.teams){
            this.planService.resolveMaster(item.id_mistrzowie).subscribe(
              (res: Master) => {
                item.mistrz = res
              }
            )
          }
        },
        (err) => {
          this.error = err
        }
      )
      this.planService.getPossibleTeams(sessionStorage.getItem('user')).subscribe(
        (res: Team[]) => {
          this.possible = res
          for (let item of this.possible){
            this.planService.resolveMaster(item.id_mistrzowie).subscribe(
              (res: Master) => {
                item.mistrz = res
              }
            )
          }
        },
        (err) => {
          this.search_error = err
        }
      )
    }
  }

  delTeam(id){
    this.planService.delTeam(sessionStorage.getItem('user'), id).subscribe(
      (res) => {
        window.location.reload()
      },
      (err) => {
        this.error = err
      }
    )
  }

  addTeam(){
    this.router.navigate(['/dodaj_druzyne'])
  }

  joinTeam(id){
    this.planService.joinTeam(sessionStorage.getItem('user'), id).subscribe(
      (res) => {
        window.location.reload()
      },
      (err) => {
        this.search_error = err
      }
    )
  }

}
