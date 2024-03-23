import Dexie, { liveQuery, Table } from 'dexie';
import { map, of, switchMap } from 'rxjs';

export interface Column {
  id?: number;
  name: string;
}

export interface Card {
  id?: number;
  columnId: number;
  name: string;
}

export class DbService extends Dexie {
  columns!: Table<Column, number>;
  cards!: Table<Card, number>;

  constructor() {
    super('task-trekker');
    this.version(2).stores({
      columns: '++id,name',
      cards: '++id,columnId,name',
    });
  }

  /** CRUD для колонок */
  createColumn(name: string) {
    dbService.columns.add({ name });
  }

  updateColumn(column: Column, name: string) {
    this.columns.update(column.id!, { name });
  }

  removeColumn(column: Column) {
    this.columns.delete(column.id!);
  }

  getColumns() {
    return of(null).pipe(
      switchMap(() => liveQuery(() => this.columns.toArray())),
    );
  }

  /** CRUD для карточек */
  createCard(column: Column, name: string) {
    dbService.cards.add({ name, columnId: column.id! });
  }

  updateCard(card: Card, name: string) {
    this.cards.update(card.id!, { name });
  }

  /**
   * Удаляет все карточки, связанные с определенной колонкой.
   * @param columnId Идентификатор колонки, для которой нужно удалить все карточки.
   * @returns Промис без возвращаемого значения, указывающий на завершение операции.
   */
  async removeAllCardsInColumn(columnId: number) {
    const cards = await this.cards.where({ columnId }).toArray();
    const ids = cards.map((card) => card.id!);
    await this.cards.bulkDelete(ids);
  }

  getCards() {
    return of(null).pipe(
      switchMap(() => liveQuery(() => this.cards.toArray())),
      map(this.adapterCards),
    );
  }

  /**
   * Трансформирует массив карточек в объект, группируя карточки по columnId.
   * @param cards Массив карточек для трансформации.
   * @returns Объект, где ключами являются значения columnId, а значениями — массивы карточек.
   */
  adapterCards(cards: Card[]) {
    return cards.reduce(
      (acc, card) => {
        if (!acc[card.columnId]) {
          acc[card.columnId] = [];
        }

        acc[card.columnId].push(card);
        return acc;
      },
      {} as { [key in Card['columnId']]: Card[] },
    );
  }
}

export const dbService = new DbService();
