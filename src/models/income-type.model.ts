import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class IncomeType extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  icon: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<IncomeType>) {
    super(data);
  }
}

export interface IncomeTypeRelations {
  // describe navigational properties here
}

export type IncomeTypeWithRelations = IncomeType & IncomeTypeRelations;
