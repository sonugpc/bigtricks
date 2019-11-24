import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard/';

/**
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {
ref:string='';
msg:any='';
copyMsg="";
downLink:string=""
  constructor(public navCtrl: NavController, 
    private cs:CommonServicesProvider,
    private wp:WordpressServiceProvider,
    private ss:SocialSharing,
    private clipboard: Clipboard,
    public navParams: NavParams) {
      this.fatchRefData();
      console.log(this.cs.userdata)
      if(this.cs.userdata.ref==null){
      this.ref=this.cs.userdata.refcode;
      }
      else{
        this.ref=this.cs.userdata.ref;
      }
      

  }

  ionViewDidLoad() {
    this.cs.hidebanner();

    console.log('ionViewDidLoad InvitePage');
  }
  copyFunction(){
    console.log(this.ref)
    this.clipboard.copy(this.ref).then(()=>{this.cs.showToastS('Referral Code Copied')}).catch(()=>{this.cs.showToastC('something went wrong')})
  }
  fatchRefData(){
    this.wp.getreferralData(this.cs.token).subscribe((data)=>{
      this.msg=data.refdata;
      this.copyMsg=data.copytext;
      this.downLink=data.downloadLink;
    })
  }
  share(num){
    this.copyMsg=this.copyMsg+this.ref+this.downLink
    let url=this.downLink;
    if(num==1){
      this.ss.shareViaWhatsApp(this.copyMsg);
    }
    else if(num==2){
      this.ss.share(this.copyMsg)
    }
    else if(num==3){
      this.ss.shareViaFacebook("Download Bigtricks App & Get Latest Deals & offers",this.copyMsg);
    }
    else if(num==4){
      this.ss.shareViaTwitter(this.copyMsg,'',url)
    }
    else{
    this.ss.share(this.copyMsg)}
  }
  

}
