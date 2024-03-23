import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ColumnAddFormComponent } from '@components/column-add-form/column-add-form.component';
import { EllipsisMenuComponent } from '@components/ellipsis-menu/ellipsis-menu.component';
import { RenameColumnComponent } from '@components/rename-column/rename-column.component';
import type { Column } from '@services/db.service';

/**
 * Компонент для отображения колонки, включая возможности для переименования,
 * удаления колонки, добавления и удаления карточек внутри неё.
 */
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
  styleUrls: ['./column.component.scss'], // Исправлено с styleUrl на styleUrls
})
export class ColumnComponent {
  /** Данные колонки для отображения и взаимодействия */
  @Input() column!: Column;

  /** Событие создания новой карточки в колонке */
  @Output() createCard = new EventEmitter<{ column: Column; name: string }>();

  /** Событие обновления названия колонки */
  @Output() updateColumn = new EventEmitter<{
    column: Column;
    newName: string;
  }>();

  /** Событие удаления колонки */
  @Output() removeColumn = new EventEmitter<Column>();

  /** Событие удаления всех карточек в колонке */
  @Output() removeCards = new EventEmitter<Column>();

  constructor() {}
}
