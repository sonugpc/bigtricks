import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { BlogPage } from '../blog/blog';
import { FavouritePage } from '../favourite/favourite';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { Clipboard } from '@ionic-native/clipboard';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  stores:any=[];
  storeS:any;
  indicator:boolean=true;
  link:any='';
   showBox:boolean=false;
   public generatedUrl;
  constructor(private http:HttpClient,private share:SocialSharing,
    public navCtrl: NavController,private cs:CommonServicesProvider,private cp:Clipboard) {
    this.getData();

  }
  generate(store)
    {
      this.indicator=false;
      if(this.storeS==null){
          this.cs.showToastC("Please Select Store")
          this.indicator=true;

      }
      else{
      console.log(this.storeS)
      let u=encodeURIComponent(this.link)
      this.http.get("https://www.bigtricks.in/app2/generateLink.php?siteID="+this.storeS.id+"&url="+u+"&subid="+this.cs.userdata.ref).subscribe((p)=>{
      
        console.log(p)
        if(p['status']=="SUCCESS"){
          this.showBox=true;
            this.generatedUrl=p['link'];
            this.copyUrl(p['link'])
            this.saveToDatabase(this.cs.refcode,this.generatedUrl,this.storeS)
            this.indicator=true;

        }
        else{
          this.cs.showAlert("Error",p['reason']);
          this.indicator=true;

        }
       })}

    }
    getData()
  {
   
    this.http.get("https://www.bigtricks.in/app2/linkdata.php").subscribe((p)=>{
     this.stores=p;
     console.log(p)
    })

  }
  goto()
  {
    this.navCtrl.push(BlogPage)
  }
  goto2()
  {
    this.navCtrl.push(FavouritePage)
  }
  copyUrl(url){
    this.cp.copy(url).then((res)=>{this.cs.showToastS("Url Copied to Clipboard")})

  }
  shareLink(url){
    this.share.share(url);
  }
  saveToDatabase(ref,url,store){
       this.http.get("https://www.bigtricks.in/app2/updatePreviousLinks.php?ref="+ref+"&url="+url+"&store="+store)
}
FatchFromDatabase(){
  this.http.get("https://www.bigtricks.in/app2/updatePreviousLinks.php?ref=")
}
}


