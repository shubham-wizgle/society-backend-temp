import {belongsTo,Entity,model, property} from '@loopback/repository';
import { Member } from './member.model';

@model({settings: {strict: false}})
export class SocietyInfra extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
 
  })
  societyId?: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  infra: Phases[];


  @belongsTo(() => Member, { name: 'member' })
  userId?: string;
 

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SocietyInfra>) {
    super(data);
  }
}



export class Phases {
 
  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  wings: Wings[];

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;
}

export class Flats {
 

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  flatId?: string;

  @property({
    type: 'string',
   
  })
  name: string;

  @property({
    type: 'string',
 
  })
  flatType: string;

  @property({
    type: 'string',
   
  })
  date: string;

  @property({
    type: 'string',
 
  })
  ownerName: string;


  @property({
    type: 'string',
 
  })
  tenantName: string;

  @property({
    type: 'boolean',
   
  })
  status: boolean;
}


export class Wings {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
   
  })
  wingId: string;

  @property({
    type: 'array',
    itemType: Flats,
    required: true,
  })
  flats: Flats[];

}



export interface SocietyInfraRelations {
  // describe navigational properties here
}

export type SocietyInfraWithRelations = SocietyInfra & SocietyInfraRelations;
