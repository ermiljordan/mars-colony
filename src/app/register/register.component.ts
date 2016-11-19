import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NewColonist, Job } from '../models';
import JobService from '../services/jobs.service';
import {cantBe} from '../shared/validators';
import { Router, ActivatedRoute } from '@angular/router';
import ColonistService from '../services/colonist.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobService, ColonistService],
      animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {

  colonist: NewColonist;
  marsJobs: Job[];
  registerForm: FormGroup;
  submitted: boolean;
  
  NO_JOB_SELECTED = '(none)';
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  @HostBinding('style.display') get display() {
   return 'block';
 }

  constructor(public jobService: JobService,
              private colonistService: ColonistService,
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
      this.submitted = true;

    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;
      const colonist = new NewColonist (name, job_id, age);

      console.log('Ok let\'s register this new colonist:', new NewColonist (name, age, job_id));

      this.colonistService.submitColonist(colonist).subscribe((colonist) => {
        localStorage.setItem('colonist_id', JSON.stringify(colonist.id));
      })
      this.router.navigate(['/encounter']);
    }
  }
}
