import {Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const AuthenticatedGuardFn = async (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  let authenticated = await authService.isAuthenticated();
  if (authenticated) {
    return true;
  } else {
    return router.createUrlTree(['/auth']);
  }

};
