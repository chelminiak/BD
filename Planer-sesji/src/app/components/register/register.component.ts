import { Router } from '@angular/router';
import { Profile } from './../../classes';
import { PlanService } from 'src/app/plan.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  ok: string
  error: string
  profile: Profile
  regSubmitted= false

  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router) {  }

  onSubmit(){
    this.ok = ''
    this.error = ''
    if (this.reg.valid){
      this.regSubmitted = true
      this.profile = new Profile(this.reg.value('name').get, this.reg.value('email').get, this.reg.value('password').get, 
          this.reg.value('name').get, this.reg.value('system').get, this.reg.value('experience').get)
      if (this.reg.get('type').value =='GM'){
        this.planService.regGM(this.profile).subscribe(
          (res: Profile[]) => {
            this.ok="Zarejestrowano pomyślnie"
          },
          (err) => this.error = err
        )
        this.delay(5000)
        this.router.navigate['login']
      } else {
        this.planService.regBG(this.profile).subscribe(
          (res: Profile[]) => {
            this.ok="Zarejestrowano pomyślnie. Za chwilę nastąpi przekierowanie do strony logowania"
          },
          (err) => this.error = err
        )
        this.delay(5000)
        this.router.navigate['login']
      }
    } else{
      this.error = "Wypełnij wszystkie wymagane pola!"
    }
  }

  ngOnInit() {
    this.reg = this.formBuilder.group({
      login: [null, [Validators.required, Validators.pattern("[a-zA-Z0-9]+$"), Validators.minLength(3)]],
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

  private delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
