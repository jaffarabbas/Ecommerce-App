import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/utilities/constants/apiUrls';
import { ApiService } from './api.service';
import { User } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<User>  {

  constructor(http:HttpClient) {
    super(http);
    this.apiUrl = ApiUrls.API_URL;
    this.apiController = ApiUrls.API_CONTROLLERS.Users;
  }
}