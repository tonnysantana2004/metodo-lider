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
  @Input() profileImage: string = 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Brian';
  @Input() fullName: string = 'Nome completo';
  @Input() email: string | false = false;
  @Input() phone: string | false = false;

  // Bolha de contagem que fica sobre a foto de perfil
  @Input() count: number | null = null;
}