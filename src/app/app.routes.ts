import {Routes} from '@angular/router';
import {LoginRegisterLayoutComponent} from "./login/login-register-layout/login-register-layout.component";
import {HomeComponent} from "./dashboard/home/home.component";
import {authGuardGuard} from "./auth-guard.guard";

export const routes: Routes = [
    {
        path: 'login',
        component: LoginRegisterLayoutComponent
    },
    {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [authGuardGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    }
];
