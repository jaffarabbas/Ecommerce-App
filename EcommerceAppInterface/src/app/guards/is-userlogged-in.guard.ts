import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/core/local-storage.service';

export const isUserloggedInGuard: CanActivateFn = (route, state) => {
  const localHost = inject(LocalStorageService);
  const router = inject(Router);
  if (!localHost.getItem("token")) {
    router.navigate(["auth/login"]);
    return false;
  }
  return true;
};
