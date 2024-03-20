import { Component } from '@angular/core';
import { ColumnAddFormComponent } from '@components/column-add-form/column-add-form.component';
import { liveQuery } from 'dexie';
import { AsyncPipe } from '@angular/common';
import { Column, dbService } from '@services/db.service';
import { of, switchMap } from 'rxjs';
import { RenameColumnComponent } from '@components/rename-column/rename-column.component';

@Component({
  selector: 'app-column-manager',
  standalone: true,
  imports: [ColumnAddFormComponent, AsyncPipe, RenameColumnComponent],
  templateUrl: './column-manager.component.html',
  styleUrl: './column-manager.component.scss',
})
export class ColumnManagerComponent {
  public columns$ = of(null).pipe(
    switchMap(() => liveQuery(() => dbService.columns.toArray())),
  );
  constructor() {}

  addColumn(name: string) {
    dbService.columns.add({ name });
  }

  renameColumn(column: Column, name: string) {
    dbService.update(column, name);
  }
}
