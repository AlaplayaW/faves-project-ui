import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { authGuard } from './auth/guards/auth.guard';
import { AuthLayoutComponent } from './auth/pages/auth-layout/auth-layout.component';
import { Error404PageComponent } from './components/pages/error404page/error404page.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { MyFriendsComponent } from './components/pages/dashboard/my-friends/my-friends.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'feed',
        loadComponent: () =>
          import('./components/pages/news-feed/news-feed.component').then(
            (c) => c.NewsFeedComponent
          ),
        title: 'Fil de lecture',
        data: { title: 'Fil de lecture' },
      },
      {
        path: 'new-book',
        loadComponent: () =>
          import('./components/pages/new-book/new-book.component').then(
            (c) => c.NewBookComponent
          ),
        title: 'Ajoute un livre',
        data: { title: 'Ajoute un livre' },
      },
      {
        path: 'search-friends',
        loadComponent: () =>
          import(
            './components/pages/search-friends/search-friends.component'
          ).then((c) => c.SearchFriendsComponent),
        title: 'Recherche un ami',
        data: { title: 'Recherche un ami' },
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./components/user/user.component').then(
            (c) => c.UserComponent
          ),
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
        data: { title: 'Dashboard' },
      },
      {
        path: 'dashboard/friends',
        component: MyFriendsComponent,
        title: 'Mes amis',
        data: { title: 'Mes amis' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '404',
  },

  { path: '404', component: Error404PageComponent },

  {
    path: 'error',
    component: ErrorComponent,
    loadChildren: () =>
      import('./components/pages/error/error.component').then(
        (c) => c.ErrorComponent
      ),
  },
];
