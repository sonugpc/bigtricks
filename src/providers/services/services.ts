import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BrowserTab } from '@ionic-native/browser-tab';
import { ModalController, App, Spinner } from 'ionic-angular';
import { CommentsPage } from '../../pages/comments/comments';
import { Network } from '@ionic-native/network';
import { NowifiPage } from '../../pages/nowifi/nowifi';
import { InAppBrowser,InAppBrowserOptions } from '../../../node_modules/@ionic-native/in-app-browser';
import { CommonServicesProvider } from '../common-services/common-services';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/';

const config = {
  api_link:'https://www.bigtricks.in/app2/'
}
@Injectable()
export class ServicesProvider {
  options:InAppBrowserOptions={
    location:'no',
    zoom:'no',

  }

  constructor(public http: HttpClient,
    private ia: InAppBrowser,
    public network:Network,
    private modalCtrl:ModalController,
    private spinnerDialog:SpinnerDialog,
    private app:App,
    private cs:CommonServicesProvider,
    private browserTab: BrowserTab
  ) {
    console.log('Hello ServicesProvider Provider');
  }

  fatchHomepageSlider():Observable<any>{
    var returnValue= this.http.get(config.api_link+'SliderDetails.php');
    console.log(returnValue)
    return returnValue
  }
  OpenTab(url)
  {
    this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        
        this.browserTab.openUrl(url);
      } else {
    this.OpenInApp(url)      }
    });

  }
  OpenInApp(url)
  {
    const browser=this.ia.create(url,"_blank",this.options)
   // this.ia.create(url,"_blank","location=no")
   // const browser = this.ia.create(url,'_blank',this.options);
 
     setTimeout(() => { this.spinnerDialog.show(null, null, true);   },400)

          
  
  
  browser.on('loadstop').subscribe(()=>{
    this.spinnerDialog.hide();
  }, err =>{
    this.spinnerDialog.hide();
  })
  
  browser.on('loaderror').subscribe(()=>{
    this.spinnerDialog.hide();
  }, err =>{
    this.spinnerDialog.hide();
  })
  
  browser.on('exit').subscribe(()=>{
    this.spinnerDialog.hide();
  }, err =>{
    this.spinnerDialog.hide();
  })
 

  }
 OpenModal(name)

 {
    let modal = this.modalCtrl.create( CommentsPage);
    modal.present();
  }
 
  checkConnect()
  {
    
  this.network.onDisconnect().subscribe(()=>{this.app.getActiveNav().setRoot(NowifiPage)})

  }
  
  

}
