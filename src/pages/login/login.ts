import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { BlogPage } from '../blog/blog';
import { LoginOrSignupPage } from '../login-or-signup/login-or-signup';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { Md5 } from 'ts-md5';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  refcheck:boolean=false;
  mobile:any;
indicator:boolean=false;
  constructor(public navCtrl: NavController, 
    private av:AppVersion,
    private wp:WordpressServiceProvider,private cs:CommonServicesProvider
    ,public navParams: NavParams) {
      this.cs.hidebanner();
  }

  ionViewDidLoad() {
    this.checkApp();
   
    console.log('ionViewDidLoad LoginPage');
  }
  show(){
this.refcheck=!this.refcheck
console.log(this.refcheck)  }
checkUser(){
 
  //Function will check if User Exisit or not?
  let mobile=this.mobile+'';
  mobile= mobile.substr(6);
  if(mobile.length<10)
  {
    this.cs.showToastC("Please enter a correct 10 digit mobile number")
  }else{ this.indicator=true;
this.wp.getuserfromAPI(mobile).subscribe((data)=>{
  console.log(data);  this.indicator=false;

  if(data.status==0)
  {
    this.navCtrl.push(LoginOrSignupPage,{mobile:mobile,login:"login"})
  }
  else if(data.status==1)
  {
    this.sendOTP(mobile);
    this.navCtrl.push(LoginOrSignupPage,{mobile:mobile,login:"signup"})
  }
  else {
    this.cs.showToastC("Something is not right....");
  }

},(err)=>{this.cs.showToastC("Something is not right....");this.indicator=false;})

  }
}
checkFocus(){
  if(this.mobile==null|| this.mobile=='')
  {
  this.mobile="+91 - "
  }
}
skipPress(){
  this.navCtrl.setRoot(BlogPage);
}
sendOTP(mobile){
this.cs.sendOTP(mobile)
}
checkApp(){
  this.av.getPackageName().then((res)=>{
    console.log(res)
    let defaultName=Md5.hashStr(res);
    let pName="4ecc03cdbe41f7b0488f26614379b95d";

    if(pName!=defaultName){
      this.cs.showAlertU("Cloned APK","Please Uninstall & Download Bigtricks App from playstore")
      
    }
  })

  }
}

