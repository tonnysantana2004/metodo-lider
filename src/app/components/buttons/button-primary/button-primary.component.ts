import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss'
})
export class ButtonPrimaryComponent {
    @Input() text: string = "Texto do botão";
    @Input() link: string = "";
    @Input() type: string = "button";
    tag : string = "button";

}
