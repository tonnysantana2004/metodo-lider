import { Component } from '@angular/core';
import {DashboardLayoutComponent} from "../dashboard-layout/dashboard-layout.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        DashboardLayoutComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
