import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  message: string
  regSubmitted= false

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {  }

  onSubmit(){
    this.message = ''
    if (this.reg.valid){
      this.regSubmitted = true
      if (this.reg.get('type').value =='GM'){
        const options = { headers: { 'Content-Type': 'application/json' } };

        this.http.post<string>("https://g19.labagh.pl/php/register.php", JSON.stringify(this.reg.value), options).subscribe(
          data => this.message = '' + data,
          error => this.message = '' + error
        );
      } else {
        this.message = "Spokojnie, na razie rejestrujemy tylko Mistrzów Gry :)"
      }
    } else{
      this.message = "Wypełnij wszystkie wymagane pola!"
    }
  }

  ngOnInit() {
    this.reg = this.formBuilder.group({
      login: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+$"), Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      type: ['BG', [Validators.required]],
      name: [null, [Validators.required, Validators.pattern("[A-Za-zęóąłśżźćńĘÓĄŚŁŻŹĆŃ]+$"), Validators.minLength(3)]],
      system: [null, [Validators.required]],
      experience: [null]
    })
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
