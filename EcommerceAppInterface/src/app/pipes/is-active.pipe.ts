import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'IsActivePipe'
})
export class IsActivePipe implements PipeTransform {

  transform(value: boolean,...args: boolean[]): string  {
    return value ? 'isActive' : 'notActive';
  }

}
