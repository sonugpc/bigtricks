

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import 'rxjs/add/operator/map';
import { BlogDetailsPage } from '../../pages/blog-details/blog-details';
import { DealsDetailsPage } from '../../pages/deals-details/deals-details';

const STORAGE_KEY="wp_favorites";
const config = {
  api_link1:'https://deals.bigtricks.in/api/',
  api_link:"https://deals.bigtricks.in/wp-json/wp/v2/"
}
/*

  Generated class for the WordpressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class DealsProvider {
    constructor(
      public http: HttpClient,
      public storage:Storage,
      public iab: InAppBrowser,
      public socialSharing:SocialSharing) {
    }
    
    getPosts(page,per_page,search:String=''):Observable<any>{
      //console.log("ss")
      if(search!=''){
        return this.http.get(config.api_link1+'get_search_results'+'?search='+search);
  
      }
      //this.ht.get(config.api_link3+'get_recent_posts/?page='+page+'&count=6',{},{}).then(data=>{console.log(data)})
      return this.http.get(config.api_link1+'get_recent_posts/?page='+page+'&count='+per_page);
    }

    getPostsByCategories(page,per_page,categories):Observable<any>{
      return this.http.get(config.api_link+'posts?page='+page+'&per_page='+per_page+'&categories='+categories);
    }

    getPost(id):Observable<any>{

      console.log(this.http.get('https://deals.bigtricks.in/api/get_post/?id='+id))

      return this.http.get('https://deals.bigtricks.in/api/get_post/?id='+id);
    }

    getCategorys(page,per_page){
      return this.http.get(config.api_link+'categories?page='+page+'&per_page='+per_page);
    }

    getMedia(id: number):Observable<any>{
      return this.http.get(config.api_link+'media/'+id);
    }

    getComments(page,per_page,post_id:any=null):Observable<any>{
      return this.http.get(config.api_link+'comments?page='+page+'&per_page='+per_page+'&post='+post_id);
    }


    //favorites
    isFavorite(item){
      return this.getAllFavorites().then(result => {
        if(result){
          if(this.getIndexOf(item.id,result)!=-1){
            return true;
          }else{
            return false;
          }
        }else{
          return false;
        }
      });
    }

    favorite(item){
      return this.getAllFavorites().then(result => {
        if (result) {
          result.push(item);
          return this.storage.set(STORAGE_KEY, result);
        } else {
          return this.storage.set(STORAGE_KEY, [item]);
        }
      });
    }

    unFavorite(item){
      return this.getAllFavorites().then(result=>{
        if(result){
           let index=this.getIndexOf(item.id,result);
          result.splice(index,1);
          return this.storage.set(STORAGE_KEY,result);
        }
      })
    }

   getAllFavorites(){
      return this.storage.get(STORAGE_KEY);
   }

   getIndexOf(id:any,result:any){
      for (var i = 0; i < result.length; i++) {
        if(result[i].id == id ){
          return i;
        }
      }
      return -1;
   }

   clearAllFavorite(){
      this.storage.remove(STORAGE_KEY);
   }


   //action on click event
   doFavorite(item){
     this.isFavorite(item).then(result=>{
      if(result==false){
        item.isFavorite=true;
        this.favorite(item);
      }else{
        item.isFavorite=false;
        this.unFavorite(item);
      }
     })
   }

   doReadMore(navCtrl,item){
     navCtrl.push('DealsDetailsPage',{id:item.id});
   }
  
   doShare(item){
      this.socialSharing.share(item.name, item.title, null, item.url);
   }

   goToPosts(navCtrl,item){
     navCtrl.push('WordpressPostsPage',{id:item.id});
   }

   doOpen(item){
     const browser = this.iab.create(item.link);
   }
   //end action on click event
   increaseDealView(id):Observable<any>{
    return this.http.get("https://deals.bigtricks.in/app/increasePostViewDeals.php?post_id="+id);

}
  }
