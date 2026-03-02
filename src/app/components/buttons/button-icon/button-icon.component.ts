import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  imports: [],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.scss',
})
export class ButtonIconComponent {
  @Input() link: string = "";
}
