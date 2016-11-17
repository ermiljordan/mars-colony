import { Component, OnInit } from '@angular/core';
import { Encounter } from '../models'
import EncounterService from '../services/encounter.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css'],
  providers: [EncounterService]
})
export class EncounterComponent implements OnInit {

  encounterList: Encounter[];

  constructor(encounterService: EncounterService) {
    encounterService.getJobs().subscribe((encounters) => {
      this.encounterList = encounters;
      console.log(encounters);
    })
   }
  ngOnInit() {
  }

}
