import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badgeName',
})
export class BadgeNamePipe implements PipeTransform {
  transform(value: string[]): string {
    return value.map(val => val[0]).join('');
  }
}
