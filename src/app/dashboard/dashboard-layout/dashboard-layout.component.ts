import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ButtonPrimaryComponent} from "../../components/buttons/button-primary/button-primary.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
    imports: [
        RouterOutlet,
        ButtonPrimaryComponent
    ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

}
