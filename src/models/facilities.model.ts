import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Facilities extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    })
  facilityName?: string;

  @property({
    type: 'array',
    itemType: 'string'
    })
  selectDays?: string[];

  @property({
    type: 'string',
    })
  startTime?: string;

  @property({
    type: 'string',
    })
  endTime?: string;

  @property({
    type: 'string',
    })
  details?: string;

  @property({
    type: 'string',
    })
  image?: string;

  

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Facilities>) {
    super(data);
  }
}

export interface FacilitiesRelations {
  // describe navigational properties here
}

export type FacilitiesWithRelations = Facilities & FacilitiesRelations;
