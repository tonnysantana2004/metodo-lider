import { Component, inject } from '@angular/core';
import { DashboardLayoutComponent } from "../../dashboard-layout/dashboard-layout.component";
import { CardWithHeaderComponent } from "../../../components/cards/card-with-header/card-with-header.component";
import { TextInputComponent } from "../../../components/form/input/text-input/text-input.component";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../auth-service.service';
import {ButtonPrimaryComponent} from "../../../components/buttons/button-primary/button-primary.component";

@Component({
  selector: 'app-create-user',
    imports: [DashboardLayoutComponent, CardWithHeaderComponent, TextInputComponent, ReactiveFormsModule, ButtonPrimaryComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

  public router: any = inject(Router);
  public authService = inject(AuthServiceService);
  public formBuilder = inject(FormBuilder);

  public createUserForm = this.formBuilder.group
    ({
      fullName: new FormControl('', [Validators.required]),
      profession: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

  submit(): void {
    
    if (this.createUserForm.invalid) {
      this.createUserForm.markAllAsTouched();
      return;
    }

    const serviceResponse = this.authService.login(this.createUserForm.value);
    if (!serviceResponse) {
      this.createUserForm.get('password')?.setErrors({ invalidCredentials: true });
    }

  }

  getFieldErrors(fieldName: string): any {
    const control = this.createUserForm.get(fieldName);
    if (control?.invalid && control?.touched) return control?.errors;

    return null;
  }


}
