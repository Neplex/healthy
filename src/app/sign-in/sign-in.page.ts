import {Component} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {SignUpPage} from '../sign-up/sign-up.page';
import {SignInFormPage} from '../sign-in-form/sign-in-form.page';

@Component({
    selector: 'app-sign-in',
    templateUrl: 'sign-in.page.html',
    styleUrls: ['sign-in.page.scss'],
})
export class SignInPage {

    constructor(private navCtrl: NavController, private modalCtrl: ModalController) {
    }

    public goToSignUp() {
        this.modalCtrl.create({
            component: SignUpPage
        }).then((modal) => {
            modal.present().then();
        });
    }

    public goToSignInForm() {
        this.modalCtrl.create({
            component: SignInFormPage
        }).then((modal) => {
            modal.present().then();
        });
    }

    public goToMap() {
	    this.navCtrl.navigateRoot('/home/map').then();
    }
}
