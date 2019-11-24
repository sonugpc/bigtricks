
import { Component } from '@angular/core';
import {  NavController, NavParams, PopoverController, Platform} from 'ionic-angular';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { ServicesProvider } from '../../providers/services/services';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { DealsArchivePage } from '../deals-archive/deals-archive';
import { BlogDetailsPage } from '../blog-details/blog-details';
import { NotificationPage } from '../notification/notification';
import { HomePage } from '../home/home';
import { TelegramPage } from '../telegram/telegram';

 @Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
 })
 export class BlogPage {
 	data:any=new Array();
	 events: any={};
	 query:String='';
	 modal:any="assets//img/modal.jpg"
	searchShow:boolean=false;
	 slideData:any=[  ];
	 page:number=0;
	 counter=0;
 	per_page:number=10;
 	spnState:string='show';
	home_tabs:any="offers"
 	constructor(public sb:ServicesProvider,
		 public navCtrl: NavController,
		 private popoverCtrl:PopoverController,
		 public cs:CommonServicesProvider,
		 public navParams: NavParams,
		 public platform:Platform,
 		public wpService:WordpressServiceProvider){
			this.loadSlider();
			console.log(this.cs.threedots);
				//console.log(this.cs.token)
 	}
	
 	loadMore(infiniteScroll:any=null){
	 console.log("res")
	 this.cs.showBannerAds(true);
	 if(this.page>=9)
	 {
		this.cs.launchInterstitial()

	 }
 		this.page+=1;
 		this.wpService.getPosts(this.page,this.per_page,this.query).subscribe(data=>{
 		    for (var i = 0;i< data.length ;i++){
 		    	let post={
 		    		 id:data[i].id,
 		    	   	 title:data[i].title.rendered,
 		    	   	 excerpt:data[i].excerpt.rendered,
 		    	   	 link:data[i].link,
 		    	   	 thumb:null,
 		    	   	 isFavorite:false
 		    	}

 		    	this.wpService.getMedia(data[i].featured_media).subscribe(media=>{
 		    		post.thumb=media.source_url;
 		    	});

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
			 this.cs.showToastC("Please check Your Internet connection");
 			if(infiniteScroll!=null){
 				infiniteScroll.enable(false);
 			}
 		})
 	}


    ionViewDidLoad(){
		//this.cs.trackPageView("Blogpage")
		this.loadMore();
		// this.platform.registerBackButtonAction(()=>{
		// 	if(this.counter==0){
		// 		this.counter++;
		// 		this.cs.showWhiteToast("Press again to exit App")
		// 	}
		// 	else{
		// 		this.platform.exitApp();
		// 	}
		// })
    
		}
 	ionViewDidEnter() {
 		if(this.data.length!=0){
 			for(let i = 0; i < this.data.length; i++) {
 		    	this.wpService.isFavorite(this.data[i]).then(result=>{
      				this.data[i].isFavorite=result;
                })
 			}
		 }
		 
	//	 this.cs.showBannerAds(true);
	 }
	 loadSlider()
	 {
		// this.slideData=new Array();
		this.sb.fatchHomepageSlider().subscribe((data)=>{
			

 	for (var i = 0;i< data.length ;i++){
 		    	let sliderDetails={
 		    		 id:data[i].id,
 		    	   	 imgUrl:data[i].imgUrl,
 		    	   	 linkUrl:data[i].linkUrl,
 		    	}
				 this.slideData.push(sliderDetails)
		}
	 },error=>{console.log(error)})

 }
 goto(){
    this.navCtrl.setRoot(DealsArchivePage);
  }
  gotoTelegram(){

	this.navCtrl.push(TelegramPage);
}
  onClickSearchButton()
{
  this.searchShow=!this.searchShow;
}
onInput(){
    this.spnState='show';
 		this.page=0;
 		this.data=[];
 		this.loadMore();
	}
	handleSlideClick(item){
		if(item.component!=null){
			this.navCtrl.push(item.component)
		}
		else{
			this.sb.OpenTab(item.linkUrl);
		}
	}
	onRefresh($event){
		this.loadSlider();
		this.loadMore();
	}
	
	onNotificationButton(){
		this.navCtrl.push(NotificationPage);
	}
	presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
@Component({
  template: `
		<ion-list>
     <button ion-item (click)="linkgenerate()">Link Generate</button>
        </ion-list>
  `
})
export class PopoverPage {
  constructor(private navctrl:NavController) {

	}
linkgenerate(){
	this.navctrl.push(HomePage);

}



}