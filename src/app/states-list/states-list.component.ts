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
  public lat: number;
  public lng: number;
  constructor(private appService: StateServiceService,
              private here: HereService) {}

  ngOnInit() {
    this.visibleMap = false;
    this.getStates();
    this.district$ = [];
    this.states$ = [];
    this.arrayListLatLng = [];
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
    this.appService.getDistrictList(state)
    .subscribe(data =>
      this.district$ = data.map(x => x.City));
    this.stateSelected = state;
    this.appService.getData(state)
    .subscribe((response: any) => {
      this.lng = response.candidates[0].location.x;
      this.lat = response.candidates[0].location.y;
     });
  }
}
