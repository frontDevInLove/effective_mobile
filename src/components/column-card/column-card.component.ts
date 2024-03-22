import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Card } from '@services/db.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { EscKeyDirective } from '@directives/esc-key.directive';

@Component({
  selector: 'app-column-card',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    ClickOutsideDirective,
    EscKeyDirective,
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './column-card.component.html',
  styleUrl: './column-card.component.scss',
})
export class ColumnCardComponent {
  @Input() card!: Card;

  /** Событие, эмитируемое при обновлении карточки */
  @Output() private onCardUpdate = new EventEmitter<{
    card: Card;
    name: string;
  }>();

  /** Ссылка на поле ввода имени карточки */
  @ViewChild('FieldName') private fieldName!: ElementRef<HTMLInputElement>;

  /** Флаг видимости формы */
  public showForm = false;

  /** Форма для редактирования имени карточки */
  public cardForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  /**
   * @param formBuilder Построитель форм Angular
   * @param cd Служба для обнаружения изменений
   */
  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
  ) {}

  /**
   * Открывает или закрывает форму редактирования.
   * @param willOpen Статус открытия формы
   */
  openForm(willOpen: boolean): void {
    if (this.showForm === willOpen) return;

    this.showForm = willOpen;

    if (willOpen) {
      this.cardForm.setValue({ name: this.card.name });
      this.cd.detectChanges();
      this.fieldName.nativeElement.focus();
    }
  }

  /** Сохраняет изменения в карточке и эмитирует событие onCardUpdate */
  save() {
    if (this.cardForm.invalid) return;
    if (!this.cardForm.value.name) return;

    this.onCardUpdate.emit({ card: this.card, name: this.cardForm.value.name });
    this.openForm(false);
  }
}
