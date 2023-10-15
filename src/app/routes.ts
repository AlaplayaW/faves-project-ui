import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { authGuard } from './auth/guards/auth.guard';
import { AuthLayoutComponent } from './auth/pages/auth-layout/auth-layout.component';
import { Error404PageComponent } from './components/pages/error404page/error404page.component';
import { ErrorComponent } from './components/pages/error/error.component';


export const APP_ROUTES: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./auth/auth.routes')
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'feed',
        loadComponent: () => import('./components/pages/news-feed/news-feed.component')
          .then(c => c.NewsFeedComponent),
        title: "Fil de lecture", 
        data: { title: 'Fil de lecture' }
      },
      {
        path: 'new-review',
        loadComponent: () => import('./components/pages/new-review/new-review.component')
          .then(c => c.NewReviewComponent),
        title: "Ajoute un avis", 
        data: { title: 'Ajoute un avis' }
      },
      {
        path: 'users',
        loadComponent: () => import('./components/user/user.component').then(c => c.UserComponent),
      },

    ]
  },
  {
    path: '**',
    redirectTo: '',
  },


  { path: '404', component: Error404PageComponent },

  {
    path: 'error',
    component: ErrorComponent,
    loadChildren: () => import('./components/pages/error/error.component').then(c => c.ErrorComponent )
  }
]