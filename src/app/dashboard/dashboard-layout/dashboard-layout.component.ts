import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ButtonPrimaryComponent} from "../../components/buttons/button-primary/button-primary.component";
import {NavLinkComponent} from "../../components/buttons/nav-link/nav-link.component";
import { SearchInputComponent } from "../../components/filters/search-input/search-input.component";

@Component({
    selector: 'app-dashboard-layout',
    imports: [
    RouterOutlet,
    ButtonPrimaryComponent,
    NavLinkComponent,
    SearchInputComponent
],
    standalone : true,
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

}
