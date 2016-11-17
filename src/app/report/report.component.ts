import { Component, OnInit } from '@angular/core';
import {Alien} from '../models';
import AlienService from '../services/jobs.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [AlienService]
})
export class ReportComponent implements OnInit {

  alienList: Alien[];

  NO_ALIEN_SELECTED = '(none)';

  // constructor(alienService:AlienService) {
  //   alienService.getJobs().subscribe((aliens) =>
  //   this.alienList = aliens;
  //   )}

  ngOnInit() {
  }

}
