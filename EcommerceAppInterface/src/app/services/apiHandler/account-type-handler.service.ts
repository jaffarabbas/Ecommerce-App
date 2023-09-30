import { Injectable } from '@angular/core';
import { AccountTypeService } from '../api/account-type.service';
import { ApiUrls } from 'src/app/utilities/constants/apiUrls';
import { LocalStorageService } from '../core/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeHandlerService {

  constructor(private accountTypeService:AccountTypeService,private localStorageService:LocalStorageService) { }

  public getAll(){
    return this.accountTypeService.getAll(ApiUrls.API_END_POINTS.AccountType.GetAccountTypes);
  }
}
