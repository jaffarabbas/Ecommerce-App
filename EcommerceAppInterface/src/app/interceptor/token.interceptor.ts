import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/core/local-storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let localStorageService = inject(LocalStorageService);
  let token = localStorageService.getItem("token")["JWTToken"];
  let jwt = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(jwt);
};
