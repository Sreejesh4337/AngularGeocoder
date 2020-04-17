import { Component, OnInit } from '@angular/core';
import { StateServiceService } from './state-service.service';
import { State } from './state.model';
// import _ from 'lodash';
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
  lat = 20.5937;
  lng = 78.9629;
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
    this.ar = [];
    this.district$ = [];
    this.states$ = [];
    this.codes = [];
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
    this.appService.getData(state).subscribe(data => this.codes = data);
    // this.getAddress(state);
  }

  public getAddress(state) {
    console.log(state);
    if (state !== '') {
      this.here.getAddress(state).then(result => {
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        this.locations = <Array<any>> result;
      }, error => {
          console.error(error);
      });
  }
   }

  public getAddressFromLatLng() {
    if (this.position !== '') {
      this.here.getAddressFromLatLng(this.position).then(result => {
          this.locations = result as Array<any>;
      }, error => {
          console.error(error);
      });
  }
   }
}
