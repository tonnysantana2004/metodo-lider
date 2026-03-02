import { Component, Input } from '@angular/core';
import { ButtonIconComponent } from "../../buttons/button-icon/button-icon.component";

@Component({
  selector: 'app-users-table',
  imports: [ButtonIconComponent],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})

export class UsersTableComponent {
  @Input() users : any[] = [];;
}
