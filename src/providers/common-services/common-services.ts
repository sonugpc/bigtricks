import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { AdMobFreeBannerConfig, AdMobFree, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';

/*
  Generated class for the CommonServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonServicesProvider {
  imei: any = '0';
  refcode: any = 'loading...';
  balance: any = "--";
  userdata:any={};
  loading: any;
  threedots:boolean=false;
  token: any = null;
  Bname: any = 'Enter Your Name';
  Bemail: any = '--';
  slide: any = '';
  FCMToken='';
  mobile:any='10 digit mobile number';
  admobIntID:any='ca-app-pub-1263933757285192/4554255085';
  gamelist:boolean=true;
  surveylist:boolean=true;
  gamezop:{}={icon:'happy',title:'Play Games',link:"https://www.bigtricks.in/app2/openInApp.php?id=1"}
cashbig:{}={icon:'list',title:'PayTM Cash Surveys',link:'https://www.bigtricks.in/app2/openInApp.php?id=2'}
  constructor(
    private platform:Platform,
    
    //private localNotifications: LocalNotifications, 
    public toastCtrl: ToastController, 
    private ga:GoogleAnalytics,
    private admob:AdMobFree,
    private storage:Storage,
    private network:Network,
    public loadingCtrl: LoadingController,
     public alertCtrl: AlertController,
     public http: HttpClient) {

    console.log('Hello CommonServicesProvider Provider');

  }

  sendOTP(mobile): Promise<any> {
    return new Promise((resolve) => {
      {
        
        let apiURL="https://www.bigtricks.in/app2/sendOTP.php?mob="+mobile;
        let res = this.http.get(apiURL).subscribe((dd) => {console.log(dd);
        if(dd['type']=='success')
        {
          this.showToastS("OTP Sent Successfully");
        }
        else
        {
          this.showToastC("We could not send OTP to your phone number please restart again.")
        }
        })
        resolve(res);
      
      }
    })
  }
  resendOTP(mobile): Promise<any> {
    return new Promise((resolve) => {
      {
        
        let apiURL="https://www.bigtricks.in/app2/revef.php?mob="+mobile;
        let res = this.http.get(apiURL).subscribe((dd) => {console.log(dd);
        if(dd['type']=='success')
        {
          this.showToastS("OTP Resent  Successfully");
        }
        else
        {
          this.showToastC("We could not send OTP to your phone number please restart again.")
        }
        })
        resolve(res);
      
      }
    })
  }
  
  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message,
     // duration:3000,
      enableBackdropDismiss	:true,
      //dismissOnPageChange: true
    })
    this.loading.present();
  }
  dismissLoading() {
    this.loading.dismiss()
  }
  showToastC(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      cssClass: 'red'
    });
    toast.present();
  }
  showToastS(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      cssClass:'toast-success'
    });
    toast.present();
  }
  showWhiteToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      cssClass:'toast-white'
    });
    toast.present();
  }
  // showNotification(msg) {
  //   this.localNotifications.schedule({
  //     id: 1,
  //     text: msg,

  //   });
  // }
  
  
 

  // getUser(imei,mobile): Observable<any> {
  //   console.log(mobile,imei)
    
  //   let k = this.http.get(apiUrl+"app/getUser.php?mobile="+mobile+"&unique_code="+imei);
  //   return k;
  // }
  showBannerAds(overlap) {
    console.log("Ads Loaded");
 
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: false,
      id: "ca-app-pub-1263933757285192/8140300392",
      size:'BANNER',
      overlap:overlap,
      //offsetTopBar: true ,
    //  bannerAtTop: true,
      autoShow: true
     };
     this.admob.banner.config(bannerConfig);
    
     
     this.admob.banner.prepare()
       .then(() => {
       })
       .catch(e => console.log(e));
    

  }
  hidebanner()
  {
    this.admob.banner.hide();
  }
  bannerAd()
  {
    const bannerConfig: AdMobFreeBannerConfig = {
      isTesting: false,
      autoShow: true,
      overlap:false,
  
      id:'ca-app-pub-1263933757285192/8140300392',
     };
     this.admob.banner.config(bannerConfig);
     
     this.admob.banner.prepare()
       .then((g) => { console.log(g);
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
  }
  launchInterstitial() {
    if(this.platform.is('cordova')){
    this.admob.interstitial.config({
      id: this.admobIntID,
      isTesting: false,
      autoShow: true
     })
     
     this.admob.interstitial.prepare().then((aa)=>{console.log(aa)})
    
    

    }
  }

  async showVideoRewardsAd() {
    try {
      const videoRewardsConfig: AdMobFreeRewardVideoConfig = {
        id: 'ca-app-pub-1263933757285192/7898419555',
        isTesting: false,
        autoShow: true
      }


      this.admob.rewardVideo.config(videoRewardsConfig);

      const result = await this.admob.rewardVideo.prepare().then((a)=>console.log(a));
      console.log(result);
    }
    catch (e) {
      console.error(e);
    }
  }
  
  // vercheck(): Observable<any>{
  //   let k = this.http.get(apiUrl+"app/update.json");
  //   console.log(k)
  //   return k;
    
  // }
  showAlertU(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{text:'Update now',handler:()=>{window.open('market://details?id=in.bigtricks', '_system', 'location=yes');
      this.platform.exitApp();

    }}],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  
  trackPageView(title)
  {
    this.ga.trackView(title)

  }
  setStorage(key,value): Promise<any> {
    return new Promise((resolve,reject) =>
  {
    this.storage.set(key,value).then((res)=>{resolve(res);}).catch((res)=>{reject(res)});
  })
}
getStorage(key): Promise<any> {
  return new Promise((resolve,reject) =>
{
  this.storage.get(key).then((res)=>{resolve(res);}).catch((res)=>{reject(res)});
})
}

  rateFn(){
    let remind1;
    this.getStorage("remindNever").then((remind)=>{remind1=remind})
    this.getStorage("openTime").then((open)=>{if(open>5 &&open%8==0 &&(remind1==false||remind1==null))
    {
        this.showRateDialog();
    }
    })
  }
  showRateDialog(){
 
      let alert = this.alertCtrl.create({
        title: "Rate Us on Playstore",
        subTitle: "Enjoying our App? Please take a moment to rate our services on Playstore",
        buttons: [{text:'Rate us',handler:()=>{window.open('market://details?id=in.bigtricks', '_system', 'location=yes');
        
  
      }}],
        enableBackdropDismiss: true
      });
      alert.present();
    }
  
}
