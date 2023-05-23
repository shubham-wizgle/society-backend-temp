import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Facilities, FacilitiesRelations } from '../models';
export declare class FacilitiesRepository extends DefaultCrudRepository<Facilities, typeof Facilities.prototype.id, FacilitiesRelations> {
    constructor(dataSource: DbDataSource);
}
