import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Complaint extends Entity {
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
    required: false,
  })
  selectedMember: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;
 

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;
  @property({
    type: 'string',
    required: false,
  })
  societyId?: string;

  @property({
    type: 'string',
  })
  status?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Complaint>) {
    super(data);
  }
}

export interface ComplaintRelations {
  // describe navigational properties here
}

export type ComplaintWithRelations = Complaint & ComplaintRelations;
