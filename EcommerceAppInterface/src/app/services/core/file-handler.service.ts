import { Injectable } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {

  selectedFiles: File[] = [];
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

  deleteAttachment(fileToDelete: File) {
    const filesArray = Array.from(this.selectedFiles);
    const index = filesArray.indexOf(fileToDelete);
    if (index > -1) {
      filesArray.splice(index, 1);
    }
    this.selectedFiles = [...filesArray];
  }

  getFileArrayStringList(): string[] {
    const fileArrayStringList: string[] = [];
    for (const file of this.selectedFiles) {
      fileArrayStringList.push(file.name);
    }
    return fileArrayStringList;
  }
}
