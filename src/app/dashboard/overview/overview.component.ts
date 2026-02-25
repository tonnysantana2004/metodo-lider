import { Component } from '@angular/core';
import { DashboardLayoutComponent } from "../dashboard-layout/dashboard-layout.component";
import { CountdownCardComponent } from "../../components/cards/countdown-card/countdown-card.component";
import { FillsChartCardComponent } from "../../components/charts/fills-chart-card/fills-chart-card.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    CountdownCardComponent,
    FillsChartCardComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class overviewComponent {

}
