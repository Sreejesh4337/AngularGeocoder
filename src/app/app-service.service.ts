import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from './state';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
url = 'https://indian-cities-api-nocbegfhqg.now.sh/cities';
  constructor(
    private http: HttpClient
  ) { }
  getStatesLists(): Observable<State[]> {
    return this.http.get<State[]>(this.url);
  }
}
