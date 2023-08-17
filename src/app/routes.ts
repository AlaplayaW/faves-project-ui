import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { authGuard } from './auth/guards/auth.guard';

export const APP_ROUTES: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  // {
  //   path: 'login',
  //   // canActivate: [authGuard],
  //   loadComponent: () =>
  //     import('./features/login/login.component').then(c => c.LoginComponent),
  // },
  {
    path: 'home',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./components/pages/home/home.component').then(c => c.HomeComponent),
  },
  // {
  //   path: 'users',
  //   loadComponent: () => import('./components/user/user.component').then(c => c.UserComponent),
  // },
  // {
  //   path: 'auth',
  //   // canActivate: [authGuard],
  //   loadChildren: () =>
  //     import('./features/auth/auth.routes')
  // },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./components/pages/home/home.component').then(c => c.HomeComponent),
      },
      {
        path: 'books',
        loadComponent: () => import('./components/book/list-book/list-book.component').then(c => c.ListBookComponent),
      },
      {
        path: 'movies',
        loadComponent: () => import('./components/movie/list-movie/list-movie.component').then(c => c.ListMovieComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./components/user/user.component').then(c => c.UserComponent),
      },
      {
        path: 'feed',
        loadComponent: () => import('./components/pages/news-feed/news-feed.component').then(c => c.NewsFeedComponent),
      },
      // {
      //     path: 'departments',
      //     loadChildren: () => import('./features/department/department.Component').then(m => m.DepartmentComponent),
      //     // canActivate: [AuthGuard]
      // },
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
  // { path: '404', component: Error404PageComponent },

  // {
  //   path: 'error',
  //   // component: ErrorComponent,
  //   //loadChildren: () => import('./shared/error/error.Component').then(m => m.ErrorComponent)
  // }
]