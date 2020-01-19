import { Component, NgZone } from '@angular/core';
import { GooglePlacesComponent } from './components/google-places/google-places.component';
import { MapsAPILoader } from '@agm/core';
import { LocalisationService } from '../services/localisation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  favouriteList: any;
  historyList: any;

  toAddressField: HTMLElement;
  fromAddressField: HTMLElement;

  constructor(
    private locationService: LocalisationService,
    private router: Router
  ) {}

  ngOnInit(){
    this.favouriteList = [
      {name: 'Concordia', address: '1455 Boulevard de Maisonneuve', lat: '45.4970605', lng: '-73.57880219999998'},
      {name: 'Polytechnique', address: '2500 Chemin de Polytechnique', lat: '45.50466979999999', lng: '-73.61460199999999'},
      {name: 'Home', address: 'Church Street, Burlington', lat: '44.4759473', lng: '-73.21248279999998'},
      {name: 'Random', address: 'Rue St-Laurent', lat: '45.5824969', lng: '-73.86157000000003'}
    ];

    this.historyList = [
      {name: 'Concordia', address: '1455 Boulevard de Maisonneuve', lat: '45.4970605', lng: '-73.57880219999998'},
      {name: 'Polytechnique', address: '2500 Chemin de Polytechnique', lat: '45.50466979999999', lng: '-73.61460199999999'},
      {name: 'Home', address: 'Church Street, Burlington', lat: '44.4759473', lng: '-73.21248279999998'},
      {name: 'Random', address: 'Rue St-Laurent', lat: '45.5824969', lng: '-73.86157000000003'}
    ];

    this.addFav('Unknown', '123 Rue Avenue', '49.2669726', '4.0245496');
    this.addHist('Unknown', '123 Rue Avenue', '49.2669726', '4.0245496');

    this.toAddressField = document.getElementById('toAddress');
    this.fromAddressField = document.getElementById('fromAddress');

    
  }

  public addFav(n, a, la, ln){
    this.favouriteList.push({name: n, address: a, lat: la, lng: ln});
  }

  public removeFav(favourite){
    let index = -1
    this.favouriteList.forEach(fav => {
      index = index + 1;
      if(fav.name == favourite){
        this.favouriteList.splice(index, 1);
      } 
    });
  }

  public navFav(favourite){
    this.locationService.destination.next([
      +favourite.lat,
      +favourite.lng,
      true
    ]);
    this.router.navigate(['/tabs/tab2']);
  }

  public addHist(n, a, la, ln){
    this.historyList.push({name: n, address: a, lat: la, lng: ln});
  }

  public removeHist(history){
    let index = -1;
    this.historyList.forEach(hist => {
      index = index + 1;
      if (hist.name == history){
        this.historyList.splice(index,1);
      }
    });
  }

  public navHist(history){
    this.locationService.destination.next([
      +history.lat,
      +history.lng,
      true
    ]);
    this.router.navigate(['/tabs/tab2']);
  }
}
