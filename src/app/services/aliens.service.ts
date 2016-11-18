import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Aliens} from '../models';


@Injectable()
export default class AliensService {
ALIEN_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';
  
  constructor(private http: Http) { }
  getAliens(): Observable<Aliens[]> {
  return this.http.get(this.ALIEN_JSON)
    .map((res: Response) => res.json().aliens);
  }
// submitEncounter(encounter:Alien): Observable<Alien>{
// const headers = new Headers();
// headers.append('Content-Type', 'application/json');
// return this.http.post(this.ALIEN_JSON, alien, {headers})
//   .map((res: Response) => res.json().alien);
// }
}