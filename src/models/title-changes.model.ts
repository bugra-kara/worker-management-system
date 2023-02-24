import {Entity, model, property} from '@loopback/repository';

@model({settings: {
  strict: true,
  postgresql: {
    schmea: 'public',
    table: 'title_changes'
  }
}})
export class TitleChanges extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  start_date: string;

  @property({
    type: 'date',
    required: false,
  })
  end_date: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'number',
    required: true,
  })
  departmant: number;

  @property({
    type: 'number',
    required: true,
  })
  user_id: number;

  @property({
    type: 'number',
    required: true,
  })
  status: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TitleChanges>) {
    super(data);
  }
}

export interface TitleChangesRelations {
  // describe navigational properties here
}

export type TitleChangesWithRelations = TitleChanges & TitleChangesRelations;
