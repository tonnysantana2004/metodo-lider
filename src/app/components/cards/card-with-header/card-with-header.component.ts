import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-with-header',
  standalone: true,
  imports: [],
  templateUrl: './card-with-header.component.html',
  styleUrl: './card-with-header.component.scss'
})
export class CardWithHeaderComponent {
  @Input() title : string = "";
}
