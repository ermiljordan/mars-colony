import { Component, OnInit } from '@angular/core';
import { Encounter } from '../models'
import EncounterService from '../services/encounter.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css'],
  providers: [EncounterService]
})
export class EncounterComponent implements OnInit {

  encounterList: Encounter[];

  constructor(private encounterService: EncounterService,
              private router: Router) {
    encounterService.getJobs().subscribe((encounters) => {
      this.encounterList = encounters;
      console.log(encounters);
    })
   }
  ngOnInit() {
  }
  onSubmit() {
    this.router.navigate(['/report']);
    console.log('hello');
  }
}
