import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../Classes/User';
import {HealthyApiService} from '../healthy-api/healthy-api.service';
import {Test} from '../Classes/Test';

// import {Subscription} from 'rxjs';

@Component({
    selector: 'app-sign-in-form',
    templateUrl: './sign-in-form.page.html',
    styleUrls: ['./sign-in-form.page.scss'],
})
export class SignInFormPage implements OnInit {

    signInForm: FormGroup;

    login: string;
    password: string;
    user: User;
    test: Test;

    // sub: Subscription;

    constructor(private navCtrl: NavController,
                private modalCtrl: ModalController,
                private formBuilder: FormBuilder,
                private api: HealthyApiService) {
        this.test = new Test();
        this.user = new User('', '');
    }

    public ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.signInForm = this.formBuilder.group({
                login: '',
                password: ''
            }
        );
    }

    onSubmit() {
        const value = this.signInForm.value;
        let log;
        log = value['login'];
        let pwd;
        pwd = value['password']
        this.user = new User(log, pwd);
        console.log('user : ' + log, +' password : ' + pwd);
        console.log('user : ' + this.user.login, +' password : ' + this.user.password);
        // check user
        // if ok then sign in
        // else error pop-up
        // this.sub = this.api.signIn(this.user.login, this.user.password).subscribe(() => {

        // });
        if (this.test.loginCheck(this.user)) {
            this.onGoToMap();
        } else {
            console.log('Erreur sign in !');
        }
    }

    async onGoBack() {
        await this.modalCtrl.dismiss();
    }

    public onGoToMap() {
        this.navCtrl.navigateForward('map').then();
    }

}
