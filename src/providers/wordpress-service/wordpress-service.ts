
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http';


const STORAGE_KEY="wp_favorites";
const config = {
  api_link:'https://www.bigtricks.in/wp-json/wp/v2/',
  api_link3:'https://deals.bigtricks.in/api/',
  api_link2:"https://deals.bigtricks.in/wp-json/wp/v2/",
  user_api:"https://www.bigtricks.in/app2/",
  json_api_link:"https://www.bigtricks.in/json",
  apiUrl:"https://www.bigtricks.in"
}
/*

  Generated class for the WordpressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class WordpressServiceProvider {
    post_id:any=null;

    constructor(
      public http: HttpClient,
      public ht: HTTP,
      public storage:Storage,
      public iab: InAppBrowser,
      public socialSharing:SocialSharing) {
    }

    getPosts(page,per_page,search:String=''):Observable<any>{
      if(search!=''){
        return this.http.get(config.api_link+'posts?page='+page+'&per_page='+per_page+'&search='+search);
      }
      return this.http.get(config.api_link+'posts?page='+page+'&per_page='+per_page);
    }

    getPostsByCategories(page,per_page,categories):Observable<any>{
      return this.http.get(config.api_link+'posts?page='+page+'&per_page='+per_page+'&categories='+categories);
    }

    getPost(id):Observable<any>{
      return this.http.get('https://www.bigtricks.in/json/get_post/?id='+id);
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
     navCtrl.push('BlogDetailsPage',{id:item.id});
   }
   doReadMorenf(navCtrl,item){
    navCtrl.push('BlogDetailsPage',{id:item});
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
   getPostsDeal(page,per_page,search:String=''):Observable<any>{
    if(search!=''){
      return this.http.get(config.api_link3+'get_search_results'+'?search='+search);

    }
    console.log(config.api_link3+'get_recent_posts/?page='+page+'&count=6')
    return this.http.get(config.api_link3+'get_recent_posts/?page='+page+'&count=6');
  }
  subComments(name,email,content,post_id):Observable<any>{
    return this.http.get('https://www.bigtricks.in/app2/comment.php?name='+name+'&email='+email+'&content='+content+'&post_id='+post_id);
  }
  subMsg(name,email,content):Observable<any>{
    return this.http.get('https://www.bigtricks.in/app2/feedback.php?name='+name+'&email='+email+'&content='+content);
  }
  getuserfromAPI(mobile):Observable<any>{
    return this.http.get(config.user_api+'getUsertype.php?mobile='+mobile)
  }
  signupUser(email,mobile,name,password,ref,otp,imei):Observable<any>{
    return this.http.get(config.user_api+'userSignup.php?mobile='+mobile+"&name="+name+"&email="+email+"&password="+password+"&encrypt_code="+imei+"&otp="+otp+"&aref="+ref)
  }
  loginUser(mobile,password):Observable<any>{
    return this.http.get(config.user_api+'loginByPassword.php?mobile='+mobile+"&password="+password)
  }
  loginUserOTP(mobile,otp):Observable<any>{
    return this.http.get(config.user_api+'loginByOTP.php?mobile='+mobile+"&password="+otp)

  }
  gettxn(tkn): Observable<any> {
    console.log(tkn);
    let k = this.http.get(config.apiUrl+"/app2/txn.php?token="+tkn);
    console.log(k);
    return k;
  }
  getStores(page,per_page,search:String=''):Observable<any>{
    if(search==''||search==null){
      return this.http.get(config.user_api+'stores.php'+'?search='+search+'&page='+page);

    }
    else{

      return this.http.get(config.user_api+'stores.php'+'?search='+search);

    }

  }
  getOffers(page,per_page,search:String=''):Observable<any>{
    if(search!=''){
      return this.http.get(config.user_api+'offers.php'+'?search='+search);

    }
    else{
      return this.http.get(config.user_api+'offers.php'+'?search='+search);

    }
}

    getBalance(token):Observable<any>{
      return this.http.get(config.user_api+'wallet.php'+'?encrypt_code='+token);
    }
    getDashData(token):Observable<any>{
      return this.http.get(config.user_api+'dashboard.php'+'?encrypt_code='+token);

    }
    getreferralData(token):Observable<any>{
      return this.http.get(config.user_api+'referral.php'+'?encrypt_code='+token);

    }
    redeemBalance(token,amount):Observable<any>{
      return this.http.get(config.user_api+"redeem.php?token="+token+"&token2="+amount)
  }
  checkVersion():Observable<any>{
    return this.http.get(config.user_api+"Appversion.php");

  }
  
}
