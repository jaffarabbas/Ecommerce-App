import { Injectable } from '@angular/core';
import { UserService } from '../api/user.service';
import { User } from 'src/app/models/users';
import { LocalStorageService } from '../core/local-storage.service';
import { ApiUrls } from 'src/app/utilities/constants/apiUrls';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {
  constructor(private userService:UserService) { }
  public login(user:User){
    return this.userService.create(user, ApiUrls.API_END_POINTS.Authenticate);
  }
}
