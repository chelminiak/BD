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

        this.http.post<string>("https://g19.labagh.pl/php/register_master.php", JSON.stringify(this.reg.value), options).subscribe(
          data => console.log(data),
          error => console.log(error)
        );
      } else {
        const options = { headers: { 'Content-Type': 'application/json' } };

        this.http.post<string>("https://g19.labagh.pl/php/register_player.php", JSON.stringify(this.reg.value), options).subscribe(
          data => console.log(data),  
          error => console.log(error)
        );
      }
    } else{
      this.message = "Wypełnij wszystkie wymagane pola!"
    }
  }

  ngOnInit() {
    this.reg = this.formBuilder.group({
      login: [null, [Validators.required, Validators.pattern("[A-Za-z0-9]+$"), Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9\-\_\.]+\@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z]{2,5}$")]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      type: ['BG', [Validators.required]],
      name: [null, [Validators.required, Validators.pattern("[A-Za-zęóąłśżźćńĘÓĄŚŁŻŹĆŃ]+$"), Validators.minLength(3)]],
      system: [null, [Validators.required]],
      experience: [null, [Validators.required]]
    })
    }
  exp = ['0', '1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
        '25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40']
  sys = ['Advanced Dungeons and Dragons', 'Alien', 'Autorski', 'Blades in the Dark', 'Cent RPG', 'Cyberpunk 2020', 'Cyberpunk Red', 
        'Dark Heresy', 'Dungeons & Dragons ed. 3', 'Dungeons & Dragons ed. 3.5', 'Dungeons & Dragons ed. 5', 'Dzikie Pola',
        'Equestria: Puść Wodze Fantazji', 'FUNT', 'KULT', 'Miasto Mgły', 'MidGuard', 'Mork Borg', 'PAX', 'Pillars of Eternity', 'Pulp Cthulhu', 
        'Potwór Tygodnia', 'Savage Worlds', 'Słowianie', 'Świat Mroku', 'Tales from the Loop', 'The Excellents', 'Wampir: Maskarada', 'Warhammer ed.2',
        'Warhammer ed.4', 'Wolsung', 'Zew Cthulhu ed. 5/5.5', 'Zew Cthulhu ed.7']

  reg = new FormGroup({
    login: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl(''),
    name: new FormControl(''),
    system: new FormControl(''),
    experience: new FormControl('')
  })

}
