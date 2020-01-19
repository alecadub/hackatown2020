import { Component } from '@angular/core';
import { IonFabButton, IonFab } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  reportingButton: HTMLElement;
  crimeButton: HTMLElement;
  lightButton: HTMLElement;
  crowdButton: HTMLElement;
  invertAction: boolean;

  constructor() {}

  ngOnInit(){
    this.reportingButton = document.getElementById('reporting');
    this.crimeButton = document.getElementById('crime');
    this.lightButton = document.getElementById('light');
    this.crowdButton = document.getElementById('crowd');

    this.crimeButton.hidden = true;
    this.lightButton.hidden = true;
    this.crowdButton.hidden = true;

    this.invertAction = false;
  }

  public report(){
    if(this.invertAction){
      this.crimeButton.hidden = true;
      this.lightButton.hidden = true;
      this.crowdButton.hidden = true;

      this.crimeButton.style.marginBottom = '0px';
      this.lightButton.style.marginBottom = '0px';
      this.crowdButton.style.marginBottom = '0px';

      this.reportingButton.childNodes[0].childNodes[0]["name"] = 'arrow-dropup';
    }
    else{
      this.crimeButton.hidden = false;
      this.lightButton.hidden = false;
      this.crowdButton.hidden = false;

      this.crimeButton.style.marginBottom = '60px';
      this.lightButton.style.marginBottom = '120px';
      this.crowdButton.style.marginBottom = '180px';

      this.reportingButton.childNodes[0].childNodes[0]["name"] = 'arrow-dropdown';
    }

    this.invertAction = !this.invertAction;
  }
}
