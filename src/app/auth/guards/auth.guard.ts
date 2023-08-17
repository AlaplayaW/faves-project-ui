import { inject } from "@angular/core"
import { Router } from "@angular/router";
import { filter, map } from "rxjs";
import { CurrentUserService } from "../../services/current-user.service";

export const authGuard = () => {
  const currentUserService = inject(CurrentUserService);
  const router = inject(Router);

  return currentUserService.currentUser$.pipe(
    filter((currentUser) => currentUser != undefined),
    map((currentUser) => {
      if (!currentUser) {
        console.log('---------:', currentUser);
        router.navigateByUrl('/login');
        return false;
      }
      return true;
    })
  );
};
