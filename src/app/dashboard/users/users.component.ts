import { Component, inject } from '@angular/core';
import { ButtonPrimaryComponent } from '../../components/buttons/button-primary/button-primary.component';
import { CardComponent } from "../../components/cards/card/card.component";
import { SearchInputComponent } from '../../components/filters/search-input/search-input.component';
import { UserListItemComponent } from '../../components/listings/user-list-item/user-list-item.component';
import { UserService } from '../../services/user.service';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';
import { UsersTableComponent } from '../../components/tables/users-table/users-table.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    UserListItemComponent,
    UsersTableComponent,
    SearchInputComponent,
    ButtonPrimaryComponent,
    CardComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersListComponent {

  private userService = inject(UserService);

  public users: any[] = [];
  public searchTerm: string = '';

  constructor() {
    this.userService.findAll().subscribe(users => {
      this.users = users ?? [];
    });
  }

  onSearchChange(term: string) {
    this.searchTerm = (term || '').toLowerCase();
  }

  get filteredUsers() {
    if (!this.searchTerm) {
      return this.users;
    }

    return this.users.filter(user => {
      const name = (user?.fullName || '').toLowerCase();
      return name.includes(this.searchTerm);
    });
  }
}

