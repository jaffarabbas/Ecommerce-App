import { Injectable } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {

  constructor(private sanitizer: DomSanitizer) { }

  getFileType(file: File): string {
    return file.type.split('/')[0];
  }

  getSafeUrl(file: File): SafeUrl {
    const url = URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }
}
