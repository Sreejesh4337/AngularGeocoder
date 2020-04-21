import { Component, OnInit } from '@angular/core';
import { StateServiceService } from './state-service.service';
import { State } from './state.model';
import * as _ from 'lodash';
import { HereService } from '../shared/here.service';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.css']
})
export class StatesListComponent implements OnInit {
  states$: any;
  district$: any;
  visibleMap = false;
  arrayListLatLng: any;
  stateSelected: any;
  iterationState: any;
  public lat: number;
  public lng: number;
  public cityLat: number;
  public cityLng: number;
  // google maps zoom level
  zoom: number;
  public pusheditems: any;
  newItems = [];
  constructor(private appService: StateServiceService,
              private here: HereService) {}

  ngOnInit() {
    this.visibleMap = false;
    this.zoom = 8;
    this.getStates();
    this.district$ = [];
    this.states$ = [];
    this.arrayListLatLng = [];
    this.pusheditems = [];
    this.stateSelected = 'Select State';
  }

  // Getting unique states from api
  getStates() {
    this.appService.getStatesLists()
    .subscribe(data =>
       this.states$ = _.uniq(data.map(x => x.State)).sort());
  }

  // Printing the Cities of Selected States
  callStates(state) {
    return state;
  }

  // Getting state selected and passing to geocode for getting latlng
  stateLists(state: string) {
    this.visibleMap = true;
    this.pusheditems = [];
    this.appService.getDistrictList(state)
    .subscribe(data => {
      _.forEach(data.map(x => x.City), dist => {
        this.appService.getData(dist)
        .subscribe((response: any) => {
          this.newItems = response;
          this.safetCheck(this.newItems, state);
         });
      });
      this.district$ = data.map(x => x.City);
    });
    this.stateSelected = state;
    this.getLatLngOfStates(state);
  }

  getLatLngOfStates(state) {
    this.appService.getData(state)
    .subscribe((response: any) => {
      this.lng = response.candidates[0].location.x;
      this.lat = response.candidates[0].location.y;
     });
  }

  safetCheck(response: any, state: any) {
    const __this = this;
    const addr = (response.candidates[0].address).split(',');
    _.forEach(addr, (o) => {
      const address = o.replace(/\s/g, '');
      const presentCity = {
        lat: response.candidates[0].location.y,
        lng: response.candidates[0].location.x
      };
      if (address === state) {
      __this.pusheditems.push(presentCity);
      }
    });
  }
}
