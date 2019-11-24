

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DealsProvider } from '../../providers/deals/deals';
import { StatusBar } from '@ionic-native/status-bar';
import { ServicesProvider } from '../../providers/services/services';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
/**
 * Generated class for the WordpressDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deals-details',
  templateUrl: 'deals-details.html',
})
export class DealsDetailsPage {
  post_id:number=null;
  author:any=null;
  comment_count:any=null;
  post:any=null;
  views:any=null;
  likes:any=0;
  url:any='';
  title:any='';
  salePrice:any=null;
  oldPrice:any=null;
  date:any=null;
  thumb:any=null;
  comments:any=new Array();
  page:number=0;
  per_page:number=20;
  spnState:string='show';
  link:any='';
  favorite_post:any={};

  constructor(
  	public navCtrl: NavController,
    public navParams: NavParams,
    private statusbar:StatusBar,
    private cs:CommonServicesProvider,
	  public wpService:DealsProvider,private sv:ServicesProvider
    ) {
      this.statusbar.backgroundColorByHexString('#4A00E0');
      this.statusbar.overlaysWebView(true);
      this.statusbar.styleLightContent();
  	this.post_id=this.navParams.get('id');
    if(this.post_id!=null){
  	  this.wpService.getPost(this.post_id).subscribe(data=>{
        console.log(data)
        this.post=data.post;
        this.title=this.post.title;
        this.author=this.post.author.name;
        this.views=data.post.custom_fields.rehub_views[0]
        this.comment_count=data.post.comment_count;
        this.date=this.post.date;
        this.thumb=data.post.thumbnail_images!=null?data.post.thumbnail_images.full.url:"assets//imgs/demo9.jpg"
        this.url=data.post.url;
        this.link=data.post.custom_fields.rehub_offer_product_url[0]
  		  this.favorite_post={
           id:data.post.id,
           title:data.post.title,
           excerpt:data.post.excerpt,
           link:data.post.url,
           thumb:null,
           isFavorite:false,
           oldPrice:'-',
           salePrice:'-'
        }
        this.increasePostViews(this.post_id);
        this.post.oldPrice=this.oldPrice=this.post.custom_fields.rehub_offer_product_price_old;
        this.post.salePrice=this.salePrice=this.post.custom_fields.rehub_offer_product_price;
        this.post.store=this.post.taxonomy_dealstore[0]!=null?this.post.taxonomy_dealstore[0].title:'';
        this.post.storeImage=this.post.taxonomy_dealstore[1]!=null?this.post.taxonomy_dealstore[1]:'';
        if(data.post.thumbnail_images!=null)
          {
            this.thumb=data.post.thumbnail_images.full.url
          }
          else{
            this.thumb=this.post.taxonomy_dealstore[1]!=null?this.post.taxonomy_dealstore[1]:'';
           // post.thumb=taxonomy_dealstore.
          }
        this.wpService.isFavorite(this.favorite_post).then(result=>{
           this.favorite_post.isFavorite=result;
           console.log(this.favorite_post);
        })
        this.spnState='hide';
  	  })
    }else{
        this.spnState='hide';
    }
    //setTimeout(() => { console.log('Inter_DealDet'); this.cs.launchInterstitial() },15000)

  }

  loadComment(){
      this.page+=1;
      this.wpService.getComments(this.page,this.per_page,this.post_id).subscribe(data=>{
        this.comments=this.comments.concat(data),err=>{this.spnState='hide';this.cs.showToastC("Something Went Wrong")};
      });
  }


  ionViewDidLoad() {
    this.loadComment();
    this.cs.trackPageView("Details Deals Page")
    this.cs.hidebanner()
//this.cs.showBannerAds(false);
  }

  favorite(item){
    console.log(item);
     this.wpService.isFavorite(item).then(result=>{
      if(result==false){
        item.isFavorite=true;
        this.wpService.favorite(item);
      }else{
        item.isFavorite=false;
        this.wpService.unFavorite(item);
      }
     })
  }

  share(item){

  }

 openTab()
 {
    this.sv.OpenTab(this.link);
 }
 openInTab()
 {
    this.sv.OpenTab(this.post.url);
 }
 openPostUrl(){
  window.open(this.post.url,"_system", "location=yes")}


  increasePostViews(id){
    this.wpService.increaseDealView(id).subscribe((prop)=>{})
  }
}



