import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {FileHandlerService} from "../core/file-handler.service";
import {FileUrl} from "../../interfaces/fileUrl";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private angularStorage:AngularFireStorage,public fileHandler:FileHandlerService) { }

  async upload(file:any){
    let filePath!:string;
    let fileType:string = "";
    if(this.fileHandler.getFileType(file) === 'image'){
      filePath = `images/${file.name}`;
      fileType = 'image';
    }
    let task = await this.angularStorage.upload(filePath, file);
    let url = await task.ref.getDownloadURL();
    let fileUrl:FileUrl = {
      url:url,
      type:fileType
    }
    return url != null ? fileUrl : '';
  }

  async delete(url:any){
    try {
      // Attempt to get metadata of the file
      const metadata = await this.angularStorage.storage.refFromURL(url).getMetadata();

      // If metadata exists, the file exists
      if (metadata) {
        // Attempt to delete the file
        await this.angularStorage.storage.refFromURL(url).delete();
        console.log("File deleted successfully");
        return true;
      } else {
        // File does not exist
        console.log("File does not exist");
        return false;
      }
    } catch (error) {
      // Handle the error when the file doesn't exist
      console.log("Error deleting file:", error);
      return false;
    }
  }
}
