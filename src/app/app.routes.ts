import { Routes } from '@angular/router';
import {LoginRegisterLayoutComponent} from "./login/login-register-layout/login-register-layout.component";

export const routes: Routes = [
  {
    path: 'login',
    component : LoginRegisterLayoutComponent
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
