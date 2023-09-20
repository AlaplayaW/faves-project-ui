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
  {
    path: 'auth',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./auth/auth.routes')
  },
  {
    path: 'app',
    component: LayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'feed',
        loadComponent: () => import('./components/pages/news-feed/news-feed.component').then(c => c.NewsFeedComponent),
        title: "Fil d'actualités"
      },
      // {
      //   path: 'home',
      //   loadComponent: () => import('./components/pages/home/home.component').then(c => c.HomeComponent),
      //   title: "Accueil"
      // },
      {
        path: 'new-book',
        loadComponent: () => import('./components/pages/new-book/new-book.component').then(c => c.NewBookComponent),
        // title: 'Ajoute un média'
      },
      {
        path: 'new-review',
        loadComponent: () => import('./components/pages/new-review/new-review.component').then(c => c.NewReviewComponent),
        title: "Ajoute un avis"
      },
      {
        path: 'new-review-bis',
        loadComponent: () => import('./components/pages/new-review-bis/new-review-bis.component').then(c => c.NewReviewBisComponent),
        title: "Ajoute un avis bis"
      },
      {
        path: 'books',
        loadComponent: () => import('./components/book/list-book/list-book.component').then(c => c.ListBookComponent),
        title: "Liste de livres"
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

        // {
      //     path: 'departments',
      //     loadChildren: () => import('./features/department/department.Component').then(m => m.DepartmentComponent),
      //     // canActivate: [AuthGuard]
      // },


  // { path: '404', component: Error404PageComponent },

  // {
  //   path: 'error',
  //   // component: ErrorComponent,
  //   //loadChildren: () => import('./shared/error/error.Component').then(m => m.ErrorComponent)
  // }
]