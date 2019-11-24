import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { HomePage } from '../home/home';
import { BlogPage } from '../blog/blog';

/**
 * Generated class for the WizardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-wizard',
    templateUrl: 'wizard.html',
})
export class WizardPage {

    @Input() data: any = [{ img: "", h1: 'Welcome to Bigtricks.in App', h2: 'Get Latest Online Offers, Free Recharge Tricks & Steal Deals here ', h3: '' }, { img: "", h1: 'Loot Deals', h2: 'Never Miss any Singal Loot Deal Now. Get All Steal Deals & Save Money', h3: '' }, { img: "", h1: 'Earn Money', h2: 'Now You can earn Real PayTM cash By Completing our Offers & transfer to PayTM wallet Instantly', h3: '' }];
    @Input() events: any;
    @ViewChild('wizardSlider') slider: Slides;

    sliderOptions = { pager: true };
    path: boolean = false;
    prev: boolean = true;
    next: boolean = true;
    finish: boolean = true

    constructor(private navCtrl: NavController, private cs: CommonServicesProvider) {
        this.prev = false;
        this.next = true;
        this.finish = false;
        this.cs.hidebanner();
    }

    changeSlide(index: number): void {
        if (index > 0) {
            this.slider.slideNext(300);
        } else {
            this.slider.slidePrev(300);
        }
    }

    slideHasChanged(index: number): void {
        try {
            this.prev = !this.slider.isBeginning();
            this.next = this.slider.getActiveIndex() < (this.slider.length() - 1);
            this.finish = this.slider.isEnd();
        } catch (e) { }
    }

    ngOnChanges(changes: { [propKey: string]: any }) {
        this.data = changes['data'].currentValue;
    }

    onEvent(event: string) {
        this.cs.setStorage('firstopen', true);
        this.cs.getStorage('token1').then((res) => {
            console.log(res);
            if (res != null) {
                this.navCtrl.setRoot(BlogPage);

            }
            else {
                this.navCtrl.push(LoginPage);
            }
        })
    }

}