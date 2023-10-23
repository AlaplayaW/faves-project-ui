import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';

export default [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Connectez-vous',
    data: { title: 'Connectez-vous' },
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Inscrivez-vous',
    data: { title: 'Inscrivez-vous' },
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
    title: 'Bienvenue',
    data: { title: 'Bienvenue' },
  },
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
] as Route[];
