import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from './state.model';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {
  url = 'https://indian-cities-api-nocbegfhqg.now.sh/cities';

  apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  apiAuthCode = 'Your AUTH TOKEN';

  constructor(
    private http: HttpClient
  ) { }

  getStatesLists(): Observable<State[]> {
    return this.http.get<any>(this.url);
  }

  getDistrictList(district: string): Observable<State[]> {
    return this.http.get<any>(this.url + '?State=' + district);
  }

  getData(state: string) {
    return this.http.get<any>(this.apiUrl + '?address=' + state + '&key=' + this.apiAuthCode);
  }
}
