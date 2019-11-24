import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WordpressServiceProvider } from '../providers/wordpress-service/wordpress-service';
import { BlogPage, PopoverPage } from '../pages/blog/blog';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FavouritePage } from '../pages/favourite/favourite';
import { CategoryPage } from '../pages/category/category';
import { PrivacyPage } from '../pages/privacy/privacy';
import { FollowPage } from '../pages/follow/follow';
import { AboutPage } from '../pages/about/about';
import { ServicesProvider } from '../providers/services/services';
import { CommonServicesProvider } from '../providers/common-services/common-services';
import { DealsArchivePage } from '../pages/deals-archive/deals-archive';
import { DealsProvider } from '../providers/deals/deals';
import { HTTP } from '@ionic-native/http';
import { ContactusPage } from '../pages/contactus/contactus';
import { HeaderColor } from '@ionic-native/header-color';
import { BrowserTab } from '@ionic-native/browser-tab';
import { CommentsPage } from '../pages/comments/comments';
import { AdMobFree } from '@ionic-native/admob-free';
import { OneSignal } from '@ionic-native/onesignal';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Network } from '@ionic-native/network';
import { NowifiPage } from '../pages/nowifi/nowifi';
import { NotificationPage } from '../pages/notification/notification';
import { AppRate } from '@ionic-native/app-rate';
import { WizardPage } from '../pages/wizard/wizard';
import { LoginPage } from '../pages/login/login';
import { LoginOrSignupPage } from '../pages/login-or-signup/login-or-signup';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SplashPage } from '../pages/splash/splash';
import { InvitePage } from '../pages/invite/invite';
import { HistoryPage } from '../pages/history/history';
import { RedeemPage } from '../pages/redeem/redeem';
import { WalletPage } from '../pages/wallet/wallet';
import { ProfilePage } from '../pages/profile/profile';
import { ShopPage } from '../pages/shop/shop';
import { OffersPage } from '../pages/offers/offers';
import { Clipboard } from '../../node_modules/@ionic-native/clipboard';

import { AppVersion } from '@ionic-native/app-version/';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/';
import { TelegramPage } from '../pages/telegram/telegram';


@NgModule({
  declarations: [
    MyApp,
    HomePage,NowifiPage,DealsArchivePage,BlogPage,
    NotificationPage,WizardPage,SplashPage,PopoverPage,
    LoginPage,LoginOrSignupPage,ShopPage,OffersPage,
    CategoryPage,PrivacyPage,FollowPage,AboutPage,ContactusPage,FavouritePage,CommentsPage,
    InvitePage,HistoryPage,RedeemPage,WalletPage,ProfilePage,TelegramPage
  ],
  imports: [
   
    BrowserModule, HttpClientModule,
    IonicModule.forRoot(MyApp), IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    ,LoginOrSignupPage,ShopPage,OffersPage,PopoverPage,TelegramPage,
    HomePage,NowifiPage,NotificationPage,WizardPage,LoginPage,SplashPage,  InvitePage,HistoryPage,RedeemPage,WalletPage,ProfilePage,
    CategoryPage,PrivacyPage,FollowPage,AboutPage,ContactusPage,BlogPage, FavouritePage,DealsArchivePage,CommentsPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StatusBar, InAppBrowser, SocialSharing,Uid,AndroidPermissions,AppVersion,
    SplashScreen, HttpClient,CommonServicesProvider,ServicesProvider,

    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WordpressServiceProvider,Network,InAppPurchase2 ,Clipboard,SpinnerDialog,
    ServicesProvider,GoogleAnalytics,
    CommonServicesProvider,AdMobFree,OneSignal,AppRate,DealsProvider,HTTP,HeaderColor,BrowserTab
  ]
})
export class AppModule { }
