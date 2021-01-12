import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {  }

  ngOnInit() {
    this.log = this.formBuilder.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
    }

    onSubmit(){
      this.message='ok'
    }
    
    log = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
}
