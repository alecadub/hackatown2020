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
        this.waypointSet = false;
        this.destination = { lat: resp[0], lng: resp[1] };
      }
    });
  }

  public setWaypoints(points: any) {
    if (!this.waypointPut) {
      let arrayPoint = points.overview_path;

      let arrayPoint0 = {
        lat: arrayPoint[0].lat(),
        lng: arrayPoint[0].lng()
      };
      let arrayPoint3 = {
        lat: arrayPoint[3].lat(),
        lng: arrayPoint[3].lng()
      };

      let arrayPoint5 = {
        lat: arrayPoint[5].lat(),
        lng: arrayPoint[5].lng()
      };

      let arrayPoint7 = {
        lat: arrayPoint[7].lat(),
        lng: arrayPoint[7].lng()
      };

      let arrayPoint10 = {
        lat: arrayPoint[10].lat(),
        lng: arrayPoint[10].lng()
      };
      let arrayPoint12 = {
        lat: arrayPoint[12].lat(),
        lng: arrayPoint[12].lng()
      };
      let arrayPoint15 = {
        lat: arrayPoint[15].lat(),
        lng: arrayPoint[15].lng()
      };
      let arrayPoint17 = {
        lat: arrayPoint[17].lat(),
        lng: arrayPoint[17].lng()
      };
      let arrayPoint20 = {
        lat: arrayPoint[20].lat(),
        lng: arrayPoint[20].lng()
      };

      if (this.isPointInCrimeRegion(arrayPoint[0])) {
        arrayPoint0 = {
          lat: arrayPoint[0].lat() + 0.005,
          lng: arrayPoint[0].lng()
        };
      }

      if (this.isPointInCrimeRegion(arrayPoint[3])) {
        arrayPoint3 = {
          lat: arrayPoint[3].lat() + 0.005,
          lng: arrayPoint[3].lng()
        };
      }

      if (this.isPointInCrimeRegion(arrayPoint[5])) {
        arrayPoint5 = {
          lat: arrayPoint[5].lat() + 0.005,
          lng: arrayPoint[5].lng()
        };
      }

      if (this.isPointInCrimeRegion(arrayPoint[7])) {
        arrayPoint7 = {
          lat: arrayPoint[7].lat() + 0.005,
          lng: arrayPoint[7].lng()
        };
      }

      if (this.isPointInCrimeRegion(arrayPoint[10])) {
        arrayPoint10 = {
          lat: arrayPoint[10].lat() + 0.005,
          lng: arrayPoint[10].lng()
        };
      }

      if (this.isPointInCrimeRegion(arrayPoint[15])) {
        arrayPoint15 = {
          lat: arrayPoint[15].lat() + 0.005,
          lng: arrayPoint[15].lng()
        };
      }

      if (this.isPointInCrimeRegion(arrayPoint[17])) {
        arrayPoint17 = {
          lat: arrayPoint[17].lat() + 0.005,
          lng: arrayPoint[17].lng()
        };
      }

      if (this.isPointInCrimeRegion(arrayPoint[20])) {
        arrayPoint20 = {
          lat: arrayPoint[20].lat() + 0.005,
          lng: arrayPoint[20].lng()
        };
      }

      this.waypoints = [];
      this.waypoints = [
        { location: { lat: arrayPoint0.lat, lng: arrayPoint0.lng } },
        { location: { lat: arrayPoint3.lat, lng: arrayPoint3.lng } },
        { location: { lat: arrayPoint5.lat, lng: arrayPoint5.lng } },
        { location: { lat: arrayPoint7.lat, lng: arrayPoint7.lng } },
        { location: { lat: arrayPoint10.lat, lng: arrayPoint10.lng } },
        { location: { lat: arrayPoint15.lat, lng: arrayPoint15.lng } },
        { location: { lat: arrayPoint17.lat, lng: arrayPoint17.lng } },
        { location: { lat: arrayPoint20.lat, lng: arrayPoint20.lng } }
      ];
      this.waypointPut = true;
    }
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
        if (event.routes[0].overview_path) {
          this.setWaypoints(event.routes[0]);
        }
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
    if (Math.abs(lat1 - lat2) < 0.005 && Math.abs(lon1 - lon2) < 0.005) {
      return 201;
    }
    return 199;
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
