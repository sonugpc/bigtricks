import {DomSanitizer} from '@angular/platform-browser'
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';
import { ServicesProvider } from '../../providers/services/services';
import { CommentsPage } from '../comments/comments';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
/**
 * Generated class for the WordpressDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-blog-details',
  templateUrl: 'blog-details.html',
})
export class BlogDetailsPage {
  @ViewChild(Content)
  
  post_id:number=null;
  author:any=null;
  comment_count:any=null;
  post:any=null;commentdata:any='';
  views:any=null;
  date:any=null;
  title:any='loading...'
  thumb:any=null;
  comments:any=new Array();
  page:number=0;
  per_page:number=20;
  spnState:string='show';
  content: Content;
  favorite_post:any={};
  showStatus:boolean=false;
  constructor(
  	public navCtrl: NavController,
    public navParams: NavParams,private sanitizer: DomSanitizer,
    public wpService:WordpressServiceProvider,
    private sv:ServicesProvider,
    private cs:CommonServicesProvider,
    ) {
  	this.post_id=this.navParams.get('id');
    if(this.post_id!=null){
  	  this.wpService.getPost(this.post_id).subscribe(data=>{
        console.log(data);
        this.post=data.post;
        this.title=this.post.title;
        this.author=this.post.author.name;
        data.post.custom_fields.post_views_count!=null?this.views=data.post.custom_fields.post_views_count['0']:this.views=0;
        this.comment_count=data.post.comment_count;
        this.date=this.post.date;
        this.thumb=data.post.thumbnail_images.full.url,
        this.post.content=this.sanitizer.bypassSecurityTrustHtml(this.post.content);
        this.comments=this.post.comments;
        this.showStatus=true;
  		  this.favorite_post={
           id:data.post.id,
           title:data.post.title,
           excerpt:data.post.excerpt,
           link:data.post.url,
           thumb:null,
           isFavorite:false
        }



      
        if(data.post.thumbnail_images!=null)
        {
          this.favorite_post.thumb=data.post.thumbnail_images.full.url
        }
        
        
        this.wpService.isFavorite(this.favorite_post).then(result=>{
           this.favorite_post.isFavorite=result;
           console.log(this.favorite_post);
        })
        this.spnState='hide';
  	  },error=>{this.spnState='hide';this.cs.showToastC("Something Went Wrong")},
      )
    }else{
        this.spnState='hide';
    }

    //setTimeout(() => { console.log('blog inter'); this.cs.launchInterstitial() },5000)
  }

 


  ionViewDidLoad() {
    this.cs.trackPageView("Blog Details Page")
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
  openComments(post_id){
 this.showStatus=!this.showStatus;
    console.log(post_id)
    this.wpService.post_id=post_id;
    console.log(this.wpService.post_id)
    this.sv.OpenModal(CommentsPage);
  }
openPostUrl(){
  window.open(this.post.url,"_system", "location=yes")}


  submitcomment()
  {
    if(this.cs.userdata.name==''||this.cs.userdata.email==''||this.commentdata=='')
    {
      this.cs.showToastC("Please Login to Use this Feature or fill all the fields");
    }
    else if(this.post==null){
      this.cs.showToastC("Comment is not possible here. Please comment on a offer post")
    }
    else{
this.cs.showLoading("Please Wait...")
    this.wpService.subComments(this.cs.userdata.name,this.cs.userdata.email,this.commentdata,this.post.id).subscribe((data)=>{
      if(data.status=="error")
      {
        this.cs.showAlert("Error",data.error);
      }
      else if(data.status="pending")
      {
        this.cs.showToastS("Comment is Submitted & waiting for Approval");
        this.cs.launchInterstitial();
        this.commentdata=="";

      }
      
     
  });
  
  }}
  
   
  
 
}


