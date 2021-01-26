import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  master = false
  player = false
  name: string

  ngOnInit() {
    if(localStorage.getItem('type') == 'master'){
      this.master = true;
      this.name = localStorage.getItem('user')
    }
    if(localStorage.getItem('type') == 'player'){
      this.player = true;
      this.name = localStorage.getItem('user')
    }
  }

}
