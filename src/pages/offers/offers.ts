import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { CommonServicesProvider } from '../../providers/common-services/common-services';

/**
 * Generated class for the OffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {
  item:any;
  constructor(public navCtrl: NavController,
    private cs:CommonServicesProvider,
    public navParams: NavParams,private sp:ServicesProvider) {
  this.item=this.navParams.get("item");
  console.log(this.item)
  this.cs.launchInterstitial();
  this.cs.hidebanner();

 }

  ionViewDidLoad() {
    if(this.cs.showToastS==null){
    this.cs.showAlert("Warning","Please Login to get Reward Points")}
    console.log('ionViewDidLoad OffersPage');
  }
  openTab(id){
    if(this.cs.userdata==null)
    {
      let link="https://www.bigtricks.in/app2/visit.php?id="+id+"&ref=nonLogged";

      this.sp.OpenTab(link);
    }
    else{
  if(this.cs.userdata.ref==null){

    this.cs.userdata.ref=this.cs.userdata.refCode;
  }
  console.log(this.cs.userdata.ref)
   let link="https://www.bigtricks.in/app2/visit.php?id="+id+"&ref="+this.cs.userdata.ref;
    
    this.sp.OpenTab(link);
    }}
}
