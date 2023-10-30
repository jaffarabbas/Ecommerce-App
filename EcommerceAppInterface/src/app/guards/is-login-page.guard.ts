import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/core/local-storage.service';
import { inject } from '@angular/core';
import { IsAdminLoggedInService } from '../services/core/is-admin-logged-in.service';

export const isLoginPageGuard: CanActivateFn = (route, state) => {
  const localHost = inject(LocalStorageService);
  const router = inject(Router);
  const isAdminLoggedIn = inject(IsAdminLoggedInService);
  if (localHost.getItem("adminToken")) {
    router.navigate(["admin/"]);
    isAdminLoggedIn.setFlag(isAdminLoggedIn.isAdminLoggedInValue);
    return false;
  }
  return true;
};
