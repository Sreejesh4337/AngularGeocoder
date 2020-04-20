import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { switchMap, catchError, map, take, timeout } from 'rxjs/operators';
import { State } from './state.model';
import { LogService } from '../error-handling/log.service';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService {
  url = 'https://indian-cities-api-nocbegfhqg.now.sh/cities';
  // tslint:disable-next-line:max-line-length
  argisCode = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&singleLine';

  constructor(
    private http: HttpClient,
    private logService: LogService
  ) { }

  getStatesLists(): Observable<State[]> {
    return this.http.get<any>(this.url);
  }

  getDistrictList(state: any) {
    return this.http.get<any>(this.url + '?State=' + state)
    .pipe(
      // tslint:disable-next-line:no-shadowed-variable
      switchMap(district => {
        return of(district);
      }),
      catchError(e => {
        this.logService.log(`Error occured.: ${e.error.message}`, e);
        return throwError(`API failed to load the data`);
      })
    );
  }

  getData(state: string) {
    return this.http.get<any>(this.argisCode + '=' + state + '&outFields=Match_addr,Addr_type')
    .pipe(
      timeout(2000)
    );
  }
}
