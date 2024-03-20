import Dexie, { Table } from 'dexie';

interface Column {
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
}

export const dbService = new DbService();
