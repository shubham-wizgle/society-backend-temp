import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Society extends Entity {
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
  societyName: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'string',
    required: true,
  })
  regNo: string;

  @property({
    type: 'boolean',
    required: true,
  })
  statusCheck: boolean;
  
  @property({
    type: 'number',
    required: true,
  })
  societyPinCode: number;
  
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Society>) {
    super(data);
  }
}

export interface SocietyRelations {
  // describe navigational properties here
}

export type SocietyWithRelations = Society & SocietyRelations;
