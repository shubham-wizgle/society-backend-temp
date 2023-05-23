import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Income extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  paymentMode: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  incomeType: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: false,
  })
  year: string;
  @property({
    type: 'string',
    required: false,
  })
  month: string;

  

  @property({
    type: 'string',
    required: true,
  })
  time: string;


  

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Income>) {
    super(data);
  }
}

export interface IncomeRelations {
  // describe navigational properties here
}

export type IncomeWithRelations = Income & IncomeRelations;
