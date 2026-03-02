import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors } from "@angular/forms";

@Component({
    selector: 'app-text-input',
    imports: [
        ReactiveFormsModule
    ],
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true
        }
    ],
    templateUrl: './text-input.component.html',
    styleUrl: './text-input.component.scss'
})

export class TextInputComponent implements ControlValueAccessor {

    @Input() label: string = "Preencha o label";
    @Input() placeholder: string = "";
    @Input() errors: ValidationErrors | null | undefined = null;

    value: string = "";
    disabled: boolean = false;
    activeLabel: boolean = false;

    // Traduz os erros em mensagens para o frontend
    get errorMessages(): string[] {
        if (!this.errors) return [];
        return Object.keys(this.errors).map(key => {
            switch (key) {
                case "required":
                    return this.label + " é obrigatório."
                case 'email':
                    return 'E-mail inválido.';
                case 'minlength':
                    return 'Mínimo de caracteres não atingido.';
                default:
                    return this.label + ' tem um valor inválido.';
            }
        })
    }

    // Atualiza o value do componente sempre que o campo é digitado
    handleInputChange(event: Event) {
        const button = event.target as HTMLButtonElement;
        if (button) {
            if (button.value !== null && button.value !== undefined && button.value !== "") {
                this.activeLabel = true;
            } else {
                this.activeLabel = false;
            }
            this.onChange(button.value);
        }
    }

    handleBlur() {

        if (this.value !== null && this.value !== undefined && this.value !== "") {
            this.activeLabel = true;
        } else {
            console.log(this.value)
            this.activeLabel = false;
        }
        

        this.onTouched()
    }

    handleFocus() {
        this.activeLabel = true;
    }

    onChange: any = (value: any) => {
        this.value = value;
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
