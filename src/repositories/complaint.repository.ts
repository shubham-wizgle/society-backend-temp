import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import { Complaint,ComplaintRelations } from '../models/complaint.model';

export class ComplaintRepository extends DefaultCrudRepository<
Complaint,
  typeof Complaint.prototype.id,
  ComplaintRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Complaint, dataSource);
  }
}
