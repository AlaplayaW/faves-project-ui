import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';

// Intercepteur HTTP pour ajouter l'en-tête d'authentification JWT aux requêtes HTTP sortantes destinées à mon API.
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const errorService = inject(ErrorService);

  let headers = req.headers
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  // Vérifie si la requête a une URL qui commence par l'URL de l'API définie dans l'environnement.
  if (req.url.startsWith(environment.apiUrl)) {
    // Récupère le jeton JWT depuis le stockage local (localStorage).
    let jwt = '';

    if (localStorage.getItem('jwt')) {
      jwt = JSON.parse(localStorage.getItem('jwt') || '');
    }

    if (jwt) {
      headers = req.headers.set('Authorization', `Bearer ${jwt}`);
    }
  }

  req = req.clone({ headers });

  return next(req).pipe(
    tap((resp) => console.log('response', resp)),
    catchError((error: HttpErrorResponse) => {
      errorService.handleError(error);
      return throwError(
        () => new Error("Une erreur s'est produite lors de la requête.")
      );
    })
  );
};
