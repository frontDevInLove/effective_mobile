import { Component } from '@angular/core';
import { ColumnAddFormComponent } from '@components/column-add-form/column-add-form.component';
import { AsyncPipe } from '@angular/common';
import { Column, dbService } from '@services/db.service';
import { RenameColumnComponent } from '@components/rename-column/rename-column.component';
import { EllipsisMenuComponent } from '@components/ellipsis-menu/ellipsis-menu.component';
import { ColumnComponent } from '../../features/column/column.component';

@Component({
  selector: 'app-column-manager',
  standalone: true,
  imports: [
    ColumnAddFormComponent,
    AsyncPipe,
    RenameColumnComponent,
    EllipsisMenuComponent,
    ColumnComponent,
  ],
  templateUrl: './column-manager.component.html',
  styleUrl: './column-manager.component.scss',
})
export class ColumnManagerComponent {
  public columns$ = dbService.getColumns();
  public cards$ = dbService.getCards();

  constructor() {}

  createColumn(name: string) {
    dbService.createColumn(name);
  }

  updateColumn({ column, newName }: { column: Column; newName: string }) {
    dbService.updateColumn(column, newName);
  }

  removeColumn(column: Column) {
    dbService.removeColumn(column);
  }

  createCard({ column, name }: { column: Column; name: string }) {
    dbService.createCard(column, name);
  }
}
