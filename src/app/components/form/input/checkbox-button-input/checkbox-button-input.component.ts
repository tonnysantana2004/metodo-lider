import { Component, forwardRef, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-checkbox-button-input',
  standalone: true,
  imports: [],
  templateUrl: './checkbox-button-input.component.html',
  styleUrl: './checkbox-button-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxButtonInputComponent),
      multi: true
    }
  ]
})
export class CheckboxButtonInputComponent implements ControlValueAccessor {

  @Input() label: string = "Preencha o label";
  @Input() errors: ValidationErrors | null | undefined = null;
  @Input() formControlName : any = "";

  value: string = "";
  disabled: boolean = false;

  // Atualiza o value do componente sempre que o campo é digitado
  handleInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value ?? "";

    this.value = value;        // mantém estado interno consistente
    this.onChange(value);      // notifica o Angular Forms
  }

  handleBlur() {
    this.onTouched()
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
