import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/core/local-storage.service';

export const isAdminLoginGuard: CanActivateFn = (route, state) => {
  const localHost = inject(LocalStorageService);
  if (!localHost.getItem("token")) {
    return false;
  }
  return true;
};
