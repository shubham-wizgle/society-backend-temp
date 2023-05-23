import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Rules, RulesRelations } from '../models';
export declare class RulesRepository extends DefaultCrudRepository<Rules, typeof Rules.prototype.id, RulesRelations> {
    constructor(dataSource: DbDataSource);
}
