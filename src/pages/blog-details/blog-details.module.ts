import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogDetailsPage } from './blog-details';

@NgModule({
  declarations: [
    BlogDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogDetailsPage),
  ],
})
export class BlogDetailsPageModule {}
