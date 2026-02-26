import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-countdown-card',
    imports: [],
    templateUrl: './countdown-card.component.html',
    styleUrl: './countdown-card.component.scss'
})
export class CountdownCardComponent {
  @Input() countNumber : number = 1000;
  @Input() text : string = "Insira um texto";
  @Input() color : string = "#000";
}
