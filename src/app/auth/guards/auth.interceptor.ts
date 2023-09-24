import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";

// Intercepteur HTTP pour ajouter l'en-tête d'authentification JWT aux requêtes HTTP sortantes destinées à mon API.
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  let headers = req.headers
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  // Vérifie si la requête a une URL qui commence par l'URL de l'API définie dans l'environnement.
  if (req.url.startsWith(environment.apiUrl + '/api/')) {

    // Récupère le jeton JWT depuis le stockage local (localStorage).
    let jwt = '';

    // jwt = JSON.parse(localStorage.setItem('jwt') || '');
    if (localStorage.getItem('jwt')) {
      jwt = JSON.parse(localStorage.getItem('jwt') || '');
    }

    if (jwt) {
      headers = req.headers
        .set('Authorization', `Bearer ${jwt}`);
    }
  }

  req = req.clone({ headers });

  // Poursuit le traitement de la requête vers le serveur en appelant la fonction next.
  return next(req).pipe(
    tap(resp => console.log('response', resp)),
    catchError((error: any) => {
      // Gérez l'erreur ici, par exemple, en affichant un message d'erreur ou en effectuant une action spécifique.
      console.error('Erreur dans la requête :', error);

      // Vous pouvez choisir de renvoyer une nouvelle observable avec une erreur personnalisée.
      return throwError(() => new Error("Une erreur s'est produite lors de la requête."));
    })
  );
}


// import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
// import { catchError, tap, throwError } from "rxjs";
// import { environment } from "src/environments/environment";

// // Intercepteur HTTP pour ajouter l'en-tête d'authentification JWT aux requêtes HTTP sortantes destinées à mon API.
// export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

//   // Vérifie si la requête a une URL qui commence par l'URL de l'API définie dans l'environnement.
//   if (req.url.startsWith(environment.apiUrl + '/api/')) {
//     // Récupère le jeton JWT depuis le stockage local (localStorage).
//     const jwt = JSON.parse(localStorage.getItem('jwt') || '');
//     // Si un jeton JWT est disponible, ajoutez-le comme en-tête d'authentification à la requête.
//     if (jwt) {
//       const headers = req.headers
//         .set('Authorization', `Bearer ${jwt}`)
//         .set('Content-Type', 'application/json')
//         .set('Accept', 'application/json');
//       req = req.clone({ headers });
//     }
//   }

//   // Poursuit le traitement de la requête vers le serveur en appelant la fonction next.
//   return next(req).pipe(
//     tap(resp => console.log('response', resp)),
//     catchError((error: any) => {
//       // Gérez l'erreur ici, par exemple, en affichant un message d'erreur ou en effectuant une action spécifique.
//       console.error('Erreur dans la requête :', error);

//       // Vous pouvez choisir de renvoyer une nouvelle observable avec une erreur personnalisée.
//       return throwError(() => new Error("Une erreur s'est produite lors de la requête."));
//     })
//   );
// }
