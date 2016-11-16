import { Component, OnInit } from '@angular/core';
import { NewColonist, Job } from '../models';
import JobService from '../services/jobs.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobService]
})
export class RegisterComponent implements OnInit {

  colonist: NewColonist;
  marsJobs: Job[];

  NO_JOB_SELECTED = '(none)';

  constructor(jobService: JobService) {
    this.colonist = new NewColonist(null, this.NO_JOB_SELECTED , null);

    jobService.getJobs().subscribe((jobs) =>{
      this.marsJobs = jobs;
    },(err) => {
      console.log(err);
    });

   }

  ngOnInit() {
    setTimeout(() => {

      console.log('I\'m late');
    }, 2000);

    console.log('I\'m on time')
  }

  get jobSelected () {
    return this.colonist.job_id !== this.NO_JOB_SELECTED 
  }

}
