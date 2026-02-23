import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {TextInputComponent} from "../../components/form/input/text-input/text-input.component";
import {PasswordInputComponent} from "../../components/form/input/password-input/password-input.component";

@Component({
    selector: 'app-login-register-layout',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TextInputComponent,
        PasswordInputComponent
    ],
    templateUrl: './login-register-layout.component.html',
    styleUrl: './login-register-layout.component.scss'
})

export class LoginRegisterLayoutComponent {

    public formBuilder = inject(FormBuilder);
    public loginForm;

    constructor() {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
    }

    submit() : void {
        if (this.loginForm.invalid) {
            console.log("campos inválidos");
            return;
        }
        console.log(this.loginForm.value);
    }

    getFieldErrors(fieldName: string): any {
        if (!this.loginForm.get(fieldName)?.invalid) return null;
        if (!this.loginForm.get(fieldName)?.dirty) return null;
        if (!this.loginForm.get(fieldName)?.touched) return null;
        return this.loginForm.get(fieldName)?.errors
    }

}
