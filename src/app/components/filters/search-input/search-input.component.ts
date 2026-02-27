import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Pesquisar...';
  @Output() valueChange = new EventEmitter<string>();

  value: string = '';

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target?.value ?? '';
    this.valueChange.emit(this.value);
  }
}
