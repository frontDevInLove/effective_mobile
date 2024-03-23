import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineToParagraph',
  standalone: true,
})
export class NewlineToParagraphPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split('\n')
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join('');
  }
}
