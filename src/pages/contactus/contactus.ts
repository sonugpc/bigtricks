import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { CommonServicesProvider } from '../../providers/common-services/common-services';

/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
name:String='';
email:String='';
message:String=''
  constructor(public navCtrl: NavController,
    public wp:WordpressServiceProvider,
    public cs:CommonServicesProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
    this.cs.trackPageView("Contact Page")

  }

  followclick(platform)
  {
    switch(platform)
    {
      case 't':window.open("https://t.me/bigtricksin",'_system', 'location=yes');break;
      case 'tw':window.open("https://www.twitter.com/bigtricksin",'_system','location=yes');break;
      case 'y':window.open("https://www.youtube.com/channel/UCjslcs2KP0fOLUT3eQCSpYQ?view_as=subscriber",'_system', 'location=yes');
      break;
      case 'l':window.open("https://in.linkedin.com/in/sonugpc",'_system','location=yes');break;
      case 'g':window.open("https://www.facebook.com/groups/earnigapps/?ref=bookmarks",'_system', 'location=yes');   break;
      case 'f':window.open("https://www.facebook.com/bigtricksit/",'_system', 'location=yes');   break;
      case 'm':window.open("https://www.bigtricks.in/emailsub/",'_system', 'location=yes');   break;
      case 'w':window.open("https://www.bigtricks.in/bigtricks-alerts-join-whatsapp-broadcasting-group-never-miss-deal/",'_system', 'location=yes');   break;
    }
  }
  SendMsg(){
    if(this.name==''||this.email==''||this.message=='')
    {
      this.cs.showToastC("All Fields are Required");
    }
    else{
    this.cs.showLoading("Please Wait...")
    this.wp.subMsg(this.name,this.email,this.message).subscribe((data)=>{
      if(data.status=="error")
      {
        this.cs.showAlert("Error",data.error);
      }
      else if(data.status="success")
      {
        this.cs.showAlert('Success',"Feedback Submitted")
        this.cs.showVideoRewardsAd()
      console.log(data)
  
  }});
    }
  }
  
}
