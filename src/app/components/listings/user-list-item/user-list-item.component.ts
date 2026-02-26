import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss',
})
export class UserListItemComponent {
  @Input() profileImage: string = '';
  @Input() fullName: string = '';
  @Input() email: string = '';
  @Input() phone: string = '';

  // Bolha de contagem que fica sobre a foto de perfil
  @Input() count: number | null = null;
}

