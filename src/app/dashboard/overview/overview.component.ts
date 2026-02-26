import { Component } from '@angular/core';
import { DashboardLayoutComponent } from "../dashboard-layout/dashboard-layout.component";
import { CountdownCardComponent } from "../../components/cards/countdown-card/countdown-card.component";
import { FillsChartCardComponent } from "../../components/charts/fills-chart-card/fills-chart-card.component";
import { CardWithHeaderComponent } from "../../components/cards/card-with-header/card-with-header.component";

@Component({
    selector: 'app-overview',
    imports: [
        DashboardLayoutComponent,
        CountdownCardComponent,
        FillsChartCardComponent,
        CardWithHeaderComponent
    ],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})
export class overviewComponent {

}
