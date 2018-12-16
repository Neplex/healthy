import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../Classes/User';

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

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.signInForm = this.formBuilder.group({
                login: ['', Validators.required],
                password: ['', Validators.required]
            }
        );
    }

    onSubmit() {
        const value = this.signInForm.value;
        this.user = new User(value['login'], value['password']);
        console.log('user : ' + this.user.login, +' ' + this.user.password);
        // check user
        // if ok then sign in
        // else error pop-up
    }

    public onGoBack() {
        this.navCtrl.navigateBack('sign-in').then();
    }
}
