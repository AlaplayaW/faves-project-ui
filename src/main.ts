import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { APP_ROUTES } from "./app/routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { withInterceptors } from "@angular/common/http";
import { provideHttpClient } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withPreloading, withDebugTracing } from '@angular/router';
import { authInterceptor } from './app/auth/guards/auth.interceptor';



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // Configuration du service HttpClient avec l'intercepteur authInterceptor
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    // Configuration du système de routage de l'application Angular
    provideRouter(
      // Configuration des routes de l'application (APP_ROUTES)
      APP_ROUTES,
      // Activation du preloading de tous les modules
      withPreloading(PreloadAllModules),
      // Activation du traçage de débogage pour les routes
      // TODO: A supprimer quand plus utile
      withDebugTracing()
    ),
    provideAnimations(),
  ]
}).catch(err => console.error(err));
