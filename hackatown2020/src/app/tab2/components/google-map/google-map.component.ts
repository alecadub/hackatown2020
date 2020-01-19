import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalisationService } from 'src/app/services/localisation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as crimeData from 'src/assets/data/crimeData.json';
import * as cameraData from 'src/assets/data/cameraPosition.json';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input() addMarker: any;

  startingLatitude: number;
  startingLongitude: number;
  origin: any;
  destination: any;

  crimeCircles: any;
  cameraCircles: any;

  icon = {
    url: 'https://svgshare.com/i/HP9.svg',
    scaledSize: { width: 50, height: 50 }
  };

  orangeWalkDistance: any;
  blueWalkDistance: any;

  circles: any;

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
    this.height = platform.height() - 112;
  }

  ngOnInit() {
    this.getUserCurrentLocation();
    this.setOriginAndDestination();
    this.subscribeToUserInput();
    this.createCircles();
    this.setCrimesAndCameras();
  }

  public createCircles() {
    //creating the squares
    this.circles = new Array();

    let minLongitude: Number = -73.9244750407;

    let minLatitude: Number = 45.4168499734;

    this.circles[0] = {
      longitude: +minLongitude + 0.005,
      latitude: +minLatitude + 0.005,
      crimes: 0,
      cameras: 0
    };

    let longitude = minLongitude;
    let latitude = minLatitude;
    let count = 1;

    for (var i = 1; i < 4928; i++) {
      if (count == 88) {
        latitude = +latitude + 0.005;
        count = 0;

        this.circles[i] = {
          longitude: minLongitude,
          latitude: +minLatitude + 0.005,
          crimes: 0,
          cameras: 0
        };
        longitude = minLongitude;
      } else {
        longitude = +longitude + 0.005;
        this.circles[i] = {
          longitude: +longitude + 0.005,
          latitude: latitude,
          crimes: 0,
          cameras: 0
        };
      }
      count++;
    }
  }

  public setCrimesAndCameras() {
    this.cameraCircles = cameraData;
    this.crimeCircles = crimeData;
    this.cameraCircles = this.cameraCircles.default;
    this.crimeCircles = this.crimeCircles.default;
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

  public subscribeToUserInput() {
    this.locationService.origin.subscribe(resp => {
      if (Array.isArray(resp) && resp.length) {
        this.origin = { lat: resp[0], lng: resp[1] };
      }
    });
    this.locationService.destination.subscribe(resp => {
      if (Array.isArray(resp) && resp.length) {
        if (resp[2]){
          this.getUserCurrentLocation();
          this.origin = { lat: this.startingLatitude, lng: this.startingLongitude };
        }
        this.destination = { lat: resp[0], lng: resp[1] };
      }
    });
  }

  public setWaypoints() {
    this.waypoints = [
      { location: { lat: 39.0921167, lng: -94.8559005 } },
      { location: { lat: 41.8339037, lng: -87.8720468 } }
    ];
  }

  public onResponse(event: any) {
    if (event && event.routes[0]) {
      if (event.routes[0].legs.length > 1) {
        let totalValue = 0;
        event.routes[0].legs.forEach(elm => {
          totalValue = totalValue + elm.duration.value;
        });
        this.blueWalkDistance = this.secondsToHms(totalValue);
      } else {
        this.orangeWalkDistance = this.secondsToHms(
          event.routes[0].legs[0].duration.value
        );
      }
      this.setWaypoints();
    }
  }

  public secondsToHms(seconds: any) {
    seconds = Number(seconds);

    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor((seconds % 3600) % 60);

    return (
      ('0' + h).slice(-2) +
      ':' +
      ('0' + m).slice(-2) +
      ':' +
      ('0' + s).slice(-2)
    );
  }
}
