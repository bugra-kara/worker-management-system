import {Entity, model, property} from '@loopback/repository';

@model({settings: {
  strict: true,
  postgresql: {
    schmea: 'public',
    table: 'departmants'
  }
}})
export class Departmants extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'id',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'NO',
    },
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'departmant_name',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  departmant_name: string;

  @property({
    type: 'number',
    required: false,
    postgresql: {
      columnName: 'manager',
      dataType: 'int',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  manager: number;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'location_id',
      dataType: 'bigint',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  location: number;

  @property({
    type: 'number',
    required: false,
    postgresql: {
      columnName: 'status',
      dataType: 'int',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  status: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Departmants>) {
    super(data);
  }
}

export interface DepartmantsRelations {
  // describe navigational properties here
}

export type DepartmantsWithRelations = Departmants & DepartmantsRelations;
