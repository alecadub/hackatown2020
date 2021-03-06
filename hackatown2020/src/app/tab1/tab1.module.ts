import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { AgmCoreModule } from '@agm/core';
import { APIkey } from 'src/environments/key';
import { AgmDirectionModule } from 'agm-direction';
import { GooglePlacesComponent } from './components/google-places/google-places.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: APIkey,
      libraries: ["places"]
    }),
    AgmDirectionModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, GooglePlacesComponent]
})
export class Tab1PageModule {}
