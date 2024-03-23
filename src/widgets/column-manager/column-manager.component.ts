import { Component } from '@angular/core';
import { ColumnAddFormComponent } from '@components/column-add-form/column-add-form.component';
import { AsyncPipe } from '@angular/common';
import { Card, Column, dbService } from '@services/db.service';
import { RenameColumnComponent } from '@components/rename-column/rename-column.component';
import { EllipsisMenuComponent } from '@components/ellipsis-menu/ellipsis-menu.component';
import { ColumnComponent } from '../../features/column/column.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ColumnCardComponent } from '@components/column-card/column-card.component';

@Component({
  selector: 'app-column-manager',
  standalone: true,
  imports: [
    ColumnAddFormComponent,
    AsyncPipe,
    RenameColumnComponent,
    EllipsisMenuComponent,
    ColumnComponent,
    MatIcon,
    MatIconButton,
    ColumnCardComponent,
  ],
  templateUrl: './column-manager.component.html',
  styleUrl: './column-manager.component.scss',
})
export class ColumnManagerComponent {
  public columns$ = dbService.getColumns();
  public cards$ = dbService.getCards();

  constructor() {}

  /** Создает новую колонку */
  createColumn(name: string) {
    dbService.createColumn(name);
  }

  /** Обновляет существующую колонку */
  updateColumn({ column, newName }: { column: Column; newName: string }) {
    dbService.updateColumn(column, newName);
  }

  /** Удаляет колонку */
  removeColumn(column: Column) {
    dbService.removeColumn(column);
  }

  /** Создает новую карточку в колонке */
  createCard({ column, name }: { column: Column; name: string }) {
    dbService.createCard(column, name);
  }

  /** Обновляет карточку */
  updateCard({ card, name }: { card: Card; name: string }) {
    dbService.updateCard(card, name);
  }

  /** Удаляет все карточки в колонке */
  async removeCards(column: Column) {
    await dbService.removeAllCardsInColumn(column.id!);
  }
}
