import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Data, Master, Player } from 'src/app/classes';
import { PlanService } from 'src/app/plan.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  ok: string
  error: string
  data = new Data
  profSubmitted= false
  exp = this.data.experience
  sys = this.data.system;
  city = this.data.cities.sort();
  profilep: Player;
  profilem: Master;
  player = false;
  master = false;
  edit = false;
  prof = new FormGroup({
    login: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    type: new FormControl(''),
    name: new FormControl(''),
    system: new FormControl(''),
    system2: new FormControl(''),
    system3: new FormControl(''),
    city: new FormControl(''),
    experience: new FormControl(''),
    money: new FormControl(''),
    min: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router) {  }

  onSubmit(){
    this.ok = ''
    this.error = ''
    if (this.prof.valid){
      if(this.master){
        this.planService.updateProfile(sessionStorage.getItem('user'), Number(this.prof.get('experience').value), 
        this.prof.get('system').value, this.prof.get('system2').value, this.prof.get('system3').value, this.prof.get('name').value, 
        this.prof.get('email').value, this.prof.get('city').value, Number(this.prof.get('money').value), 
        Number(this.prof.get('min').value)).subscribe(
          data => {
            this.profSubmitted = true
            this.error="Profil zaktualizowany pomyślnie"
            setTimeout(()=>
            {
              window.location.reload()
            },
            1000);
            },
          err => this.error = err
          )
      } else if(this.player){
        this.planService.updateProfile(sessionStorage.getItem('user'), Number(this.prof.get('experience').value), 
        this.prof.get('system').value, this.prof.get('system2').value, this.prof.get('system3').value, this.prof.get('name').value, 
        this.prof.get('email').value, this.prof.get('city').value).subscribe(
          data => {
            this.profSubmitted = true
            this.error="Profil zaktualizowany pomyślnie"
            setTimeout(()=>
            {
              window.location.reload()
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
      if(sessionStorage.getItem('type') == '"master"'){
        this.master = true
      } else if(sessionStorage.getItem('type') == '"player"'){
        this.player = true
      }
      if(this.master){
        this.planService.getMaster(sessionStorage.getItem('user')).subscribe(
          (res: Master) => {
            this.profilem = res
            this.prof = this.formBuilder.group({
              email: [this.profilem.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9\-\_\.]+\@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z]{2,5}$")]],
              name: [this.profilem.imie, [Validators.required, Validators.pattern("[A-Za-z0-9ęóąłśżźćńĘÓĄŚŁŻŹĆŃ]+$"), Validators.minLength(3)]],
              system: [this.profilem.system, [Validators.required]],
              system2: [this.profilem.system2],
              system3: [this.profilem.system3],
              experience: [this.profilem.staz, [Validators.required]],
              city: [this.profilem.miasto, [Validators.required]],
              money: [this.profilem.oplata_za_sesje],
              min: [this.profilem.minimalny_staz_gracza]
            })
          },
          (err) => {}
        )
      }
      if(this.player){
        this.planService.getPlayer(sessionStorage.getItem('user')).subscribe(
          (res: Player) => {
            this.profilep = res
            this.prof = this.formBuilder.group({
              email: [this.profilep.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9\-\_\.]+\@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z]{2,5}$")]],
              name: [this.profilep.imie, [Validators.required, Validators.pattern("[A-Za-z0-9ęóąłśżźćńĘÓĄŚŁŻŹĆŃ]+$"), Validators.minLength(3)]],
              system: [this.profilep.system, [Validators.required]],
              system2: [this.profilep.system2],
              system3: [this.profilep.system3],
              experience: [this.profilep.staz, [Validators.required]],
              city: [this.profilep.miasto, [Validators.required]]
            })
          },
          (err) => {}
        )
      }
    } else{
      this.router.navigate(['/login'])
    }
    
    }
  
  deleteProfile(){
    this.planService.deleteProfile(sessionStorage.getItem('user')).subscribe(
      data => {
        this.error='Usunąłeś swój profil'
        setTimeout(()=>
          {
            sessionStorage.clear();
            this.router.navigate(['/login'])
          },
          1000);
      },
      err => this.error = err)
  }
}
