import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { Router } from '@angular/router';
import { Data, Place } from 'src/app/classes';
import { PlanService } from 'src/app/plan.service';

@Component({
  selector: 'app-add-term',
  templateUrl: './add-term.component.html',
  styleUrls: ['./add-term.component.scss']
})
export class AddTermComponent implements OnInit {

  ok: string
  error: string
  data = new Data
  addtermSubmitted= false
  places: Place[]
  id: number
  system = this.data.system
  addterm = new FormGroup({
    id: new FormControl(''),
    system: new FormControl(''),
    start: new FormControl(''),
    stop: new FormControl(''),
  })

  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router) {  }

  ngOnInit() {
    if(sessionStorage.getItem('type') == '"master"'){
      this.ok = ''
      this.error = ''
      this.getPlaces(),
      this.addterm = this.formBuilder.group({
        id: [null, [Validators.required]],
        system: [null, [Validators.required, Validators.pattern("[A-Za-z0-9ęóąłśżźćńĘÓĄŚŁŻŹĆŃ\. ]+$"), Validators.minLength(3)]],
        start: [null, [Validators.required, Validators.pattern("[-T0-9\.\: ]+$")]],
        stop: [null, [Validators.required, Validators.pattern("[-T0-9\.\: ]+$")]],
      })
  } else{
    this.router.navigate(['/'])
  }
  }

  onSubmit(){
    this.ok = ''
    this.error = ''
    if (this.addterm.valid){
      if(Date.parse(this.addterm.get('start').value) < Date.parse(this.addterm.get('stop').value)){
        for (let item of this.places){
          if(item.id == Number(this.addterm.get('id').value)){
            this.id = item.id
          }
        }
        this.planService.addTerm(sessionStorage.getItem('user'), this.id, this.addterm.get('system').value, 
          this.addterm.get('start').value, this.addterm.get('stop').value).subscribe(
            data => {
              this.addtermSubmitted = true
              this.ok="Termin dodany pomyślnie. Za chwilę nastąpi przekierowanie do listy twoich terminów"
              setTimeout(()=>
              {
                this.router.navigate(['/terminy'])
              },
              1000);
              },
            err => this.error = err
          )
      } else{
        this.error = 'Data końca nie może być wcześniejsza, niż data początku!'
        setTimeout(()=>
              {
                this.error = ''
              },
              1000);
      }
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

}
