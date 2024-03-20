import Dexie, { Table } from 'dexie';

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

  update(column: Column, name: string) {
    this.columns.update(column.id!, { name });
  }
}

export const dbService = new DbService();
