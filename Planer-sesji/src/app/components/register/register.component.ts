import {FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  message: string
  regSubmitted= false

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.reg = this.formBuilder.group({
      login: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      type: ['BG', [Validators.required]],
      name: [null, [Validators.required, Validators.pattern("[a-zA-ZęóąłśżźćńĘÓĄŚŁŻŹĆŃ]+$"), Validators.minLength(3)]],
      system: [null, [Validators.required]],
      experience: [null]
    })
  }

  register(){
    this.message = 'Spokojnie, rejestracja jeszcze się nie rozpoczęła :)'
    this.regSubmitted = true
  }

  ngOnInit() {
    this.createForm();
  }
  
  reg = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl('BG'),
    name: new FormControl(''),
    system: new FormControl(''),
    experience: new FormControl('')
  })

}
