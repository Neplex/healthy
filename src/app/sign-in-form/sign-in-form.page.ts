import {Component, OnDestroy} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';

import {Subscription} from 'rxjs';

import {HealthyApiService} from '../healthy-api/healthy-api.service';
import {User} from '../healthy-api/class/user';


@Component({
    selector: 'app-sign-in-form',
    templateUrl: './sign-in-form.page.html',
    styleUrls: ['./sign-in-form.page.scss'],
})
export class SignInFormPage implements OnDestroy {

    user: User;
    subscription: Subscription;

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private api: HealthyApiService
    ) {
        this.user = new User();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSubmit() {
        this.subscription = this.api.signIn(this.user.username, this.user.password).subscribe(
            () => this.onSuccessfulLogin(),
            (error) => this.onFailedLogin(error)
        );
    }

    public goBack() {
        this.modalCtrl.dismiss().then();
    }

    public onSuccessfulLogin() {
	    this.navCtrl.navigateRoot('/home/map').then();
        this.modalCtrl.dismiss().then();
    }

    public onFailedLogin(error) {
        console.error(error);
        // TODO: display error in form
    }

}
