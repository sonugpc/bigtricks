import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelegramPage } from './telegram';

@NgModule({
  declarations: [
    TelegramPage,
  ],
  imports: [
    IonicPageModule.forChild(TelegramPage),
  ],
})
export class TelegramPageModule {}
