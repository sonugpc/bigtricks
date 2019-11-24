import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';

import { ServicesProvider } from '../../providers/services/services';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { isTrueProperty } from 'ionic-angular/umd/util/util';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
name:String=''
email:String=''
content:String=''
post_id:any='';
  constructor(public navCtrl: NavController,
    private cs:CommonServicesProvider,
    private wp:WordpressServiceProvider,private viewCtrl:ViewController ,public navParams: NavParams) {
      if(this.cs.userdata!=null)
      {
      this.name=this.cs.userdata.name;
      this.email=this.cs.userdata.email;
  }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    this.cs.trackPageView("Comment Page ")

 //this.post_id=this.sp.post_id;
  }
	dismiss() {
    this.viewCtrl.dismiss();
  }
  submitcomment()
  {
    if(this.name==''||this.email==''||this.content=='')
    {
      this.cs.showToastC("All Fields are Required");
    }
    else{
this.cs.showLoading("Please Wait...")
    this.wp.subComments(this.name,this.email,this.content,this.wp.post_id).subscribe((data)=>{
      if(data.status=="error")
      {
        this.cs.showAlert("Error",data.error);
      }
      else if(data.status="pending")
      {
        this.cs.showToastS("Comment is Submitted & waiting for Approval");
        this.cs.launchInterstitial()

      }
      
      console.log(data)
  
  });
  
  }}
}
