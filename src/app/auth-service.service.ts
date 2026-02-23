import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {

    private router = inject(Router);

    login(obj: any) :boolean {
        if (obj.email === 'admin@email.com' && obj.password === '123') {
            localStorage.setItem('access_token', '123');
            this.router.navigate(['/']);
            return true;
        } else {
            localStorage.clear();
            return false;
        }
    }
}