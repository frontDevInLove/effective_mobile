import { Component } from '@angular/core';
import { ColumnAddFormComponent } from '@components/column-add-form/column-add-form.component';
import { liveQuery } from 'dexie';
import { AsyncPipe } from '@angular/common';
import { Column, dbService } from '@services/db.service';
import { of, switchMap } from 'rxjs';
import { RenameColumnComponent } from '@components/rename-column/rename-column.component';
import { EllipsisMenuComponent } from '@components/ellipsis-menu/ellipsis-menu.component';

@Component({
  selector: 'app-column-manager',
  standalone: true,
  imports: [
    ColumnAddFormComponent,
    AsyncPipe,
    RenameColumnComponent,
    EllipsisMenuComponent,
  ],
  templateUrl: './column-manager.component.html',
  styleUrl: './column-manager.component.scss',
})
export class ColumnManagerComponent {
  public columns$ = dbService.getColumns();

  constructor() {}

  create(name: string) {
    dbService.create(name);
  }

  update(column: Column, name: string) {
    dbService.update(column, name);
  }

  remove(column: Column) {
    dbService.remove(column);
  }
}
