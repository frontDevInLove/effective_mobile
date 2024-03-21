import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appEscKey]',
  standalone: true,
})
export class EscKeyDirective {
  // Эмиттер событий, который будет активирован при нажатии клавиши Esc
  @Output() appEscKey = new EventEmitter<void>();

  constructor() {}

  // Слушатель событий для обработки нажатий клавиш на документе
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    this.appEscKey.emit(); // Эмитируем событие при нажатии Esc
  }
}
