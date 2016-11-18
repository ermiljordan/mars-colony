import { Component, OnInit } from '@angular/core';
import AliensService from '../services/aliens.service';
import EncounterService from '../services/encounter.service';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Aliens, NewEncounter } from '../models';
import {cantBe} from '../shared/validators';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AliensService, EncounterService]
})
export class ReportComponent implements OnInit {

  alienList: Aliens[];
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)'

  constructor(private aliensService:AliensService,
              private encounterService: EncounterService,
              private router: Router) {

              aliensService.getAliens().subscribe((aliens) => {
                this.alienList = aliens;
              }, (err) => {
                console.log(err);
               });
              } 

             
  ngOnInit() {
    this.reportForm = new FormGroup({
      atype: new FormControl(this.NO_ALIEN_SELECTED,[cantBe(this.NO_ALIEN_SELECTED)]),
      action: new FormControl('', [Validators.required, Validators.maxLength(450)])
    })
  }

  private getDate(){
    const date = new Date
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }


  onSubmit(event) {
    event.preventDefault();
    const date = this.getDate();
    const atype = this.reportForm.get('atype').value
    const action = this.reportForm.get('action').value
    const encounter = new NewEncounter(date, '4', atype, action);
    this.encounterService.submitEncounter(encounter).subscribe((enc)=>{
      this.router.navigate(['/encounter']);
      console.log('got encounter:', enc);
    }, (err) => {
      console.log('there was an error:', err);
    });
  }
}
  


