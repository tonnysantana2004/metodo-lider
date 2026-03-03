import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthServiceService } from "../../auth-service.service";
import { ButtonPrimaryComponent } from "../../components/buttons/button-primary/button-primary.component";
import { CardWithHeaderComponent } from "../../components/cards/card-with-header/card-with-header.component";
import {
    CheckboxButtonInputComponent
} from "../../components/form/input/checkbox-button-input/checkbox-button-input.component";
import { DashboardLayoutComponent } from "../dashboard-layout/dashboard-layout.component";

@Component({
  selector: 'app-priorities',
    imports: [
        DashboardLayoutComponent,
        ButtonPrimaryComponent,
        CardWithHeaderComponent,
        ReactiveFormsModule,
        CheckboxButtonInputComponent
    ],
  templateUrl: './priorities.component.html',
  styleUrl: './priorities.component.scss',
})
export class PrioritiesComponent {
    public router: any = inject(Router);
    public authService = inject(AuthServiceService);
    public formBuilder = inject(FormBuilder);

    public priorityForm = this.formBuilder.group
    ({
        pergunta1: new FormControl(),
        pergunta2: new FormControl(),
        pergunta3: new FormControl(),
        pergunta4: new FormControl(),
        pergunta5: new FormControl(),
    });

    submit(): void {

        if (this.priorityForm.invalid) {
            this.priorityForm.markAllAsTouched();
            return;
        }

        const serviceResponse = this.authService.login(this.priorityForm.value);
        if (!serviceResponse) {
            this.priorityForm.get('password')?.setErrors({ invalidCredentials: true });
        }

    }

    getFieldErrors(fieldName: string): any {
        const control = this.priorityForm.get(fieldName);
        if (control?.invalid && control?.touched) return control?.errors;

        return null;
    }
}
