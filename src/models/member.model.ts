import {belongsTo, Entity, model, property} from '@loopback/repository';
import { Society } from './society.model';

@model({settings: {strict: false}, name: 'members'})
export class Member extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  dateOfJoining: string;

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
  userId: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  mobileNo?: string;

  @belongsTo(() => Society, {name:'society'})
  societyId?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'number',
  })
  otp?: number;

  @property({
    type: 'boolean',
  })
  isOtpSent?: boolean;

  @property({
    type: 'string',
  })
  createdAt?: string;

  @property({
    type: 'string',
  })
  otpGeneratedAt: string;

  @property({
    type: 'boolean',
  })
  isEmailVerify?: boolean;

  @property({
    type: 'boolean',
  })
  isEmailSent: boolean;

  @property({
    type: 'string',
  })
  designation: string;
  

  constructor(data?: Partial<Member>) {
    super(data);
  }
}

@model({settings: {strict: false}})
export class MemberEmail
{
  @property({
    type: 'string',
  })
  email?: string;
}
export interface MemberRelations {
  // describe navigational properties here
}

export type MemberWithRelations = Member & MemberRelations;
