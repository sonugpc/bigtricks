import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  histData:Array<{}>=[];
  isDataPresent:boolean=true;
  constructor(public navCtrl: NavController, 
    private cs:CommonServicesProvider,
    private wp:WordpressServiceProvider,
    public navParams: NavParams) {
    this.getOffersFromAPI();

  }

  ionViewDidLoad() {
    console.log(' HistoryPage');
    this.cs.showBannerAds(true)
  }
  getOffersFromAPI()
  { 
    this.cs.showLoading("Please Wait...");
    this.wp.gettxn(this.cs.token).subscribe((data)=>{this.cs.dismissLoading();   
         console.log(data);
       
      for (var i = 0;i< data.length ;i++){
        if(data[i].type==1)
        {
          data[i].type='up';
        }
        else{
          data[i].type='down';

        }
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(data[i].time);
        var secondDate = new Date();
        
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        let offer={
              id:data[i].id,
              tName:data[i].data,
              amount:data[i].amount,
              type:data[i].type,
             time:diffDays,
              extra:data[i].extra,
             
              
              
        }
        this.histData.push(offer)
        
        //console.log(diffDays)

        if(this.histData.length!=0)
        {
          this.isDataPresent=false;
        }
    }
  },(err)=>{this.cs.showToastC("Connection error")})

}


}
