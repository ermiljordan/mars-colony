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

  constructor(jobService: JobService) {
    this.colonist = new NewColonist(null, null, null);

    jobService.getJobs().subscribe((jobs) =>{
      this.marsJobs = jobs;
    },(err) => {
      console.log(err);
    });
   }

  ngOnInit() {
  }

}
