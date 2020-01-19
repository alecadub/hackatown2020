import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { LocalisationService } from 'src/app/services/localisation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit {
  title: string = 'AGM project';
  latitudeTo: number;
  longitudeTo: number;
  latitudeFrom: number;
  longitudeFrom: number;
  zoomTo: number;
  zoomFrom: number;
  addressTo: string;
  addressFrom: string;
  private geoCoder;

  @ViewChild('to', { static: false }) public toAddressRef: ElementRef;
  @ViewChild('from', { static: false }) public fromAddressRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private locationService: LocalisationService,
    private router: Router
  ) {}

  ngOnInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      let toAutocomplete = new google.maps.places.Autocomplete(
        this.toAddressRef.nativeElement,
        {
          types: ['address']
        }
      );

      let fromAutoComplete = new google.maps.places.Autocomplete(
        this.fromAddressRef.nativeElement,
        {
          types: ['address']
        }
      );

      toAutocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = toAutocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          console.log('To Address:' + place.formatted_address);
          console.log('To Latitude: ' + place.geometry.location.lat());
          console.log('To Longitude: ' + place.geometry.location.lng());

          this.addressTo = place.formatted_address;

          //set latitude, longitude and zoom
          this.latitudeTo = place.geometry.location.lat();
          this.longitudeTo = place.geometry.location.lng();
          this.zoomTo = 12;
        });
      });

      fromAutoComplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = fromAutoComplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          console.log('From Address:' + place.formatted_address);
          console.log('From Latitude: ' + place.geometry.location.lat());
          console.log('From Longitude: ' + place.geometry.location.lng());

          this.addressFrom = place.formatted_address;

          //set latitude, longitude and zoom
          this.latitudeFrom = place.geometry.location.lat();
          this.longitudeFrom = place.geometry.location.lng();
          this.zoomFrom = 12;
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitudeTo = position.coords.latitude;
        this.longitudeTo = position.coords.longitude;
        this.zoomTo = 8;
        this.getAddress(this.latitudeTo, this.longitudeTo);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoomTo = 12;
            this.addressTo = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitudeTo = $event.coords.lat;
    this.longitudeTo = $event.coords.lng;
    this.getAddress(this.latitudeTo, this.longitudeTo);
  }

  public updateMap() {
    if (this.addressTo && this.addressFrom) {
      this.locationService.origin.next([this.latitudeFrom, this.longitudeFrom]);
      this.locationService.destination.next([
        this.latitudeTo,
        this.longitudeTo
      ]);
      this.router.navigate(['/tabs/tab2']);
    }
  }
}
