import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { BlogPage } from '../blog/blog';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Uid } from '@ionic-native/uid';



@Component({
  selector: 'page-login-or-signup',
  templateUrl: 'login-or-signup.html',
})
export class LoginOrSignupPage {
  login: any = "login";
  mobile: any;
  name: String = '';
  email: string = '';
  refC: String = '';
  password: String = '';
  otp: String = '';
  indicator:boolean=false;
  otpScreen: boolean = false;
  loginPassword: String = "";
  OTPindicator:boolean=false;
  constructor(public navCtrl: NavController,
    public wp: WordpressServiceProvider,
    public cs: CommonServicesProvider,
    private androidPermissions:AndroidPermissions,
    private platform:Platform,
    private uid:Uid,
    public navParams: NavParams) {
      if(this.platform.is('cordova'))
   {
  this.getImei().then((imei)=>{this.cs.imei= imei});
   }
   else{
     this.cs.imei="0"
   }
    this.login = this.navParams.get("login");
    console.log(this.login)
    this.mobile = this.navParams.get("mobile");
    setTimeout(() => {this.OTPindicator=true}, 60000);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginOrSignupPage');
  }
  signupFn() {
   // this.cs.showToastC(this.cs.imei)
    if(this.email==''||this.mobile==''||this.name==''||this.password==''||this.otp==''){
      this.cs.showToastC("Please enter required details.")
    }
    else if(  !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.email)){
      this.cs.showToastC("Please enter a valid email address")
    }
    
  else{  
      this.indicator=true;
       this.wp.signupUser(this.email, this.mobile, this.name, this.password, this.refC, this.otp, this.cs.imei).subscribe((data) => {
      this.indicator=false;
      console.log(data)
      if (data.status != 0) {
        this.cs.showAlert("Error", data.message)
      }
      else {
        this.signupSuccess(data);
      }
    }, err => { this.cs.showToastC("Something went wrong");      this.indicator=false;  })
  }
}
  loginByOTP() {
    this.cs.sendOTP(this.mobile)
    this.navCtrl.push(LoginOrSignupPage, { mobile: this.mobile, login: "otp" })
  }
  loginByPassword() {
    this.indicator=true;
    this.wp.loginUser(this.mobile, this.loginPassword).subscribe((data) => {
      console.log(data) ; this.indicator=false;

      if (data.status == 0) {
        this.cs.userdata = data.data;
        this.cs.setStorage("userdata",data.data);
        this.cs.setStorage('token1',data.data.token).then((r)=>{this.cs.token=r;this.navCtrl.setRoot(BlogPage)});
      }
      else if (data.status != 0) {
        this.cs.showAlert("Error", data.message)
      }
    }, err => { this.cs.showToastC("Something went wrong") ,       this.indicator=false;  })
  }
  signupSuccess(data) {
    this.cs.setStorage('token1',data.data.token).then((r)=>{this.cs.token=r;this.cs.userdata=data;this.cs.setStorage("userdata",data);this.cs.userdata=data,this.cs.showToastS("Registration Successful"); this.navCtrl.setRoot(BlogPage)}).catch((res)=>{this.cs.showToastC("Network issue")});

  }
  loginByOTPFn() {
    this.indicator=true;
    this.wp.loginUserOTP(this.mobile, this.otp).subscribe((data) => {
      console.log(data) ; this.indicator=false;
      if (data.status == 0) {
        this.cs.userdata = data.data;
        this.cs.setStorage("userdata",data.data);
        this.cs.setStorage('token1',data.data.token).then((r)=>{this.cs.token=r;this.navCtrl.setRoot(BlogPage)});
      }
      else if (data.status != 0) {
        this.cs.showAlert("Error", data.message)
      }
    }, err => { this.cs.showToastC("Something went wrong") ,       this.indicator=false;  })
  }
  resend(){
    console.log(this.indicator)
    if(this.OTPindicator==true)
      {   this.cs.resendOTP(this.mobile)}
      else{
        this.cs.showToastS("Please Wait for a Minute before sending new OTP")
      }
  }
  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
   
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
      else if(result.hasPermission)
      {
        return this.uid.IMEI;
      }
   
      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }

    return this.uid.IMEI
  }
  
}
