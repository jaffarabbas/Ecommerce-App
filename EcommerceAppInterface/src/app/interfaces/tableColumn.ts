import {FormController} from "./formController";

export interface tableColumnData{
    id:string,
    label:string,
    type:any,
    property:string,
    formController?:FormController,
}
