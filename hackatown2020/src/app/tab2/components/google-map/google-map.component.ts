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

  height: number;

  constructor(public platform: Platform) {
    this.lat = 51.678418;
    this.lng = 7.809007;
    this.height = platform.height();
  }

  ngOnInit() {}
}
