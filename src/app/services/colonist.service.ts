import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Colonist, NewColonist } from '../models';

@Injectable()
export default class ColonistService {

COLONIST_JSON = 'https://red-wdp-api.herokuapp.com/api/mars/colonists'

  constructor(private http: Http) { }

  submitColonist(colonist: NewColonist): Observable<Colonist>{
    let headers = new Headers ({'Content-type' : 'application/json'});

    return this.http.post(this.COLONIST_JSON, { colonist }, { headers })
                    .map((res: Response) => res.json().colonist);
  }

}
