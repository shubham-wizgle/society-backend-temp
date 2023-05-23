import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { FlatDetails, FlatDetailsRelations } from '../models';
export declare class FlatDetailsRepository extends DefaultCrudRepository<FlatDetails, typeof FlatDetails.prototype.id, FlatDetailsRelations> {
    constructor(dataSource: DbDataSource);
}
