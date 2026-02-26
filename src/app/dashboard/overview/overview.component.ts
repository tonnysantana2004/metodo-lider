import { Component, inject } from '@angular/core';
import { DashboardLayoutComponent } from "../dashboard-layout/dashboard-layout.component";
import { CountdownCardComponent } from "../../components/cards/countdown-card/countdown-card.component";
import { FillsChartCardComponent } from "../../components/charts/fills-chart-card/fills-chart-card.component";
import { CardWithHeaderComponent } from "../../components/cards/card-with-header/card-with-header.component";
import { UserListItemComponent } from "../../components/listings/user-list-item/user-list-item.component";
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
    selector: 'app-overview',
    imports: [
    DashboardLayoutComponent,
    CountdownCardComponent,
    FillsChartCardComponent,
    CardWithHeaderComponent,
    UserListItemComponent
],
    standalone : true,
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss'
})


export class overviewComponent {

    private userService = inject(UserService);
    private postService = inject(PostService);
    public users : any[] = [];
    public posts : any[] = [];
    public lastUsersThatFill : any[] = []

    constructor() {
        
        this.userService.findAll().subscribe(users => {
            this.users = users;

            users.forEach(user => {
                let userPosts = this.postService.findAllByUserId(user.id);
                
            })
        });

        this.postService.findAll().subscribe(posts => {
            this.posts = posts;
        })
    }

}
