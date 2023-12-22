import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { Router, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingComponent } from './pages/landing/landing.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppDynamicRouting,
      multi: true,
      deps: [Router, AuthService],
    },
  ]
};



export function initializeAppDynamicRouting(
  router: Router,
  authService: AuthService,
): () => Promise<void> {



  return () =>
    new Promise((resolve) => {

      if (authService.isAuthenticated()) {

        router.resetConfig([
          ...routes,
          {
            path: 'dashboard',
            component: DashboardComponent,
          },
        ]);
      }
      else {
        router.resetConfig([
          ...routes,
          {
            path: 'landing',
            component: LandingComponent,
          },
        ]);
      }


      setTimeout(() => {
        console.log(
          'initializeAppDynamicRouting: router.config',
          router.config,
        );
        resolve();
      }, 2000);
    });
}

