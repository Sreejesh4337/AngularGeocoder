import { Injectable } from '@angular/core';

declare var H: any;
@Injectable({
  providedIn: 'root'
})
export class HereService {
  public platform: any;
  public geocoder: any;
  constructor() {
    this.platform = new H.service.Platform({
      app_id: 'rPR8jXBgboz6xZYrrg53',
      app_code  : '91VENYrUK88Ynx9qXTSiRLgjRIfT4y5mJ4x89FiMP7I'
  });
    this.geocoder = this.platform.getGeocodingService();
   }
   public getAddress(query: string) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ searchText: query }, result => {
          if (result.Response.View.length > 0) {
              if (result.Response.View[0].Result.length > 0) {
                  resolve(result.Response.View[0].Result);
              } else {
                  reject({ message: 'no results found' });
              }
          } else {
              reject({ message: 'no results found' });
          }
      }, error => {
          reject(error);
      });
  });
   }

   public getAddressFromLatLng(query: string) {
    return new Promise((resolve, reject) => {
      this.geocoder.reverseGeocode({ prox: query, mode: 'retrieveAddress' }, result => {
          if (result.Response.View.length > 0) {
              if (result.Response.View[0].Result.length > 0) {
                  resolve(result.Response.View[0].Result);
              } else {
                  reject({ message: 'no results found' });
              }
          } else {
              reject({ message: 'no results found' });
          }
      }, error => {
          reject(error);
      });
  });
   }
}
