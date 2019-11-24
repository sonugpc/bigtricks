import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { WizardPage } from '../wizard/wizard';
import { BlogPage } from '../blog/blog';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { RedeemPage } from '../redeem/redeem';
import { AppVersion } from '@ionic-native/app-version/';
import {Md5} from 'ts-md5/dist/md5';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  splash = true;

  constructor(public navCtrl: NavController,
    private av:AppVersion,
    public wp:WordpressServiceProvider,private platform:Platform,private cs:CommonServicesProvider, public navParams: NavParams) {
  this.cs.getStorage("token1").then((tkn)=>{
    this.cs.token=tkn;
    this.loadData();
  })
 
  this.av.getVersionCode().then((res)=>{
 
    this.wp.checkVersion().subscribe((ver)=>{
      
      if(ver.availableVersion>res)
      {
          this.cs.showAlert("New Version Available!",ver.log);
      }
      else{

      }
    })

    
  })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
    setTimeout(() => this.nextpage(), 3000);

  }


  nextpage(){

    this.cs.getStorage("firstopen").then((res)=>{
      if(res==false||res==null)
      {this.navCtrl.setRoot(WizardPage)
      }
    else{this.navCtrl.setRoot(BlogPage)}}

    )
  }
    loadData(){
      console.log(this.cs.token)
    this.wp.getDashData(this.cs.token).subscribe((data)=>{
      if(data.a>0){
        this.cs.threedots=true;
      }
      this.cs.gamezop=data.al;
      this.cs.gamelist=data.gamelist;
      this.cs.surveylist=data.surveylist
      this.cs.cashbig=data.th;
      
      this.cs.userdata=data;
      this.cs.setStorage("userdata",data)
    },(err)=>{this.cs.showToastC("Connection error")})
    }
    setStorageDailyVisit(){
      this.cs.getStorage('openTime').then((openTime)=>{

        if(openTime==undefined||openTime==null)
        {
          this.cs.setStorage("openTime",1);

        }
        else{
          this.cs.setStorage("openTime",openTime+1);

        }
      })
    }
}
