import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalisationService } from 'src/app/services/localisation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  startingLatitude: number;
  startingLongitude: number;
  origin: any;
  destination: any;

  height: number;

  waypoints: any;

  dir = {
    renderOptions: {
      polylineOptions: {
        strokeColor: '#ffa500',
        strokeOpacity: 0.6,
        strokeWeight: 5
      }
    }
  };

  constructor(
    public platform: Platform,
    public locationService: LocalisationService,
    private geolocation: Geolocation
  ) {
    this.height = platform.height();
  }

  ngOnInit() {
    this.getUserCurrentLocation();
    this.setOriginAndDestination();
  }

  public getUserCurrentLocation() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.startingLatitude = resp.coords.latitude;
        this.startingLongitude = resp.coords.longitude;
      })
      .catch(error => {
        this.startingLatitude = 45.50983679999995;
        this.startingLongitude = -73.613312;
        console.log('Error getting location', error);
      });
  }

  public setOriginAndDestination() {
    this.origin = { lat: 29.8174782, lng: -95.6814757 };
    this.destination = { lat: 40.6976637, lng: -74.119764 };
  }

  public setWaypoints() {
    this.waypoints = [
      { location: { lat: 39.0921167, lng: -94.8559005 } },
      { location: { lat: 41.8339037, lng: -87.8720468 } }
    ];
  }

  public onResponse(event: any) {
    if (event) {
      console.log(event.routes[0].overview_path[0].lat());
      this.setWaypoints();
    }
  }
}
