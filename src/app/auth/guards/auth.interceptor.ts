import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    
    console.log('authInterceptor (root scope)');

    if (req.url.startsWith('http://127.0.0.1:8000/api/')) {
        // Setting a dummy token for demonstration
        const headers = req.headers.set('Authorization', 'Bearer Auth-1234567');
        req = req.clone({headers});
    }

    return next(req).pipe(
        tap(resp => console.log('response', resp))
    );
}

// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';
// import { SitesService } from 'src/app/services/sites.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private authService: AuthService,
//               private siteService: SitesService) { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const authToken = this.authService.token;
//     const selectedSite = this.siteService.selectedSite$.value;

//     if (authToken) {
//         const authRequest = request.clone({
//           headers: request.headers
//             .set('Authorization', "Bearer " + authToken).set('Site', selectedSite ? selectedSite._id : 'global'),
//         });
//         return next.handle(authRequest);
//     }
//     return next.handle(request);
//   }
// }
