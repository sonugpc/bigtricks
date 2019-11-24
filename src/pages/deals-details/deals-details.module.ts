import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DealsDetailsPage } from './deals-details';

@NgModule({
  declarations: [
    DealsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DealsDetailsPage),
  ],
})
export class DealsDetailsPageModule {}
