import { Router } from '@angular/router';
import { Place } from './../../classes';
import { PlanService } from 'src/app/plan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {

  places: Place[];
  error = '';

  constructor(private planService: PlanService, private router: Router) { }

  ngOnInit() {
    if(sessionStorage.getItem('type') == '"master"'){
      this.getPlaces();
    } else{
      this.router.navigate(['/'])
    }
  }

  getPlaces(){
    this.error = '';
    this.planService.getPlaces(sessionStorage.getItem('user')).subscribe(
      (res: Place[]) => {
        this.places = res
      },
      (err) => {
        this.error = err
      }
    )
  }

  addPlace(){
    this.router.navigate(['/dodaj_miejsce'])
  }

  delPlace(id){
    this.planService.delPlace(sessionStorage.getItem('user'), id).subscribe(
      (res) => {
        window.location.reload()
      },
      (err) => {
        this.error = err
      }
    )
  }

}
