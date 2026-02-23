import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

// Chore: adicionar verificação de identidade com o backend
export const authGuardGuard: CanActivateFn = (route, state) => {

    const router = inject(Router);
    const isAuthenticated = localStorage.getItem('access_token');

    if(isAuthenticated != null) {
        return true;
    }

    router.navigate(['/login']);
    return false;
};
