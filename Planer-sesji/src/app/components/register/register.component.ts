import { Router } from '@angular/router';
import { PlanService } from 'src/app/plan.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/classes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ok: string
  error: string
  data = new Data
  regSubmitted= false

  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router) {  }

  onSubmit(){
    this.ok = ''
    this.error = ''
    if (this.reg.valid){
      if (this.reg.get('type').value =='GM'){
        this.planService.regGM(this.reg.get('login').value, this.reg.get('email').value, this.reg.get('password').value, 
            this.reg.get('name').value, this.reg.get('system').value, 
            this.reg.get('system2').value, this.reg.get('system3').value, Number(this.reg.get('experience').value),
            this.reg.get('city').value).subscribe(
          data => {
            this.regSubmitted = true
            this.ok="Zarejestrowano pomyślnie. Za chwilę nastąpi przekierowanie do strony logowania"
            setTimeout(()=>
            {
              this.router.navigate(['/login'])
            },
            1000);
            },
          err => this.error = err
        )
      } else {
        this.planService.regBG(this.reg.get('login').value, this.reg.get('email').value, this.reg.get('password').value, 
            this.reg.get('name').value, this.reg.get('system').value, 
            this.reg.get('system2').value, this.reg.get('system3').value, Number(this.reg.get('experience').value),
            this.reg.get('city').value).subscribe(
          data => {
            this.regSubmitted = true
            this.ok="Zarejestrowano pomyślnie. Za chwilę nastąpi przekierowanie do strony logowania"
            setTimeout(()=>
            {
              this.router.navigate(['/login'])
            },
            1000);
          },
          err => this.error = err
        )
      }
    } else{
      this.error = "Wypełnij wszystkie wymagane pola!"
    }
  }

  ngOnInit() {
    if(sessionStorage.getItem('type') == '"master"' || sessionStorage.getItem('type') == '"player"'){
      this.router.navigate(['/'])
    }
    this.reg = this.formBuilder.group({
      login: [null, [Validators.required, Validators.pattern("[a-zA-Z0-9]+$"), Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9\-\_\.]+\@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z]{2,5}$")]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(64), 
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      type: ['BG', [Validators.required]],
      name: [null, [Validators.required, Validators.pattern("[A-Za-z0-9ęóąłśżźćńĘÓĄŚŁŻŹĆŃ]+$"), Validators.minLength(3)]],
      system: [null, [Validators.required]],
      system2: [null],
      system3: [null],
      experience: [null, [Validators.required]],
      city: [null, [Validators.required]]
    })
    }
  exp = this.data.experience
  sys = this.data.system;
  city = this.data.cities.sort();

  reg = new FormGroup({
    login: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl(''),
    name: new FormControl(''),
    system: new FormControl(''),
    system2: new FormControl(''),
    system3: new FormControl(''),
    city: new FormControl(''),
    experience: new FormControl('')
  })
}
