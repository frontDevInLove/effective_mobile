import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ColumnAddFormComponent } from '@components/column-add-form/column-add-form.component';
import { EllipsisMenuComponent } from '@components/ellipsis-menu/ellipsis-menu.component';
import { RenameColumnComponent } from '@components/rename-column/rename-column.component';
import type { Column } from '@services/db.service';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [
    AsyncPipe,
    RenameColumnComponent,
    EllipsisMenuComponent,
    ColumnAddFormComponent,
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  @Input() column!: Column; // Данные колонки

  @Output() onCardCreate = new EventEmitter<{ column: Column; name: string }>(); // Создание карточки с информацией о колонке
  @Output() onColumnUpdate = new EventEmitter<{
    column: Column;
    newName: string;
  }>(); // Обновление колонки с новым именем
  @Output() onColumnRemove = new EventEmitter<Column>(); // Удаление колонки

  constructor() {}

  createCard(name: string) {
    this.onCardCreate.emit({ column: this.column, name });
  }

  updateColumn(column: Column, newName: string) {
    this.onColumnUpdate.emit({ column, newName });
  }

  removeColumn(column: Column) {
    this.onColumnRemove.emit(column);
  }
}
