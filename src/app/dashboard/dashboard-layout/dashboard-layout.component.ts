import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ButtonPrimaryComponent} from "../../components/buttons/button-primary/button-primary.component";
import {NavLinkComponent} from "../../components/buttons/nav-link/nav-link.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
    imports: [
        RouterOutlet,
        ButtonPrimaryComponent,
        NavLinkComponent
    ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

}
