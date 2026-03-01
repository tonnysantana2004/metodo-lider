import { Routes } from '@angular/router';
import { LoginRegisterLayoutComponent } from "./login/login-register-layout/login-register-layout.component";
import { overviewComponent } from "./dashboard/overview/overview.component";
import { authGuardGuard } from "./auth-guard.guard";
import { UsersListComponent } from "./dashboard/users/users.component";

export const routes: Routes = [
    {
        path: 'login',
        component: LoginRegisterLayoutComponent
    },
    {
        path: 'overview',
        component: overviewComponent,
        canActivate: [authGuardGuard]
    },
    {
        path: 'users',
        component: UsersListComponent,
        canActivate: [authGuardGuard]
    },
    {
        path: '**',
        redirectTo: 'overview',
    }
];
