import Dexie, { liveQuery, Table } from 'dexie';
import { of, switchMap } from 'rxjs';

export interface Column {
  id?: number;
  name: string;
}

export class DbService extends Dexie {
  columns!: Table<Column, number>;

  constructor() {
    super('task-trekker');
    this.version(1).stores({
      columns: '++id,name',
    });
  }

  create(name: string) {
    dbService.columns.add({ name });
  }

  update(column: Column, name: string) {
    this.columns.update(column.id!, { name });
  }

  remove(column: Column) {
    this.columns.delete(column.id!);
  }

  getColumns() {
    return of(null).pipe(
      switchMap(() => liveQuery(() => this.columns.toArray())),
    );
  }
}

export const dbService = new DbService();
