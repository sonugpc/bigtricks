import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { ServicesProvider } from '../../providers/services/services';
import { DealsProvider } from '../../providers/deals/deals';
import { BlogPage } from '../blog/blog';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { StatusBar } from '@ionic-native/status-bar';


@Component({
  selector: 'page-deals-archive',
  templateUrl: 'deals-archive.html',
})
export class DealsArchivePage {
  data:any=new Array();
  events: any={};
  query:string='';

  home_tabs:any="deals";
  page:number=0;
  per_page:number=10;
  spnState:string='show';
  searchShow:boolean=false;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public sb:ServicesProvider,
		 public cs:CommonServicesProvider,
     public wpService:DealsProvider,
     public statusBar:StatusBar

     
     ) {
       this.home_tabs="deals"
      // setInterval(() => { console.log('timer'); this.cs.launchInterstitial() },10000)

       //this.statusBar.backgroundColorByHexString('#ec008c');

  }

  onInput(){
    this.spnState='show';
 		this.page=0;
 		this.data=[];
 		this.loadMore();
  }
  
  loadMore(infiniteScroll:any=null){
    console.log("res")
    this.page+=1;
    this.wpService.getPosts(this.page,this.per_page,this.query).subscribe(data=>{
      console.log(data)
      data=data.posts;
        for (var i = 0;i< data.length ;i++){    
         
          let post={
             id:data[i].id,
                title:data[i].title,
                excerpt:data[i].excerpt,
                link:data[i].url,
                thumb:'assets/imgs/demo9.jpg',
                isFavorite:false,
                oldPrice:'-',
                salePrice:'-'
          }
          post.oldPrice=data[i].custom_fields.rehub_offer_product_price_old;
          post.salePrice=data[i].custom_fields.rehub_offer_product_price;
        
          if(data[i].thumbnail_images!=null&&data[i].thumbnail_images.full!=null)
          {
            post.thumb=data[i].thumbnail_images.full.url
          }
          else{
              post.thumb=data[i].taxonomy_dealstore[1]!=null?data[i].taxonomy_dealstore[1]:'assets/imgs/demo9.jpg';
          }

         

          this.wpService.isFavorite(data[i]).then(result=>{
             post.isFavorite=result;
          this.data.push(post);
               })
        };
      this.spnState='hide';
      if(infiniteScroll){
        infiniteScroll.complete();
      }
    },error=>{
      this.spnState='hide';
      this.cs.showToastC("No Internet Connection!!")
      if(infiniteScroll!=null){
        infiniteScroll.enable(false);
      }
    })
  }


   ionViewDidLoad(){
   this.loadMore();
   this.cs.trackPageView("dealsArchive Page")

   }


  ionViewDidEnter() {
    if(this.data.length!=0){
      for(let i = 0; i < this.data.length; i++) {
          this.wpService.isFavorite(this.data[i]).then(result=>{
             this.data[i].isFavorite=result;
               })
      }
    }
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
}
