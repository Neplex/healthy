import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Subscription} from 'rxjs';

import {HealthyApiService} from '../healthy-api/healthy-api.service';
import {User} from '../healthy-api/class/user';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit, OnDestroy {

    form: FormGroup;
    subscription: Subscription;

    constructor(
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private formBuilder: FormBuilder,
        private api: HealthyApiService
    ) {
    }

    private static passwordCheck(group: FormGroup) {
        const password = group.controls['password'].value;
        const passwordCheck = group.controls['passwordCheck'].value;

        if (password === passwordCheck) {
            return null;
        }

        return {passwordCheck: true};
    }

    public ngOnInit(): void {
        // TODO: display errors in form
        this.form = this.formBuilder.group({
            username: this.formBuilder.control(
                '',
                Validators.compose([Validators.required, Validators.minLength(6)])
            ),
            passwords: this.formBuilder.group({
                password: this.formBuilder.control(
                    '',
                    Validators.compose([Validators.required, Validators.minLength(6)])
                ),
                passwordCheck: this.formBuilder.control(
                    '',
                    Validators.compose([Validators.required, Validators.minLength(6)])
                )
            }, {validator: this.passwordCheck})
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSubmit() {
        if (this.form.valid) {
            const newUser = new User();
            newUser.username = this.form.value.username;
            newUser.password = this.form.value.passwords.password;

            this.subscription = this.api.saveUser(newUser).subscribe(
                (user) => this.onSuccess(user),
                (error) => this.onFail(error)
            );
        } else {
            console.error(this.form.controls.username.errors);
        }
    }

    public goBack() {
        this.modalCtrl.dismiss().then();
    }

    public onSuccess(user: User) {
        this.goBack();
    }

    public onFail(error) {
        console.error(error);
        // TODO: display error in form
    }
}
