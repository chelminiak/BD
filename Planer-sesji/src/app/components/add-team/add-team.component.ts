import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/app/classes';
import { PlanService } from 'src/app/plan.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {

  ok: string
  error: string
  data = new Data
  addteamSubmitted= false
  max = this.data.max
  system = this.data.system
  sessions = this.data.experience
  addteam = new FormGroup({
    max_people: new FormControl(''),
    system: new FormControl(''),
    num_sessions: new FormControl(''),
    name: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router) {  }

  ngOnInit() {
    if(sessionStorage.getItem('type') == '"master"'){
      this.ok = ''
      this.error = ''
      this.addteam = this.formBuilder.group({
        max_people: [null, [Validators.required, Validators.pattern("[0-9]+$")]],
        system: [null, [Validators.required]],
        num_sessions: [null, [Validators.required, Validators.pattern("[0-9]+$")]],
        name: [null, [Validators.pattern("[A-Za-z0-9ęóąłśżźćńĘÓĄŚŁŻŹĆŃ ]+$"), Validators.minLength(3)]],
      })
  } else{
    this.router.navigate(['/'])
  }
  }

  onSubmit(){
    this.ok = ''
    this.error = ''
    if (this.addteam.valid){
      this.planService.addTeam(sessionStorage.getItem('user'), this.addteam.get('max_people').value, this.addteam.get('system').value,
      this.addteam.get('num_sessions').value, this.addteam.get('name').value).subscribe(
        data => {
          this.addteamSubmitted = true
          this.ok="Drużyna dodana pomyślnie. Za chwilę nastąpi przekierowanie do listy twoich drużyn"
          setTimeout(()=>
          {
            this.router.navigate(['/druzyny'])
          },
          1000);
          },
        err => this.error = err
      )
    }
  }

}
