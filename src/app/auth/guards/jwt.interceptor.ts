import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url.startsWith('http://127.0.0.1:8000/api/')) {
    let jwt = JSON.parse(localStorage.getItem('jwt') || '');

    if (jwt) {
      const headers = req.headers.set('Authorization', `Bearer ${jwt}`);
      req = req.clone({ headers });
    }
  }

  return next(req).pipe(
    tap(resp => console.log('response', resp))
  );
}

// J'utilise celui là