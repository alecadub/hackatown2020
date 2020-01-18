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
  lat: number;
  lng: number;
  origin: any;
  destination: any;

  height: number;

  waypoints: any;

  constructor(
    public platform: Platform,
    public locationService: LocalisationService,
    private geolocation: Geolocation
  ) {
    this.getUserCurrentLocation();
    this.height = platform.height();
    this.setOriginAndDestination();
    this.setWaypoints();
  }

  ngOnInit() {}

  public getUserCurrentLocation() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
      })
      .catch(error => {
        this.lat = 45.50983679999995;
        this.lng = -73.613312;
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
}
