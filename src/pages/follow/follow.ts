import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';

/**
 * Generated class for the FollowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html',
})
export class FollowPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private cs:CommonServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowPage');
    this.cs.trackPageView("follow page")

  }
  followclick(platform)
  {
    switch(platform)
    {
      case 't':window.open("https://t.me/bigtricksin",'_system', 'location=yes');break;

      case 'y':window.open("https://www.youtube.com/channel/UCjslcs2KP0fOLUT3eQCSpYQ?view_as=subscriber",'_system', 'location=yes');
      break;
      case 'g':window.open("https://www.facebook.com/groups/earnigapps/?ref=bookmarks",'_system', 'location=yes');   break;
      case 'f':window.open("https://www.facebook.com/bigtricksit/",'_system', 'location=yes');   break;
      case 'm':window.open("https://www.bigtricks.in/emailsub/",'_system', 'location=yes');   break;
      case 'w':window.open("https://www.bigtricks.in/bigtricks-alerts-join-whatsapp-broadcasting-group-never-miss-deal/",'_system', 'location=yes');   break;
    }
  }

}
