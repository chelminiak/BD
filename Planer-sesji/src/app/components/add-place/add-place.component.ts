import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/app/classes';
import { PlanService } from 'src/app/plan.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

  ok: string
  error: string
  data = new Data
  addplaceSubmitted= false
  disableButton= false
  ifkitchen = 0
  ifelevator = 0
  city = this.data.cities.sort()
  max = this.data.max
  floor = this.data.floor
  type = this.data.placetype
  addplace = new FormGroup({
    address: new FormControl(''),
    city: new FormControl(''),
    max_people: new FormControl(''),
    kitchen: new FormControl(''),
    type: new FormControl(''),
    floor: new FormControl(''),
    elevator: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router) {  }

  ngOnInit() {
    if(sessionStorage.getItem('type') == '"master"'){
      this.ok = ''
      this.error = ''
      this.addplace = this.formBuilder.group({
        address: [null, [Validators.required, Validators.pattern("[-A-Za-z0-9ęóąłśżźćńĘÓĄŚŁŻŹĆŃ\/ ]+$"), Validators.minLength(3)]],
        city: [null, [Validators.required]],
        max_people: [null, [Validators.required]],
        kitchen: ['No', [Validators.required]],
        type: [null, [Validators.required]],
        floor: [null, [Validators.required, Validators.pattern("[0-9]+$")]],
        elevator: ['No', [Validators.required]]
      })
  } else{
    this.router.navigate(['/'])
  }
  }

  onSubmit(){
    this.ok = ''
    this.error = ''
    if (this.addplace.valid){
      console.log(this.addplace.get('kitchen').value)
      console.log(this.addplace.get('elevator').value)
      if(this.addplace.get('kitchen').value == "Yes"){
        this.ifkitchen = 1
      }
      if(this.addplace.get('elevator').value == "Yes"){
        this.ifelevator = 1
      }
      this.planService.addPlace(sessionStorage.getItem('user'), this.addplace.get('address').value, this.addplace.get('city').value, 
        this.addplace.get('max_people').value, Number(this.ifkitchen), this.addplace.get('type').value, this.addplace.get('floor').value,
        Number(this.ifelevator)).subscribe(
          data => {
            this.addplaceSubmitted = true
            this.ok="Miejsce dodane pomyślnie. Za chwilę nastąpi przekierowanie do listy twoich miejsc"
            setTimeout(()=>
            {
              this.router.navigate(['/miejsca'])
            },
            1000);
            },
          err => this.error = err
        )
    }
  }
}
