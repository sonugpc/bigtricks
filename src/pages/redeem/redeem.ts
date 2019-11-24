import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';

/**
 * Generated class for the RedeemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-redeem',
  templateUrl: 'redeem.html',
})
export class RedeemPage {
userdata:any;
aRs:any;
cRate:any;
amount:any=null;
amtVarValues:{}={'fc241ec2669cc09d984b5ce23f71ffca':20,'9b4eec93aa8ef703314edeaf3c3b5caf':50,'2405c79d70f52098b0647f79e96616d8':100}
  constructor(public navCtrl: NavController, 
    private wp:WordpressServiceProvider,
    public navParams: NavParams,private cs:CommonServicesProvider) {
      console.log(this.cs.userdata)
  this.cRate=this.navParams.get("cRate");
    this.userdata=this.cs.userdata;
  this.aRs=(this.cRate/1000)*this.cs.userdata.bal;

  }

  ionViewDidLoad() {
    this.cs.showBannerAds(false);
    console.log('ionViewDidLoad RedeemPage');
  }
  redeem(){
    if(this.aRs<50)
    {
      this.cs.showAlert("Low Balance", "You need minimum Rs.50 to redeem wallet balance");
    }
    
    else if(this.OriginalAmount(this.amount)>this.aRs||this.aRs<=0||this.aRs==undefined||this.aRs==null)
    {
      this.cs.showToastC("Not enough balance")

    }
    else if(this.amount==''||this.amount==null)
  {
    this.cs.showToastC("Please Select Amount")
    //this.getData();
  }
  else if(this.OriginalAmount(this.amount)<=this.aRs&&this.aRs>=50)
    {
      this.sendReq()
    }
  else {
    console.log(this.OriginalAmount(this.amount),this.aRs)
    this.cs.showToastC("Please try Again..")

  }
  }
  sendReq(){
    console.log(this.cs.token);
    console.log(this.amount);
    this.cs.showLoading("Please Wait...");
    this.wp.redeemBalance(this.cs.token,this.amount).subscribe((p)=>{
    console.log(p);
      if(p['status']==1)
      {
        this.cs.dismissLoading();
        this.cs.showToastC(p['message']);
        this.cs.showVideoRewardsAd();
      }
      else if(p['status']==0)
      { 
        this.cs.dismissLoading();
        this.cs.showAlert("Success",p['message'])
        this.getData();
        //this.cs.showNotification(p['message'])
        this.cs.showVideoRewardsAd()
      }
      
    })
  }
  getData()
  {
    this.wp.getDashData(this.cs.token).subscribe((p)=>{this.cs.userdata=p;
    this.userdata=p;
    this.aRs=(this.cRate/1000)*this.userdata.bal;

    console.log(p)
  })
     
  }
  OriginalAmount(amtVar){
    return this.amtVarValues[amtVar];
    
  }

}
