import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NewColonist, Job } from '../models';
import JobService from '../services/jobs.service';
import {cantBe} from '../shared/validators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobService]
})
export class RegisterComponent implements OnInit {

  colonist: NewColonist;
  marsJobs: Job[];
  registerForm: FormGroup;

  NO_JOB_SELECTED = '(none)';

  constructor(public jobService: JobService,
              private formBuilder: FormBuilder,
              private router: Router) {

    jobService.getJobs().subscribe((jobs) =>{
      this.marsJobs = jobs;
    },(err) => {
      console.log(err);
    });

   }

tooOld(value: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        return control.value > value ? {'too old': {value}} : null;
    };
}

ngOnInit() {
 this.registerForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
   age: new FormControl('', [Validators.required, this.tooOld(100)]),
   job_id: new FormControl('(none)', [cantBe(this.NO_JOB_SELECTED)])
 });
 }

  onSubmit(event) {
    event.preventDefault();
    if(this.registerForm.invalid){

    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;
      console.log('Ok let\'s register this new colonist:', new NewColonist (name, age, job_id));
      this.router.navigate(['/encounter']);
    }
  }
}
