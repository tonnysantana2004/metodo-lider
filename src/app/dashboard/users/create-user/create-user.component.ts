import { Component } from '@angular/core';
import { DashboardLayoutComponent } from "../../dashboard-layout/dashboard-layout.component";
import { CardWithHeaderComponent } from "../../../components/cards/card-with-header/card-with-header.component";
import { TextInputComponent } from "../../../components/form/input/text-input/text-input.component";

@Component({
  selector: 'app-create-user',
  imports: [DashboardLayoutComponent, CardWithHeaderComponent, TextInputComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

}
