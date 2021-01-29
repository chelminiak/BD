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
  place1: Place
  place2: Place;
  error = '';

  constructor(private planService: PlanService) { }

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces(){
    this.error = '';
    this.planService.getPlaces(sessionStorage.getItem('user')).subscribe(
      (places: Place[]) => {
        this.place1 = new Place(1, "add", "City", 4, 0, "type", 1, 0),
        this.place2 = new Place(1, "add", "City", 4, 0, "type", 1, 0),
        this.places = [this.place1, this.place2]
        console.log(this.place1)
        console.log(this.place2)
        console.log(this.places)
      },
      (err) => {
        this.error = err
      }
    )
  }

}
