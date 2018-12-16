import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-sign-in',
    templateUrl: 'sign-in.page.html',
    styleUrls: ['sign-in.page.scss'],
})
export class SignInPage {
    constructor(private navCtrl: NavController) {
    }

    public onGoToSignUp() {
        this.navCtrl.navigateForward('sign-up').then();
    }

    public onGoToSignInForm() {
        this.navCtrl.navigateForward('sign-in-form').then();
    }
}
