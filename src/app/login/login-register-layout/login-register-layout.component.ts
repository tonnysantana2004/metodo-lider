import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {TextInputComponent} from "../../components/form/input/text-input/text-input.component";
import {PasswordInputComponent} from "../../components/form/input/password-input/password-input.component";
import {ButtonPrimaryComponent} from "../../components/buttons/button-primary/button-primary.component";

@Component({
    selector: 'app-login-register-layout',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TextInputComponent,
        PasswordInputComponent,
        ButtonPrimaryComponent
    ],
    templateUrl: './login-register-layout.component.html',
    styleUrl: './login-register-layout.component.scss'
})

export class LoginRegisterLayoutComponent {

    public formBuilder = inject(FormBuilder);
    public loginForm = this.formBuilder.group
    ({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    submit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        console.log(this.loginForm.value);
    }

    getFieldErrors(fieldName: string): any {
        const control = this.loginForm.get(fieldName);
        if (control?.invalid && control?.touched) return control?.errors;

        return null;
    }

}
