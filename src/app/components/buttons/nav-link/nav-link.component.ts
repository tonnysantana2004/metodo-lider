import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-nav-link',
    imports: [],
    standalone : true,
    templateUrl: './nav-link.component.html',
    styleUrl: './nav-link.component.scss'
})
export class NavLinkComponent {
  private router = inject(Router);

  @Input() text: string = 'Link';
  @Input() routeUrl: string = '';
  active : boolean = false;

  
  constructor() {
    
    this.router.events.subscribe((event: any) => {
      
      if (event instanceof NavigationEnd) {
        this.active = this.router.url === this.routeUrl;
      }

    });

  }
}

