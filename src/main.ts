import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { APP_ROUTES } from "./app/routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { HttpClientModule, withInterceptors } from "@angular/common/http";
import { provideHttpClient } from '@angular/common/http';
import { PreloadAllModules, provideRouter, withPreloading, withDebugTracing, TitleStrategy, withRouterConfig, RouterStateSnapshot } from '@angular/router';
// import { provideLogger } from './app/shared/util-logger';
// import { loggerConfig } from './app/logger.config';
import { authInterceptor } from './app/auth/guards/auth.interceptor';
import { jwtInterceptor } from './app/auth/guards/jwt.interceptor';



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, jwtInterceptor]),
    ),
        // provider to inject routes, preload all modules and trace route change events
    provideRouter(
      APP_ROUTES, 
      withPreloading(PreloadAllModules), 
      withDebugTracing()
    ),
    // provideLogger(loggerConfig),
    // provideEffects(),
    provideAnimations(),

    // importProvidersFrom(RouterModule.forRoot(routes)),

    // importProvidersFrom(TicketsModule),
    // importProvidersFrom(LayoutModule),
    ]
}).catch(err => console.error(err));