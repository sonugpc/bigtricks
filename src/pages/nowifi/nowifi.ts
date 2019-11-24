import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import { NavController } from 'ionic-angular';
import { BlogPage } from '../blog/blog';



@Component({
  selector: 'page-nowifi',
  templateUrl: 'nowifi.html',
})
export class NowifiPage {

  constructor( private network:Network,private navCt:NavController
     ) {
  }

 
  retry()
  {
this.navCt.setRoot(BlogPage);
  }

 
}
