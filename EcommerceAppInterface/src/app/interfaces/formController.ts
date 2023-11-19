import {FormValidations} from "./formValidations";

export interface FormController{
  isInForm?:boolean,
  formType?:string,
  validation?:FormValidations,
  options?:any[]
}
