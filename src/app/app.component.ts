import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { FavouritePage } from '../pages/favourite/favourite';
import { BlogPage } from '../pages/blog/blog';
import { PrivacyPage } from '../pages/privacy/privacy';
import { FollowPage } from '../pages/follow/follow';
import { DealsArchivePage } from '../pages/deals-archive/deals-archive';
import { ContactusPage } from '../pages/contactus/contactus';
import { HeaderColor } from '@ionic-native/header-color';
import { Console } from '@angular/core/src/console';
import { CommonServicesProvider } from '../providers/common-services/common-services';//import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { AdMobFree } from '@ionic-native/admob-free';
import { OneSignal  } from '@ionic-native/onesignal';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { NowifiPage } from '../pages/nowifi/nowifi';
import { ServicesProvider } from '../providers/services/services';
import { NotificationPage } from '../pages/notification/notification';
import { AppRate } from '@ionic-native/app-rate';
import { WizardPage } from '../pages/wizard/wizard';
import { LoginPage } from '../pages/login/login';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Uid } from '@ionic-native/uid';
import { SplashPage } from '../pages/splash/splash';
import { TelegramClient } from 'messaging-api-telegram';
import { WalletPage } from '../pages/wallet/wallet';
import { HistoryPage } from '../pages/history/history';
import { InvitePage } from '../pages/invite/invite';
import { ProfilePage } from '../pages/profile/profile';
import { ShopPage } from '../pages/shop/shop';
import { Md5 } from 'ts-md5';
import { AppVersion } from '@ionic-native/app-version';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
surveylist:boolean=this.cs.surveylist;
gamezop:{}={title:'Play Games',link:"https://www.bigtricks.in/app2/openInApp.php?id=1"}
cashbig:{}={title:'PayTM Cash Surveys',link:'https://www.bigtricks.in/app2/openInApp.php?id=2'}
gamelist:boolean=this.cs.gamelist;
  rootPage: any = SplashPage;
public counter:number=0;
  pages: Array<any>;

  constructor(public cs:CommonServicesProvider,
    private apprate:AppRate,
    private uid: Uid,
    public storage:Storage,private oneSignal: OneSignal,
   public admob:AdMobFree,
   private androidPermissions: AndroidPermissions,
   private sp:ServicesProvider,
   private ga: GoogleAnalytics,
    public alertCtrl: AlertController,private headerColor: HeaderColor,
    private av:AppVersion,
    public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    
    this.initializeApp();
    this.getPermission();
    // used for an example of ngFor and navigation
    this.pages = [
      {icon:'pricetag', title: 'Loot Deals', component: DealsArchivePage },
      { icon:'call',title: 'Contact Us', component: ContactusPage },
      { icon:'reorder',title: 'Privacy Policy', component: PrivacyPage },
      {icon:'star', title: 'Rate Us', component: FavouritePage },
      { icon:'share',title: 'Follow us', component: FollowPage },




    ];
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
    
      this.statusBar.styleLightContent();
      this.sp.checkConnect();
      this.loadStorage();
      
      if(this.platform.is('cordova')==true){
      this.ga.startTrackerWithId('UA-79523923-6').then((res)=>{
        console.log("TRS"+res);
        this.ga.setAppVersion('');
      
        this.checkApp()
          
        
  }).catch((t)=>console.log (t));
      this.headerColor.tint('#764ba2');
      //this.splashScreen.hide();
      this.statusBar.overlaysWebView(true);
     this.notificationService()
     //this.cs.showBannerAds(true);
        }}
        
      
    );
  }


  openPage(page) {
   
    if(page.title=="Rate Us")
    {
        this.rateFunction();
    }
    else{
    this.nav.push(page.component);
    }
  }
  logout(){
    this.cs.token=null;
    this.storage.set("token1",null).then((res)=>{this.cs.showToastS("You are logged out successfullly")});
  }
  
loadStorage(){
  this.storage.get("userdata").then((data)=>{this.cs.userdata=data})
  //this.storage.get("Bemail").then((data)=>{this.cs.Bemail=data})
  this.storage.get("token1").then((data)=>{this.cs.token=data,console.log(this.cs.token)})
}
notificationService()
{
  this.oneSignal.startInit('0f4388c3-dfa1-431d-bc1a-2a778f6ef1f7', '99607600242')
//  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  this.oneSignal.handleNotificationReceived().subscribe(data => {
    this.cs.getStorage("NotificationList").then((data1)=>{
      if(data1==null){
        this.cs.setStorage("NotificationList",[]);
      }
      let pusheddata:any=new Array();
      let pushdata=data.payload;
     console.log(pushdata)
    
     pusheddata=data1;
     pusheddata.push(pushdata);
     //data1.push(pusheddata)

      console.log(data1)
      this.cs.setStorage("NotificationList",pusheddata).then((th)=>{console.log(th)});
    })
  });
  this.oneSignal.handleNotificationOpened().subscribe(data => {console.log(data),this.nav.push(NotificationPage,{info:data.notification.payload}
    
  )});
	this.oneSignal.endInit();
}
  rateFunction(){
    window.open('market://details?id=in.bigtricks', '_system', 'location=yes');  
  }
  getPermission() {
    if(this.platform.is('cordova'))
{
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then((result) => {

      if (result.hasPermission) {
              
                         
      }
      else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(() => { this.cs.showLoading("Setting Up..");document.location.href = 'index.html'; console.log(result) }

        );
      }
    }
    );
  }
  else{
    console.log("Cordova Required");
  }
  }
 
  login(){
    this.nav.setRoot(LoginPage);
  }
  surveys(){
    this.sp.OpenInApp(this.cs.cashbig['link']+"&source="+this.cs.userdata.ref);
  }
  games(){
    this.sp.OpenInApp(this.cs.gamezop['link']+"&source="+this.cs.userdata.ref);
  }
  setRootHome(){
    this.nav.setRoot(BlogPage);
  }
  account_menu(menuid){
    if(menuid == 1)
    {
      this.nav.push(WalletPage)
    }
    else if(menuid==2)
    {
      this.nav.push(HistoryPage);
    }
    else if(menuid==3){
      this.nav.push(InvitePage);
    }
    else if(menuid==4){
      this.nav.push(ProfilePage)
    }
    else if(menuid==5)
    {
      this.nav.push(ShopPage,{page:'offer'})
    }
    else if(menuid==6){
      this.nav.push(ShopPage,{page:'shop'})
    }
    else{
      console.log('Not a Valid Option')
    }

  }
  checkApp(){
    this.av.getPackageName().then((res)=>{
      console.log(res)
      let defaultName=Md5.hashStr(res);
      let pName="4ecc03cdbe41f7b0488f26614379b95d";
  
      if(pName!=defaultName){
        this.platform.exitApp();
        this.cs.showAlertU("Cloned APK","Please Uninstall & Download Bigtricks App from playstore")
        
      }
    })
  
    }
}

