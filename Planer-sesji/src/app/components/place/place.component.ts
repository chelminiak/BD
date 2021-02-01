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

  constructor(private planService: PlanService) { }

  ngOnInit() {
    this.getPlaces();
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
    console.log("Wstrzymaj konie kowboju, zajmiemy się tym wkrótce")
  }

  delPlace(id){
    this.planService.delPlace(sessionStorage.getItem('user'), id).subscribe(
      (res) => {
        this.getPlaces()
      },
      (err) => {
        this.error = err
      }
    )
  }

}
