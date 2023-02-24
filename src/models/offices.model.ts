import {Entity, model, property} from '@loopback/repository';

@model({settings: {
  strict: true,
  postgresql: {
    schmea: 'public',
    table: 'offices'
  }
}})
export class Offices extends Entity {
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
      columnName: 'location',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  location: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'address',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  address: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      columnName: 'p_code',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  p_code: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'country',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  country: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      columnName: 'city',
      dataType: 'text',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  city: string;

  @property({
    type: 'number',
    required: false,
    default: 1,
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

  constructor(data?: Partial<Offices>) {
    super(data);
  }
}

export interface OfficesRelations {
  // describe navigational properties here
}

export type OfficesWithRelations = Offices & OfficesRelations;
