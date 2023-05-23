import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Complaint, ComplaintRelations } from '../models/complaint.model';
export declare class ComplaintRepository extends DefaultCrudRepository<Complaint, typeof Complaint.prototype.id, ComplaintRelations> {
    constructor(dataSource: DbDataSource);
}
