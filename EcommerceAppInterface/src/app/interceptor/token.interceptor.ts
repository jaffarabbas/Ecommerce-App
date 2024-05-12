import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/core/local-storage.service';
import { Location } from '@angular/common';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let location  =inject(Location)
  let url = req.url.split('/');
  const lastSegment = url.pop(); // Get the last segment of the URL
  const userRole = location.path().split('/')[1]; // Remove query parameters
  if (lastSegment === 'Authenticate') {
    // Proceed without modifying the request for the login request
    return next(req);
  }
  // Add authorization header for all requests except the login request
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getItem(userRole === 'admin' ? "adminToken" : "token")["JWTToken"];

  const jwt = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(jwt);
};
