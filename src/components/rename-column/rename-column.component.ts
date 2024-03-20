import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectOnFocusDirective } from '@directives/select-on-focus.directive';

/**
 * Компонент для переименования столбца.
 */
@Component({
  selector: 'app-rename-column',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SelectOnFocusDirective],
  templateUrl: './rename-column.component.html',
  styleUrl: './rename-column.component.scss',
})
export class RenameColumnComponent implements OnChanges {
  /**
   * Входной параметр: имя столбца, подлежащее изменению.
   */
  @Input() columnName: string = '';

  /**
   * Событие, генерируемое после изменения имени столбца.
   */
  @Output() onChange = new EventEmitter<string>();

  /**
   * Ссылка на элемент поля ввода в шаблоне.
   */
  @ViewChild('nameField') nameField!: ElementRef<HTMLInputElement>;

  /**
   * Форма для изменения имени столбца.
   */
  columnForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  /**
   * Флаг, указывающий на режим изменения.
   */
  isChangeMode = false;

  /**
   * Конструктор компонента RenameColumnComponent.
   * @param formBuilder Сервис для создания группы элементов формы.
   * @param cd Сервис для ручного управления процессом обнаружения изменений.
   */
  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnChanges() {
    if (this.columnName) {
      this.columnForm.setValue({ name: this.columnName });
      this.activateField(false);
    }
  }

  /**
   * Активирует или деактивирует поле ввода.
   * @param isActive Если true, поле будет активировано и в него будет установлен фокус.
   */
  activateField(isActive: boolean) {
    this.isChangeMode = isActive;

    if (isActive) {
      this.columnForm.setValue({ name: this.columnName });
      this.cd.detectChanges();
      this.nameField.nativeElement.focus();
    }
  }

  /**
   * Сохраняет измененное имя и деактивирует режим изменения.
   */
  save() {
    this.activateField(false);

    if (this.columnForm.invalid) return;
    if (!this.columnForm.value.name) return;

    this.onChange.emit(this.columnForm.value.name);
  }
}
