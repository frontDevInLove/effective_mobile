import { Directive, HostListener } from '@angular/core';

/**
 * Директива для автоматического выделения всего текста в элементе ввода при получении им фокуса.
 */
@Directive({
  selector: '[appSelectOnFocus]',
  standalone: true,
})
export class SelectOnFocusDirective {
  constructor() {}

  /**
   * Обработчик события фокуса для элементов ввода. Выделяет весь текст в элементе при его фокусировке.
   * @param target Элемент ввода, который получил фокус.
   */
  @HostListener('focus', ['$event.target'])
  onFocus(target: HTMLInputElement) {
    target.select();
  }
}
