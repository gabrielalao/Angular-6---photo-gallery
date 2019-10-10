import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitString'
})
export class SplitStringPipe implements PipeTransform {

  transform(value: any): string {
    if (value) {
      const countryString = value.split(',')[0];
      return countryString;  
    } else {
      return null;
    }
  }

}
