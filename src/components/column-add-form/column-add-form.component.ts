import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { EscKeyDirective } from '@directives/esc-key.directive';

/** Определяет возможные режимы отображения формы */
type Mode = 'Green' | 'Transparent';

@Component({
  selector: 'app-column-add-form',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    NgClass,
    ClickOutsideDirective,
    EscKeyDirective,
  ],
  templateUrl: './column-add-form.component.html',
  styleUrl: './column-add-form.component.scss',
})
export class ColumnAddFormComponent {
  /** Режим отображения компонента */
  @Input() mode: Mode = 'Green';
  /** Текст кнопки для добавления новой колонки */
  @Input() addItemText: string = 'Добавить еще одну колонку';
  /** Плейсхолдер поля ввода */
  @Input() inputPlaceholder: string = 'Название колонки...';
  /** Текст на кнопке подтверждения */
  @Input() buttonText: string = 'Добавить список';

  /** Событие, эмитируемое после сохранения формы */
  @Output() private onSave = new EventEmitter<string>();

  /** Ссылка на поле ввода имени колонки */
  @ViewChild('FieldName') private fieldName!: ElementRef<HTMLInputElement>;

  /** Флаг видимости формы */
  public showForm = false;

  /** Форма для добавления новой колонки */
  public columnForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  /**
   * Конструктор компонента
   * @param formBuilder Построитель форм Angular.
   * @param cd Сервис для обнаружения изменений.
   */
  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
  ) {}

  /**
   * Управляет открытием или закрытием формы
   * @param willOpen Указывает, следует ли открыть форму
   */
  openForm(willOpen: boolean): void {
    if (this.showForm === willOpen) return;

    this.showForm = willOpen;

    if (willOpen) {
      this.columnForm.reset();
      this.cd.detectChanges();
      this.fieldName.nativeElement.focus();
    }
  }

  /** Обрабатывает сохранение формы и эмитирует событие onSave */
  save() {
    if (this.columnForm.invalid) return;
    if (!this.columnForm.value.name) return;

    this.onSave.emit(this.columnForm.value.name);
    this.openForm(false);
    this.openForm(true);
  }
}
