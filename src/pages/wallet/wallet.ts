import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { RedeemPage } from '../redeem/redeem';
import { InvitePage } from '../invite/invite';
import { OffersPage } from '../offers/offers';
import { ShopPage } from '../shop/shop';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  aCoins:any=0;
  pCoins:any=0;
  cRate:any=1;
  aRs:any=0;
  constructor(public navCtrl: NavController,
    public cs:CommonServicesProvider,
    public navParams: NavParams,
    public wp:WordpressServiceProvider
    )
     {
      this.wp.getBalance(this.cs.token).subscribe((res)=>{
        console.log(res)
       this.cs.userdata.bal=res.totalBal;
       console.log(this.cs.userdata.bal)
        this.aCoins=res.totalBal;
        this.pCoins=res.pendingBal;
        this.cRate=res.rayID;
        this.rupees();
        
      });
   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }
  rupees(){
    this.aRs=(this.cRate/1000)*this.aCoins;
    console.log(this.aRs);
  }
  redeemPage(){
    this.navCtrl.push(RedeemPage,{cRate:this.cRate});
  }
  referPage(){
    this.navCtrl.push(InvitePage);

  }
  offerPage(){
    this.navCtrl.push(ShopPage,{page:'offer'})

  }
}
