import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { DealsProvider } from '../../providers/deals/deals';
import { StatusBar } from '@ionic-native/status-bar';
import { BlogPage } from '../blog/blog';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { BrowserTab } from '@ionic-native/browser-tab';
import { OffersPage } from '../offers/offers';
import { WalletPage } from '../wallet/wallet';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  data:any=new Array();
  events: any={};
  query:string='';
  pageTab:string='offer';
  home_tabs:any="offer";
  page:number=0;
  per_page:number=10;
  spnState:string='show';
  searchShow:boolean=false;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public sb:ServicesProvider,
		 public cs:CommonServicesProvider,
     public wpService:WordpressServiceProvider,
     public statusBar:StatusBar,
     public browser:BrowserTab,
     public sp:ServicesProvider

     
     ) {
       this.pageTab=this.navParams.get("page");
       this.home_tabs="offer"
      // setInterval(() => { console.log('timer'); this.cs.launchInterstitial() },10000)

       //this.statusBar.backgroundColorByHexString('#ec008c');

  }

  onInput(){
    this.spnState='show';
 		this.page=0;
     this.data=[];
     if(this.pageTab=="shop"){
     this.loadMore();}
     else{
       this.loadMore2();
     }
  }
  
  loadMore(infiniteScroll:any=null){
    console.log("res")
    this.page+=1;
    this.wpService.getStores(this.page,this.per_page,this.query).subscribe(data=>{
      console.log(data)
     
        for (var i = 0;i< data.length ;i++){    
         
          let post={
             id:data[i].id,
                title:data[i].title,
                excerpt:data[i].details,
                link:data[i].link,
                thumb:data[i].offer_logo,
    
          }

          this.data.push(post);
        };
      this.spnState='hide';
      if(infiniteScroll){
        infiniteScroll.complete();
      }
    },error=>{
      this.spnState='hide';
      if(infiniteScroll!=null){
        infiniteScroll.enable(false);
      }
    })
  }
  loadMore2(infiniteScroll:any=null){
    console.log("res")
    this.page+=1;
    this.wpService.getOffers(this.page,this.per_page,this.query).subscribe(data=>{
    
     
        for (var i = 0;i< data.length ;i++){    
         
          let post={
             id:data[i].offer_id,
             title:data[i].offer_name,
             excerpt:data[i].details,
             terms:data[i].terms,
             des:data[i].offer_des,
             button:data[i].button_text,
             details:data[i].offer_details,
             amount:data[i].coins,
             link:data[i].offer_link,
             thumb:data[i].offer_logo,
    
          }

          this.data.push(post);
        };
      this.spnState='hide';
      if(infiniteScroll){
        infiniteScroll.complete();
      }
    },error=>{
      this.spnState='hide';
      if(infiniteScroll!=null){
        infiniteScroll.enable(false);
      }
    })
  }


   ionViewDidLoad(){
    if(this.pageTab=="shop"){
      this.loadMore();}
      else{
        this.loadMore2();
      }
   this.cs.trackPageView("offershop Page")

   }


  ionViewDidEnter() {
   
  }
  gotoBlog(){
    this.navCtrl.setRoot(BlogPage);
  }
  doRefresh(refresher) {this.page=0;
this.loadMore()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

onClickSearchButton()
{
  this.searchShow=!this.searchShow;
}
openShop(link){
  if(this.cs.userdata!=null)
  {
    link=link+this.cs.userdata.ref
  }
 
this.sp.OpenTab(link)  
}
openOffer(items){
  this.navCtrl.push(OffersPage,{item:items});
}
openWallet(){
  this.navCtrl.push(WalletPage);
}
}
