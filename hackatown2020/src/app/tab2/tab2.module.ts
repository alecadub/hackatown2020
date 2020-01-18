import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { APIkey } from 'src/environments/key';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: APIkey
    }),
    AgmDirectionModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page, GoogleMapComponent],
  providers: [
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class Tab2PageModule {}
