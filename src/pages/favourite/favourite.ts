import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordpressServiceProvider } from '../../providers/wordpress-service/wordpress-service';

/**
 * Generated class for the FavouritwPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html',
})
export class FavouritePage {
  data:any=new Array();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public wpService:WordpressServiceProvider
    ) {
  }

  ionViewDidEnter(){
    this.data=new Array();
    let that=this;
    this.wpService.getAllFavorites().then(result=>{
      this.data=result;
    })
  }

  doFavorite(item){
    this.wpService.doFavorite(item);
    let index = this.wpService.getIndexOf(item.id,this.data);
       if(index !=-1){
         this.data.splice(index, 1);
       }
  }

  doClear(){
    this.wpService.clearAllFavorite();
    this.data=new Array();
  }

}
