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

    async onGoToSignUp() {
        const modal = await this.modalCtrl.create({
            component: SignUpPage
        });
        return await modal.present();
    }

    async onGoToSignInForm() {
        const modal = await this.modalCtrl.create({
            component: SignInFormPage
        });
        return await modal.present();
    }

    public onGoToMap() {
        this.navCtrl.navigateForward('home').then();
    }
}
