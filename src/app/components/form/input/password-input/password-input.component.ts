import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors} from "@angular/forms";

@Component({
    selector: 'app-password-input',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PasswordInputComponent),
            multi: true
        }
    ],
    templateUrl: './password-input.component.html',
    styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent implements ControlValueAccessor {

    @Input() label: string = "Preencha o label";
    @Input() placeholder: string = "Preencha o placeholder";
    @Input() errors: ValidationErrors | null | undefined = null;

    value: string = "";
    disabled: boolean = false;

    // Traduz os erros em mensagens para o frontend
    get errorMessages(): string[] {
        if (!this.errors) return [];
        return Object.keys(this.errors).map(key => {
            switch (key) {
                case "required":
                    return this.label + " é obrigatório."
                case 'invalidCredentials':
                    return 'Senha ou e-mail inválidos.';
                default:
                    return this.label + ' tem um valor inválido.';
            }
        })
    }

    // Atualiza o value do componente sempre que o campo é digitado
    handleInputChange(event: Event) {
        const button = event.target as HTMLButtonElement;
        if (button) {
            this.onChange(button.value);
        }
    }

    onChange: any = (value: any) => {
    };
    onTouched: any = () => {
    };
    writeValue(value: any): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
