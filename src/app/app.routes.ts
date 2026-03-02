import { Routes } from '@angular/router';
import { LoginRegisterLayoutComponent } from "./login/login-register-layout/login-register-layout.component";
import { overviewComponent } from "./dashboard/overview/overview.component";
import { authGuardGuard } from "./auth-guard.guard";
import { UsersListComponent } from "./dashboard/users/users.component";
import { CreateUserComponent } from './dashboard/users/create-user/create-user.component';

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
        canActivate: [authGuardGuard],
        children : [
            {
                path : '',
                component : UsersListComponent
            },
            {
                path : 'create',
                component : CreateUserComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'overview',
    }
];
