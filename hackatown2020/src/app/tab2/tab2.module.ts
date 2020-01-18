import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { APIkey } from 'src/environments/key';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: APIkey
    }),
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page, GoogleMapComponent]
})
export class Tab2PageModule {}
