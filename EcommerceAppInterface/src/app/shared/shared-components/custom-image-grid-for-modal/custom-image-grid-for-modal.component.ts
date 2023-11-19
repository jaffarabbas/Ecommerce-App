import {Component, inject} from '@angular/core';
import {FileHandlerService} from "../../../services/core/file-handler.service";

@Component({
  selector: 'app-custom-image-grid-for-modal',
  templateUrl: './custom-image-grid-for-modal.component.html',
  styleUrls: ['./custom-image-grid-for-modal.component.scss']
})
export class CustomImageGridForModalComponent {
  fileService = inject(FileHandlerService);
}
