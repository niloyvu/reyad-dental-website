import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastWord',
  standalone: true
})
export class LastWordPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const words = value.split(' ');
    return words[words.length - 1];
  }
}


