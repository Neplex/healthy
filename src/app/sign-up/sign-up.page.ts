import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../Classes/User';
import {Test} from '../Classes/Test';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

    signInForm: FormGroup;

    login: string;
    password: string;
    user: User;
    test: Test;

    constructor(private navCtrl: NavController, private modalCtrl: ModalController, private formBuilder: FormBuilder) {
        this.user = new User('', '');
        this.test = new Test();
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
        let pwd2;
        let pwd1;
        log = value['login'];
        pwd1 = value['password1'];
        pwd2 = value['password2'];
        if (pwd1 === pwd2) {
            this.user = new User(log, pwd1);
            console.log('user : ' + log + ' password1 : ' + pwd1 + ' password2 : ' + pwd2);
            console.log('user : ' + this.user.login, +' password : ' + this.user.password);
            if (!this.test.loginCheck(this.user)) {
                this.test.addUser(this.user);
                this.onGoToMap();
            } else {
                console.log('Erreur sign up !');
            }
        } else {
            console.log('Erreur password !');
        }
    }

    async onGoBack() {
        await this.modalCtrl.dismiss();
    }

    public onGoToMap() {
        this.navCtrl.navigateForward('map').then();
    }
}
