import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatToCurrencyHUF'
})
export class FormatToCurrencyHUFPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (isNaN(value) || value === null) {
      return '';
    }

    // Convert the number to a string with commas for thousands separator
    const hufString = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return `${hufString} Ft`;
  }

}
