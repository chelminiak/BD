import { Router } from '@angular/router';
import { Team, Master } from './../../classes';
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

  constructor(private planService: PlanService, private router: Router) { }

  ngOnInit() {
    this.getTeams()
  }

  getTeams(){
    this.error = '';
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

}
