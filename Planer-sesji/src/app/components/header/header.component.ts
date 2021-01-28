import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/plan.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private planService: PlanService) { }

  master = false
  player = false
  name: string

  ngOnInit() {
    localStorage.clear()
    if(sessionStorage.getItem('type') == '"master"'){
      this.master = true;
      this.name = sessionStorage.getItem('user')
    }
    if(sessionStorage.getItem('type') == '"player"'){
      this.player = true;
      this.name = sessionStorage.getItem('user')
    }
  }

  logout(){
    this.planService.logout()
  }

}
