import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Society, SocietyRelations } from '../models/society.model';
export declare class SocietyRepository extends DefaultCrudRepository<Society, typeof Society.prototype.id, SocietyRelations> {
    constructor(dataSource: DbDataSource);
}
