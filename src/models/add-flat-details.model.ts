import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class FlatDetails extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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

  // @property({
  //   type: 'object',
  //   required: true,
  // })
  // phase: object;

  // @property({
  //   type: 'object',
  //   required: true,
  // })
  // wing: object;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  flatType: string;

  @property({
    type: 'string',

  })
  status: string;

  @property({
    type: 'object',
    required: true,
  })
  ownerName: object;

  @property({
    type: 'string',
  })
  tenantName?: string;

  @property({
    type: 'string',
  })
  date?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FlatDetails>) {
    super(data);
  }
}

export interface FlatDetailsRelations {
  // describe navigational properties here
}

export type FlatDetailsWithRelations = FlatDetails & FlatDetailsRelations;
