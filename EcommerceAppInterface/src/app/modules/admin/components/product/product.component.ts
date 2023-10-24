import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AdminProductHandlerService} from "../../../../services/apiHandler/admin-product-handler.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(public adminProductHandlerService:AdminProductHandlerService) {}

  
}