import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {SignInPage} from './sign-in.page';
import {SignUpPage} from './sign-up/sign-up.page';
import {SignInFormPage} from './sign-in-form/sign-in-form.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: SignInPage
            }
        ]),
        ReactiveFormsModule
    ],
    entryComponents: [
        SignUpPage,
        SignInFormPage
    ],
    declarations: [
        SignInPage,
        SignUpPage,
        SignInFormPage
    ]
})
export class SignInPageModule {
}
