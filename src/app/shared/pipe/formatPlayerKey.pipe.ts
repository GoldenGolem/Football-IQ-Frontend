import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatPlayerKey'})
export class FormatPlayerKey implements PipeTransform {
  transform(value: string): string {
    let newValue = value.replace(/\_/g, ' ');
    newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
    return `${newValue}`;
  }
};