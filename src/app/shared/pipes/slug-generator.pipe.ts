import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugGenerator',
  standalone: true
})
export class SlugGeneratorPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const slug = value.toLowerCase().replace(/\s+/g, '-');

    const cleanSlug = slug.replace(/[^\w\-]+/g, '');

    return cleanSlug;
  }

}
