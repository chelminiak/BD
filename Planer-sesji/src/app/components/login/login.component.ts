import { Router, RouteReuseStrategy } from '@angular/router';
import { PlanService } from 'src/app/plan.service';
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

  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router) {  }

  ngOnInit() {  
    if(sessionStorage.getItem('type') == '"master"' || sessionStorage.getItem('type') == '"player"'){
      this.router.navigate(['/'])
    }
    this.log = this.formBuilder.group({
      login: [null, [Validators.required, Validators.pattern("[a-zA-Z0-9]+$"), Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(64), 
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    })
    }

    onSubmit(){
    this.success = ''
    this.error = '' 
      this.planService.log(this.log.get('login').value, this.log.get('password').value).subscribe(
        (data) => {
          this.success = "Logowanie pomyślne"
          setTimeout(()=>
          {
            this.router.navigate(['/'])
            window.location.reload()
          },
          1000);
        },
        (err) => this.error = err
      )
    }
    
    log = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })

}