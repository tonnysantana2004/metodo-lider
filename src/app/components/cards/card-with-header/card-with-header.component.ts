import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-with-header',
    imports: [],
    standalone : true,
    templateUrl: './card-with-header.component.html',
    styleUrl: './card-with-header.component.scss'
})
export class CardWithHeaderComponent {
  @Input() headerTitle : string = "";
}
