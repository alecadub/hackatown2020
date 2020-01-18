import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalisationService } from 'src/app/services/localisation.service';

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
    public locationService: LocalisationService
  ) {
    console.log(this.locationService.simpleTest);
    this.lat = 41.85;
    this.lng = -87.65;
    this.height = platform.height();

    this.origin = { lat: 29.8174782, lng: -95.6814757 };
    this.destination = { lat: 40.6976637, lng: -74.119764 };
    this.waypoints = [
      { location: { lat: 39.0921167, lng: -94.8559005 } },
      { location: { lat: 41.8339037, lng: -87.8720468 } }
    ];
  }

  ngOnInit() {}
}
