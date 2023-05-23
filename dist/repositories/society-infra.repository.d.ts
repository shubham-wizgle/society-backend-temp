import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { SocietyInfra, SocietyInfraRelations } from '../models';
export declare class SocietyInfraRepository extends DefaultCrudRepository<SocietyInfra, typeof SocietyInfra.prototype.societyId, SocietyInfraRelations> {
    constructor(dataSource: DbDataSource);
}
