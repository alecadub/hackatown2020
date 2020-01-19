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

  waypointSet = false;
  waypointPut = false;

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

  waypoints = [];

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
    // this.origin = { lat: 29.8174782, lng: -95.6814757 };
    // this.destination = { lat: 40.6976637, lng: -74.119764 };
  }

  public subscribeToUserInput() {
    this.locationService.origin.subscribe(resp => {
      if (Array.isArray(resp) && resp.length) {
        this.origin = { lat: resp[0], lng: resp[1] };
        this.waypointSet = false;
      }
    });
    this.locationService.destination.subscribe(resp => {
      if (Array.isArray(resp) && resp.length) {
        if (resp[2]) {
          this.getUserCurrentLocation();
          this.origin = {
            lat: this.startingLatitude,
            lng: this.startingLongitude
          };
        }
        this.destination = { lat: resp[0], lng: resp[1] };
      }
    });
  }

  public setWaypoints(points: any) {
    let arrayPoint = points.overview_path;

    let arrayPoint0 = {
      lat: arrayPoint[0].lat(),
      lng: arrayPoint[0].lng()
    };
    let arrayPoint10 = {
      lat: arrayPoint[10].lat(),
      lng: arrayPoint[10].lng()
    };
    let arrayPoint20 = {
      lat: arrayPoint[20].lat(),
      lng: arrayPoint[20].lng()
    };
    let arrayPoint30 = {
      lat: arrayPoint[30].lat(),
      lng: arrayPoint[30].lng()
    };
    let arrayPoint40 = {
      lat: arrayPoint[40].lat(),
      lng: arrayPoint[40].lng()
    };
    let arrayPoint50 = {
      lat: arrayPoint[50].lat(),
      lng: arrayPoint[50].lng()
    };

    if (this.isPointInCrimeRegion(arrayPoint[0])) {
      arrayPoint0 = {
        lat: arrayPoint[0].lat() + 0.002,
        lng: arrayPoint[0].lng() + 0.002
      };
    }

    if (this.isPointInCrimeRegion(arrayPoint[10])) {
      arrayPoint10 = {
        lat: arrayPoint[10].lat() + 0.002,
        lng: arrayPoint[10].lng() + 0.002
      };
    }

    if (this.isPointInCrimeRegion(arrayPoint[20])) {
      arrayPoint20 = {
        lat: arrayPoint[20].lat() + 0.002,
        lng: arrayPoint[20].lng() + 0.002
      };
    }

    if (this.isPointInCrimeRegion(arrayPoint[30])) {
      arrayPoint10 = {
        lat: arrayPoint[30].lat() + 0.002,
        lng: arrayPoint[30].lng() + 0.002
      };
    }

    if (this.isPointInCrimeRegion(arrayPoint[40])) {
      arrayPoint10 = {
        lat: arrayPoint[40].lat() + 0.002,
        lng: arrayPoint[40].lng() + 0.002
      };
    }

    if (this.isPointInCrimeRegion(arrayPoint[50])) {
      arrayPoint50 = {
        lat: arrayPoint[50].lat() + 0.002,
        lng: arrayPoint[50].lng() + 0.002
      };
    }
    this.waypoints = [
      { location: { lat: arrayPoint0.lat, lng: arrayPoint0.lng } },
      { location: { lat: arrayPoint10.lat, lng: arrayPoint10.lng } },
      { location: { lat: arrayPoint20.lat, lng: arrayPoint20.lng } },
      { location: { lat: arrayPoint30.lat, lng: arrayPoint30.lng } },
      { location: { lat: arrayPoint40.lat, lng: arrayPoint40.lng } },
      { location: { lat: arrayPoint50.lat, lng: arrayPoint50.lng } }
    ];
  }

  public onResponse(event: any) {
    if (event && event.routes[0]) {
      if (event.routes[0].legs.length > 1) {
        console.log(event);
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
      if (event.routes[0].overview_path) {
        this.setWaypoints(event.routes[0]);
      }
    }
  }

  public secondsToHms(seconds: any) {
    seconds = Number(seconds);

    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor((seconds % 3600) % 60);

    return (
      ('0' + h).slice(-2) +
      'h ' +
      ('0' + m).slice(-2) +
      'min ' +
      ('0' + s).slice(-2) +
      's'
    );
  }

  public measure(lat1: any, lon1: any, lat2: any, lon2: any) {
    if (Math.abs(lat1 - lat2) < 0.002 || Math.abs(lon1 - lon2) < 0.002) {
      return 201;
    }
  }

  public isPointInCrimeRegion(point: any) {
    let isIn = false;
    this.crimeCircles.forEach(elm => {
      let number = this.measure(
        elm.LATITUDE,
        elm.LONGITUDE,
        point.lat(),
        point.lng()
      );
      if (number > 200) {
        isIn = true;
      }
    });
    return isIn;
  }
}
