import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AccountType } from 'src/app/models/accountType';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from 'src/app/utilities/constants/apiUrls';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService extends ApiService<AccountType>  {

  constructor(http:HttpClient) {
    super(http);
    this.apiUrl = ApiUrls.API_URL;
    this.apiController = ApiUrls.API_CONTROLLERS.AccountTypes;
  }
}
