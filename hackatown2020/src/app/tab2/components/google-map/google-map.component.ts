import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

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

  constructor(public platform: Platform) {
    this.lat = 24.799448;
    this.lng = 120.979021;
    this.height = platform.height();
    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };
  }

  ngOnInit() {}
}
