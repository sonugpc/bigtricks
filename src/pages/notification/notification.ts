import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OSNotificationPayload } from '@ionic-native/onesignal';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { ServicesProvider } from '../../providers/services/services';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { OffersPage } from '../offers/offers';
import { ShopPage } from '../shop/shop';


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
base:any='';
 isDataPresent:boolean;
notifList:Array<any>=[];
  constructor(public navCtrl: NavController, 
    private sp:ServicesProvider,
    private wp:WordpressServiceProvider,
    public navParams: NavParams,private cs:CommonServicesProvider) {
   this.isDataPresent==false;
    this.base=this.navParams.get('info')
    if(this.base!=null)
    {
      this.handleBackgroundNotification(this.base)
    }
   this.cs.getStorage("NotificationList").then((result)=>{this.notifList=result,this.notifList.reverse();
    this.notifList.length>0?this.isDataPresent==true:this.isDataPresent==false;
    console.log(result)})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  handleForgroundNotification(payload: OSNotificationPayload)
  {
    console.log(payload.additionalData.type)
    if(payload.additionalData!=null){
        if(payload.additionalData.type=="blog")
        {
          console.log(payload.additionalData.type)
            let post_id=payload.additionalData.id;

            this.wp.doReadMorenf(this.navCtrl,post_id);
            //this.navCtrl.push('BlogDetailsPage',{id:post_id})
        }
        else if(payload.additionalData.type=="deal"){
          let post_id=payload.additionalData.id;
          this.navCtrl.push('DealsDetailsPage',{id:post_id})
        }
        else if(payload.additionalData.type=="intent"){
          let post_id=payload.additionalData.id;
          this.navCtrl.push(post_id)
        }
        else if(payload.additionalData.type=="modal"){
          let title=payload.additionalData.title;
          let data=payload.additionalData.data;
         this.cs.showAlert(title,data)
        }
        else if(payload.additionalData.type=="url"){
          let url=payload.additionalData.url;
        
         this.sp.OpenInApp(url)
        }
        else if(payload.additionalData.type=="offer"){
          this.navCtrl.push(ShopPage,{page:'offer'})
        }
  }
  }
  handleBackgroundNotification(payload: OSNotificationPayload)
  {
    if(payload.additionalData!=null){
      if(payload.additionalData.type=="blog")
      {
        console.log(payload.additionalData.type)
          let post_id=payload.additionalData.id;
          this.navCtrl.push('BlogDetailsPage',{id:post_id})
      }
      else if(payload.additionalData.type=="deal"){
        let post_id=payload.additionalData.id;
        this.navCtrl.push('DealsDetailsPage',{id:post_id})
      }
      else if(payload.additionalData.type=="intent"){
        let post_id=payload.additionalData.id;
        this.navCtrl.push(post_id)
      }
      else if(payload.additionalData.type=="modal"){
        let title=payload.additionalData.title;
        let data=payload.additionalData.data;
       this.cs.showAlert(title,data)
      }
      else if(payload.additionalData.type=="url"){
        let url=payload.additionalData.url;
      
       this.sp.OpenInApp(url)
      }
      else if(payload.additionalData.type=="offer"){
        this.navCtrl.push(ShopPage,{page:'offer'})
      }
      else{
        let title=payload.additionalData.title;
        let data=payload.additionalData.data;
       this.cs.showAlert(title,data)
      }  
    }
  }
}
