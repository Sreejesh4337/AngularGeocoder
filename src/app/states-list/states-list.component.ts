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
  ar: any;
  district$: any;
  visibleMap = false;
  public query: string;
  public position: string;
  public locations: Array<any>;
  stateSelected: any;
  codes: any;
  constructor(private appService: StateServiceService,
              private here: HereService) {
                this.query = 'Tracy, CA';
                this.position = '37.7397,-121.4252';
               }

  ngOnInit() {
    this.visibleMap = false;
    this.getStates();
    this.district$ = [];
    this.states$ = [];
    this.stateSelected = 'Select State';
  }

  getStates() {
    this.appService.getStatesLists()
    .subscribe(data =>
       this.states$ = _.uniq(data.map(x => x.State)).sort());
  }

  callStates(state) {
    return state;
  }


  stateLists(state) {
    this.visibleMap = true;
    this.appService.getDistrictList(state)
    .subscribe(data =>
      this.district$ = data.map(x => x.City));
    this.stateSelected = state;
    this.appService.getData(state)
    .subscribe((response: any) => {
      let lat: any;
      let lng: any;
      lat = response.candidates[0].location.x;
      lng = response.candidates[0].location.y; });
  }
}
