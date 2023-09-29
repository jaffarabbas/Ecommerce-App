import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/core/local-storage.service';

export const navigateToHomeGuard: CanActivateFn = (route, state) => {
  const localHost = inject(LocalStorageService);
  const router = inject(Router);
  if(localHost.getItem("token") != null){
    let url = state.url.split("/");
    console.log(url);
    if(url[1] == "auth"){
      router.navigate(["/"]);
      return false;
    }
  }
  return true;
};
