import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeLastWord',
  standalone: true
})
export class RemoveLastWordPipe implements PipeTransform {

  transform(value: string): string {
    
    if (!value) return '';

    const words = value.split(' ');
    words.pop();
    return words.join(' ');
  }

}
