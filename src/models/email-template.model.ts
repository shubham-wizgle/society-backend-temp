// inside src/models/email-template.model.ts

import {Model, model, property} from '@loopback/repository';

@model()
export class EmailTemplate extends Model {
  @property({
    type: 'string',
  })
  from = 'no_reply@loopback.io';

  @property({
    type: 'string',
    required: true,
  })
  to: string;

  @property({
    type: 'string',
    required: true,
  })
  subject: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'string',
    required: true,
  })
  html: string;

 @property({
    type: 'string',
    required: false,
  })
  createdBy: string;
  constructor(data?: Partial<EmailTemplate>) {
    super(data);
  }
}