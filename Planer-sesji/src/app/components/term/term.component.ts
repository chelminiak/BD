import { Term } from './../../classes';
import { PlanService } from 'src/app/plan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {

  error='';
  terms: Term[]


  constructor(private planService: PlanService) { }

  ngOnInit() {
    this.getTerms();
  }

  getTerms(){
    this.error = '';
    this.planService.getTerms(sessionStorage.getItem('user')).subscribe(
      (res: Term[]) => {
        this.terms = res
      },
      (err) => {
        this.error = err
      }
    )
  }

  delTerm(id){
    this.planService.delTerms(sessionStorage.getItem('user'), id).subscribe(
      (res) => {
        this.getTerms()
      },
      (err) => {
        this.error = err
      }
    )
  }

  addTerm(){
    
  }

}
