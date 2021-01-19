import { Router, RouteReuseStrategy } from '@angular/router';
import { PlanService } from 'src/app/plan.service';
import { Login } from './../../classes';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  success: string
  error: string
  login: Login

  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router) {  }

  ngOnInit() {
    this.log = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
    }

    onSubmit(){
      this.login = new Login(this.log.value('login').get, this.log.value('password').get)
      this.planService.log(this.login).subscribe(
        (res: Login[]) => {
          this.success = "Logowanie pomyślne"
        },
        (err) => this.error = err
      )
      this.delay(1000)
      this.router.navigate['']
    }
    
    log = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })

    private delay(ms: number){
      return new Promise(resolve => setTimeout(resolve, ms));
    }
}